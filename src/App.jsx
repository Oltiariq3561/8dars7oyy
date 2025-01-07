import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Details from './pages/Details';
import Likes from './pages/Likes';
import https from './axios';

function App() {  
  useEffect(() => {
    https.get('featured-playlists')
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/playlist/:id" element={<Details />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
