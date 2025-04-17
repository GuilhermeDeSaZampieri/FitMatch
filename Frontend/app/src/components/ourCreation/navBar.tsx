import logo from "../../assets/images/Logo.png";
import indianGuy from "../../assets/images/Ellipse.png";
import { Link } from "react-router";
import { ModalCreateActivity } from "./modal/createActivity";

function NavBar() {
  return (
    <header className="flex justify-between w-full h-13">
      <div className="flex items-center">
        <Link to="/">
          <img
            className="transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-1"
            src={logo}
            alt="Logo"
          />
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <ModalCreateActivity />
        <Link to="/Perfil">
          <div className="h-13 w-13 bg-gradient-to-r from-[#00BC7D] to-[#009966] rounded-full p-[2px] transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-1">
            <div className="h-full w-full bg-white rounded-full p-[2px]">
              <img
                src={indianGuy}
                className="h-full w-full object-cover rounded-full"
              />
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}

export { NavBar };
