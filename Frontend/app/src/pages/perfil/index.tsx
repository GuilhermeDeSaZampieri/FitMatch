import { Button } from "@/components/ui/button";
import trophy from "../../assets/images/trophyMedal.png";
import { Pencil } from "lucide-react";
import indianGuy from "../../assets/images/Ellipse.png";
import { Progress } from "@/components/ui/progress";
import { MedalImg } from "@/components/ourCreation/medalImg";
import { NavBar } from "@/components/ourCreation/navBar";
import { Activities } from "@/components/ourCreation/activitys";
import { Link } from "react-router";

import { api, getAuthorization } from "@/services/apiService";
import { useEffect, useState } from "react";

function Perfil() {
  const [level, setLevel] = useState("");
  const [name, setName] = useState("");
  const [xp, setXp] = useState("");

  const getUser = () => {
    api
      .get(`/user`, getAuthorization())
      .then((response) => {
        setName(response.data.name);
        setLevel(response.data.level);
        setXp(response.data.xp);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <main className=" px-[110px] pt-6 grid gap-14 justify-items-center">
        <NavBar />

        <section className="grid gap-4 bg-[#FAFAFA] w-full">
          <div className="flex justify-end  px-10 h-10 mt-10">
            <Link to="/EditarPerfil" className="h-full">
              <Button
                variant="outline"
                className="flex items-center gap-2 text-[#A1A1A1] bg-[#FAFAFA] font-normal h-full"
              >
                <Pencil className="w-4 h-4" />
                Editar perfil
              </Button>
            </Link>
          </div>
          <div className=" grid place-items-center px-10 mb-10">
            <div className="grid h-61 w-48">
              <div>
                <img src={indianGuy} className="w-full" />
              </div>
              <div className=" flex items-end justify-center h-full">
                <h1 className=" text-center text-[2rem] text-[#171717] leading-[2.25rem] font-heading">
                  {name}
                </h1>
              </div>
            </div>
            <div className=" grid grid-cols-2 gap-x-3 mt-10 px-44 h-52 w-full">
              <div className=" bg-[#F5F5F5] w-full px-8 py-8.5">
                <div className=" h-full w-full grid ">
                  <div className="flex justify-between py-2 ">
                    <div className="grid">
                      <h2 className="font-semibold text-[0.75rem]">
                        Seu nível é
                      </h2>
                      <h1 className="font-bold text-2xl">{level}</h1>
                    </div>
                    <img src={trophy} />
                  </div>
                  <div className="grid">
                    <div className="h-1/2"></div>
                    <div className="h-1/2">
                      <div className="flex justify-between pb-2">
                        <p>Pontos para o próximo nível</p>
                        <h1 className="h-full">25/50 pts</h1>
                      </div>
                      <Progress value={parseInt(xp)} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#F5F5F5] w-full px-8 py-8">
                <div className=" h-full w-full grid grid-cols-3 gap-3">
                  <MedalImg text="Participou de 5 atividades" />
                  <MedalImg text="Participou de 10 atividades" />
                  <MedalImg text="Participou de 15 atividades" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid-rows-2 gap-4 w-full">
          <div>
            <h1 className="font-heading text-[#171717] text-[1.75rem] leading-[2rem]">
              MINHAS ATIVIDADES
            </h1>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(289px,1fr))] gap-4 mt-4">
            <Activities />
            <Activities />
            <Activities />
            <Activities />
            <Activities />
          </div>
        </section>

        <section className="grid-rows-2 gap-4 w-full">
          <div>
            <h1 className="font-heading text-[#171717] text-[1.75rem] leading-[2rem]">
              HISTÓRICO DE ATIVIDADES
            </h1>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(289px,1fr))] gap-4 mt-4">
            <Activities />
            <Activities />
            <Activities />
            <Activities />
            <Activities />
          </div>
        </section>
      </main>
    </>
  );
}

export { Perfil };
