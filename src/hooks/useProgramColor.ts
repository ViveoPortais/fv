import { useEffect, useState } from 'react';

const tailwindColorMap: Record<string, string> = {
    '983': 'green-rare',
    '984': 'purple-rare',
    '987': 'yellow-rare',
    '': 'no-program',
};

export function useProgramColor(initialProgramCode: string) {
    const [colorClass, setColorClass] = useState<string>(tailwindColorMap[initialProgramCode] || tailwindColorMap['']);

    useEffect(() => {
        setColorClass(tailwindColorMap[initialProgramCode] || tailwindColorMap['']);
    }, [initialProgramCode]);

    return colorClass;
}
