import { FaRegAddressCard, FaMobileAlt } from "react-icons/fa";
import { useCustomer } from "../context/CustomerProvider";
import { useState, useEffect } from "react";

function CustomerCard() {
  const { showCard, customer, hiddenCustomerCard } = useCustomer();

  const [photoUrl, setPhotoUrl] = useState(null);

  const formatDate = (date) => {
    const completeDate = new Date(date);
    const day = completeDate.getDate().toString().padStart(2, "0");
    const month = (completeDate.getMonth() + 1).toString().padStart(2, "0");
    const year = completeDate.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    setPhotoUrl(`http://localhost:3000/photos/${customer.photo}`);
    // console.log(customer);
  }, [customer]);

  return (
    <div className={`modal modal-fx-slideTop  ${showCard ? "is-active" : ""}`}>
      <div className="modal-background" onClick={hiddenCustomerCard}></div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={hiddenCustomerCard}
      ></button>

      <div className="modal-content">
        <div className="card">
          <header className="card-header is-flex is-align-items-center">
            <p className="card-header-title">PERFIL</p>
          </header>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image">
                  <img src={photoUrl} alt="Placeholder image" />
                </figure>
              </div>

              <div className="media-content">
                <h4 className="title is-4">
                  {customer.names} {customer.lastnames}
                </h4>
                <p className="subtitle is-6">
                  @{customer.names}
                  {customer.lastnames}
                </p>

                <p className="mb-3">
                  <span className="icon-text">
                    <span className="icon">
                      <FaRegAddressCard />
                    </span>
                    <span>{customer.dni}</span>
                  </span>
                </p>

                <p>
                  <span className="icon-text">
                    <span className="icon">
                      <FaMobileAlt />
                    </span>
                    <span>{customer.phone}</span>
                  </span>
                </p>
              </div>
            </div>
            <div className="box has-background-light is-flex is-flex-direction-column">
              <div className="mb-2">
                <p>
                  <strong>Fecha de pago</strong>:{" "}
                  {formatDate(customer.startDate)}
                </p>
              </div>
              <div className="mb-2">
                <p>
                  <strong>Expiración</strong>: {formatDate(customer.endingDate)}
                </p>
              </div>
              <div className="mb-2">
                <p>
                  <strong>Pago</strong>: {customer.amount} $
                </p>
              </div>
              <div className="">
                <p>
                  <strong>Duración</strong>: {customer.duration} días
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default CustomerCard;
