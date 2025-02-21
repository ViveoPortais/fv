import { useState } from "react";

interface CustomTooltipProps {
    text: string;
    children: React.ReactNode;
}

const CustomTooltip = ({ text, children }: CustomTooltipProps) => {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}

            {visible && (
                <div
                    className="absolute text-white text-sm p-2 rounded-md z-10 bg-black bg-opacity-70 shadow-md"
                    style={{
                        maxWidth: '300px',
                        top: "50%",
                        right: "0%",
                        transform: "translateX(0%)",
                    }}
                >
                    {text}
                </div>
            )}
        </div>
    );
};

export default CustomTooltip;
