import React, { createContext, useContext, useEffect, useState } from 'react';
import useStorage from '../utils/useStorage';
export type User = {
    id?: string,
    email?: string,
    name?: string
    role?: Roles
}
export enum Roles {
    ADMIN = 'ADMIN',
    ADVISOR = 'ADVISOR',
    STUDENT = 'STUDENT'
}

export enum Services {
    USER_SERVICE = 'USER_SERVICE',
    PROBLEM_SERVICE = 'PROBLEM_SERVICE',
    CHAT_SERVICE = 'CHAT_SERVICE',
    JUDGE_SERVICE = 'JUDGE_SERVICE'
}

export interface IUserContext extends User {
    setUser(user: User): void;
    removeUser(): void;
}
export const UserContext = createContext<IUserContext>({
    setUser: (user: User) => { },
    removeUser: () => { },
    id: undefined,
    email: undefined,
    name: undefined,
    role: undefined
})
export const UserProvider = (props: any) => {
    const [_user, set, remove] = useStorage("profile");
    const setUser = (user: User) => {
        set(JSON.stringify(user))
    }
    const removeUser = () => {
        remove("profile");
    }
    let user: User = {
        id: undefined,
        email: undefined,
        name: undefined,

    }
    try {
        user = JSON.parse(_user);
    } catch (e) {

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