import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiTrash2,
  FiUserPlus,
  FiEdit,
  FiEye,
} from "react-icons/fi";
import { useEffect } from "react";
import { useCustomer } from "../context/CustomerProvider";
function ClientTables() {
  const { isAuthenticated } = useAuth();
  const {
    customers,
    currentPage,
    totalPages,
    search,
    setSearch,
    nextPage,
    prevPage,
    fetchClients,
    iWantRemoveCustomer,
    initialStateForm,
    setForm,
    setFile,
    showCustomerCard,
    currentPrice,
  } = useCustomer();

  useEffect(() => {
    setForm(initialStateForm);

    setFile("");
  }, []);

  useEffect(() => {
    fetchClients();
  }, [currentPage, search]);

  const columns = [
    "Cliente",
    "Cédula",
    "Monto",
    "Duración",
    "Descripción",
    "Acciones",
  ];
  const navigate = useNavigate();

  return (
    <>
      <div className="section">
        <div className="m-2 is-flex  is-align-items-center">
          <span className="mr-5">
            pagina {currentPage + 1} de {totalPages}
          </span>
          <nav className="field has-addons ml-3 ">
            <p className="control">
              <button className="button is-ghost">
                <span className="icon is-size-5">
                  <FiChevronsLeft />
                </span>
              </button>
            </p>
            <p className="control">
              <button
                className="button is-ghost "
                onClick={prevPage}
                disabled={!currentPage}
              >
                <span className="icon is-size-5">
                  <FiChevronLeft />
                </span>
              </button>
            </p>
            <p className="control">
              <button
                className="button is-ghost"
                onClick={nextPage}
                disabled={currentPage + 1 === totalPages}
              >
                <span className="icon is-size-5">
                  <FiChevronRight />
                </span>
              </button>
            </p>
            <p className="control">
              <button className="button is-ghost">
                <span className="icon is-size-5">
                  <FiChevronsRight />
                </span>
              </button>
            </p>
          </nav>
        </div>
        <div className="box">
          <div className="columns  d-flex is-align-items-center">
            <p className="has-text-weight-bold column is-7 is-size-4">
              Clientes
            </p>

            <Link to="/añadir-cliente">
              <button className="button is-success is-light m-3">
                <span className="icon has-text-success is-size-4 is-clickable">
                  <FiUserPlus />
                </span>
                <span className="has-text-success">Agregar</span>
              </button>
            </Link>
            <input
              className="p-3 column input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Buscar por cédula"
            />
          </div>

          <div className="table-container">
            <table className="table is-fullwidth">
              <thead className="is-borderless">
                <tr>
                  {columns.map((head, index) => (
                    <th key={index} className="">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.customerId}>
                    <td>{customer.fullname}</td>
                    <td>{customer.dni}</td>
                    <td>{customer.amount}$</td>
                    <td>{customer.duration} días</td>
                    <td>
                      {customer.amount >= currentPrice ? (
                        <span className="tag is-success is-light is-normal is-size-6">
                          Pagado
                        </span>
                      ) : (
                        <span className="tag is-warning is-light is-normal is-size-6">
                          Debe {currentPrice - customer.amount} $
                        </span>
                      )}
                    </td>

                    <td className="is-flex  is-align-items-center">
                      <span
                        className="icon has-text-danger is-size-5 is-clickable"
                        onClick={() => iWantRemoveCustomer(customer)}
                      >
                        <FiTrash2 />
                      </span>

                      <span
                        className="icon has-text-warning is-size-5 is-clickable ml-3"
                        onClick={() =>
                          navigate(`/cliente/editar/${customer.customerId}`)
                        }
                      >
                        <FiEdit />
                      </span>

                      <span
                        className="icon has-text-info is-size-5 is-clickable ml-3"
                        onClick={() => showCustomerCard(customer)}
                      >
                        <FiEye />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientTables;
