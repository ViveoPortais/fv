'use client'

import ContentLoader from "react-content-loader";

interface InputLoginProps {
    size?: string;
}

export function InputLoading({ size }: InputLoginProps) {

    return (
        <div className="flex flex-col">
            <ContentLoader
                speed={2}
                width="auto"
                height={10}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                className="mt-1"
            >
                <rect x="0" y="0" rx="12" ry="12" width="200" height="200" />
            </ContentLoader>
            <ContentLoader
                speed={2}
                width="auto"
                height={55}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                className="mt-4"
            >
                <rect x="0" y="0" rx="12" ry="0" width={size || "1000"} height="400" />
            </ContentLoader>
        </div>
    )
}