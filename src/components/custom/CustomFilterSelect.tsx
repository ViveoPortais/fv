"use client";

import React, { useState } from 'react';
import Select from 'react-select';
import { InputLoading } from './InputLoading';
import { IStringMap } from '@/types';

interface CustomFilterSelectProps {
    name: string;
    options: IStringMap[];
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    customClass?: string;
    isLoading?: boolean;
    params?: any;
}

const CustomFilterSelect: React.FC<CustomFilterSelectProps> = ({
    name,
    label,
    options,
    value,
    onChange,
    onBlur,
    customClass,
    isLoading,
    params,
    ...props
}) => {
    const [filter, setFilter] = useState("");

    if (isLoading) return <InputLoading />;

    const filteredOptions = Array.isArray(options) && options.length > 0
        ? options
            .filter(option => option.optionName && option.optionName.toLowerCase().includes(filter.toLowerCase()))
            .map(option => ({
                value: option.stringMapId,
                label: option.optionName,
            }))
        : [];

    return (
        <div className={`relative w-full ${customClass}`}>
            {label && (
                <label className="block mb-1 text-sm font-bold uppercase tracking-wide text-[#919191]">
                    {label}
                </label>
            )}

            <div className="relative">
                <Select
                    name={name}
                    value={value ? { value, label: options.find(opt => opt.stringMapId === value)?.optionName } : null}
                    onChange={(selectedOption) => {
                        if (onChange && selectedOption) {
                            onChange(selectedOption.value);
                        }
                    }}
                    onBlur={onBlur}
                    options={filteredOptions}
                    placeholder="Selecione..."
                    classNamePrefix="react-select"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            height: '4rem',
                            minHeight: '4rem',
                            borderRadius: '0.375rem',
                            borderColor: '#d1d5db',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                        }),
                        menu: (provided) => ({
                            ...provided,
                            zIndex: 9999,
                        }),
                        menuList: (provided) => ({
                            ...provided,
                            maxHeight: '300px',
                            overflowY: 'auto',
                        }),
                        placeholder: (provided) => ({
                            ...provided,
                            color: '#919191',
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            padding: '1rem',
                            backgroundColor: state.isSelected ? '#f3f4f6' : 'white',
                            color: state.isSelected ? '#1f2937' : '#4a5568',
                        }),
                    }}
                    {...props}
                />
            </div>
        </div>
    );
};

export { CustomFilterSelect };
