import React from "react";
import "../styles/Register.css";
import { FieldAttributes } from "formik";

export const UsernameField: React.FC<FieldAttributes<{}>> = ({
  name,
  type,
  ...props
}) => {
  return (
    <div className="form-label-group">
      <input type={type} name={name} className="form-control" />
      <label>Enter Username...</label>
    </div>
  );
};

export const EmailField = () => {
  return (
    <div className="form-label-group">
      <input
        type="email"
        id="inputEmail"
        name="Email"
        className="form-control"
      />
      <label htmlFor="inputEmail">Email address</label>
    </div>
  );
};
