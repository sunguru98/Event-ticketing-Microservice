import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    // The domain is going through ingress-nginx. The format is as follows
    // servicename.namespace.svc.cluster.local
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers
    });
  } else {
    return axios.create({
      baseURL: ""
    });
  }
};
