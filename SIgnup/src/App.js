import "./App.css";
import { useFormik } from "formik";
import React from "react";
import Popup from "./components/Popup";

const validate = (values) => {
  const errors = {};

  if (!values.firstname) {
    errors.firstname = "* REQUIRED";
  } else if (values.firstname.length > 8) {
    errors.firstname = "MUST BE LESS THAN 8 CHARACTER";
  }

  if (!values.lastname) {
    errors.lastname = "* REQUIRED";
  } else if (values.lastname.length > 8) {
    errors.lastname = "MUST BE LESS THAN 8 CHARACTER";
  }
  if (!values.email) {
    errors.email = "* REQUIRED";
  } else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(values.email)) {
    errors.email = "INVALID EMAIL";
  }
  if (!values.password) {
    errors.password = "* REQUIRED";
  } else if (values.password.length > 8) {
    errors.password = "MAXIMUM 8 CHARACTER";
  } else if (values.password.length < 4) {
    errors.password = "MINIMUM 4 CHARACTER";
  }
  if (!values.confirmpassword) {
    errors.confirmpassword = "* REQUIRED";
  } else if (values.password !== values.confirmpassword) {
    errors.password = "CONFIRM PASSWORD NOT MATCHED";
  }
  return errors;
};
function App() {
  const [bool, setbool] = React.useState(0);
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      if (bool) {
        setbool(0);
        resetForm({ values: "" });
      } else {
        setbool(1);
        console.log(values);
      }
    },
  });

  return (
    <div className="main">
      <div className="Signup-form">
        <h2>Signup Form</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="First name"
            name="firstname"
            autoComplete="off"
            onChange={formik.handleChange}
            value={formik.values.firstname}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <span>{formik.errors.firstname}</span>
          ) : null}
          <input
            type="text"
            placeholder="Last name"
            name="lastname"
            autoComplete="off"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastname && formik.errors.lastname ? (
            <span>{formik.errors.lastname}</span>
          ) : null}
          <input
            type="text"
            placeholder="Email"
            name="email"
            autoComplete="off"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <span>{formik.errors.email}</span>
          ) : null}
          <input
            type="password"
            placeholder="password"
            name="password"
            autoComplete="off"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <span>{formik.errors.password}</span>
          ) : null}
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmpassword"
            autoComplete="off"
            onChange={formik.handleChange}
            value={formik.values.confirmpassword}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
            <span>{formik.errors.confirmpassword}</span>
          ) : null}
          <input type="submit" value="submit" />
        </form>
      </div>
      <div className="message-box">
        {bool ? <Popup onClick={formik.handleSubmit} /> : null}
      </div>
    </div>
  );
}

export default App;
