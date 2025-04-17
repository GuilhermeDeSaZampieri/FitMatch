import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { FormControl, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

// Se for um componente React, o nome deve começar com letra maiúscula

interface PasswordProps {
  field: ControllerRenderProps<any, "password">;
}

function Password({ field }: PasswordProps) {
  const [typePass, setTypePass] = useState<"password" | "text">("text");

  let Show = (e: React.MouseEvent) => {
    e.preventDefault();
    setTypePass((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <>
      <FormLabel>
        Senha<span className="text-[#E7000b]">*</span>
      </FormLabel>
      <div className="relative flex items-center">
        <FormControl className="w-full">
          <Input
            type={typePass}
            placeholder="Ex.: joao123"
            className="pr-10"
            {...field}
          />
        </FormControl>

        <div onClick={Show} className="cursor-pointer absolute right-4">
          {typePass === "password" ? (
            <EyeOff className=" text-[#A1A1A1]" />
          ) : (
            <Eye className=" text-[#A1A1A1]" />
          )}
        </div>
      </div>
    </>
  );
}

// Exportação correta
export { Password };
