import { useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

export default () => {
  const [, executeRequest] = useRequest({
    method: "delete",
    url: "/api/users/signout"
  });

  const perform = async () => {
    const data = await executeRequest();
    data && Router.push("/");
  };

  useEffect(() => {
    perform();
  }, []);

  return (
    <div className="contanier">
      <h3>Signing you out</h3>{" "}
    </div>
  );
};
