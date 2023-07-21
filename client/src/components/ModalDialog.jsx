import { useCustomer } from "../context/CustomerProvider";
import { FiTrash2, FiX } from "react-icons/fi";

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
      <button className="modal-close is-large" aria-label="close" onClick={hiddenModalDialog}></button>
      <div className="modal-content">
        <div className={`box notification is-${type} is-light`}>
         
          <div className="media">
            {/* <div className="media-left">
              <figure className="image">
                <img
                  src="https://bulma.io/images/placeholders/128x128.png"
                  alt="Image"
                />
              </figure>
            </div> */}
            <div className="media-content">
              <div className="content">
                <p className="is-size-5">{message}</p>
              </div>
              <div className="buttons">
                <button
                  className="button is-danger is-outlined"
                  onClick={removeCustomer}
                >
                  <span className="icon is-small">
                    <FiTrash2 />
                  </span>
                  <span>Eliminar</span>
                </button>

                <button
                  className="button is-info is-outlined"
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
