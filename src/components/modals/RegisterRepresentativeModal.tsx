import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { maskedField } from "../custom/MaskedField";
import { isValidPhoneNumber } from "@/helpers/helpers";
import { useAppSelector } from "@/store/hooks";
import { FaSpinner, FaTimes } from "react-icons/fa"; // Ícone de fechar
import { Button } from "../ui/button";

const schema = z.object({
  name: z.string().min(1, "Nome completo é obrigatório"),
  emailAddress: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  telephone: z.string().min(1, "Celular é obrigatório"),
});

type FormData = z.infer<typeof schema>;

interface RegisterRepresentativeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const RegisterRepresentativeModal: React.FC<RegisterRepresentativeModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const [cellphoneError, setCellphoneError] = useState<string | null>(null);
  const loading = useAppSelector((state) => state.registerRepresentative.loading);

  useEffect(() => {
    if (!isOpen) {
      reset();
      setCellphoneError(null);
    }
  }, [isOpen, reset]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    let value = e.target.value;
    const cleanPhone = value.replace(/\D/g, "");
    if (isValidPhoneNumber(cleanPhone)) {
      field.onChange(value);
      setCellphoneError(null);
    } else {
      setCellphoneError("Telefone inválido");
      field.onChange(value);
    }
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleCloseModal}
    >
      <div className="bg-white w-11/12 max-w-md sm:w-[60%] md:w-[40%] p-4 sm:p-6 rounded-lg shadow-lg relative overflow-auto">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800" onClick={onClose}>
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl text-center font-semibold mb-4">Cadastro de Representante</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">Nome completo</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              )}
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <Controller
              name="emailAddress"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              )}
            />
            {errors.emailAddress && <span className="text-red-500 text-sm">{errors.emailAddress.message}</span>}
          </div>

          <div className="flex flex-col">
            <Controller
              name="telephone"
              control={control}
              render={({ field }) =>
                maskedField(
                  "cellphone",
                  (e) => handlePhoneChange(e, field),
                  field.name,
                  "Celular",
                  false,
                  () => {},
                  field.value
                )
              }
            />
            {cellphoneError && <span className="text-red-500 text-sm">{cellphoneError}</span>}
            {errors.telephone && <span className="text-red-500 text-sm">{errors.telephone.message}</span>}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button type="button" onClick={onClose} className="w-full sm:w-[48%]" disabled={loading}>
              {loading ? <FaSpinner className="animate-spin text-white" aria-label="Carregando" /> : "Voltar"}
            </Button>
            <Button type="submit" className="w-full sm:w-[48%]" disabled={loading || !isValid}>
              {loading ? <FaSpinner className="animate-spin text-white" aria-label="Carregando" /> : "Cadastrar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterRepresentativeModal;
