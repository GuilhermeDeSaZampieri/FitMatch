import { MainActivities } from "@/components/ourCreation/activityBig";
import { ContainerActivity } from "@/components/ourCreation/containerActivity";
import { NavBar } from "@/components/ourCreation/navBar";
import { TypeActivities } from "@/components/ourCreation/typeActivity";

function ListOfType() {
  return (
    <>
      <main className=" px-[110px] pt-6 grid gap-14 justify-items-center mb-7">
        <NavBar />
        <section className="w-full ">
          <div>
            <h1 className="font-heading text-[#171717] text-[1.75rem] leading-[2rem]">
              POPULAR EM CORRIDA
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
       

        <section className=" flex flex-wrap w-full gap-y-10 gap-x-3">
          <ContainerActivity />
          <ContainerActivity />
          <ContainerActivity />
          <ContainerActivity />
        </section>

        <section className="w-full ">
          <div className="">
            <h1 className="font-heading text-[#171717] text-[1.75rem] leading-[2rem]">
              OUTROS TIPOS DE ATIVIDADE
            </h1>
            <div className="flex flex-wrap w-full gap-y-4  gap-x-3 mt-4">
              <TypeActivities />
              <TypeActivities />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export { ListOfType };
