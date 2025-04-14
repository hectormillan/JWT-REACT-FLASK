from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone


db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(), nullable=False)
    first_name = db.Column(db.String())
    last_name = db.Column(db.String())
    is_active = db.Column(db.Boolean(), nullable=False, default=True)
    is_admin = db.Column(db.Boolean(), nullable=False, default=False)
    def __repr__(self):
        return f'<User id: {self.id} - {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'first_name': self.first_name,
                'last_name': self.last_name,
                'is_admin': self.is_admin}


class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    following_to = db.relationship('Users', foreign_keys=[following_id], backref=db.backref('following_to'), lazy='select')  # La relación
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    follower_to = db.relationship('Users', foreign_keys=[follower_id], backref=db.backref('follower_to'), lazy='select')


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("Users", backref=db.backref("comments", lazy=True))
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    post = db.relationship("Posts", backref=db.backref("comments", lazy=True))


class Medias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enum("1","2", name="type_enum"))
    url = db.Column(db.String, nullable=False, unique=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    post_to = db.relationship("Posts", foreign_keys =[post_id], backref=db.backref("post_to"), lazy="select")


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False, unique=True)
    description = db.Column(db.String, nullable=False, unique=True)
    body = db.Column(db.String, nullable=False, unique=True)
    date = db.Column(db.DateTime, nullable = False, default=datetime.utcnow)
    image_url = db.Column(db.String, nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user_to = db.relationship("Users", foreign_keys =[user_id], backref=db.backref("user_post_to"), lazy="select")


class Characters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True)
    height = db.Column(db.String, nullable=True)
    mass = db.Column(db.String, nullable=True)
    hair_color = db.Column(db.String, nullable=True)
    skin_color = db.Column(db.String, nullable=True)
    eye_color = db.Column(db.String, nullable=True)
    birth_year = db.Column(db.String, nullable=True)
    gender = db.Column(db.String, nullable=True)


class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True)
    diameter = db.Column(db.String, nullable=True)
    rotation_period = db.Column(db.String, nullable=True)
    orbital_period = db.Column(db.String, nullable=True)
    gravity = db.Column(db.String, nullable=True)
    population = db.Column(db.String, nullable=True)
    climate = db.Column(db.String, nullable=True)
    terrain = db.Column(db.String, nullable=True)


class CharactersFavourites(db.Model):
    __tablename__ ="character_favourites"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user_to = db.relationship('Users', backref=db.backref('characters-favourites', lazy=True))
    character_id = db.Column(db.Integer, db.ForeignKey("characters.id"), nullable=True)
    character_to = db.relationship("Characters", backref=db.backref("favourites", lazy=True))

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "character_id": self.character_id}    


class PlanetsFavourites(db.Model):
    __tablename__ ="planets_favourites"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user_to = db.relationship('Users', backref=db.backref('planets-favourites', lazy=True))
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'), nullable=True)
    planet_to = db.relationship("Planets", backref=db.backref("favourites", lazy=True))

    def serialize(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "planet_id": self.planet_id}
