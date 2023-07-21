import { FiLock, FiUser } from "react-icons/fi";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { signin, errors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.target));
    signin(data);

  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/clientes");
    }
  }, [isAuthenticated]);

  return (
    <section className="hero is-fullheight is-dark-1">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form
                action=""
                className="box animate__animated animate__fadeInDown"
                onSubmit={submitHandler}
              >
                {errors.message ? (
                  <div className="notification is-danger">
                    {errors.message}
                  </div>
                ) : (
                  ""
                )}
                <div className="field">
                  <label className="label">Usuario</label>
                  <div className="control has-icons-left">
                    <input
                      type="text"
                      placeholder="e.g. bobsmith@gmail.com"
                      className="input"
                      name="username"
                      required
                    />
                    <span className="icon is-small is-left">
                      <FiUser />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Contraseña</label>
                  <div className="control has-icons-left">
                    <input
                      type="password"
                      name="password"
                      placeholder="*******"
                      className="input"
                      required
                    />
                    <span className="icon is-small is-left">
                      <FiLock />
                    </span>
                  </div>
                </div>

                <div className="field">
                  <button className="button is-success">Entrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
