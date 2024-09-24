import { Input } from "@/components/ui/input";

interface InputDemoProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputDemo({
  label,
  type = "email",
  placeholder = "Email",
  value,
  onChange,
}: InputDemoProps) {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 text-gray-700">{label}</label>}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
    </div>
  );
}
