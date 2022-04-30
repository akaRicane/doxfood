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

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<NewRestaurant />} />
        <Route path='/edit' element={<EditRestaurants />} />
        <Route path='/list' element={<ListRestaurants />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
