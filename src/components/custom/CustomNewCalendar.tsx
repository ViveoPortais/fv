import React from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';
import { Input } from "@/components/ui/input";

interface DateFieldProps {
    control: Control<FieldValues>;
    name: string;
    label: string;
    validateDateTo?: React.FocusEventHandler<HTMLInputElement>;
    defaultValue?: string;
}

const DateField: React.FC<DateFieldProps> = ({ control, name, label, validateDateTo, defaultValue }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    return (
        <div className='flex-1 min-w-[200px]'>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <div className="flex-1 min-w-[200px]">
                        <Input
                            type="date"
                            {...field}
                            className="w-full"
                            placeholder={label}
                            value={field.value ? formatDate(field.value) : ''}
                            onBlur={validateDateTo}
                        />
                    </div>
                )}
            />
        </div>
    );
}

export default DateField;
