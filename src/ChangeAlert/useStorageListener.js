import { useState } from "react";

function useStorageListener(synchronizeTodos) {
  const [storageChange, setStorageChange] = useState(false);

  const onStorageChange = (change) => {
    if (change.key === "TODOS_V1") {
      setStorageChange(true);
    }
  };

  window.addEventListener("storage", onStorageChange);

  const toggleShow = () => {
    synchronizeTodos();
    setStorageChange(false);
  };

  return { show: storageChange, toggleShow: toggleShow };
}

export { useStorageListener };
