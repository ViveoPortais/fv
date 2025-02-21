'use client'

import { useState } from "react";
import { maskedField } from "../custom/MaskedField";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface PatientPreRegisterProps {
    title?: string;
}

export function PatientPreRegister({ title }: PatientPreRegisterProps) {
    const [preRegisterData, setPreRegisterData] = useState({
        patientName: "",
        patientCellPhone: "",
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setPreRegisterData({ ...preRegisterData, [name]: value });
    };

    return (
        <div className="">
            {title && <h1 className="text-base md:text-xl font-bold mb-2 md:mb-4">{title}</h1>}

            <form className="w-full flex flex-col gap-4">

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        type="text"
                        placeholder="Nome do paciente"
                        value={preRegisterData.patientName}
                        onChange={handleChange}
                    />
                     
                    {maskedField(
                        "cellphone",
                        handleChange,
                        "patientCellPhone",
                        "Celular do paciente",
                        false,
                        () => {},
                        preRegisterData.patientCellPhone,
                    )}
                </div>

                <p className="my-4">
                    Lorem ipsum dolor, amet dolor lorem uipsum. Lorem ipsum dolor, 
                    amet dolor lorem uipsumLorem ipsum dolor, amet dolor lorem uipsum 
                    Lorem ipsum dolor, amet dolor lorem uipsum Lorem ipsum dolor, amet dolor 
                    lorem uipsum. Lorem ipsum dolor, amet dolor lorem uipsum
                </p>

                <Button type='submit' size={`lg`}>Enviar código SMS</Button>
            </form>
            
        </div>
    )
}