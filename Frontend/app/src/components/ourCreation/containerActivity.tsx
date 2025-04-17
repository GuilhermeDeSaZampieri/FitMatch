import { Link } from "react-router";
import { Activities } from "./activitys";

function ContainerActivity() {
  return (
    <div className="flex flex-col gap-y-4 w-[598px] ">
      <div className="flex justify-between items-center w-[97%] h-8">
        <h1 className="font-heading text-[#171717] text-[1.75rem] leading-[2rem] h-full">
          CORRIDA
        </h1>
        <Link to="/Home/Listagem">
          <p className="text-[1rem] font-bold leading-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-1">
            Ver mais
          </p>
        </Link>
      </div>
      <div className="w-full flex flex-wrap  gap-4 ">
        <Activities />
        <Activities />
        <Activities />
        <Activities />
        <Activities />
        <Activities />
      </div>
    </div>
  );
}

export { ContainerActivity };
