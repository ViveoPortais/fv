import { Button } from "@/components/ui/button";
import { teamManagementValidationProps } from "@/lib/utils";

interface ActionButtonsProps {
    onLink: () => void;
    linkDisabled: boolean;
    registerDisabled: boolean;
    bgColor: string;
}

export function ActionButtons({ onLink, linkDisabled, registerDisabled, bgColor }: ActionButtonsProps) {
    return (
        <div className="flex flex-col md:flex-row gap-2">
            <div className="flex 1">
                <Button
                    type="submit"
                    size="lg"
                    className={`mt-4 md:mt-3 ${bgColor}`}
                    disabled={registerDisabled}
                >
                    Convidar
                </Button>
            </div>
            <div className="flex 1">
                <Button
                    type="button"
                    size="lg"
                    className={`mt-4 md:mt-3 ${bgColor}`}
                    onClick={onLink}
                    disabled={linkDisabled}
                >
                    Realizar Vínculo
                </Button>
            </div>
        </div>
    );
}
