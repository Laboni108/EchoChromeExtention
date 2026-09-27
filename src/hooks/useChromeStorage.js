import { useState, useEffect, useRef } from "react";

const hasChromeStorage =
  typeof chrome !== "undefined" && chrome.storage && chrome.storage.local;

export function useChromeStorage(key, defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const [loaded, setLoaded] = useState(false);
  const isFirstWrite = useRef(true);

  useEffect(() => {
    if (hasChromeStorage) {
      chrome.storage.local.get([key], (result) => {
        if (result[key] !== undefined) setValue(result[key]);
        setLoaded(true);
      });
    } else {
      // Fallback for running as a plain webpage (e.g. Vercel demo)
      try {
        const stored = localStorage.getItem(key);
        if (stored !== null) setValue(JSON.parse(stored));
      } catch (e) {
        console.warn("localStorage read failed:", e);
      }
      setLoaded(true);
    }
  }, [key]);

  useEffect(() => {
    if (isFirstWrite.current) {
      isFirstWrite.current = false;
      return;
    }
    if (hasChromeStorage) {
      chrome.storage.local.set({ [key]: value });
    } else {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn("localStorage write failed:", e);
      }
    }
  }, [key, value]);

  return [value, setValue, loaded];
}