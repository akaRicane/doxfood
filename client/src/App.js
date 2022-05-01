import React from "react";
import { Route, Routes } from 'react-router-dom';
import "./Styles/styles.scss"

import EditRestaurants from './Pages/EditRestaurants'
import FindRestaurants from "./Pages/FindRestaurants";
import ListRestaurants from './Pages/ListRestaurants'
import NewRestaurant from "./Pages/NewRestaurant";
import NotFound from "./Pages/NotFound";
import Header from './Components/Header'
import Footer from "./Components/Footer";

const AppContext = React.createContext();
const App = () => {

    const [restaurantsList, setRestaurantsList] = React.useState([]);

    return (
        <div className="app">
            <AppContext.Provider value={{ restaurantsList, setRestaurantsList }}>
                <Header />
                <Routes>
                    <Route path='/' element={<FindRestaurants />} />
                    <Route path='/new' element={<NewRestaurant />} />
                    <Route path='/edit/:spotId' element={<EditRestaurants />} />
                    <Route path='/list' element={<ListRestaurants />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <Footer />
            </AppContext.Provider>
        </div>
    );
}

export { App, AppContext };
