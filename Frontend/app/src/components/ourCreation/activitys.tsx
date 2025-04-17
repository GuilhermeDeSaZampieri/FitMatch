import img from "../../assets/images/imgAtividadeTirar.png";
import { CalendarRange, Lock } from "lucide-react";
import group from "../../assets/images/group.png";

function Activities() {
  return (
    <div className="w-[47%]   flex gap-3">
      <div className=" relative w-21 ">
        <img src={img} alt="atividade" className=" w-21 h-21" />
        <div className="absolute top-0 m-1 w-5.5 h-5.5 rounded-full bg-linear-to-r from-[#00BC7D]  to-[#009966] flex justify-center items-center">
          <Lock className=" text-white w-4 h-4 " />
        </div>
      </div>

      <div className="  flex flex-col gap-2 justify-around ">
        <h1 className=" text-[#191919] font-semibold text-[1rem] leading-[1.25rem]">
          Exercises with Jumping Rope
        </h1>
        <div className="flex justify-around text-[0.75rem]">
          <CalendarRange className="text-[#009966] w-4 h-4" />
          <p>28/01/2025 08:00 </p>|
          <img src={group} className=" w-4 h-4" />4
        </div>
      </div>
    </div>
  );
}

export { Activities };
