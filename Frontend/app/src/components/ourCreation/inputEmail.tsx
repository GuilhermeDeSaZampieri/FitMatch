import { ControllerRenderProps } from "react-hook-form";
import { FormControl, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

// Se for um componente React, o nome deve começar com letra maiúscula

interface EmailProps {
  field: ControllerRenderProps<any, "email">;
}

function Email({ field }: EmailProps) {
  return (
    <>
      <FormLabel>E-mail{<p className="text-[#E7000b]">*</p>}</FormLabel>
      <FormControl className="w-full">
        <Input placeholder="Ex.: joao@email.com" {...field} />
      </FormControl>
    </>
  );
}

// Exportação correta
export { Email };
