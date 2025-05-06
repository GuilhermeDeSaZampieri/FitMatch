import { useContext } from "react";
import { AppContext } from "../context/App";

export default function useAppContext() {
    return useContext(AppContext);
}
