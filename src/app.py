"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from api.models import db, Characters, Planets
import requests
from flask_jwt_extended import JWTManager

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
# Database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)
# Other configuration
setup_admin(app)  # Add the admin
setup_commands(app)  # Add the admin
app.register_blueprint(api, url_prefix='/api')  # Add all endpoints form the API with a "api" prefix
# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")  # Change this!
jwt = JWTManager(app)


# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code


# Generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')


# Any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Avoid cache memory
    return response


#  Get character data form swapi and adds it to the database
def populate_characters():
    print("Populating characters...")
    url = "https://swapi.tech/api/people/"
    response = requests.get(url)    
    if response.status_code == 200:
        data = response.json()
        for item in data["results"]:
            character_id = item["uid"]
            existing_character = db.session.execute(
                db.select(Characters).where(Characters.id == character_id)
            ).scalar_one_or_none()            
            if not existing_character:
                details_url = f"https://swapi.tech/api/people/{character_id}"
                details_response = requests.get(details_url).json()
                properties = details_response["result"]["properties"]
                new_character = Characters(
                    id=character_id,
                    name=properties.get("name"),
                    height=properties.get("height"),
                    mass=properties.get("mass"),
                    hair_color=properties.get("hair_color"),
                    skin_color=properties.get("skin_color"),
                    eye_color=properties.get("eye_color"),
                    birth_year=properties.get("birth_year"),
                    gender=properties.get("gender")
                )
                db.session.add(new_character)
        db.session.commit()
        print("Characters populated successfully")

#  Get planet data form swapi and adds it to the database
def populate_planets():
    print("Populating planets...")
    url = "https://swapi.tech/api/planets/"
    response = requests.get(url)    
    if response.status_code == 200:
        data = response.json()
        for item in data["results"]:
            planet_id = item["uid"]
            existing_planet = db.session.execute(
                db.select(Planets).where(Planets.id == planet_id)
            ).scalar_one_or_none()            
            if not existing_planet:
                details_url = f"https://swapi.tech/api/planets/{planet_id}"
                details_response = requests.get(details_url).json()
                properties = details_response["result"]["properties"]
                new_planet = Planets(
                    id=planet_id,
                    name=properties.get("name"),
                    diameter=properties.get("diameter"),
                    rotation_period=properties.get("rotation_period"),
                    orbital_period=properties.get("orbital_period"),
                    gravity=properties.get("gravity"),
                    population=properties.get("population"),
                    climate=properties.get("climate"),
                    terrain=properties.get("terrain")
                )
                db.session.add(new_planet)
        db.session.commit()
        print("Planets populated successfully")


# This only runs if `$ python src/main.py` is executed
#  Run this to retrieve character and planet data and add its data to the database
if __name__ == '__main__':
    with app.app_context():
        populate_characters()
        populate_planets()
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
