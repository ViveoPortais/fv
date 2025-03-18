import { Input } from "@/components/ui/input";

type RegistrationFieldProps = {
  register: any;
  errors: any;
};

export const RegistrationField = ({ register, errors }: RegistrationFieldProps) => (
  <div className="w-full">
    <Input type="email" placeholder="E-mail" {...register("email", {})} />
    {errors.email && <span className="ml-2 w-full text-xs text-red-400 mt-1">{errors.email.message}</span>}
  </div>
);
