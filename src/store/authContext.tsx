import React, { createContext, useContext, useEffect, useState } from 'react';
import useStorage from '../utils/useStorage';
export const AuthContext = createContext({
    token: null,
    setToken: (token: string) => { },
    removeToken: (): void => { },
})
export const AuthProvider = (props: any) => {
    const [token, setToken, removeToken] = useStorage("token");
    return (
        <AuthContext.Provider
            value={{
                setToken, token, removeToken
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const { token, setToken, removeToken} = useContext(AuthContext);
    return {
        token, setToken, removeToken
    }
}