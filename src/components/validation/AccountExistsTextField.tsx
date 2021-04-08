import React from "react";
import { FieldAttributes, useField } from "formik";
import { TextField } from "@material-ui/core";

export const AccountExistsTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field] = useField(props);
  return (
    <TextField
      style={{ width: "280px" }}
      placeholder={placeholder}
      {...field}
      variant="outlined"
      helperText="Account with the given email already exists."
      error={true}
    />
  );
};
