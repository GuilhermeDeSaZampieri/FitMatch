import { CalendarRange } from "lucide-react";
import mainImg from "../../assets/images/mainActivity.png";
import group from "../../assets/images/group.png";

function MainActivities() {
  
  return (
    <div className="flex flex-col gap-y-4">
      <img src={mainImg} alt="atividade" className="w-[296px] h-full" />
      <div className="grid gap-y-3">
        <h1 className="text-[#191919] font-semibold text-[1rem] leading-[1.25rem]">
          Exercises with Jumping Rope
        </h1>

        <div className="flex gap-x-1.5 text-[0.75rem]">
          <CalendarRange className="text-[#009966] w-4 h-4" />
          <div className="flex gap-x-3">
            <p>28/01/2025 08:00 </p>|
            <img src={group} className=" w-4 h-4" />4
          </div>
        </div>
      </div>
    </div>
  );
}

export { MainActivities };
