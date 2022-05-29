import { useAuth } from "../store/authContext";
import axios from "axios";
import { Store } from "react-notifications-component";

const api = axios.create({
    baseURL: 'http://[::1]:3000',

})


export const useAuthenticateApi = () => {
 /*    const [open, close] = useSnackbar({
        position: "top-center",
        style: {
            backgroundColor: '#d32f2f',
            color: 'white'
        }
    }, 3000) */
    const { token, removeToken } = useAuth();
    // colocar o cabeçalho padrão autenticação JWT
    api.interceptors.request.use((config: any) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    })
    const post = async (url: string, data: any) => {
        try {
            let response = await api.post(url, data);
            return response
        } catch (e: any) {
            if (e.response.status === 401) {
                if(token)
                removeToken()
                //open("Sua sessão expirou.")
            }
            console.log(e)
            if (e.code == 'ERR_NETWORK')
                Store.addNotification({
                    container:'top-center',
                    title:'Sem conexão com a Internet',
                    message:'p',
                    insert:'top',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss:{
                        duration: 5000,
                        onScreen: true
                    }
                })
            throw e
        }
    }
    const get = async (url: string) => {
        try {
            let response = await api.get(url);
            return response
        } catch (e: any) {
            if (e.response.status === 401) {
                if(token)
                removeToken()
                //open("Sua sessão expirou.")
            }
            if (e.code == 'ERR_NETWORK')
                Store.addNotification({
                    container:'top-center',
                    title:'Sem conexão com a Internet',
                    insert:'top',
                    type:'danger',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss:{
                        duration: 5000,
                        onScreen: true
                    }
                })
            throw e
        }
    }
    const put = async (url: string, data: any) => {
        try {
            let response = await api.put(url, data);
            return response
        } catch (e: any) {
            if (e.response.status === 401) {
                if(token)
                removeToken()
                //open("Sua sessão expirou.")
            }
            if (e.code == 'ERR_NETWORK')
                Store.addNotification({
                    container:'top-center',
                    title:'Sem conexão com a Internet',
                    insert:'top',
                    type:'danger',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss:{
                        duration: 5000,
                        onScreen: true
                    }
                })
            throw e
        }
    }
    const patch = async (url: string, data: any) => {
        try {
            let response = await api.patch(url, data);
            return response
        } catch (e: any) {
            if (e.response.status === 401) {
                if(token)
                removeToken()
                //open("Sua sessão expirou.")
            }
            if (e.code == 'ERR_NETWORK')
                Store.addNotification({
                    container:'top-center',
                    title:'Sem conexão com a Internet',
                    insert:'top',
                    type:'danger',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss:{
                        duration: 5000,
                        onScreen: true
                    }
                })
            throw e
        }
    }
    const del = async (url: string) => {
        try {
            let response = await api.delete(url);
            return response
        } catch (e: any) {
            if (e.response.status === 401) {
                if(token)
                removeToken()
                //open("Sua sessão expirou.")
            }
            if (e.code == 'ERR_NETWORK')
                Store.addNotification({
                    container:'top-center',
                    title:'Sem conexão com a Internet',
                    insert:'top',
                    type:'danger',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss:{
                        duration: 5000,
                        onScreen: true
                    }
                })
            throw e
        }
    }
    return { get, post, del, put, patch }
}

export function useApi (){
/*     const [//open, close] = useSnackbar({
        position: "top-center",
        style: {
            backgroundColor: '#d32f2f',
            color: 'white'
        }
    }, 3000) */
    const post = async (url: string, data: any) => {
        try {
            let response = await api.post(url, data);
            return response
        } catch (e: any) {
            if (e.code == 'ERR_NETWORK')
                Store.addNotification({
                    container:'top-center',
                    title:'Sem conexão com a Internet',
                    insert:'top',
                    type:'danger',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss:{
                        duration: 5000,
                        onScreen: true
                    }
                })
            throw e
        }
    }
    const get = async (url: string) => {
        try {
            let response = await api.get(url);
            return response
        } catch (e: any) {
            if (e.code == 'ERR_NETWORK')
                Store.addNotification({
                    container:'top-center',
                    title:'Sem conexão com a Internet',
                    insert:'top',
                    type:'danger',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss:{
                        duration: 5000,
                        onScreen: true
                    }
                })
            throw e
        }
    }
    const put = async (url: string, data: any) => {
        try {
            let response = await api.put(url, data);
            return response
        } catch (e: any) {
            if (e.code == 'ERR_NETWORK')
                Store.addNotification({
                    container:'top-center',
                    title:'Sem conexão com a Internet',
                    insert:'top',
                    type:'danger',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss:{
                        duration: 5000,
                        onScreen: true
                    }
                })
            throw e
        }
    }
    const patch = async (url: string, data: any) => {
        try {
            let response = await api.patch(url, data);
            return response
        } catch (e: any) {
            if (e.code == 'ERR_NETWORK')
                Store.addNotification({
                    container:'top-center',
                    title:'Sem conexão com a Internet',
                    insert:'top',
                    type:'danger',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss:{
                        duration: 5000,
                        onScreen: true
                    }
                })
            throw e
        }
    }
    const del = async (url: string) => {
        try {
            let response = await api.delete(url);
            return response
        } catch (e: any) {
            if (e.code == 'ERR_NETWORK')
                Store.addNotification({
                    container:'top-center',
                    title:'Sem conexão com a Internet',
                    insert:'top',
                    type:'danger',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss:{
                        duration: 5000,
                        onScreen: true
                    }
                })
            throw e
        }
    }
    return { get, post, del, put, patch }
}

