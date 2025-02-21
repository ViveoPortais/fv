'use client'

import { IconType } from "react-icons/lib";

interface IconProps {
    icon?: IconType | undefined | null;
    size: number;
}

export function MenuIcon({ icon: Icon, size, ...props }: IconProps) {
    return (
        <>
            {Icon && <Icon size={size} {...props} />}
        </>
    )
}