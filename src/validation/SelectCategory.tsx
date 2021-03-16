import { MenuItem, Select } from "@material-ui/core";
import React from "react";

export const SelectCategory = () => {
  return (
    <div>
      <Select placeholder="Select Category" labelId="label" id="select">
        <MenuItem value="10">Ten</MenuItem>
        <MenuItem value="20">Twenty</MenuItem>
      </Select>
    </div>
  );
};
