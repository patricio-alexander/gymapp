import { useEffect, useState } from "react";
import { planDuration } from "../helpers/date.js";
import { useParams, Link } from "react-router-dom";
import { useCustomer } from "../context/CustomerProvider.jsx";
import { FiArrowLeft, FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";

function CustomerForm() {
  const [isDesabled, setDisabled] = useState(true);

  const { customerId } = useParams();
  const {
    getOneCustomer,
    form,
    setForm,
    addCustomer,
    updateCustomerData,
    currentPrice,
    getCurrentPrice,
    file,
    setFile,
  } = useCustomer();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const { formattedDateFinal, formattedDateInitial, durationInDays } =
    // planDuration({ price: form.amount });

    if (!customerId && !file) {
      toast.error(
        (t) => (
          <>
            Porfavor coloque una foto al cliente
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

    const { durationInDays, formattedDateInitial, formattedDateFinal } =
      planDuration({
        initialDate: form.startDate,
        price: form.amount,
        currentPrice,
      });

    if (!customerId) {
      await addCustomer({
        ...form,
        startDate: formattedDateInitial,
        endingDate: formattedDateFinal,
        duration: durationInDays,
        photo: file,
      });

      return;
    }

    // console.log("formatedad", formattedDateInitial, "no formateada", form.startDate);
    updateCustomerData(
      {
        ...form,
        startDate: formattedDateInitial,
        endingDate: formattedDateFinal,
        duration: durationInDays,
        photo: file,
      },
      customerId
    );
  };

  const formValidation = () => {
    const isDniValid = form.dni.length === 10;
    const isCustomerNameValid = form.names.length >= 3;
    const isCustomerLastnameValid = form.lastnames.length >= 4;
    const isCustomerPhoneValid = form.phone.length === 10;
    const isAmountValid = form.amount;
    // const isDateValid = formatDate(form.startDate).length === 10;
    const completed =
      isDniValid &&
      isCustomerNameValid &&
      isCustomerLastnameValid &&
      isCustomerPhoneValid &&
      isAmountValid;
    // isDateValid;
    setDisabled(!completed);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    getCurrentPrice();
  }, []);

  useEffect(() => {
    formValidation();
    formatDate(form.startDate);
  }, [form]);

  useEffect(() => {
    if (customerId) {
      getOneCustomer(customerId);
    }
  }, []);

  // const photo = `http://localhost:3000/photos/${form.photo}`

  const imageUrl = file
    ? URL.createObjectURL(file)
    : customerId
    ? `http://localhost:3000/photos/${form.photo}`
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhf14RWxf6GFrK2A8CyOoXn4SEpZSBxuWOCs_T-A5peKF-fIpF&s";

  return (
    <div className="box">
      <Link className="icon-text mb-3" to="/clientes">
        <span className="icon is-size-5">
          <FiArrowLeft />
        </span>
      </Link>

      <h1 className="has-text-weight-medium is-size-5">
        {customerId ? "Actualizar" : "Agregar"}
      </h1>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="columns">
          <div className="column">
            {/* <div className="field has-name">
              <label className="label">Foto</label>
              <div className="file is-info has-name">
                <label className="file-label">
                  <input
                    className="file-input"
                    type="file"
                    name="photo"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <span className="file-cta">
                    <span className="file-icon">
                      <FiFilePlus />
                    </span>
                    <span className="file-label">
                      {customerId ? "Cambiar " : "Añadir"}
                    </span>
                  </span>
                  <span className="file-name">
                    {file ? file.name : "Ninguna foto cargada"}
                  </span>
                </label>
              </div>
            </div> */}
            {/* <div className="field">
              <div className="field-label">
                <label htmlFor="file" className="label">
                  Imagen:
                </label>
              </div>
              <div className="field-body is-flex is-align-items-center">
                <label htmlFor="file">
                  <FiUpload className="is-clickable" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              
            </div> */}

            <div className="field">
              <label className="label">Imagen</label>
              <div className="control">
                <div className="file is-white">
                  <label className="file-label">
                    <input
                      type="file"
                      className="file-input"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <FiUpload />
                      </span>
                      <span className="file-label">
                        {!file.name ? "Ninguna foto cargada" : file.name}
                      </span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label ">Cédula</label>
              <div className="control">
                <input
                  className={`input ${
                    form.dni.length === 10 ? "is-success" : "is-danger"
                  }`}
                  type="text"
                  name="dni"
                  maxLength="10"
                  value={form.dni}
                  onChange={handleChange}
                />
                {form.dni.length === 10 ? (
                  <p className="help is-success">Campo completado</p>
                ) : (
                  <p className="help is-danger">Ingrese la cedula</p>
                )}
              </div>
            </div>
            <div className="field">
              <label className="label ">Nombres</label>
              <div className="control">
                <input
                  className={`input ${
                    form.names.length >= 3 ? "is-success" : "is-warning"
                  }`}
                  placeholder="John Alexander"
                  name="names"
                  type="text"
                  value={form.names}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label ">Apellido</label>
              <div className="control">
                <input
                  className={`input ${
                    form.lastnames.length >= 4 ? "is-success" : "is-warning"
                  }`}
                  placeholder="Smith Guiel"
                  type="text"
                  value={form.lastnames}
                  name="lastnames"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="column">
            <div className="field">
              <label className="label ">Teléfono</label>
              <div className="control">
                <input
                  className={`input ${
                    form.phone.length == 10 ? "is-success" : "is-warning"
                  }`}
                  type="text"
                  name="phone"
                  maxLength="10"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label ">Monto</label>
              <div className="control">
                <div className="field has-addons">
                  <p className="control">
                    <a className="button is-static">$</a>
                  </p>
                  <p className="control">
                    <input
                      className="input"
                      placeholder="Monto"
                      name="amount"
                      onChange={handleChange}
                      value={form.amount}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label ">Fecha</label>
              <div className="control">
                <input
                  className={`input ${
                    formatDate(form.startDate).length === 10
                      ? "is-success"
                      : "is-warning"
                  }`}
                  type="date"
                  name="startDate"
                  maxLength="10"
                  value={formatDate(form.startDate)}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <span className="tag is-info is-light">
                Valor actual del mes {currentPrice}$
              </span>
            </div>
          </div>

          <div className="column">
            <div className="field is-flex is-align-items-center is-justify-content-center">
              <figure className="image">
                <img src={imageUrl} />
              </figure>
            </div>
          </div>
        </div>

        <button className="button is-primary " disabled={isDesabled}>
          {customerId ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </div>
  );
}

export default CustomerForm;
