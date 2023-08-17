import { useContext, useEffect, useState } from "react";
import {
  getCustomersRequest,
  removeCustomerRequest,
  searchCustomerRequest,
  getOneCustomerRequest,
  updataCustomerDataRequest,
  addCustomerRequest,
  getCurrentPriceRequest,
} from "../api/clients_api";

import { createContext } from "react";

import toast from "react-hot-toast";

const CustomerContext = createContext();

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error(
      "useCustomer debe usarse dentro de un CustomerContextProvider"
    );
  }

  return context;
};

export const CustomerContextProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});
  const initialStateForm = {
    dni: "",
    names: "",
    lastnames: "",
    phone: "",
    amount: "",
    startDate: "",
    duration: "",
    endingDate: "",
    photo: "",
  };
  const [file, setFile] = useState("");
  const [form, setForm] = useState(initialStateForm);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [removeCustomerById, setRemoveCustomerDni] = useState(0);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [showDialog, setShowDialog] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const iWantRemoveCustomer = (customer) => {
    setShowDialog(true);
    setNotification({
      message: `¿Desea elminar a ${customer.fullname}?`,
      type: "warning",
    });
    setRemoveCustomerDni(customer.customerId);
  };

  const showCustomerCard = (customer) => {
    setShowCard(true);
    setCustomer(customer);
  };

  const hiddenCustomerCard = () => setShowCard(false);

  const resetForm = () => {
    setForm(initialStateForm);
    setFile("");
  };

  const addCustomer = async (data) => {
    const fullFormData = new FormData();
    Object.entries(data).forEach(([key, value]) =>
      fullFormData.append(key, value)
    );
    // console.log(data);

    const {
      data: { existCustomer },
    } = await addCustomerRequest(fullFormData);
    if (!existCustomer) {
      resetForm();
      toast(
        (t) => (
          <>
            Cliente agregado con éxito
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
          icon: "✅",
        }
      );
      return;
    }

    toast.error(
      (t) => (
        <>
          El cliente con cédula {form.dni} ya se encuentra en la lista de
          clientes, no es posible agregarlo nuevamente.
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
        icon: "⚠️",
      }
    );
  };

  const updateCustomerData = async (data, id) => {
    const fullFormData = new FormData();
    Object.entries(data).forEach(([key, value]) =>
      fullFormData.append(key, value)
    );
    const { status } = await updataCustomerDataRequest(fullFormData, id);
    if (status === 200) {
      toast(
        (t) => (
          <>
            Datos actualizados correctamente
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
  };

  const getCurrentPrice = async () => {
    try {
      const {
        data: [{ currentPrice }],
      } = await getCurrentPriceRequest();
      setCurrentPrice(currentPrice);
    } catch (error) {
      console.log(error);
    }
  };

  const removeCustomer = async () => {
    try {
      removeCustomerRequest(removeCustomerById);
      setCustomers(
        customers.filter(
          (customer) => customer.customerId !== removeCustomerById
        )
      );
      setShowDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getOneCustomer = async (customerId) => {
    try {
      const { data } = await getOneCustomerRequest(customerId);
      setCustomer(data[0]);
      setForm(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const hiddenModalDialog = () => setShowDialog(false);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const loadCustomers = async () => {
    try {
      const { data } = await getCustomersRequest(currentPage + 1);
      setCustomers(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error.message);
    }
  };

  const searchClient = async () => {
    const { data } = await searchCustomerRequest(search, currentPage + 1);
    setCurrentPage(0);
    setCustomers(data.items);
    setTotalPages(data.totalPages);
  };

  const fetchClients = () => {
    !search ? loadCustomers() : searchClient();
  };



  return (
    <CustomerContext.Provider
      value={{
        addCustomer,
        nextPage,
        showCard,
        file,
        hiddenCustomerCard,
        setFile,
        prevPage,
        fetchClients,
        setSearch,
        iWantRemoveCustomer,
        showCustomerCard,
        removeCustomer,
        hiddenModalDialog,
        getOneCustomer,
        updateCustomerData,
        setForm,
        initialStateForm,
        form,
        customers,
        currentPage,
        totalPages,
        search,
        notification,
        currentPrice,
        showDialog,
        customer,
        getCurrentPrice,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
