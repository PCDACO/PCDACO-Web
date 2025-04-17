"use client";

import { useId, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils"; // Assuming you have this utility
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Define a generic type for the option object passed into the component.
//eslint-disable-next-line
type OptionType = Record<string, any>;

interface SelectWithSearchProps<T extends OptionType> {
  /** The currently selected option object (or null/undefined if none selected). */
  value: T | null | undefined;
  /** The array of available option objects (pass your pre-fetched data here). */
  options: T[];
  /** Callback function triggered when the selection changes. Receives the full selected option object or null. */
  onValueChange: (selectedOption: T | null) => void;
  /** The key in the option object to use as the unique identifier. Defaults to 'value'. */
  valueKey?: keyof T;
  /** The key in the option object to use as the display label. Defaults to 'label'. */
  labelKey?: keyof T;
  /** Placeholder text for the button when no value is selected. */
  placeholder?: string;
  /** Placeholder text for the search input inside the popover. */
  searchPlaceholder?: string;
  /** Text to display when the search yields no results. */
  emptyText?: string;
  /** Optional label text to display above the select component. */
  label?: string;
  /** Optional CSS class name for the container div */
  className?: string;
  disable?: boolean;
}

/**
 * A reusable Select component with search functionality that accepts pre-fetched data.
 * It manages the selected state as a full object.
 */
export default function SelectWithSearch<T extends OptionType>({
  value,
  options,
  onValueChange,
  valueKey = "value",
  labelKey = "label",
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyText = "No options found.",
  label,
  className,
  disable,
}: SelectWithSearchProps<T>) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);

  // Helper function to safely get string representation of a property
  const getStringValue = (obj: T | null | undefined, key: keyof T): string => {
    if (!obj || obj[key] === undefined || obj[key] === null) {
      return "";
    }
    return String(obj[key]);
  };

  // Get the display label of the currently selected value object
  const selectedLabel = value ? getStringValue(value, labelKey) : placeholder;

  return (
    <div className={cn(label && "*:not-first:mt-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disable ?? false}
            className="bg-background hover:bg-background border-muted-foreground w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {selectedLabel}
            </span>
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command
            // Custom filter function required by cmdk (used by Command)
            // It receives the CommandItem's 'value' prop (which we set to the unique ID)
            // and the current search query.
            // It must return a number (score): 0 for no match, >0 for a match.
            filter={(itemValue, searchValue) => {
              // itemValue is the unique ID string (e.g., "next.js", "user-123")
              const lowerSearch = searchValue.toLowerCase();

              // Check if the search term matches the ID (valueKey)
              const valueMatch = itemValue.toLowerCase().includes(lowerSearch);

              // Find the corresponding full option object to get the label
              const option = options.find(
                (opt) => getStringValue(opt, valueKey) === itemValue
              );
              const label = option ? getStringValue(option, labelKey) : "";

              // Check if the search term matches the label (labelKey)
              const labelMatch = label.toLowerCase().includes(lowerSearch);

              // Return 1 if either matches (basic scoring), 0 otherwise
              return valueMatch || labelMatch ? 1 : 0;
            }}
          >
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const optionId = getStringValue(option, valueKey);
                  const optionLabel = getStringValue(option, labelKey);
                  const isSelected = value
                    ? getStringValue(value, valueKey) === optionId
                    : false;

                  return (
                    <CommandItem
                      className="hover:cursor-pointer"
                      key={optionId}
                      // Pass the unique ID string as the value for Command's internal handling and filtering
                      value={optionId}
                      onSelect={(currentValueId) => {
                        const selectedOption = options.find(
                          (opt) =>
                            getStringValue(opt, valueKey) === currentValueId
                        );
                        onValueChange(selectedOption ?? null);
                        setOpen(false);
                      }}
                    // Prevent default filtering based on label text, rely on our custom filter
                    // This might not be strictly necessary depending on cmdk version, but can prevent conflicts
                    // filter={false} // <-- You might not need this line
                    >
                      {optionLabel /* Display the user-friendly label */}
                      {isSelected && (
                        <CheckIcon size={16} className="ml-auto" />
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
