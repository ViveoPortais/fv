"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "react-toastify";
import dayjs from "dayjs";
import { CgSpinner } from "react-icons/cg";

import useSession from "@/hooks/useSession";
import { login, resendToken } from "@/services/auth";
import api from "@/services/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { IResendToken } from "@/types";

const signInValidationSchema = z
  .object({
    login: z.string().min(1, { message: "Informe o login" }),
    password: z.string().min(3, { message: "A senha deve conter pelo menos 3 caracteres" }),
    tokenByEmail: z.boolean().optional(),
    tokenBySms: z.boolean().optional(),
    token: z.string().optional(),
  })
  .refine(
    (data) => {
      return data.tokenByEmail || data.tokenBySms;
    },
    {
      message: "Pelo menos uma forma de envio de token deve ser selecionada",
      path: ["tokenBySms"],
    }
  );

type SignInValidationProps = z.infer<typeof signInValidationSchema>;

export default function SignIn() {
  const router = useRouter();
  const auth = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenSended, setIsTokenSended] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignInValidationProps>({
    resolver: zodResolver(signInValidationSchema),
    defaultValues: {
      login: "",
      password: "",
      tokenByEmail: false,
      tokenBySms: false,
      token: "",
    },
    mode: "onChange",
  });

  const stateTokenByEmail = watch("tokenByEmail");
  const stateTokenBySms = watch("tokenBySms");
  const tokenValue = watch("token");

  const handleForgetPassword = () => {
    router.push("/forget/password");
  };

  function handleUserRole(role: string) {
    if (role.toLowerCase().includes("supervisor")) {
      return "supervisor";
    }
    if (role.toLowerCase().includes("representante")) {
      return "representative";
    }
    if (role.toLowerCase().includes("operação")) {
      return "operation";
    }
    return "";
  }

  async function handleLogin(data: SignInValidationProps) {
    setIsLoading(true);

    try {
      const response = await login(data);
      if (response.role === "") {
        setIsTokenSended(true);
        toast.success(response.token);
      } else {
        const role = handleUserRole(response.role);
        if (role === "") {
          auth.onLogout();
          toast.warning("Usuário sem acesso a este programa");
          router.push("/signin");
          return;
        }
        auth.setProgramsCode(response.programsCode);
        auth.setName(response.userName);
        auth.setEmail(response.email);
        auth.setToken(response.token);
        api.defaults.headers.Authorization = `Bearer ${response.token}`;
        auth.setRole(role);
        auth.setSession(dayjs().format("YYYY-MM-DD HH:mm:ss"));
        auth.setPrimeiroAcesso(response.primeiroAcesso);
        auth.setObrigatorioAlterarSenha(response.obrigatorioAlterarSenha);
        auth.onLogin();
        router.push("/dashboard/program");
      }
    } catch (err: any) {
      toast.error(err.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCheckboxChange = (checkbox: "tokenByEmail" | "tokenBySms", value: boolean) => {
    if (checkbox == "tokenByEmail") {
      setValue("tokenByEmail", value);
      setValue("tokenBySms", false);
    } else {
      setValue("tokenByEmail", false);
      setValue("tokenBySms", value);
    }
  };

  const handleResendToken = (data: SignInValidationProps) => {
    setIsLoading(true);

    let dataSend: IResendToken = {
      email: data.login,
      password: data.password,
      token: data.token,
    };

    resendToken(dataSend)
      .then((res) => {
        if (res.isValidData) toast.success(res.additionalMessage);
      })
      .catch((res) => {
        toast.error(res.additionalMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <form className="flex flex-col items-center gap-3 w-full h-full" onSubmit={handleSubmit(handleLogin)}>
        <div className="w-full">
          <Input
            type="text"
            icon="login"
            placeholder="Login"
            className="w-full"
            {...register("login", { required: true })}
            maxLength={100}
          />
          {errors.login && <span className="w-full text-xs text-red-400 mt-1">{errors.login.message}</span>}
        </div>

        <div className="w-full">
          <Input
            type="password"
            icon="password"
            placeholder="Senha"
            className="w-full"
            {...register("password", { required: true })}
          />
          {errors.password && <span className="w-full text-xs text-red-400 mt-1">{errors.password.message}</span>}
        </div>

        <div className="w-full">
          <span className="w-full text-sm text-zinc-500">Selecione como deseja receber seu token de acesso</span>
        </div>

        <div className="w-full">
          <div className="w-full flex items-center gap-4">
            <Checkbox
              {...register("tokenByEmail")}
              checked={stateTokenByEmail}
              onCheckedChange={(checked) => handleCheckboxChange("tokenByEmail", !!checked)}
            />
            <span className="uppercase text-[11px]">Enviar por E-mail</span>
          </div>
          {errors.tokenByEmail && (
            <span className="ml-2 w-full text-xs text-red-400 mt-1">{errors.tokenByEmail.message}</span>
          )}
        </div>

        <div className="w-full">
          <div className="w-full flex items-center gap-4">
            <Checkbox
              {...register("tokenBySms")}
              checked={stateTokenBySms}
              onCheckedChange={(checked) => handleCheckboxChange("tokenBySms", !!checked)}
            />
            <span className="uppercase text-[11px]">Enviar por Sms</span>
          </div>
          {errors.tokenBySms && (
            <span className="ml-2 w-full text-xs text-red-400 mt-1">{errors.tokenBySms.message}</span>
          )}
        </div>

        {isTokenSended && (
          <div className="w-full">
            <Input type="text" placeholder="Token" className="w-full" {...register("token")} />
            {errors.token && <span className="w-full text-xs text-red-400 mt-1">{errors.token.message}</span>}
          </div>
        )}

        <span className="text-xs self-end underline cursor-pointer" onClick={handleForgetPassword}>
          Esqueci minha senha
        </span>

        <Button
          size={`lg`}
          className={`w-full mt-4 bg-purple-900/75 ${isLoading && "bg-zinc-500"}`}
          type="submit"
          disabled={isLoading || (isTokenSended && tokenValue == "")}
        >
          {isLoading ? <CgSpinner size={20} className="text-white animate-spin" /> : "Entrar"}
        </Button>
        {isTokenSended && (
          <Button
            size={`lg`}
            className={`w-full ${isLoading && "bg-zinc-500"}`}
            type="button"
            disabled={isLoading}
            onClick={() => handleResendToken(watch())}
          >
            {isLoading ? <CgSpinner size={20} className="text-white animate-spin" /> : "Reenviar token"}
          </Button>
        )}
      </form>
    </div>
  );
}
