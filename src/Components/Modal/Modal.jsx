// import React, { Component } from "react";
import { useEffect } from 'react';
import style from "./Modal.module.css";
import PropTypes from "prop-types";

function Modal ({url, tag, handleCloseModal, handleBackdropClose}) {
  
useEffect(()=> {
document.addEventListener("keydown", handleEscClose);

return () => {
  document.removeEventListener("keydown", handleEscClose);
};
});


 const handleEscClose = (e) => {
    if (e.code === "Escape") {
      handleCloseModal();
    }
  };

  
    
    return (
      <div className={style.Overlay} onClick={(e) => handleBackdropClose(e)}>
        <div className={style.Modal}>
          <img src={url} alt={tag} />
        </div>
      </div>
    );
  
}

Modal.propTypes = {
  url: PropTypes.string,
  tag: PropTypes.string,
  handleBackdropClose: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

export default Modal;
