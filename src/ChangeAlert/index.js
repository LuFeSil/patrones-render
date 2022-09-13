import React from "react";
import { useStorageListener } from "./useStorageListener";

function ChangeAlert({ synchronizeTodos }) {
  const { show, toggleShow } = useStorageListener(synchronizeTodos);
  if (show) {
    return (
      <div>
        <p>Hubo cambios</p>
        <button
          onClick={() => {
            toggleShow(false);
          }}
        >
          Re cargar la información
        </button>
      </div>
    );
  } else {
    return null;
  }
}

export { ChangeAlert };
