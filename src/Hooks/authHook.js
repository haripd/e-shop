import { useContext } from "react"
import { Authcontext } from "../context/Authcontext"

export const useAuth = () => {
    return useContext(Authcontext)
}