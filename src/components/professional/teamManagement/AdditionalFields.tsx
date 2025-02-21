import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { maskedField } from "@/components/custom/MaskedField";

interface AdditionalFieldsProps {
    control: any;
    register: any;
    errors: any;
}

export function AdditionalFields({
    control,
    register,
    errors
}: AdditionalFieldsProps) {
    return (
        <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1">
                <Input
                    type="text"
                    placeholder="Nome completo"
                    {...register("professionalName", { required: true })}
                    className="w-full"
                />
                {errors.professionalName && (
                    <span className="w-full text-xs text-red-400 mt-1">
                        {errors.professionalName.message}
                    </span>
                )}
            </div>
        </div>
    );
}
