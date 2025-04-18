import { MainActivities } from "@/components/ourCreation/activityBig";
import { ChoseActivity } from "@/components/ourCreation/choseActivity";
import { ContainerActivity } from "@/components/ourCreation/containerActivity";
import { NavBar } from "@/components/ourCreation/navBar";
import { TypeActivities } from "@/components/ourCreation/typeActivity";
import { ModalEditActivity } from "@/components/ourCreation/modal/editActivity";
import { ModalSubscribeActivity } from "@/components/ourCreation/modal/subscribeActivity";
import { Button } from "@/components/ui/button";
import { Ban, CalendarOff, Check, Pencil, X } from "lucide-react";
import { ModalOrganizatorActivity } from "@/components/ourCreation/modal/organizatorVisualization";
import flag from "../../assets/images/flagImg.png";
import { ModalCheckInActivity } from "@/components/ourCreation/modal/checkIn";
import { useEffect, useState } from "react";
import { api, getAuthorization } from "@/services/apiService";

function Home() {
  const [hasPreferences, setHasPreferences] = useState(false);

  useEffect(() => {
    api
      .get("/user/preferences", getAuthorization())
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setHasPreferences(true); // Já tem preferências definidas
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>

      <main className=" px-[110px] pt-6 grid gap-14 justify-items-center mb-7">
        <NavBar />

        <section className="w-full ">
        {!hasPreferences && <ChoseActivity />}
          <div>
            <h1 className="font-heading text-[#171717] text-[1.75rem] leading-[2rem]">
              RECOMENDADO PARA VOCÊ
            </h1>
          </div>
          <div className="flex flex-wrap w-full gap-y-8 mt-4 gap-x-2 ">
            <MainActivities />
            <MainActivities />
            <MainActivities />
            <MainActivities />
            <MainActivities />
            <MainActivities />
            <MainActivities />
            <MainActivities />
          </div>
        </section>
        <section className="w-full ">
          <div className="">
            <h1 className="font-heading text-[#171717] text-[1.75rem] leading-[2rem]">
              TIPOS DE ATIVIDADE
            </h1>
            <div className="flex flex-wrap w-full gap-y-4  gap-x-3 mt-4">
              <TypeActivities />
              <TypeActivities />
            </div>
          </div>
        </section>
        <ModalEditActivity />
        <ModalSubscribeActivity
          ActionButton={
            <Button className="w-56 h-full rounded-[2px] bg-emerald-500 font-bold text-[16px] leading-6 ">
              Participar
            </Button>
          }
        />

        <ModalSubscribeActivity
          ActionButton={
            <Button className="w-58 h-full rounded-[2px] bg-emerald-500 font-bold text-[16px] leading-6 ">
              Aguardando aprovação
            </Button>
          }
        />

        <ModalSubscribeActivity
          ActionButton={
            <Button className="w-58 h-full rounded-[2px] bg-[#E7000B] font-bold text-[16px] leading-6 text-white">
              <div className="flex items-center gap-1">
                <Ban />
                Inscrição negada
              </div>
            </Button>
          }
        />

        <ModalSubscribeActivity
          ActionButton={
            <Button className="w-58 h-full rounded-[2px] border-[#E7000B] border-1 bg-white font-bold text-[16px] leading-6 text-[#E7000B]">
              Desinscrever
            </Button>
          }
        />

        <ModalSubscribeActivity
          ActionButton={
            <Button className="w-56 h-full rounded-[2px] border-black border-1 bg-white font-bold text-[16px] leading-6 text-[#171717] flex space-x-1.5">
              <Pencil />
              Editar
            </Button>
          }
          AprovedParticipants={
            <div className="flex  justify-between w-[289px] h-13">
              <div className="flex items-center justify-between w-[137px]">
                <div className="w-13 h-13 border rounded-full"></div>
                <div className="space-x-0.5">
                  <h2>João Silva</h2>
                  <p className="font-normal text-[12px] leading-4 text-[#404040]">
                    Organizador
                  </p>
                </div>
              </div>
              <div className="w-[62px] flex items-center text-[10px] space-x-1.5">
                <Button className="w-7 h-7 bg-[#00BC7D] rounded-full">
                  <Check />
                </Button>
                <Button variant="destructive" className="w-7 h-7 rounded-full">
                  {" "}
                  <X />
                </Button>
              </div>
            </div>
          }
        />

        <ModalOrganizatorActivity
          ActionButton={
            <Button className="w-56 h-full rounded-[2px] bg-[#00BC7D] font-bold text-[16px] leading-6 text-white flex space-x-1.5">
              <img src={flag} className="w-4 h-4 " />
              Encerrar Atividade
            </Button>
          }
        />
        <ModalCheckInActivity
          ActionButton={
            <Button className="w-[143px] h-full rounded-[2px] bg-[#00BC7D] font-bold text-[16px] leading-6 text-white flex space-x-1.5">
              Confirmar
            </Button>
          }
        />
        <ModalCheckInActivity
          ActionButton={
            <Button className="w-[88px] h-full rounded-[8px] bg-[#00BC7D]  flex space-x-1.5">
              <Check />
            </Button>
          }
        />
        {/*Ultimos 3 */}
        <ModalSubscribeActivity
          ActionButton={
            <Button className="w-58 h-full rounded-[2px] border-1 border-[#404040] bg-white font-bold text-[16px] leading-6 text-[#404040]">
              <div className="flex items-center gap-1">
                Atividade em andamento
              </div>
            </Button>
          }
        />

        <ModalSubscribeActivity
          ActionButton={
            <Button className="w-58 h-full rounded-[2px] border-1 border-[#404040] bg-white font-bold text-[16px] leading-6 text-[#404040]">
              <div className="flex items-center gap-1">Atividade encerrada</div>
            </Button>
          }
        />

        <ModalSubscribeActivity
          ActionButton={
            <Button className="w-58 h-full rounded-[2px] bg-[#E7000B] font-bold text-[16px] leading-6 text-white">
              <div className="flex items-center gap-1">
                <CalendarOff />
                Atividade cancelada
              </div>
            </Button>
          }
        />

        <section className=" flex flex-wrap w-full gap-y-10 gap-x-3">
          <ContainerActivity />
          <ContainerActivity />
          <ContainerActivity />
          <ContainerActivity />
        </section>
      </main>
    </>
  );
}

export { Home };
