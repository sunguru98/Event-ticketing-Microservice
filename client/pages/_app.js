import "bootstrap/dist/css/bootstrap.css";

export default ({ Component, props }) => (
  <div className="container">
    <Component {...props} />
  </div>
);
