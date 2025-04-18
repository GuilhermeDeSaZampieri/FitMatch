import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { TypeActivities } from "./typeActivity";
import { api, getAuthorization } from "@/services/apiService";
import { useEffect, useState } from "react";

function ChoseActivity() {
  const [activityType, setActivityType] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setOpenDialog(true);
  }, []);

  

  useEffect(() => {
    const fetchActivityType = () => {
      api
        .get<[]>(`/activities/types`, getAuthorization())
        .then((response) => {
          setActivityType(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchActivityType();
  }, []);


  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogContent className=" w-[528px] h-[544px]  flex flex-col gap-12">
        <AlertDialogTitle className="font-heading h-8 text-[2rem] leading-9 text-[#171717] font-normal">
          SELECIONE AS SUAS ATIVIDADES PREFERIDAS
        </AlertDialogTitle>

        <div className="flex flex-wrap w-full h-full gap-4 ">
          {activityType.map((data) => (
            <TypeActivities
              data={data}
            />
            
          ))}
        </div>

        <AlertDialogFooter className="text-[16px] font-bold leading-6 h-12 w-full grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          <AlertDialogAction
            className="bg-[#00BC7D] font-bold h-full"
          >
            Confirmar
          </AlertDialogAction>
          <AlertDialogCancel className="text-[#009966] font-bold border-[#009966] h-full">
            Pular
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { ChoseActivity };
