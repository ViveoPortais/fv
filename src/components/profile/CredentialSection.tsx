import { Controller } from "react-hook-form";
import { Input } from "../ui/input";

type CredentialType = {
    control: any;
    errors: any;
    login: string;
}

export const CredentialSection = ({ control, errors, login }: CredentialType) => (
    <>
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <div className="flex flex-col">
                            <Input
                                type="password"
                                placeholder="Nova senha"
                                {...field}
                            />
                            {errors.password && (
                                <span className="text-xs text-red-400 mt-1">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                    )}
                />
            </div>
            <div className="flex-1">
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                        <div className="flex flex-col">
                            <Input
                                type="password"
                                placeholder="Confirmar nova senha"
                                {...field}
                            />
                            {errors.confirmPassword && (
                                <span className="text-xs text-red-400 mt-1">
                                    {errors.confirmPassword.message}
                                </span>
                            )}
                        </div>
                    )}
                />
            </div>
        </div>
    </>
);
