import { useContext } from "react"
import { AuthContext } from "../Context/authContext";

const useAuthContext = () => {
    const { user, setUser, error, setError } = useContext(AuthContext);
    return { user, setUser, error, setError }
}

export default useAuthContext