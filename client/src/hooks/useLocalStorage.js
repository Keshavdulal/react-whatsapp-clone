import { useState, useEffect } from 'react';

const PREFIX = "REACT_WHATSAPP_CLONE"

export default function useLocalStorage(key,initialValue) {
  const prefixedKey = PREFIX + key;
  
  const [value, setValue] = useState(() => {
    // using func version of useState
    // as getting data from localStorage is typically slow

    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue != null) return JSON.parse(jsonValue)
    
    // if that doesn't workout then
    if (typeof initialValue === "function") return initialValue()
    else return initialValue
    
  })

  useEffect(() => {
    localStorage.setItem(prefixedKey,JSON.stringify(value))
  }, [prefixedKey, value])
  
  return [value,setValue]

}