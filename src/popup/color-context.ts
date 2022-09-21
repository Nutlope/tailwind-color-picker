import React, { useState, useContext } from 'react';
import { ChromaColor } from './models';

const kDefaultColor = ChromaColor.fromHSV(0, 1, 1);

export const ColorContext = React.createContext({
  color: kDefaultColor,
  setColor: null,
});

export function useColorContextDefault() {
  const [color, setColor] = useState(kDefaultColor);
  return { color, setColor };
}

export function useColorContext() {
  return useContext(ColorContext);
}
