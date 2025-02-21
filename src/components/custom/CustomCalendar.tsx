import React, { useEffect, useState } from "react";
import { format, isValid, isToday, isBefore, parseISO, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
    value?: string;
    onChange: (value: string) => void;
    label?: string;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({ value, onChange, label }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const today = startOfDay(new Date());

    useEffect(() => {
        if (value) {
            const parsedDate = parseISO(value);
            setSelectedDate(isValid(parsedDate) ? parsedDate : null);
        } else {
            setSelectedDate(null);
        }
    }, [value]);

    const handleDateChange = (date: Date | null) => {
        if (date && isValid(date) && (isBefore(date, today) || isToday(date))) {
            setSelectedDate(date);
            const formattedDate = format(date, "yyyy-MM-dd");
            onChange(formattedDate);
        } else if (date === null) {
            setSelectedDate(null);
            onChange("");
        }
    };

    const formatDate = (date: Date | null): string => {
        return date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : "";
    };

    return (
        <div className="flex-1 md:flex-1">
            <div className="flex flex-col w-full">
                <div className="flex gap-1 mb-1">
                    <label className="text-sm font-semibold uppercase tracking-wide text-[#919191]">
                        {label || "Selecione uma data"}
                    </label>
                </div>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    locale={ptBR}
                    dateFormat="dd/MM/yyyy"
                    maxDate={today}
                    placeholderText={label || "Selecione uma data"}
                    className="h-16 w-full border rounded-lg border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none h-10"
                    popperClassName="react-datepicker-popper"
                    calendarClassName="react-datepicker__calendar"
                    renderCustomHeader={({ date, changeYear, changeMonth }) => (
                        <div className="flex items-center justify-between p-2 bg-gray-200 rounded-t-lg h-10">
                            <button
                                type="button"
                                className="p-2 text-xl text-gray-600 hover:bg-gray-300 rounded"
                                onClick={() => changeYear(date.getFullYear() - 1)}
                            >
                                {"<"}
                            </button>
                            <button
                                type="button"
                                className="p-2 text-xl text-gray-600 hover:bg-gray-300 rounded"
                                onClick={() => changeMonth(date.getMonth() - 1)}
                            >
                                {"<"}
                            </button>
                            <span className="text-lg font-semibold">
                                {format(date, "MMMM yyyy", { locale: ptBR })}
                            </span>
                            <button
                                type="button"
                                className="p-2 text-xl text-gray-600 hover:bg-gray-300 rounded"
                                onClick={() => changeMonth(date.getMonth() + 1)}
                            >
                                {">"}
                            </button>
                            <button
                                type="button"
                                className="p-2 text-xl text-gray-600 hover:bg-gray-300 rounded"
                                onClick={() => changeYear(date.getFullYear() + 1)}
                            >
                                {">"}
                            </button>
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export { DatePickerComponent };
