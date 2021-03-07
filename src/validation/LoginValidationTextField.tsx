import React from "react";
import { FieldAttributes, useField } from "formik";
import { TextField } from "@material-ui/core";

export const LoginValidationTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField(props);
  const errTxt = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      style={{ width: "350px" }}
      placeholder={placeholder}
      {...field}
      variant="outlined"
      helperText={errTxt}
      error={!!errTxt}
    />
  );
};
