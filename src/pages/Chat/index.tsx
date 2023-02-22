
import { AxiosResponse } from "axios"
import React, { useCallback, useEffect, useState } from "react"
import { Doubt } from "types"
import Spinner from "../../components/Spinner"
import { useUser } from "../../store/userContext"
import { Card, Container } from "../../styles/global"
import { API, useAuthenticateApi } from "../../utils/useApi"

import './styles.css'
const convertToTimeString = (dateString: string): string => {
    const _date = new Date(dateString)
    return _date.toLocaleDateString() + " " + _date.toLocaleTimeString()
}
const sleep = async (ms: number) => new Promise((res, rej) => setTimeout(() => res('resolved in ' + ms), ms))
export default () => {

    function statusHandler(status:string) {
        switch (status) {
            case 'ON_GOING':
                return <span className="red">Ocorrendo</span>
            case 'COMPLETE':
                return <span className="green">Completo</span>
            case 'OPEN':
                return <span className="blue">Aberto</span>
            default: return <span className="blue">{status}</span>
        }
    }
    const [doubts, setDoubts] = useState<Doubt[]>([])
    const api = useAuthenticateApi()
    const user = useUser()
    const [selectDoubt, setSelectDoubt] = useState<any>(false)
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const sendMessage = async () => {
        if (!selectDoubt) return
        try {
            setSending(true)
            await api.post(`/doubts/${selectDoubt}`, { message: msg })
            getDoubts()
            setMsg('')
        } catch (e: any) {
            alert('Algo deu errado')
        } finally {
            setSending(false)
        }
    }
    const getDoubts = async () => {
        try {
            const response = await api.get(`/doubts?filter=${JSON.stringify({ order: ['updatedAt DESC', 'createdAt DESC'] })}`)
            console.log('Data')
            setDoubts(response.data)
        } catch (e: any) {
            if (e.response) {
                console.log(e.response.data)
            }
        } finally {
            setLoading(false)
        }
    }
    const getDoubt = (id: string): Doubt | undefined => {
        if (!id) return undefined
        return doubts.find(doubt => {
            return (doubt.id == id)
        })
    }
    const genDoubt = ({ key, name, createdAt: date, preMessage, status }: { key: string, name: string, preMessage: string, createdAt: string, status: string }) => {
        return (
            <div className="chat_list" key={key} onClick={e => {
                setSelectDoubt(key);

            }}>
                <div className="chat_people">
                    <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                    <div className="chat_ib">
                        <h5>{name}<span className="chat_date">{date}</span></h5>
                        <p >{preMessage}</p>
                        <span>{statusHandler(status)}</span>
                    </div>
                </div>
            </div>)
    }
    const incomingMessage = ({ message, createdAt: date, userURI }: { message: string, createdAt: string, userURI: string }) => (
        <div key={userURI + date} className="incoming_msg">
            <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{message}</p>
                    <span className="time_date">{convertToTimeString(date ?? new Date())}</span></div>
            </div>
        </div>
    )
    const outgoingMessage = ({ message, createdAt: date, userURI }: { message: string, createdAt: string, userURI: string }) => (
        <div key={userURI + date} className="outgoing_msg">
            <div className="sent_msg">
                <p>{message}</p>
                <span className="time_date">{convertToTimeString(date ?? new Date())}</span>
            </div>
        </div>
    )
    useEffect(() => {
        getDoubts()
        let interval = setInterval(() => getDoubts(), 10000)
        return () => clearInterval(interval)
    }, [])
    if (loading)
        return (
            <Container >
                <Card className="d-flex j-center " padding="10px 20px 40px 20px">
                    <Spinner width="40px" height="40px" />
                </Card>
            </Container>

        )
    return (
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" type="text/css" rel="stylesheet" />
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <div className="container mt-2">
                <Card>
                    <h3 className=" text-center">Chat de dúvidas</h3>
                    <div className="messaging">
                        <div className="inbox_msg">
                            <div className="inbox_people">
                                <div className="headind_srch">
                                    <div className="recent_heading">
                                        <h4>Recent</h4>
                                    </div>
                                    <div className="srch_bar">
                                        <div className="stylish-input-group">
                                            <input type="text" className="search-bar" placeholder="Procurar" />
                                            <span className="input-group-addon">
                                                <button type="button"> <i className="fa fa-search" aria-hidden="true" /> </button>
                                            </span> </div>
                                    </div>
                                </div>
                                <div className="inbox_chat">
                                    {doubts.map((item: any) => genDoubt({
                                        name: item.advisorName ?? 'Aguardando atendimento...',
                                        createdAt: convertToTimeString(item.updatedAt ?? item.createdAt ?? new Date()),
                                        key: item.id,
                                        preMessage: item.messages && item.messages.length != 0 && item.messages[0].message,
                                        status: item.status
                                    }))}
                                </div>
                            </div>
                            <div className="mesgs">
                                <div className="msg_history">
                                    {
                                        getDoubt(selectDoubt) && getDoubt(selectDoubt)?.messages &&
                                        getDoubt(selectDoubt)?.messages?.map((message: any) => message.userURI.includes(user.id) ? outgoingMessage(message) : incomingMessage(message))
                                    }
                                </div>
                                <div className="type_msg">
                                    <div className="input_msg_write">
                                        <input disabled={!selectDoubt} value={msg} type="text" onKeyDown={e => {
                                            e.key === 'Enter' && sendMessage()

                                        }} className="write_msg" onChange={e => setMsg(e.target.value)} placeholder="Escreva uma mensagem" />
                                        {!sending &&
                                            <button disabled={!selectDoubt} onClick={e => { e.preventDefault; sendMessage() }} className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true" /></button>
                                        }
                                        {sending &&
                                            <Spinner className="msg_send_btn" width="25px" height="25px" />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center top_spac"> Créditos à <a target="_blank" href="https://www.linkedin.com/in/sunil-rajput-nattho-singh/">Sunil Rajput</a></p>
                    </div>
                </Card>
            </div>
        </>
    )
}