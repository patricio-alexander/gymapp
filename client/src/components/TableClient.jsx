import { Link, useNavigate } from "react-router-dom";
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

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

import { BiMoney } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useCustomer } from "../context/CustomerProvider";
import { checkExpiration } from "../helpers/date";
import ModalChangePrice from "./ModalChangePrice";
function ClientTables() {
  const [sort, setSort] = useState([]);
  const [filter, setFilter] = useState("");

  const columns2 = [
    {
      header: "#",
      cell: (props) => props.row.index + 1,
    },
    { header: "Cédula", accessorKey: "dni" },
    { header: "Nombres", accessorKey: "names" },

    {
      header: "Descripcion",
      accessorKey: "amount",
      cell: (props) => (
        <>
          {/* {console.log(props.row.original)} */}
          {props.row.original.amount >= currentPrice ? (
            <span className="tag is-success is-light is-normal is-size-6">
              Pagado
            </span>
          ) : (
            <span className="tag is-warning is-light is-normal is-size-6">
              Debe {currentPrice - props.row.original.amount} $
            </span>
          )}
        </>
      ),
    },
    {
      header: "Expira",
      accessorKey: "endingDate",
      cell: (props) => {
        const { expired, remainingTime, elapsedAfterExpiration } =
          checkExpiration(props.row.original.endingDate);

        return (
          <>
            {expired ? (
              <span className="tag is-warning is-light is-normal is-size-6">
                {elapsedAfterExpiration}
              </span>
            ) : (
              <span className="tag is-success is-light is-normal is-size-6">
                {remainingTime}
              </span>
            )}
          </>
        );
      },
    },
    {
      header: "Accion",
      cell: (props) => (
        <div className="is-flex  is-align-items-center">
          <span
            className="icon has-text-danger is-size-5 is-clickable"
            onClick={() => iWantRemoveCustomer(props.row.original)}
          >
            <FiTrash2 />
          </span>

          <span
            className="icon has-text-warning is-size-5 is-clickable ml-3"
            onClick={() =>
              navigate(`/cliente/editar/${props.row.original.customerId}`)
            }
          >
            <FiEdit />
          </span>

          <span
            className="icon has-text-info is-size-5 is-clickable ml-3"
            onClick={() => showCustomerCard(props.row.original)}
          >
            <FiEye />
          </span>
        </div>
      ),
    },
  ];

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
    getCurrentPrice,
    currentPrice,
    showModalChangePrice,
  } = useCustomer();

  useEffect(() => {
    setForm(initialStateForm);
    setFile("");
  }, []);

  useEffect(() => {
    getCurrentPrice();
  }, []);

  useEffect(() => {
    fetchClients();
  }, [currentPage, search]);

  const navigate = useNavigate();

  // console.log(customers)

  const table = useReactTable({
    data: customers,
    columns: columns2,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sort,
      globalFilter: filter,
    },
    onSortingChange: setSort,
    onGlobalFilterChange: setFilter,
    // columns
  });

  return (
    <>
      <ModalChangePrice />
      <div className="section">
        <div className="m-2 is-flex is-align-items-center">
          <span className="mr-5">
            {!table.getPageCount() > 1 || !customers.length ? (
              <>Paginas no disponibles</>
            ) : (
              <>
                pagina {table.getState().pagination.pageIndex + 1} de{" "}
                {table.getPageCount()}
              </>
            )}
          </span>
          <nav className="field has-addons ml-3 ">
            <p className="control">
              <button
                className="button is-ghost"
                onClick={() => table.setPageIndex(0)}
                disabled={!customers.length}
              >
                <span className="icon is-size-5">
                  <FiChevronsLeft />
                </span>
              </button>
            </p>
            <p className="control">
              <button
                className="button is-ghost "
                onClick={() => table.previousPage()}
                disabled={!customers.length}
              >
                <span className="icon is-size-5">
                  <FiChevronLeft />
                </span>
              </button>
            </p>
            <p className="control">
              <button
                className="button is-ghost"
                onClick={() => table.nextPage()}
                disabled={
                  table.getState().pagination.pageIndex + 1 ===
                    table.getPageCount() || !customers.length
                }
              >
                <span className="icon is-size-5">
                  <FiChevronRight />
                </span>
              </button>
            </p>
            <p className="control">
              <button
                className="button is-ghost"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={
                  table.getState().pagination.pageIndex + 1 ===
                  table.getPageCount() || !customers.length
                }
              >
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
            <button
              className="button is-info is-light m-3"
              onClick={showModalChangePrice}
            >
              <span className="icon has-text-info is-size-4 is-clickable">
                <BiMoney />
              </span>
              <span className="has-text-info">Cambiar Precio</span>
            </button>
            <Link to="/añadir-cliente">
              <button className="button is-link is-light m-3">
                <span className="icon has-text-link is-size-4 is-clickable">
                  <FiUserPlus />
                </span>
                <span className="has-text-link">Agregar</span>
              </button>
            </Link>

            <input
              className="p-3 column input"
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Buscar"
            />
          </div>
          <div className="table-container">
            <table className="table is-fullwidth">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>{header.column.columnDef.header}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <div className="section">
        <div className="m-2 is-flex  is-align-items-center">
          <span className="mr-5">
            {!totalPages ? (
              <>Paginas no disponibles</>
            ) : (
              <>
                pagina {currentPage + 1} de {totalPages}
              </>
            )}
          </span>
          

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
                {customers.map((customer) => {
                  const { expired, remainingTime, elapsedAfterExpiration } =
                    checkExpiration(customer.endingDate);
                  return (
                    <tr key={customer.customerId}>
                      <td>{customer.fullname}</td>
                      <td>{customer.dni}</td>
                      <td>{customer.amount}$</td>
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
                      <td>
                        {expired ? (
                          <span className="tag is-warning is-light is-normal is-size-6">
                            {elapsedAfterExpiration}
                          </span>
                        ) : (
                          <span className="tag is-success is-light is-normal is-size-6">
                            {remainingTime}
                          </span>
                        )}
                      </td>

                      <td className="is-flex  is-align-items-center">
                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default ClientTables;
