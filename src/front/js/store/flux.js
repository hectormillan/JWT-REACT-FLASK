const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [{ title: "FIRST", background: "white", initial: "white" },
			{ title: "SECOND", background: "white", initial: "white" }],
			contacts: [],
			currentContact: {},
			characters: [],
			currentCharacter: {},
			planets: [],
			currentPlanet: {},
			species: [],
			currentSpecie: {},
			favouritesList: [],
			user: {},
			isAdmin: false,
			isLogged: false
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			editProfile: async (userData) =>{
				const token = localStorage.getItem("token")
				
				const uri = `${process.env.BACKEND_URL}/api/edit-profile`
				const options = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					},
					body: JSON.stringify(userData)

				}

				const response = await fetch(uri, options)
				const data = await response.json()
				setStore({user: data.results})
				localStorage.setItem("user", JSON.stringify(data.results))
				
			},
			setUser:(newUser) =>setStore({user: newUser}),
			setIsLogged: (value) => setStore({isLogged: value}),
			setIsAdmin: (value) => setStore({isAdmin: value}),
			setCurrentContact: (contact) => setStore({ currentContact: { ...contact } }),
			getContacts: async () => {
				const host = "https://playground.4geeks.com/contact/agendas"
				const user = "AlvaroD"
				const uri = `${host}/${user}/contacts`
				const options = {
					method: 'GET'
				}

				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log('Error', response.status, response.statusText
					);
					return
				}
				const data = await response.json()
				setStore({ contacts: data.contacts })
			},

			editContact: async () => {
				const store = getStore();
				const currentContact = store.currentContact;

				if (!currentContact || !currentContact.id) {
					console.log("Error: El contacto no tiene un ID válido");
					return;
				}

				const dataToSend = {
					name: currentContact.name,
					phone: currentContact.phone,
					email: currentContact.email,
					address: currentContact.address
				};

				const host = "https://playground.4geeks.com/contact/agendas";
				const user = "AlvaroD";
				const uri = `${host}/${user}/contacts/${currentContact.id}`;
				const options = {
					method: 'PUT',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(dataToSend)
				};

				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error", response.status, response.statusText);
					return;
				}

				await getActions().getContacts();

			},

			addContact: async (newContact) => {


				const dataToSend = {
					name: newContact.name,
					phone: newContact.phone,
					email: newContact.email,
					address: newContact.address
				};

				const host = "https://playground.4geeks.com/contact/agendas";
				const user = "AlvaroD";
				const uri = `${host}/${user}/contacts`;
				const options = {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(dataToSend)
				};

				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error", response.status, response.statusText);
					return;
				}

				await getActions().getContacts();
			},

			deleteContact: async (id) => {
				const host = "https://playground.4geeks.com/contact/agendas";
				const user = "AlvaroD";
				const uri = `${host}/${user}/contacts/${id}`;
				const options = {
					method: 'DELETE',
					headers: {
						"Content-type": "application/json"
					}
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return
				}
				const store = getStore();
				setStore({
					contacts: store.contacts.filter(contact => contact.id !== id)
				});
			},

			toggleFavorite: (item) => {
				const store = getStore();
				const exists = store.favouritesList.some(fav => fav.name === item.name);
		
				if (exists) {
					setStore({
						favouritesList: store.favouritesList.filter(fav => fav.name !== item.name)
					});
				} else {
					setStore({
						favouritesList: [...store.favouritesList, item]
					});
				}
			},
		
			removeFavorite: (name) => {
				const store = getStore();
				setStore({
					favouritesList: store.favouritesList.filter(fav => fav.name !== name)
				});
			},

			getCharacters: async () => {
				const host = "https://www.swapi.tech/api"
				const characters = "people"
				const uri = `${host}/${characters}/`
				const options = {
					method: 'GET'
				}

				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({ characters: data.results })

			},

			getPlanets: async () => {
				const host = "https://www.swapi.tech/api"
				const planets = "planets"
				const uri = `${host}/${planets}/`
				const options = {
					method: 'GET'
				}

				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({ planets: data.results })
			},

			getSpecies: async () => {
				const host = "https://www.swapi.tech/api"
				const species = "species"
				const uri = `${host}/${species}/`
				const options = {
					method: 'GET'
				}

				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({ species: data.results })
			},

			actualCharacter: async (id) => {
				const host = "https://www.swapi.tech/api";
				const characters = "people";
				const uri = `${host}/${characters}/${id}`; 
				const options = {
					method: 'GET',
				};
				setStore({currentCharacter: null})
			
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return;
				}
			
				const data = await response.json();
				const character = data.result.properties;
			
				const uid = character.url.split('/')[5]; 
				setStore({ currentCharacter: { ...character, uid } });
			},

			actualPlanet: async (id) => {
				const host = "https://www.swapi.tech/api";
				const planets = "planets";
				const uri = `${host}/${planets}/${id}`;
				const options = {
					method: 'GET'
				};
				setStore({ currentPlanet: null });
			
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return;
				}
			
				const data = await response.json();
				const planet = data.result.properties;
			
				const uid = data.result.uid;
			
				setStore({ currentPlanet: { ...planet, uid } });
			},
			
			actualSpecie: async (id) => {
				const host = "https://www.swapi.tech/api";
				const specie = "species";
				const uri = `${host}/${specie}/${id}`;
				const options = {
					method: 'GET'
				};
				setStore({currentSpecie: null})
			
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return;
				}
			
				const data = await response.json();
				const specieData = data.result.properties;
			
				const uid = data.result.uid;
			
				setStore({ currentSpecie: { ...specieData, uid } });
			},

			login: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/api/login`;
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log('error', response.status, response.statusText)
					return
				}
				const data = await response.json();
				
				setStore({
				 	user: data.results,
				 	isAdmin: data.is_admin,
				 	isLogged: true					
				 })				
				localStorage.setItem('token', data.access_token)
				localStorage.setItem('user', JSON.stringify(data))
			},
			
			signup: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/api/signup`;
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('error', response.status, response.statusText);
					return;
				}
				const data = await response.json();
				setStore({
					user: data.first_name,
					isAdmin: data.is_admin,
					isLogged: true
				});
			
				localStorage.setItem('token', data.access_token);
				localStorage.setItem('user', JSON.stringify(data));
			},
			

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
