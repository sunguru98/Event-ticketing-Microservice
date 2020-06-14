import { useState } from "react";

export default () => {
  const [formState, setFormState] = useState({
    email: "",
    name: "",
    password: ""
  });

  const handleChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Submit");
  };

  return (
    <form className="my-5">
      <h1 className="mb-3">Join us</h1>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          name="name"
          id="name"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          onChange={handleChange}
          name="email"
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control"
          id="password"
        />
      </div>
      <input type="submit" className="btn btn-primary" value="Signup" />
    </form>
  );
};
