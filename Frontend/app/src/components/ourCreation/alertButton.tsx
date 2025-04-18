import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { api, getAuthorization } from "@/services/apiService";


const desactiveUser = () =>{
  api.delete("/user/deactivate" ,getAuthorization())
  .then(()=>{
    console.log("Desativado com sucesso");
  }).catch((error) =>{
    console.log(error);
  })
}


function AlertButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className=" flex justify-center mt-8 gap-2 w-full">
        <Button variant="link" className="text-[#E7000B]">
          <Trash2 />
          <p className="font-bold">Desativar Minha Conta</p>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className=" w-[578px] h-[300px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-heading text-[2rem] leading-9 text-[#171717] font-normal">
            TEM CERTEZA QUE DESEJA DESATIVAR SUA CONTA?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[1rem] leading-6 text-[#404040]">
            Ao desativar sua conta, todos os seus dados e histórico de
            atividades serão permanentemente removidos.
            <span className="font-bold ml-1">
              Esta ação é irreversível e não poderá ser desfeita.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="text-[16px] font-bold leading-6">
          <AlertDialogCancel className="text-[#171717] font-bold border-[#171717]">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={desactiveUser} className="bg-[#E7000B] font-bold">
            Desativar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export { AlertButton };
