import { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('user_token');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);

                if (decodedUser.exp * 1000 > Date.now()) {
                    setUser(decodedUser);
                } else {

                    localStorage.removeItem('user_token');
                }
            } catch (error) {
                console.error("Token inválido no localStorage", error);
                localStorage.removeItem('user_token');
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('user_token', token);
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
    };

    const logout = () => {
        localStorage.removeItem('user_token');
        setUser(null);
    };

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}

