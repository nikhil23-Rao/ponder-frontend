import React from "react";
import { FieldAttributes, useField } from "formik";
import { TextField } from "@material-ui/core";

export const InvalidTextField: React.FC<FieldAttributes<{}>> = ({
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
      helperText="Invalid email or password."
      error={true}
    />
  );
};
