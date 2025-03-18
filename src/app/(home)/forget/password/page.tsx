"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { forgetPassword } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { getOptionsProfessions } from "@/services/professions";
import { forgetPasswordValidationSchema, forgetPasswordValidationProps } from "@/lib/utils";

import { FormHeader } from "@/components/forgetpassword/FormHeader";
import { RegistrationField } from "@/components/forgetpassword/RegistrationField";
import { NotificationOptions } from "@/components/forgetpassword/NotificationOptions";
import Link from "next/link";
import { IStringMap } from "@/types";

export default function ForgetPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [optionsProfessions, setOptionsProfessions] = useState<IStringMap[]>([]);
  const [selectedNotificationMethod, setSelectedNotificationMethod] = useState<"email" | "sms" | null>(null);
  const [showMessageCheckbox, setShowMessageCheckbox] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<forgetPasswordValidationProps>({
    resolver: zodResolver(forgetPasswordValidationSchema),
  });

  async function handleForgetPassword(data: forgetPasswordValidationProps) {
    setIsLoading(true);
    try {
      const response = await forgetPassword(data as any);
      if (response.isValidData) {
        toast.success(response.additionalMessage);
        router.push("/signin");
      } else {
        toast.error(response.additionalMessage);
      }
    } catch {
      toast.error("Erro ao recuperar senha");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const createListProfessions = async () => {
      const options = await getOptionsProfessions();
      setOptionsProfessions(options);
    };

    createListProfessions();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl min-w-[300px] mx-auto items-center mt-5">
      <div className="w-full flex justify-start">
        <FormHeader contentString="Esqueci minha senha" />
      </div>

      <form className="flex flex-col items-center gap-4 w-full h-full" onSubmit={handleSubmit(handleForgetPassword)}>
        <div className={"w-full grid grid-cols-1"}>
          <RegistrationField register={register} errors={errors} />
        </div>

        <NotificationOptions
          control={control}
          setSelectedNotificationMethod={setSelectedNotificationMethod}
          setValue={setValue}
          errors={errors}
          showMessageCheckbox={showMessageCheckbox}
          setShowMessageCheckbox={setShowMessageCheckbox}
        />

        <Button
          size="lg"
          className={`w-full mt-4 ${isLoading ? "bg-zinc-500" : ""}`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <CgSpinner size={20} className="text-white animate-spin" /> : "Enviar"}
        </Button>
      </form>

      <Link href="/signin" className="w-full">
        <Button size="lg" variant="tertiary" className="w-full">
          Voltar
        </Button>
      </Link>
    </div>
  );
}
