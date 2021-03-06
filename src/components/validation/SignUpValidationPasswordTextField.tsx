import React from "react";
import { FieldAttributes, useField } from "formik";
import { TextField } from "@material-ui/core";

export const SignupValidationPasswordTextField: React.FC<
  FieldAttributes<{}>
> = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errTxt = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      style={{ width: "280px" }}
      placeholder={placeholder}
      type="password"
      variant="outlined"
      {...field}
      helperText={errTxt}
      error={!!errTxt}
    />
  );
};
