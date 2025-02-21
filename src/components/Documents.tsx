"use client";

import { sendDocuments } from "@/services/patient";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { maskedField } from "./custom/MaskedField";
import { Button } from "./ui/button";
import { toast } from "react-toastify";

export function Documents() {
  const [request, setRequest] = useState({
    ProgramCode: "150",
    CpfPatient: "",
    Files: [],
  });

  const file1Ref = useRef<HTMLInputElement | null>(null);
  const file2Ref = useRef<HTMLInputElement | null>(null);
  const file3Ref = useRef<HTMLInputElement | null>(null);
  const file4Ref = useRef<HTMLInputElement | null>(null);
  const file5Ref = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name.startsWith("file")) {
      const file = files[0];
      const reader = new FileReader() as any;
      reader.onloadend = () => {
        if (reader.result) {
          setRequest((prevRequest: any) => ({
            ...prevRequest,
            Files: [
              ...prevRequest.Files.filter((f: any) => f.FileName !== file.name),
              {
                FileName: file.name,
                Base64: reader.result.split(",")[1],
              },
            ],
          }));
        }
      };
      reader.readAsDataURL(file);
    } else {
      setRequest({ ...request, [name]: value });
    }
  };

  const clearFields = () => {
    setRequest({
      ProgramCode: "150",
      CpfPatient: "",
      Files: [],
    });
    file1Ref.current!.value = "";
    file2Ref.current!.value = "";
    file3Ref.current!.value = "";
    file4Ref.current!.value = "";
    file5Ref.current!.value = "";
  };

  const documentsSend = async () => {
    sendDocuments(request)
      .then((response) => {
        if (!response.isValidData) {
          toast.error("Documentos não enviados");
          return;
        }
        if (response.isValidData) {
          toast.success("Documentos enviados com sucesso!");
          clearFields();
          return;
        }
      })
      .catch((error) => {
        toast.error("Erro ao enviar documentos!");
      });
  };

  return (
    <main className="h-screen w-screen">
      <div className="w-full h-5 bg-[#6E6EF1]"></div>
      <nav className="bg-white border-gray-200 z-50 absolute w-full shadow-xl">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/logo.png"
              width={100}
              height={80}
              alt="logo"
              className="h-10 "
            />
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-[#6E6EF1] dark:focus:ring-[#585D68]"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col md:items-center p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 bg-[#6E6EF1] md:bg-white lg:bg-white xl:bg-white 2xl:bg-white"></ul>
          </div>
        </div>
      </nav>
      <section className="my-32">
        <div className="flex flex-col md:flex md:flex-row md:ml-[15%] p-5 md:mt-20 md:mb-20 md:gap-10">
          <div className="flex flex-col py-2">
            <h1 className="text-2xl md:text-5xl font-bold text-[#6E6EF1]">
              Documentos
            </h1>
            <span className="mt-5 border-l-4 border-[#57C6FF] text-sm md:text-base text-[#000] w-80 pl-2">
              Anexe aqui os documentos necessários
            </span>
            <p className="mt-3 text-sm md:text-base text-[#585D68] w-80 md:w-[30rem] ">
              Nessa área você pode anexar e nos enviar suas receitas médicas.
              Para isso, basta preencher o campo com o seu CPF e fazer o upload
              dos arquivos.
            </p>
          </div>
          <div className="flex flex-col gap-5 w-full md:w-1/2 p-10 rounded-2xl border border-[#F1F1F1] bg-[#F1F1F1]">
            <span className="text-[#60656F] text-xl">
              Faça o upload de suas receitas médicas aqui!
            </span>
            <div className="flex flex-col">
              {maskedField(
                "cpf",
                handleChange,
                "CpfPatient",
                "CPF ",
                false,
                () => {},
                request.CpfPatient
              )}
            </div>
            <div>
              <Input
                placeholder="Arquivo 1"
                type="file"
                name="file1"
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                placeholder="Arquivo 2"
                type="file"
                name="file2"
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                placeholder="Arquivo 3"
                type="file"
                name="file3"
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                placeholder="Arquivo 4"
                type="file"
                name="file4"
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                placeholder="Arquivo 5"
                type="file"
                name="file5"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end">
              <Button
                className="lg:w-[200px]"
                size="lg"
                variant={`default`}
                onClick={documentsSend}
              >
                Enviar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
