"use client";

import React from "react";
import { CustomSelect } from "@/components/custom/CustomSelect";
import { Input } from "@/components/ui/input";
import { UFlist } from "@/helpers/select-filters";
import { maskedField } from "@/components/custom/MaskedField";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";

interface SearchFiltersProps {
    register: any;
    setValue: any;
    controller: any;
    status: any[];
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
    register,
    setValue,
    controller,
    status
}) => {
    const getCurrentDate = () => {
        const date = new Date();
        return date.toISOString().split('T')[0];
    };

    const validateDateTo = (e: React.FocusEvent<HTMLInputElement>) => {
        const inputDate = new Date(e.target.value);
        const currentDate = new Date();

        if (inputDate > currentDate) {
            toast.error("A data 'Até' não pode ser uma data futura.");
            setValue("dateTo", "");
        }
    };

    return (
        <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
                <Input
                    type="date"
                    {...register("dateFrom")}
                    className="w-full"
                    placeholder="Período de"
                />
            </div>
            <div className="flex-1 min-w-[200px]">
                <Input
                    type="date"
                    {...register("dateTo")}
                    className="w-full"
                    placeholder="Até"
                    max={getCurrentDate()}
                    onBlur={validateDateTo}
                />
            </div>
            <div className="flex-1 min-w-[200px]">
                <Controller
                    name="status"
                    control={controller}
                    render={({ field }) => (
                        <CustomSelect label="Status" options={status}
                            {...field}
                            onChange={(value) => {
                                field.onChange(value);
                                setValue("status", value);
                            }}
                        />
                    )}
                />
            </div>
            <div className="flex-1 min-w-[200px]">
                <Input
                    type="text"
                    {...register("requestCode")}
                    className="w-full"
                    placeholder="Código da solicitação"
                />
            </div>
            <div className="flex-1 min-w-[200px]">
                <Controller
                    name="uf"
                    control={controller}
                    render={({ field }) => (
                        <CustomSelect label="UF" options={UFlist}
                            {...field}
                            onChange={(value) => {
                                field.onChange(value);
                                setValue("uf", value);
                            }}
                        />
                    )}
                />
            </div>
            <div className="flex-1 min-w-[200px]">
                <Input
                    type="text"
                    {...register("city")}
                    className="w-full"
                    placeholder="Cidade"
                />
            </div>
        </div>
    );
};
