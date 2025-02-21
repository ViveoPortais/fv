'use client';

import { IoPersonCircleSharp } from "react-icons/io5";
import CustomTooltip from "../../../components/custom/CustomToolTip";
import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { routes } from "@/helpers/routes";
import { useProgramColor } from "@/hooks/useProgramColor";
import { getTextColor } from "@/helpers/helpers";

const colorMap: Record<string, string> = {
    "text-green-rare": "#0aa454",
    "text-purple-rare": "#5b358c",
    "text-yellow-rare": "#f69c00",
    "text-no-program": "#858585"
};

const profileData = [
    {
        title: "Programa de Diagnóstico",
        description: "O Programa de Suporte ao Diagnóstico tem como objetivo dar suporte a médicos em busca de um diagnóstico diferencial para Doenças pré-definidas pela Sanofi, através do subsídio a exames, apoio, educação e orientação, auxiliando no diagnóstico suposto.",
        iconColor: "text-green-rare",
        textColor: "text-green-rare",
        programCode: "983"
    },
    {
        title: "Programa de Monitoramento",
        description: "O Programa de Monitoramento tem como objetivo dar suporte a pacientes diagnosticados que não iniciaram a terapia. O suporte ocorrerá através do subsídio a exames ambulatoriais previamente definidos pelo programa e com o atendimento de critérios e termos do regulamento.",
        iconColor: "text-purple-rare",
        textColor: "text-purple-rare",
        programCode: "984"
    },
    {
        title: "Programa de Segurança",
        description: "O Programa de Segurança tem como objetivo dar suporte a pacientes diagnosticados que não iniciaram ou estão em terapia e necessitam realizar exames de acompanhamento para garantir a segurança do tratamento de reposição enzimática. O suporte ocorrerá através do subsídio a exames ambulatoriais previamente definidos pelo programa e com o atendimento de critérios e termos do regulamento.",
        iconColor: "text-yellow-rare",
        textColor: "text-yellow-rare",
        programCode: "987"
    }
];

export default function Progam() {
    const auth = useSession();
    const router = useRouter();

    const programs = profileData.filter(program =>
        auth.programsCode.includes(program.programCode)
    );

    return (
        <div className="my-5">
            <div className="border border-zinc-500 rounded-xl shadow-lg p-5">
                <h2 className="text-center text-xl font-semibold mb-4">Selecione o perfil</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {programs.length > 0 ? (
                        programs.map(({ title, description, programCode, iconColor, textColor }, index) => (
                            <div key={index}
                                onClick={() => {
                                    auth.setProgramCode(programCode);

                                    const roles = auth.role;
                                    router.push(routes[roles].general[0].route);
                                }}
                                className="cursor-pointer"
                            >
                                <CustomTooltip text={description}>
                                    <div className="relative w-full rounded-xl border border-zinc-500 shadow-lg p-5 transition-transform duration-300 hover:scale-105">
                                        <div className="flex flex-col items-center">
                                            <IoPersonCircleSharp className="m-3" size={75} color={colorMap[iconColor]} />
                                            <div className="m-3">
                                                <span className={`text-xl font-semibold ${textColor}`}>{title}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CustomTooltip>
                            </div>
                        ))
                    ) : (
                        <div className="text-center">Nenhum programa disponível.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
