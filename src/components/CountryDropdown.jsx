import React from "react";

const CountryDropdown = ({ value, onChange, countries }) => {
  return (
    <select value={value || ""} onChange={e => onChange(e.target.value)}>
      <option value="">Select Country</option>
      {countries.map(c => (
        <option key={c.id} value={c.name}>
          {c.name}
        </option>
      ))}
    </select>
  );
};

export default CountryDropdown;
