import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { maskedField } from "@/components/custom/MaskedField";
import { teamManagementValidationProps } from "@/lib/utils";
import { useState } from "react";
import { isValidPhoneNumber } from "@/helpers/helpers";

interface AdditionalFieldsProps {
    control: any;
    register: any;
    errors: any;
    disabledFields: boolean;
}

export function AdditionalFields({
    control,
    register,
    errors,
    disabledFields
}: AdditionalFieldsProps) {
    const [cellphoneError, setCellphoneError] = useState<string | null>(null);
    return (
        <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1">
                <Input
                    type="text"
                    placeholder="Nome completo"
                    {...register("professionalName", { required: true })}
                    className="w-full"
                    disabled={disabledFields}
                />
                {errors.professionalName && (
                    <span className="w-full text-xs text-red-400 mt-1">
                        {errors.professionalName.message}
                    </span>
                )}
            </div>
            <div className="flex-1">
                <Input
                    type="email"
                    placeholder="E-mail"
                    {...register("emailAddress", { required: true })}
                    className="w-full"
                    disabled={disabledFields}
                />
                {errors.emailAddress && (
                    <span className="w-full text-xs text-red-400 mt-1">
                        {errors.emailAddress.message}
                    </span>
                )}
            </div>
            <div className="flex-1 md:flex-none">
                <Controller
                    name="mobilephone"
                    control={control}
                    render={({ field }) => {
                        const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                            let value = e.target.value;

                            const cleanPhone = value.replace(/\D/g, '');
                            if (isValidPhoneNumber(cleanPhone)) {
                                field.onChange(value);
                                setCellphoneError(null);
                            } else {
                                setCellphoneError("Telefone inválido");
                                field.onChange(value);
                            }
                        }
                        return (
                            maskedField(
                                "cellphone",
                                handlePhoneChange,
                                field.name,
                                "Celular",
                                false,
                                () => { },
                                field.value,
                                disabledFields
                            )
                        )
                    }}
                />
                {cellphoneError && (
                    <span className="w-full text-xs text-red-400 mt-1 mr-1">{cellphoneError}</span>
                )}
                {errors.mobilephone && (
                    <span className="w-full text-xs text-red-400 mt-1">
                        {errors.mobilephone.message}
                    </span>
                )}
            </div>
        </div>
    );
}
