"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

interface User {
    id: number;
    name: string;
    username: string;
    role?: string;
}

interface UserContextType {
    user: User | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userCookie = getCookie("user");
        if (userCookie) {
            console.log({ userCookie });
            try {
                setUser(JSON.parse(userCookie as string));
            } catch (err) {
                console.error("Failed to parse user cookie", err);
            }
        }
    }, []);

    const login = (userData: User, token: string) => {
        setUser(userData);

        setCookie('user', userData, {
            path: '/',
            secure: false,
            sameSite: 'lax',
        });

        // Set auth token cookie
        setCookie('token', token, {
            path: '/',
            secure: false,
            sameSite: 'lax',
        });

    };

    const logout = () => {
        setUser(null);
        deleteCookie("user");
        deleteCookie("token");
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook custom
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within UserProvider");
    }
    return context;
};
