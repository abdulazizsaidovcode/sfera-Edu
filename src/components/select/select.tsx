import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectComponentProps {
  label: string;
  options: { value: string; label: string }[];
  placeholder: string;
  onChange: (value: string) => void;
  width?: string; 
  
}

export function SelectComponent({
  label,
  options,
  placeholder,
  onChange,
  width = "180px", 
  
}: SelectComponentProps) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className={`py-6`} style={{ width }}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
