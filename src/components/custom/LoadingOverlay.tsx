'use client';
import { getTextColor } from "@/helpers/helpers";
import { Loading } from "./Loading";
import useSession from "@/hooks/useSession";

interface LoadingOverlayProps {
    isVisible: boolean;
}

export function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
    const session = useSession();
    if (!isVisible) return null;
    let textColor = getTextColor(session.programCode);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/50 z-50">
            <Loading size={60} customClass={`${textColor}`} />
        </div>
    );
}
