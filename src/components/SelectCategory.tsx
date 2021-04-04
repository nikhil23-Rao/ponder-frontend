import * as React from "react";
import "../styles/SelectCategory.css";

export const SelectCategory = ({ options, value, ...rest }: any) => {
  return (
    <div className="navbar ml-4">
      <div className="my-dropdown">
        <select
          name="filter"
          defaultValue="Select A Category"
          {...rest}
          className="my-dropdown-select"
        >
          <option value="" selected={true}>
            {value ? value : "Select A Category"}{" "}
          </option>
          {options.map((o: { value: string }) => {
            return (
              <option {...rest} value={o.value || value}>
                {o.value}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
