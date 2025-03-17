import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface DayMonthYearProps {
  name: string; // The base name for the date field in your form (e.g., "dateOfBirth")
}

const DayMonthYearInput: React.FC<DayMonthYearProps> = ({ name }) => {
  const { setValue, getValues } = useFormContext();
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");

  // Function to validate if a date is valid
  const isValidDate = (d: number, m: number, y: number): boolean => {
    const date = new Date(y, m - 1, d);
    return (
      date.getFullYear() === y &&
      date.getMonth() === m - 1 &&
      date.getDate() === d
    );
  };

  useEffect(() => {
    // Update the form value whenever day, month, or year changes
    if (day && month && year) {
      const d = parseInt(day, 10);
      const m = parseInt(month, 10);
      const y = parseInt(year, 10);

      if (isValidDate(d, m, y)) {
        const date = new Date(y, m - 1, d); // Month is 0-indexed
        setValue(name, date, { shouldValidate: true }); // Update form value
      } else {
        setValue(name, null, { shouldValidate: true }); // Set to null if invalid
      }
    } else {
      setValue(name, null, { shouldValidate: true }); // Set to null if any field is empty
    }
  }, [day, month, year, setValue, name]);

  useEffect(() => {
    // Initialize the fields from the form value
    const initialDate = getValues(name) as Date | null;
    if (initialDate) {
      setDay(String(initialDate.getDate()).padStart(2, "0"));
      setMonth(String(initialDate.getMonth() + 1).padStart(2, "0")); // Month is 0-indexed
      setYear(String(initialDate.getFullYear()));
    }
  }, [getValues, name]);

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 2) {
      setDay(value);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 2) {
      setMonth(value);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setYear(value);
    }
  };

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        placeholder="DD"
        className={cn(
          "w-16 border rounded-md px-2 py-1",
          day.length === 2 && !/^(0[1-9]|[12]\d|3[01])$/.test(day)
            ? "border-red-500"
            : ""
        )}
        value={day}
        onChange={handleDayChange}
        maxLength={2}
      />
      <input
        type="text"
        placeholder="MM"
        className={cn(
          "w-16 border rounded-md px-2 py-1",
          month.length === 2 && !/^(0[1-9]|1[0-2])$/.test(month)
            ? "border-red-500"
            : ""
        )}
        value={month}
        onChange={handleMonthChange}
        maxLength={2}
      />
      <input
        type="text"
        placeholder="YYYY"
        className={cn(
          "w-20 border rounded-md px-2 py-1",
          year.length === 4 && !/^\d{4}$/.test(year) ? "border-red-500" : ""
        )}
        value={year}
        onChange={handleYearChange}
        maxLength={4}
      />
    </div>
  );
};

export default DayMonthYearInput;
