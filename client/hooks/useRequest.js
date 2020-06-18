import { useState } from "react";
import axios from "axios";

export default ({ method = "get", url, body = {} }) => {
  const [errors, setErrors] = useState({ auth: null });
  const executeRequest = async () => {
    try {
      const { data } = await axios[method](url, body);
      return data;
    } catch (err) {
      if (err.response === undefined)
        return {
          auth: null,
          errors: {}
        };
      const statusCode = err.response.status;
      if (statusCode === 401) {
        setErrors({
          ...errors,
          auth: "Invalid Credentials"
        });
      } else {
        setErrors({
          ...err.response.data.errors.reduce((acc, { field, message }) => {
            acc = { ...acc, [field]: acc[field] || [] };
            acc[field].push(message);
            return acc;
          }, {}),
          auth: null
        });
      }
      return null;
    }
  };
  return [errors, executeRequest, setErrors];
};
