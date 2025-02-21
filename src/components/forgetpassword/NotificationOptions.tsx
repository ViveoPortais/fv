import { Checkbox } from "@/components/ui/checkbox";
import { forgetPasswordValidationProps } from "@/lib/utils";
import { Controller } from "react-hook-form";
import { UseFormSetValue } from "react-hook-form";
import { useState } from "react";

type NotificationOptionsProps = {
    control: any;
    setSelectedNotificationMethod: (method: 'email' | 'sms' | null) => void;
    setValue: UseFormSetValue<forgetPasswordValidationProps>;
    errors: any;
    showMessageCheckbox: boolean;
    setShowMessageCheckbox: (show: boolean) => void;
};

export const NotificationOptions = ({ control, setSelectedNotificationMethod, setValue, errors, showMessageCheckbox, setShowMessageCheckbox }: NotificationOptionsProps) => (
    <div className="w-full">
        {showMessageCheckbox && (
            <span className="mb-10 uppercase text-[11px] text-zinc-400">
                escolha uma opção para redefinir sua senha
            </span>
        )}
        <div className="w-full flex items-center gap-4">
            <Controller
                name="sendByEmail"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                    <Checkbox
                        checked={field.value}
                        onCheckedChange={() => {
                            setSelectedNotificationMethod('email');
                            setShowMessageCheckbox(false);
                            setValue('sendByEmail', true);
                            setValue('sendBySms', false);
                        }}
                    />
                )}
            />
            <span className="uppercase text-[11px]">Receber por email</span>
        </div>

        <div className="w-full flex items-center gap-4 mt-4">
            <Controller
                name="sendBySms"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                    <Checkbox
                        checked={field.value}
                        onCheckedChange={() => {
                            setSelectedNotificationMethod('sms');
                            setShowMessageCheckbox(false);
                            setValue('sendBySms', true);
                            setValue('sendByEmail', false);
                        }}
                    />
                )}
            />
            <span className="uppercase text-[11px]">Receber por SMS</span>
        </div>
        {errors.sendBySms && (
            <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.sendBySms.message}
            </span>
        )}
    </div>
);
