import React, { useState } from 'react';
import Select from 'react-select';

const DropdownFilter = ({ options, selectedOption, onSelect }) => {
  const handleChange = selectedOption => {
    onSelect(selectedOption); // Crida la funció que es passa com a prop
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 200,  // Fixed width, adjust as necessary
      minWidth: 250,
      maxWidth: 250,
      borderColor: state.isFocused ? 'white' : '#555',
      boxShadow: state.isFocused ? '0 0 0 1px white' : null,
      '&:hover': {
        borderColor: 'white', 
      },

    }),
    menu: (provided) => ({
      ...provided,
      width: 250,  // Ensure the dropdown menu matches the fixed width
    }),
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      placeholder="Escriu una opció"
      isSearchable={true}
      isClearable={true} /* Permet deseleccionar l'opció */
      classNamePrefix="react-select"
      styles={customStyles} // Apply custom styles here
    />
  );
};

export default DropdownFilter;
