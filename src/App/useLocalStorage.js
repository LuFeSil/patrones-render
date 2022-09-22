import React, { useReducer } from "react";

function useLocalStorage(itemName, initialValue) {
  const [state, dispatch] = useReducer(reducer, initialState({ initialValue }));

  const { synchronizedItem, error, loading, item } = state;

  const onSuccess = (parsedItem) => {
    dispatch({ type: actionTypes.SUCCESS, payload: parsedItem });
  };

  const onError = (error) => {
    dispatch({ type: actionTypes.ERROR, payload: error });
  };

  const onSaveNewItem = (newItem) => {
    dispatch({ type: actionTypes.SAVE, payload: newItem });
  };

  const onSynchronize = () => {
    dispatch({ type: actionTypes.SYNCHRONIZE });
  };

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

        onSuccess(parsedItem);
      } catch (error) {
        onError(error);
      }
    }, 2000);
  }, [synchronizedItem]);

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      onSaveNewItem(newItem);
    } catch (error) {
      onError(error);
    }
  };

  return {
    item,
    saveItem,
    loading,
    error,
    synchronizeItem: onSynchronize,
  };
}

const initialState = ({ initialValue }) => ({
  synchronizedItem: true,
  error: false,
  loading: true,
  item: initialValue,
});

const actionTypes = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  SAVE: "SAVE",
  SYNCHRONIZE: "SYNCHRONIZE",
};

const reducerObject = (state, payload) => ({
  [actionTypes.ERROR]: {
    ...state,
    error: true,
  },
  [actionTypes.SUCCESS]: {
    ...state,
    loading: false,
    synchronizedItem: true,
    item: payload,
  },
  [actionTypes.SAVE]: {
    ...state,
    item: payload,
  },
  [actionTypes.SYNCHRONIZE]: {
    ...state,
    synchronizedItem: false,
    loading: true,
  },
});

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

export { useLocalStorage };
