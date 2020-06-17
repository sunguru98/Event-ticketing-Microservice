import { useState } from "react";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";

export default () => {
  const [formState, setFormState] = useState({
    name: "",
    password: ""
  });

  const [errors, executeRequest, setErrors] = useRequest({
    body: { ...formState },
    method: "post",
    url: "/api/users/signin"
  });

  const handleChange = e => {
    if (errors[e.target.name] || errors.auth)
      setErrors({ ...errors, [e.target.name]: undefined, auth: null });
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleClick = () => setErrors({ ...errors, auth: null });

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await executeRequest();
    if (data) Router.push("/");
  };

  return (
    <form className="my-5" onSubmit={handleSubmit}>
      <h1 className="mb-3">Welcome back</h1>
      {errors.auth && (
        <div className="alert alert-danger" role="alert">
          {errors.auth}
          <button
            type="button"
            onClick={handleClick}
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          onChange={handleChange}
          name="email"
          type="email"
          className={`form-control ${errors["email"] ? "is-invalid" : ""}`}
          id="email"
          aria-describedby="emailHelp"
          required
        />
        {!errors["email"] ? (
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        ) : (
          errors["email"].map((e, index) => (
            <div key={index} className="invalid-feedback">
              {e}
            </div>
          ))
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          className={`form-control ${errors["password"] ? "is-invalid" : ""}`}
          id="password"
          required
        />
        {errors["password"] &&
          errors["password"].map((e, index) => (
            <div key={index} className="invalid-feedback">
              {e}
            </div>
          ))}
      </div>
      <input type="submit" className="btn btn-primary" value="Signin" />
    </form>
  );
};
