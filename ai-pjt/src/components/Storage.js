import React from 'react';

export const Storage = React.createContext(
  {
    innerW: 0,
    innerH: 0,

    imgFile: '',
    imgURL: '',
    imgList: [],
    imgUpload: () => {},
    imgInit: () => {},

    backToMain: () => {},

    curMode: '',
    changeMode: () => {},

    confirm: () => {},
  }
);