import { Controller } from "react-hook-form";
import { CustomFilterSelect } from "@/components/custom/CustomFilterSelect";
import { IStringMap } from "@/types";

type ProfessionFieldProps = {
    control: any;
    options: IStringMap[];
    errors: any;
};

export const ProfessionField = ({ control, options, errors }: ProfessionFieldProps) => (
    <div className="w-full">
        <Controller
            name="professionalType"
            control={control}
            defaultValue={""}
            render={({ field }) => (
                <CustomFilterSelect label="Profissionais" options={options} {...field} />
            )}
        />
        {errors.professionalType && (
            <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.professionalType.message}
            </span>
        )}
    </div>
);
