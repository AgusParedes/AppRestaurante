import { useState } from "react";
import "./Table.scss";

function Table({ table }) {

  const [tableState, setTableState] = useState(table.state);
  const [showModal, setShowModal] = useState(false);

  function changeState(newState) {
    console.log("Mesa:", table.id);
    console.log("Nuevo estado:", newState);

    setTableState(newState);
    setShowModal(false);
  }

  return (
    <>
      <div
        className={`Table ${tableState}`}
        style={{
          left: `${table.x}px`,
          top: `${table.y}px`
        }}
        onClick={() => setShowModal(true)}
      >
        {table.id}
      </div>

      {showModal && (
        <div
          className="modalOverlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="modalContent"
            onClick={(e) => e.stopPropagation()}
          >

            <h2>Mesa {table.id}</h2>

            <div className="options">

              <button
                type="button"
                onClick={() => changeState("libre")}
              >
                Libre
              </button>

              <button
                type="button"
                onClick={() => changeState("ocupada")}
              >
                Ocupada
              </button>

              <button
                type="button"
                onClick={() => changeState("pendiente")}
              >
                Pendiente
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default Table;