import React from 'react';
import { Select } from 'antd';

const SelectForm = ({ 
    options = [], 
    placeholder, 
    ...props
}) => {

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <Select
            style={{width: '100%'}}
            placeholder={`Select a ${placeholder}`}
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={options}
            allowClear
            {...props}
        />
    )
}

export default SelectForm;