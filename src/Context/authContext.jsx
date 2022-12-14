import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [error, setError] = useState(null);
    return <AuthContext.Provider value={{ user, setUser, error, setError }}>
        {children}
    </AuthContext.Provider>
}