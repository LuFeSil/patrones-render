import React from "react";

function useLocalStorage(itemName, initialValue) {
  const [synchronizedItem, setSynchronizedItem] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [item, setItem] = React.useState(initialValue);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        setItem(parsedItem);
        setLoading(false);
        setSynchronizedItem(true);
      } catch (error) {
        setError(error);
      }
    }, 3000);
  }, [synchronizedItem]);

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
    } catch (error) {
      setError(error);
    }
  };

  const synchronizeItem = () => {
    setLoading(true);
    setSynchronizedItem(false);
  };

  return {
    item,
    saveItem,
    loading,
    error,
    synchronizeItem,
  };
}

export { useLocalStorage };
