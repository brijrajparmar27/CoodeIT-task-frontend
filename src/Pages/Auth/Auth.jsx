import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAuthContext from "../../Hooks/useAuthContext";
import "./Auth.css";

const Auth = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLogin, setIsLogin] = useState(true);

    const { user, error, setError } = useAuthContext();
    const navigate = useNavigate();

    const { login, signup } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            login(email, password);
        }
        else {
            signup(email, password)
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user])

    const toogleState = () => {
        setIsLogin(prev => !prev);
        setError(null)
    }

    return <div className="authPage">
        {error && <p>{error.message}</p>}
        {isLogin && <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input type="text" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
            <input type="submit" value="Login" />
        </form>}
        {!isLogin && <form onSubmit={handleSubmit}>
            <h1>signup</h1>
            <input type="text" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
            <input type="submit" value="signup" />
        </form>}
        {isLogin ? <p onClick={toogleState}>dont have an account? sing up</p> : <p onClick={toogleState}>already have an account? login</p>}
    </div>
}

export default Auth