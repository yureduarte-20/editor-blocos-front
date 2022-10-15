import { useAuth } from "../store/authContext";
import axios, { AxiosResponse } from "axios";
import { Store } from "react-notifications-component";
const BASE_URL = 'http://172.17.0.1:3001'
import { useUser } from '../store/userContext'

export class API{
    private static api? : API
    private BASE_URL_API : string = BASE_URL;
    private token? : string;
    public static getInstance() : API{
        if(!this.api){
            this.api = new API();
            return this.api;
        }
        return this.api;
    }

    public setToken(token : string){
        this.token = token;
    }

    public async getAutenticated(subPath: string) : Promise<AxiosResponse<any, any>>{
        return axios.get(this.BASE_URL_API + subPath, { 
            headers:{
                Authorization : `Bearer ${this.token}`
            }
         });
    }
    public async postAutenticated(subPath : string, data : any) : Promise<AxiosResponse<any, any>>{
        return axios.post(this.BASE_URL_API + subPath, data, {
            headers:{
                Authorization : `Bearer ${this.token}`
            }
        });
    }
    
    public async putAutenticated(subPath : string, data : any){
        return axios.put(this.BASE_URL_API + subPath, data, {
            headers:{
                Authorization : `Bearer ${this.token}`
            }
        });
    }
    
    public async patchAutenticated(subPath : string, data : any){
        return axios.patch(this.BASE_URL_API + subPath, data, {
            headers:{
                Authorization : `Bearer ${this.token}`
            }
        });
    }

    public async delAutenticated(subPath: string) : Promise<AxiosResponse<any, any>>{
        return axios.delete(this.BASE_URL_API + subPath, { 
            headers:{
                Authorization : `Bearer ${this.token}`
            }
         });
    }

}

export const useAuthenticateApi = () => {
    const { token, removeToken } = useAuth();
    const { removeUser } = useUser()
    const api = axios.create({
        baseURL: BASE_URL,
    })
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
                if (token) {
                    removeUser()
                    removeToken()
                    Store.addNotification({
                        container: 'top-center',
                        title: 'Sua sessão expirou',
                        type:'danger',
                        message: 'Logue-se novamente para acessar a aplicação.',
                        insert: 'top',
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true
                        }
                    })
                }
            }
            console.log(e)
            if (e.code == 'ERR_NETWORK')
                Store.addNotification({
                    container: 'top-center',
                    title: 'Sem conexão com a intenet',
                    message: 'Tente navamente mais tarde',
                    insert: 'top',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
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
                if (token) {
                    removeUser()
                    removeToken()
                    Store.addNotification({
                        container: 'top-center',
                        title: 'Sua sessão expirou',
                        type:'danger',
                        message: 'Logue-se novamente para acessar a aplicação.',
                        insert: 'top',
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true
                        }
                    })
                }
            }
            if (e.code == 'ERR_NETWORK')
                Store.addNotification({
                    container: 'top-center',
                    title: 'Sem conexão com a internet.',
                    message:'',
                    
                    insert: 'top',
                    type: 'danger',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
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
                if (token) {
                    removeUser()
                    removeToken()
                    Store.addNotification({
                        container: 'top-center',
                        title: 'Sua sessão expirou',
                        type:'danger',
                        message: 'Logue-se novamente para acessar a aplicação.',
                        insert: 'top',
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true
                        }
                    })
                }
            }
            if (e.code == 'ERR_NETWORK')
                Store.addNotification({
                    container: 'top-center',
                    title: 'Sem conexão com a internet.',
                    message:'',
                    insert: 'top',
                    type: 'danger',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
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
                if (token) {
                    removeUser()
                    removeToken()
                    Store.addNotification({
                        container: 'top-center',
                        title: 'Sua sessão expirou',
                        type:'danger',
                        message: 'Logue-se novamente para acessar a aplicação.',
                        insert: 'top',
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true
                        },
                    })
                }
            }
            if (e.code == 'ERR_NETWORK')
                Store.addNotification({
                    container: 'top-center',
                    title: 'Sem conexão com a internet.',
                    message:'',
                    
                    insert: 'top',
                    type: 'danger',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
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
                if (token) {
                    removeUser()
                    removeToken()
                    Store.addNotification({
                        container: 'top-center',
                        title: 'Sua sessão expirou',
                        type:'danger',
                        message: 'Logue-se novamente para acessar a aplicação.',
                        insert: 'top',
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true
                        }
                    })
                }
            }
            if (e.code == 'ERR_NETWORK')
                Store.addNotification({
                    container: 'top-center',
                    title: 'Sem conexão com a internet.',
                    message:'',
                    
                    insert: 'top',
                    type: 'danger',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                })
            throw e
        }
    }
    return { get, post, del, put, patch }
}

export function useApi() {
    /*     const [//open, close] = useSnackbar({
            position: "top-center",
            style: {
                backgroundColor: '#d32f2f',
                color: 'white'
            }
        }, 3000) */
        const api = axios.create({
            baseURL: BASE_URL,
        })
    const post = async (url: string, data: any) => {
        try {
            let response = await api.post(url, data);
            return response
        } catch (e: any) {
            if (e.code == 'ERR_NETWORK')
                Store.addNotification({
                    container: 'top-center',
                    title: 'Sem conexão com a internet.',
                    message:'',
                    
                    insert: 'top',
                    type: 'danger',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                })
            throw e
        }
    }
    const get = async (url: string, config? : any ) => {
        try {
            console.log(config)
            let response = await api.get(url, config );
            return response
        } catch (e: any) {
            if (e.code == 'ERR_NETWORK')
                Store.addNotification({
                    container: 'top-center',
                    title: 'Sem conexão com a internet.',
                    message:'',
                    
                    insert: 'top',
                    type: 'danger',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
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
                    container: 'top-center',
                    title: 'Sem conexão com a internet.',
                    message:'',
                    
                    insert: 'top',
                    type: 'danger',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
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
                    container: 'top-center',
                    title: 'Sem conexão com a internet.',
                    message:'',
                    
                    insert: 'top',
                    type: 'danger',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
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
                    container: 'top-center',
                    title: 'Sem conexão com a internet.',
                    message:'',
                    
                    insert: 'top',
                    type: 'danger',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                })
            throw e
        }
    }
    return { get, post, del, put, patch }
}

function AxiosRequestConfig<T>(arg0: number): any {
    throw new Error("Function not implemented.");
}

