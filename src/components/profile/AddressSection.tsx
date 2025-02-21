import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { AddressData } from "@/services/api";
import { maskedField } from "../custom/MaskedField";
import { DoctorProfileValidationProps, ProfessionalProfileValidationProps } from "@/lib/utils";
import { DatePickerComponent } from "../custom/CustomCalendar";
import { useEffect } from "react";
import { toast } from "react-toastify";
import DateField from "../custom/CustomNewCalendar";

type addressSectionProps = {
    control: any;
    errors: any;
    birthDate: string;
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    setValue: (name: keyof DoctorProfileValidationProps | keyof ProfessionalProfileValidationProps, value: any) => void;
    setFocus: any;
};

export const AdressSection = ({
    control,
    errors,
    birthDate,
    cep,
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    setValue,
    setFocus
}: addressSectionProps) => {

    useEffect(() => {
        setValue('street', street || '');
        setValue('neighborhood', neighborhood || '');
        setValue('city', city || '');
        setValue('state', state || '');
        setValue('number', number || '');
        setValue('cep', cep || '');
        setValue('birthDate', birthDate || '');
        setValue('complement', complement || '');
    }, [street, neighborhood, city, state, number, cep, birthDate, complement, setValue])

    const handleCepBlur = async (cepValue: string) => {
        if (cepValue.length === 9) {
            const data = await AddressData(cepValue);
            if (data && data.erro !== true) {
                setValue('street', data.logradouro || '');
                setValue('neighborhood', data.bairro || '');
                setValue('city', data.localidade || '');
                setValue('state', data.uf || '');
                setValue('number', data.number || '');
            } else {
                toast.error('CEP inválido ou não encontrado');
            }
        }
    };

    const validateDateTo = (e: any) => {
        const selectedDate = new Date(e.target.value);
        const currentDate = new Date();

        if (selectedDate > currentDate) {
            toast.warning("A data selecionada não pode ser no futuro.");
            setValue('birthDate', '');
            setFocus('birthDate');
            return;
        }

        const age = calculateAge(e.target.value);
        if (age < 18) {
            toast.warning("A pessoa precisa ter pelo menos 18 anos.");
            setValue('birthDate', '');
            setFocus('birthDate');
        }
    };

    const calculateAge = (birthDate: string): number => {
        const birth = new Date(birthDate);
        const today = new Date();

        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 md:flex-1">
                    <DateField
                        control={control}
                        label='Data de Nascimento'
                        name='birthDate'
                        validateDateTo={validateDateTo}
                        defaultValue={birthDate}
                    />
                    {errors.birthdate && (
                        <span className="text-xs text-red-400 mt-1">
                            {errors.birthdate.message}
                        </span>
                    )}
                </div>
                <div className="flex-1 md:flex-1">
                    <Controller
                        name="cep"
                        control={control}
                        defaultValue={cep}
                        render={({ field }) => (
                            <div className="flex flex-col w-full">
                                {maskedField(
                                    'cep',
                                    field.onChange,
                                    field.name,
                                    'CEP',
                                    false,
                                    () => handleCepBlur(field.value),
                                    field.value
                                )}
                                {errors.cep && (
                                    <span className="text-xs text-red-400 mt-1">
                                        {errors.cep.message}
                                    </span>
                                )}
                            </div>
                        )}
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="flex-1 md:flex-1">
                    <Controller
                        name="street"
                        control={control}
                        defaultValue={street}
                        render={({ field }) => (
                            <div className="flex flex-col w-full">
                                <Input
                                    placeholder="Logradouro"
                                    {...field}
                                    value={field.value}
                                />
                                {errors.street && (
                                    <span className="text-xs text-red-400 mt-1">
                                        {errors.street.message}
                                    </span>
                                )}
                            </div>
                        )}
                    />
                </div>
                <div className="flex-1 md:flex-1">
                    <Controller
                        name="number"
                        control={control}
                        defaultValue={number}
                        render={({ field }) => (
                            <div className="flex flex-col w-full">
                                <Input
                                    placeholder="Número"
                                    {...field}
                                    value={field.value}
                                />
                                {errors.number && (
                                    <span className="text-xs text-red-400 mt-1">
                                        {errors.number.message}
                                    </span>
                                )}
                            </div>
                        )}
                    />
                </div>
                <div className="flex-1 md:flex-1">
                    <Controller
                        name="complement"
                        control={control}
                        defaultValue={complement}
                        render={({ field }) => (
                            <div className="flex flex-col w-full">
                                <Input
                                    placeholder="Complemento"
                                    {...field}
                                    value={field.value}
                                />
                                {errors.complement && (
                                    <span className="text-xs text-red-400 mt-1">
                                        {errors.complement.message}
                                    </span>
                                )}
                            </div>
                        )}
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="flex-1 md:flex-1">
                    <Controller
                        name="neighborhood"
                        control={control}
                        defaultValue={neighborhood}
                        render={({ field }) => (
                            <div className="flex flex-col w-full">
                                <Input
                                    placeholder="Bairro"
                                    {...field}
                                    value={field.value}
                                />
                                {errors.neighborhood && (
                                    <span className="text-xs text-red-400 mt-1">
                                        {errors.neighborhood.message}
                                    </span>
                                )}
                            </div>
                        )}
                    />
                </div>
                <div className="flex-1 md:flex-1">
                    <Controller
                        name="city"
                        control={control}
                        defaultValue={city}
                        render={({ field }) => (
                            <div className="flex flex-col w-full">
                                <Input
                                    placeholder="Cidade"
                                    {...field}
                                    value={field.value}
                                />
                                {errors.city && (
                                    <span className="text-xs text-red-400 mt-1">
                                        {errors.city.message}
                                    </span>
                                )}
                            </div>
                        )}
                    />
                </div>
                <div className="flex-1 md:flex-1">
                    <Controller
                        name="state"
                        control={control}
                        defaultValue={state}
                        render={({ field }) => (
                            <div className="flex flex-col w-full">
                                <Input
                                    placeholder="Estado"
                                    {...field}
                                    value={field.value}
                                />
                                {errors.state && (
                                    <span className="text-xs text-red-400 mt-1">
                                        {errors.state.message}
                                    </span>
                                )}
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};
