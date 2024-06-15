import { useState } from "react";
import { useCustomer } from "../context/CustomerProvider";
import toast from "react-hot-toast";
import { changePriceRequest } from "../api/clients_api";

function ModalChangePrice() {
  const {
    showModalPrice,
    hiddenModalChangePrice,
    currentPrice,
    getCurrentPrice,
  } = useCustomer();

  const [newPrice, setNewPrice] = useState({ price: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newPrice.price) {
      toast.error(
        (t) => (
          <>
            Porfavor coloque un precio
            <button
              className="ml-2 delete"
              onClick={() => toast.dismiss(t.id)}
            ></button>
          </>
        ),
        {
          className: "notification",
          position: "top-center",
          duration: 5000,
        }
      );
      return;
    }

    const { status } = await changePriceRequest(newPrice);
    if (status === 200) {
      toast(
        (t) => (
          <>
            Precio actualizado correctamente
            <button
              className="ml-2 delete"
              onClick={() => toast.dismiss(t.id)}
            ></button>
          </>
        ),
        {
          className: "notification is-link is-light",
          position: "top-center",
          duration: 5000,
        }
      );
    }
    getCurrentPrice();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPrice({ ...newPrice, [name]: value });
  };

  return (
    <div
      id="modal-js-example"
      className={`modal modal-fx-slideTop ${showModalPrice ? "is-active" : ""}`}
    >
      <div className="modal-background" onClick={hiddenModalChangePrice}></div>

      <div className="modal-content">
        <div className="box">
          <form onSubmit={handleSubmit}>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Precio actual</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <span className="tag is-link is-medium is-light">
                      {currentPrice} $
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Nuevo Precio</label>
              </div>
              <div className="field-body">
                <div className="field has-addons">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="price"
                      value={newPrice.price}
                      onChange={handleChange}
                      placeholder="Nuevo precio a establecer"
                    />
                  </div>
                  <div className="control">
                    <button className="button is-info">Guardar</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={hiddenModalChangePrice}
      ></button>
    </div>
  );
}

export default ModalChangePrice;
