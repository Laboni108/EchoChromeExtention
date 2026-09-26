import { useState, useEffect, useRef } from "react";

export function useChromeStorage(key, defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const [loaded, setLoaded] = useState(false);
  const isFirstWrite = useRef(true);

  // Load once on mount
  useEffect(() => {
    chrome.storage.local.get([key], (result) => {
      if (result[key] !== undefined) {
        setValue(result[key]);
      }
      setLoaded(true);
    });
  }, [key]);

  // Save whenever value changes (skip the very first render's write)
  useEffect(() => {
    if (isFirstWrite.current) {
      isFirstWrite.current = false;
      return;
    }
    chrome.storage.local.set({ [key]: value });
  }, [key, value]);

  return [value, setValue, loaded];
}