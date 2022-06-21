import React, { createContext, useContext, useEffect, useState } from 'react';
import useStorage from '../utils/useStorage';
export type User = {
    id: number | string | null;
    name: string | null;
    email: string |  null;
    role: string | null;
}
export interface IUserContext extends User {
    setUser(user : User) : void;
    removeUser() : void;
}
export const UserContext = createContext<IUserContext>({
    setUser:(user : User) =>{},
    removeUser:() =>{},
    id: null,
    email: null,
    name: null,
    role: null,
})
export const UserProvider = (props: any) => {
    const [_user, set, remove] = useStorage("profile");
    const setUser = (user : User) =>{
        set(JSON.stringify( user ))
    }
    const removeUser = () => {
        remove();
    }
    let user : User = { email:null, id:null, name : null, role: null }
    try{
        user = JSON.parse(_user);
    } catch(e){

    }
    return (
        <UserContext.Provider
            value={{
                ...user,
                removeUser,
                setUser
            }}>
            {props.children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    return useContext(UserContext);
}