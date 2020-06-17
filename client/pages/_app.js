import "bootstrap/dist/css/bootstrap.css";

export default ({ Component, pageProps }) => (
  <div className="container">
    <Component {...pageProps} />
  </div>
);
