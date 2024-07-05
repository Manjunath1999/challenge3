import React, { useEffect, useState } from 'react';

const Loader = () => {

  return (
    <div className="loader-container">
        <div className="loader">
          <div className="load-inner load-one"></div>
          <div className="load-inner load-two"></div>
          <div className="load-inner load-three"></div>
          <span className="loader-text">Translating</span>
        </div>
    </div>
  );
};

export default Loader;
