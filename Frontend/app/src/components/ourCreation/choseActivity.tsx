import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { TypeActivities } from "./typeActivity";
import { api, getAuthorization, getHeaders } from "@/services/apiService";
import { useEffect, useState } from "react";

function ChoseActivity() {
  const [activityType, setActivityType] = useState([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelection = (id: number) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

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


  const onSubmit = (data: any) => {
    api
      .post("/users/preferences/define", JSON.stringify(data), getHeaders())
      .then((response) => {
        console.log("Preferências salvas com sucesso:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao salvar preferências:", error);
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>a</AlertDialogTrigger>

      <AlertDialogContent className=" w-[528px] h-[544px]  flex flex-col gap-12">
        <AlertDialogTitle className="font-heading h-8 text-[2rem] leading-9 text-[#171717] font-normal">
          SELECIONE AS SUAS ATIVIDADES PREFERIDAS
        </AlertDialogTitle>

        <div className="flex flex-wrap w-full h-full gap-4 ">
          {
            activityType.map((data) =>(
              <TypeActivities

              data={data}
              toggleSelection={toggleSelection}
              isSelected={selectedIds.includes(data)} 
            
              />
            ))
            
          }         
        </div>

        <AlertDialogFooter className="text-[16px] font-bold leading-6 h-12 w-full grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          <AlertDialogAction className="bg-[#00BC7D] font-bold h-full" onClick={() => onSubmit({ selectedActivities: selectedIds })}>
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
