import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.valuue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              classsName="form-control"
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
              classsName="form-control"
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
              classsName="form-control"
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
              classsName="form-control"
              name="password2"
              id="password2"
              value={password2}
              placeholder="Please, confirm passowrd."
              onChange={handleChange}
            />
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
