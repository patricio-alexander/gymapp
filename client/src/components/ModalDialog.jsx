import { useCustomer } from "../context/CustomerProvider";
import { FiTrash2, FiUserMinus, FiX } from "react-icons/fi";

function ModalDialog() {
  const {
    hiddenModalDialog,
    showDialog,
    removeCustomer,
    notification: { message, type },
  } = useCustomer();

  return (
    <div className={`modal modal-fx-slideTop ${showDialog ? "is-active" : ""}`}>
      <div className="modal-background" onClick={hiddenModalDialog}></div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={hiddenModalDialog}
      ></button>
      <div className="modal-content">
        <div className={`box notification is-light`}>
          <div className="media">
            <div className="media-content">
              <div className="is-flex is-justify-content-center is-align-items-center is-flex-direction-column">
                <span
                  className={`icon ${type === "danger" ? "has-text-danger" : ""}`}
                >
                  <FiUserMinus size={50} />
                </span>
                <div className="content m-3">
                  <p
                    className={`is-size-5 ${
                      type === "danger" ? "has-text-danger" : ""
                    }`}
                  >
                    {message}
                  </p>
                </div>
              </div>
              <div className="buttons is-flex is-justify-content-center">
                <button
                  className="button is-danger is-outlined is-fullwidth"
                  onClick={removeCustomer}
                >
                  <span className="icon is-small">
                    <FiTrash2 />
                  </span>
                  <span>Eliminar</span>
                </button>

                <button
                  className="button is-info is-outlined is-fullwidth"
                  onClick={hiddenModalDialog}
                >
                  <span className="icon is-small">
                    <FiX />
                  </span>
                  <span>Cancelar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDialog;
