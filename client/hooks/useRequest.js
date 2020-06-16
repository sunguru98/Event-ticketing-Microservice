import { useState } from "react";
import axios from "axios";

export default ({ method, url, body }) => {
  const [errors, setErrors] = useState({});
  const executeRequest = async () => {
    try {
      const { data } = await axios[method](url, body);
      return data;
    } catch (err) {
      setErrors(
        err.response.data.errors.reduce((acc, { field, message }) => {
          acc = { ...acc, [field]: acc[field] || [] };
          acc[field].push(message);
          return acc;
        }, {})
      );
      return null;
    }
  };
  return [errors, executeRequest, setErrors];
};
