import buildClient from "../api/buildClient";

const LandingPage = ({ user }) => {
  return <h1>You are {!user ? "not" : ""} signed in</h1>;
};

LandingPage.getInitialProps = async context => {
  const axios = buildClient(context);
  try {
    const { data } = await axios.get("/api/users/currentUser");
    return { user: data };
  } catch (err) {
    return { user: null };
  }
};

export default LandingPage;
