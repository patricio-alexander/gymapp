import "bulma/css/bulma.min.css";
import "./styles/App.scss";
import "animate.css";

// import "./styles/index.css";
import "bulma-modal-fx/dist/css/modal-fx.min.css";
// import SideBar from "./components/SiderBar";
import ClientTables from "./components/TableClient";
import CustomerAddForm from "./components/CustomerAddForm";
import CustomerEditForm from "./components/CustomerEditForm";
import CustomerCard from "./components/CustomerCard";
import Login from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomerContextProvider } from "./context/CustomerProvider";
import ModalDialog from "./components/ModalDialog";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/Navbar";
//hola

function App() {
  return (
    <AuthProvider>
      <CustomerContextProvider>
        <BrowserRouter>
          <NavBar />
          <Toaster />
          <ModalDialog />
          <CustomerCard />
          <main className="hero  is-fullheight-with-navbar">
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/clientes" element={<ClientTables />} />
                <Route path="/añadir-cliente" element={<CustomerAddForm />} />
                <Route
                  path="/cliente/editar/:customerId"
                  element={<CustomerEditForm />}
                />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </CustomerContextProvider>
    </AuthProvider>
  );
}

export default App;
