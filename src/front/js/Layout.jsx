import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
//Custom components
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
//Custom pages of views
import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Error404 } from "./pages/Error404.jsx";
import { Contacts } from "./pages/Contacts.jsx";
import { EditContacts } from "./pages/EditContacts.jsx";
import { AddContact } from "./pages/AddContact.jsx";
import { Characters } from "./pages/Characters.jsx";
import { Planets } from "./pages/Planets.jsx";
import { Species } from "./pages/Species.jsx";
import { SpecieDetails } from "./pages/SpecieDetails.jsx";
import { PlanetDetails } from "./pages/PlanetDetails.jsx";
import { CharacterDetails } from "./pages/CharacterDetails.jsx";
import { Login } from "./pages/Login.jsx";
import { SignUp } from "./pages/SignUp.jsx";
import { Profile } from "./pages/Profile.jsx";
import { EditProfile } from "./pages/EditProfile.jsx";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;
    return (
        <div className="d-flex flex-column min-vh-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Contacts />} path="/contacts" />
                        <Route element={<EditContacts />} path="/edit-contacts" />
                        <Route element={<AddContact />} path='/add-contact' />
                        <Route element={<Characters />} path='/characters' />
                        <Route element={<CharacterDetails />} path='/character-details' />
                        <Route element={<Planets />} path='/planets' />
                        <Route element={<PlanetDetails />} path='/planet-details' />
                        <Route element={<Species />} path='/species' />
                        <Route element={<SpecieDetails />} path='/specie-details' />
                        <Route element={<Login />} path ='/login'/>
                        <Route element={<SignUp />} path="/sign-up"/>
                        <Route element={<Profile/>} path="/profile"/>
                        <Route element={<EditProfile/>} path="/edit-profile"/>
                        <Route element={<Error404 />} path='*' />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
