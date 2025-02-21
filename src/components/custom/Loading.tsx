'use client'

import { CgSpinner } from "react-icons/cg";

interface LoadingProps {
    size?: number;
    customClass?: string;
}

export function Loading({
    size = 20,
    customClass
}: LoadingProps) {

    return (
        <CgSpinner 
            size={size} 
            className={`animate-spin ${customClass}`} 
        />
    )
}