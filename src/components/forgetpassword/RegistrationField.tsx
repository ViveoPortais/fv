import { Input } from "@/components/ui/input";

type RegistrationFieldProps = {
    register: any;
    errors: any;
    handleCrmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    professionsSelected: string | undefined;
};

export const RegistrationField = ({ register, errors, handleCrmChange, professionsSelected }: RegistrationFieldProps) => (
    <div className="w-full">
        <Input
            type="text"
            placeholder={professionsSelected === "Médico" ? "CRM" : "Nro de Registro"}
            maxLength={10}
            {...register("licenseNumber", {
                pattern: {
                    value: /^\d{1,6}$/,
                    message: professionsSelected === "Médico"
                        ? "O CRM deve conter apenas números."
                        : "O Nro de registro deve conter apenas números.",
                },
            })}
            onChange={handleCrmChange}
        />
        {errors.licenseNumber && (
            <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.licenseNumber.message}
            </span>
        )}
    </div>
);
