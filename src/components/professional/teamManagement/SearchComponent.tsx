import React from "react";
import { Controller } from "react-hook-form";
import { CustomFilterSelect } from "@/components/custom/CustomFilterSelect";
import { CustomSelect } from "@/components/custom/CustomSelect";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UFlist } from "@/helpers/select-filters";
import { IStringMap } from "@/types";

interface SearchComponentProps {
    control: any;
    register: any;
    errors: any;
    onSearch: () => void;
    bgColor: string;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
    control,
    register,
    errors,
    onSearch,
    bgColor
}) => (
    <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1">
            <Input
                type="text"
                placeholder="CRM"
                {...register("licenseNumber", { required: true })}
                className="w-full"
            />
            {errors.licenseNumber && (
                <span className="w-full text-xs text-red-400 mt-1">
                    {errors.licenseNumber.message}
                </span>
            )}
        </div>
        <div className="flex-1">
            <Controller
                name="licenseState"
                control={control}
                render={({ field }) => (
                    <CustomSelect
                        label="UF"
                        options={UFlist}
                        {...field}
                    />
                )}
            />
            {errors.licenseState && (
                <span className="w-full text-xs text-red-400 mt-1">
                    {errors.licenseState.message}
                </span>
            )}
        </div>
        <div className="flex-1">
            <Button
                type="button"
                size="lg"
                className={`mt-6 md:mt-7 ${bgColor} w-full h-14`}
                onClick={onSearch}
            >
                Buscar
            </Button>
        </div>
    </div>
);
