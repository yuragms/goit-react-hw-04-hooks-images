// import React, { Component } from "react";
import { useEffect, useState } from 'react';
import SearchBar from "./Searchbar/SearchBar.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageGallery from "./ImageGallery/ImageGallery.jsx";
import Modal from "./Modal/Modal.jsx";
import ButtonMore from "./Button/Button.jsx";
import style from "./App.module.css";
import { Spinner } from "./Loader/Loader.jsx";
import fetchAPI from "./API/API.js";

function App () {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchFieldvalue, setSearchFieldvalue] = useState('');
  const [error, setError] = useState(null);
  const [selectedlargeImageURL, setSelectedlargeImageURL] = useState(null);
  const [taglargeImage, setTaglargeImage] = useState(null);

 

  useEffect(() => {
    if (!searchFieldvalue) {return}
    setLoading(true);

    fetchAPI
    .fetchFirstArr(searchFieldvalue, page)
    .then((data) => {
      if (data.hits.length > 0) {
        console.log(7777);
      } else {
        setError(1);
      }
      setData( prevState => [...prevState, ...data.hits] );
    })
    .then(
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      })
    )
    .catch((error) => setError(error ))
    .finally(() => setLoading( false ));

  }, [searchFieldvalue, page]);

  
 

  const handleClickImage = (largeImage) => {
    const tagObject = data.find((item) => item.largeImageURL === largeImage);

    if (tagObject) {
      const tag = tagObject.tags;
      console.log(tag);
      setSelectedlargeImageURL(largeImage);
      setTaglargeImage(tag);
    }
  };

 
  const handleCloseModal = () => {
    setSelectedlargeImageURL(null);
    setTaglargeImage(null);
  };

  const handleBackdropClose = (e) => {
    if (e.currentTarget === e.target) {
      handleCloseModal();
    }
  };

  const handleFormSubmit = (searchFieldvalue) => {
    setSearchFieldvalue(searchFieldvalue);
    setPage(1);
    setData([]);
    setError(null);
  };

 const  handleClickLoadMore = () => {
    setPage(prevState => prevState + 1 );
  };

  

    const showButton = data.length > 0;
    
    return (
      <div>
        <SearchBar onSubmit={handleFormSubmit} />
        {error && <h1>Нет данных с таким запросом</h1>}
        {loading && <Spinner />}

        {data && <ImageGallery hits={data} onClick={handleClickImage} />}
        {showButton && (
          <div className={style.ModBut}>
            <ButtonMore handleClickLoadMore={handleClickLoadMore} />
          </div>
        )}

        <ToastContainer autoClose={3000} />
        {selectedlargeImageURL && (
          <Modal
            url={selectedlargeImageURL}
            tag={taglargeImage}
            handleBackdropClose={handleBackdropClose}
            handleCloseModal={handleCloseModal}
          />
        )}
      </div>
    );
  
}

export default App;
