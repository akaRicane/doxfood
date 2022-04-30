import React from 'react';

const Dropdown = ({ label, value, options, onChange }) => {
    return (
        <label key='dp-label'>
            {label}
            <select key='dp-select' value={value} onChange={onChange}>
                {options.map((option, id) => (
                    <option key={"dp-option-" + id} value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
};

export default Dropdown;