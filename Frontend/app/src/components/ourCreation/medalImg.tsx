import medal from "../../assets/images/medal.png";

function MedalImg({ text }: { text: string }) {
  return (
    <div className="grid w-1/2 1/2 ">
      <div className="bg-[#ECECEC] rounded-full h-20 w-20 flex justify-center items-center">
        <img src={medal} />
      </div>
      <p className="flex text-center text-[0.75rem]">{text}</p>
    </div>
  );
}

export { MedalImg };
