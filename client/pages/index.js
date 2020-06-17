import buildClient from "../api/buildClient";

const LandingPage = ({ user }) => {
  console.log(user);
  return <h1>You are {!user ? "not" : ""} signed in</h1>;
};

LandingPage.getInitialProps = async context => {
  try {
    const { data } = await buildClient(context).get("/api/users/currentUser");
    return { user: data };
  } catch (err) {
    return { user: null };
  }
};

export default LandingPage;
