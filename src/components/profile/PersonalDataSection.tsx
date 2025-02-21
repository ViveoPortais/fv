import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { CustomFilterSelect } from "../custom/CustomFilterSelect";
import { maskedField } from "../custom/MaskedField";
import { IStringMap } from "@/types";
import { useEffect, useState } from "react";
import { DoctorProfileValidationProps, ProfessionalProfileValidationProps } from "@/lib/utils";
import { isValidPhoneNumber } from "@/helpers/helpers";

type personalData = {
    name: string;
    email: string;
    specialty: string;
    licenseNumber: string; // CRM ou NRO de registro
    licenseState: string;
    telephoneNumber: string;
    profileType: string;
    control: any;
    errors: any;
    options: IStringMap[];
    cpf?: string;
    setValue: (name: keyof DoctorProfileValidationProps | keyof ProfessionalProfileValidationProps, value: any) => void;
}

export const PersonalDataSection = ({
    name,
    email,
    specialty,
    licenseNumber,
    licenseState,
    profileType,
    telephoneNumber,
    control,
    errors,
    options,
    cpf,
    setValue
}: personalData) => {
    useEffect(() => {
        setValue('email', email);
        setValue('telephoneNumber', telephoneNumber);
        setValue('specialtyDoctor', specialty);
        setValue('cpf', cpf || '');
    }, [name, email, specialty, licenseNumber, licenseState, profileType, cpf, options]);
    const [cellphoneError, setCellphoneError] = useState<string | null>(null);
    return (
        <>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <Input
                        name="name"
                        value={name}
                        disabled
                        placeholder="Nome completo"
                    />
                </div>
                <div className="flex-1">
                    <Controller
                        name="email"
                        control={control}
                        defaultValue={email}
                        render={({ field }) => (
                            <div className="flex flex-col">
                                <Input
                                    type="email"
                                    placeholder="E-mail"
                                    {...field}
                                />
                                {errors.email && (
                                    <span className="text-xs text-red-400 mt-1">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>
                        )}
                    />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="flex-1">
                    <Input
                        name="licenseNumber"
                        value={licenseNumber}
                        disabled
                        placeholder={profileType === 'doctor' ? 'CRM' : 'Nro de registro'}
                    />
                </div>
                <div className="flex-1">
                    <Input
                        name="licenseState"
                        value={licenseState}
                        disabled
                        placeholder="UF"
                    />
                </div>
                <div className="flex-1">
                    <Controller
                        name="telephoneNumber"
                        control={control}
                        defaultValue={telephoneNumber}
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
                                    field.value
                                )
                            )
                        }}
                    />
                    {cellphoneError && (
                        <span className="text-xs text-red-400 mt-1 mr-1">{cellphoneError}</span>
                    )}
                    {errors.telephoneNumber && (
                        <span className="text-xs text-red-400 mt-1">
                            {errors.telephoneNumber.message}
                        </span>
                    )}
                </div>
                <div className="flex-1">
                    <Controller
                        name="cpf"
                        control={control}
                        defaultValue={cpf}
                        render={({ field }) =>
                            maskedField(
                                "cpf",
                                field.onChange,
                                field.name,
                                "CPF",
                                false,
                                () => { },
                                field.value
                            )
                        }
                    />
                    {errors.cpf && (
                        <span className="text-xs text-red-400 mt-1">
                            {errors.cpf.message}
                        </span>
                    )}
                </div>

            </div>
            {profileType === 'doctor' && (
                <div className="flex flex-col mt-4">
                    <Controller
                        name="specialtyDoctor"
                        control={control}
                        defaultValue={specialty}
                        render={({ field }) => (
                            <CustomFilterSelect label="Especialidades" options={options} {...field} />
                        )}
                    />
                    {errors.specialtyDoctor && (
                        <span className="text-xs text-red-400 mt-1">
                            {errors.specialtyDoctor.message}
                        </span>
                    )}
                </div>
            )}
        </>
    );
}
