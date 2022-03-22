import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { passwordChecker, emailChecker } from "../utils/validation";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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
  }, [user, isError, isSuccess, message, navigate]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //compolete client-side form validation before sending http POST request to /api/users api enpoint.
    const passwordValidation = passwordChecker(password, password2);
    const emailValidation = emailChecker(email);

    if (!name) return toast.error("Fill in your name, please!");

    if (!emailValidation.success) return toast.error(emailValidation.message);

    if (!passwordValidation.success)
      return toast.error(passwordValidation.message);

    const userData = {
      name: name.trim(),
      email,
      password,
    };
    dispatch(register(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="bg-light text-dark p-5 text-center text-sm-start">
      <div className="container mt-5 main">
        <div className="d-md-flex align-items-center justify-content-between">
          <div className="form">
            <h1>
              <FaUser /> Register
            </h1>
            <p className="lead my-4">
              Register and start posting amazing origami!
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  value={name}
                  placeholder="Please, enter your name."
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Please, enter your emai."
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="Please, enter a passowrd."
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password2"
                  id="password2"
                  value={password2}
                  placeholder="Please, confirm passowrd."
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
            src="./imgs/contemplating.svg"
            alt=""
            style={{ width: "45%" }}
          />
        </div>
      </div>
    </section>
  );
}

export default Register;
