import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { passwordChecker, emailChecker } from "../utils/validation";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //compolete client-side form validation before sending http POST request to /api/users api enpoint.
    const passwordValidation = passwordChecker(password);
    const emailValidation = emailChecker(email);

    if (!emailValidation.success) return toast.error(emailValidation.message);

    if (!passwordValidation.success)
      return toast.error(passwordValidation.message);

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="bg-light text-dark p-5 text-center text-sm-start mt-5">
      <div className="container mt-5 main">
        <div className="d-md-flex align-items-center justify-content-between">
          <div className="form">
            <h1>
              <FaSignInAlt />
              Login
            </h1>
            <p className="lead my-4">Please login.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Enter your email."
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="Enter your password."
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-block">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <img
            className="img-fluid d-none d-md-block"
            src="./imgs/rabbit4.png"
            alt=""
            style={{ width: "45%" }}
          />
        </div>
      </div>
    </section>
  );
}

export default Login;
