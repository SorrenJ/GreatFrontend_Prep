import React, { useState } from "react";



type UseBooleanReturn = {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
    toggle: () => void;
};

export default function useBoolean(initialValue: boolean = false): UseBooleanReturn {
    const [value, setValue] = useState(initialValue);


  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
    const toggle = () => setValue(prev => !prev);
  return { value, setTrue, setFalse, toggle };


}

