import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Login and Start posting awesome origami tuturials!</p>
      </section>

      <section className="form">
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
      </section>
    </>
  );
}

export default Login;
