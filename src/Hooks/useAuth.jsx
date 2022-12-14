import API from "../Axios/Axios"
import useAuthContext from "./useAuthContext"

const useAuth = () => {

    const { setUser, setError } = useAuthContext();

    const login = (email, password) => {
        API.post("user/login/", { email, password }).then(data => {
            console.log(data);

            if (data.data.jwt) {
                setUser(data.data)
                localStorage.setItem("user", JSON.stringify(data.data))
            }
            else {
                setError(data.data)
            }

        }).catch((err) => {
            console.log(err);
        })
    }
    const signup = (email, password) => {
        API.post("user/signup/", { email, password }).then(data => {
            if (data.data.jwt) {
                setUser(data.data)
                localStorage.setItem("user", JSON.stringify(data.data))
            }
            else {
                setError(data.data)
            }
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    }
    const logout = () => {
        localStorage.clear();
        setUser(null);
    }
    return { login, signup, logout }
}

export default useAuth;