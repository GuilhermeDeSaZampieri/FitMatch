// import { Link } from "react-router";
// <Link to="/Home/Listagem">
// </Link>
function TypeActivities({ data }: any) {
  console.log(data);
  return (
    <div className="flex items-center flex-col gap-2 w-[90px] h-[90px]">
      <div>
        <img
          src={data?.data?.image}
          alt="atividade"
          className="rounded-full w[80px] h-[80px]
          transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-1"
        />
      </div>

      <div className="flex justify-center">
        <h1 className="text-[#191919] font-semibold text-[1rem] leading-[1.25rem]">
          {data?.data?.name}
        </h1>
      </div>
    </div>
  );
}

export { TypeActivities };
