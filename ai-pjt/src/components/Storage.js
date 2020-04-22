import React from 'react';

export const Storage = React.createContext(
  {
    imgFile: '',
    imgURL: '',
    imgUpload: () => {},
    backToMain: () => {},

    innerW: 0,
    innerH: 0,

    curMode: '',
    changeMode: () => {},

    confirmToOrigin: () => {},

    
  }
);