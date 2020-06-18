import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import buildClient from "../api/buildClient";
import Navbar from "../components/Navbar";

const AppComponent = ({ Component, pageProps, user }) => {
  return (
    <React.Fragment>
      <Navbar user={user} />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </React.Fragment>
  );
};

AppComponent.getInitialProps = async ({ ctx, Component }) => {
  const axios = buildClient(ctx);
  let props = {};
  // Own request.
  try {
    const { data } = await axios.get("/api/users/currentUser");
    props.user = data;
  } catch (err) {
    props.user = null;
  }

  // Respective page request.
  try {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    props.pageProps = pageProps;
  } catch (err) {
    props.pageProps = {};
  }
  return props;
};

export default AppComponent;
