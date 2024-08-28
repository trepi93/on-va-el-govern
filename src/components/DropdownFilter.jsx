import React, { useState } from 'react';
import Select from 'react-select';

const DropdownFilter = ({ options, selectedOption, onSelect }) => {
  const handleChange = selectedOption => {
    onSelect(selectedOption); 
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 200,  
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
      width: 250,  
    }),
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      placeholder="Escriu una opció"
      isSearchable={true}
      isClearable={true} 
      classNamePrefix="react-select"
      styles={customStyles}
    />
  );
};

export default DropdownFilter;
