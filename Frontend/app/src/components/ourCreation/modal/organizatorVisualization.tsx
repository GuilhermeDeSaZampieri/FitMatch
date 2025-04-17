import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import group from "../../../assets/images/group.png";
import mapImage from "../../../assets/images/map.png";

import img from "../../../assets/images/imgCaraTreinando.png";
import { CalendarRange, CirclePlus, Lock, UserRoundCheck } from "lucide-react";
import { ReactNode } from "react";

interface ModalSubscribeActivityProps {
  ActionButton: ReactNode; // nome começa com minúscula (boa prática)
  AprovedParticipants?: ReactNode;
}

function ModalOrganizatorActivity({
  ActionButton,
  AprovedParticipants,
  
}: ModalSubscribeActivityProps) {
  return (
    <div className=" py-40 flex justify-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-emerald-500">
            <CirclePlus />
            Inscrever na atividade
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="w-[848px] h-[752px] flex flex-col">
          <div className="w-full flex gap-x-12 ">
            <div className="space-y-10 w-1/2">
              <div className="  space-y-6">
                <img src={img} />
                <AlertDialogTitle className="text-[#171717] font-heading text-[2rem] font-normal leading-9">
                  EXERCISES WITH JUMPING ROPE
                </AlertDialogTitle>
                <p className="font-normal text-[16px] leading-6 text-[#404040]">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>

                <div className="flex flex-col gap-y-3 font-normal text-[16px] leading-6 text-[#404040]">
                  <div className="flex gap-x-3">
                    <CalendarRange className="text-[#009966] w-5 h-5" />
                    <p>28/01/2025 08:00 </p>
                  </div>
                  <div className="flex gap-x-3">
                    <img src={group} className="  w-5 h-5" />4
                  </div>
                  <div className="flex gap-x-3">
                    <Lock className="text-[#009966] w-5 h-5" /> Mediante
                    aprovação
                  </div>
                </div>
              </div>
              <div className="h-[14]">{ActionButton}</div>
            </div>
            <div className="w-1/2 space-y-6 max-h-[656px]">
              <div className="space-y-2">
                <h1 className="text-[#171717] font-heading text-[28px] font-normal leading-8">
                  PONTO DE ENCONTRO
                </h1>
                <img src={mapImage} />
              </div>

              <div className="space-y-2">
                <h1 className="text-[#171717] font-heading text-[28px] font-normal leading-8">
                  PARTICIPANTES
                </h1>
                <div className="overflow-auto max-h-50 space-y-2 font-semibold text-[16px] leading-5 text-[#404040]">
                  <div className="flex items-center justify-between w-[137px] h-13">
                    <div className="w-13 h-13 border rounded-full"></div>
                    <div className="space-x-0.5">
                      <h2>João Silva</h2>
                      <p className="font-normal text-[12px] leading-4 text-[#404040]">
                        Organizador
                      </p>
                    </div>
                  </div>
                  {AprovedParticipants}

                  <div className="flex items-center justify-between w-[137px] h-13">
                    <div className="w-13 h-13 border rounded-full"></div>
                    <div className="space-x-0.5">
                      <h2>João Silva</h2>
                      <p className="font-normal text-[12px] leading-4 text-[#404040]">
                        Organizador
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-[137px] h-13">
                    <div className="w-13 h-13 border rounded-full"></div>
                    <div className="space-x-0.5">
                      <h2>João Silva</h2>
                      <p className="font-normal text-[12px] leading-4 text-[#404040]">
                        Organizador
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-[137px] h-13">
                    <div className="w-13 h-13 border rounded-full"></div>
                    <div className="space-x-0.5">
                      <h2>João Silva</h2>
                      <p className="font-normal text-[12px] leading-4 text-[#404040]">
                        Organizador
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-[137px] h-13">
                    <div className="w-13 h-13 border rounded-full"></div>
                    <div className="space-x-0.5">
                      <h2>João Silva</h2>
                      <p className="font-normal text-[12px] leading-4 text-[#404040]">
                        Organizador
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-[120px] bg-[#F9F9F9] ">
                <div className="px-6 py-6 space-y-3">
                  <div className="flex w-[185px] h-6 justify-between items-center">
                    <UserRoundCheck className="text-green-600" />
                    <p className="font-semibold text-[16px] leading-5 text-[#404040]">
                      Código de check-in
                    </p>
                  </div>
                  <h1 className="text-[#171717] font-heading text-[2rem] font-normal leading-9">
                    5F23KL
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export { ModalOrganizatorActivity };
