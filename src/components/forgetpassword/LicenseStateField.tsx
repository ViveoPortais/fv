import { Controller } from "react-hook-form";
import { CustomSelect } from "@/components/custom/CustomSelect";
import { UFlist } from "@/helpers/select-filters";

type LicenseStateFieldProps = {
    control: any;
    errors: any;
};

export const LicenseStateField = ({ control, errors }: LicenseStateFieldProps) => (
    <div className="w-full">
        <Controller
            name="licenseState"
            control={control}
            defaultValue={""}
            render={({ field }) => (
                <CustomSelect label="UF" options={UFlist} {...field} />
            )}
        />
        {errors.licenseState && (
            <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.licenseState.message}
            </span>
        )}
    </div>
);
