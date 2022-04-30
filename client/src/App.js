import React from "react";
import { Route, Routes } from 'react-router-dom';
import "./styles/styles.scss"

import Home from "./Pages/Home";
import NewRestaurant from "./Pages/NewRestaurant";
import EditRestaurants from './Pages/EditRestaurants'
import ListRestaurants from './Pages/ListRestaurants'
import NotFound from "./Pages/NotFound";
import Header from './Components/Header'
import Footer from "./Components/Footer";

const AppContext = React.createContext();
const App = () => {

  const [restaurantsList, setRestaurantsList] = React.useState([]);

  return (
    <div className="app">
      <Header />
      <AppContext.Provider value={{ restaurantsList, setRestaurantsList }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<NewRestaurant />} />
          <Route path='/edit/:spotId' element={<EditRestaurants />} />
          <Route path='/list' element={<ListRestaurants />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AppContext.Provider>
      <Footer />
    </div>
  );
}

export { App, AppContext};
