
import { AxiosResponse } from "axios"
import React, { useEffect, useState } from "react"
import { useUser } from "../../../store/userContext"
import { Card } from "../../../styles/global"
import { useAuthenticateApi } from "../../../utils/useApi"
import './styles.css'
export default () => {
    const [doubts, setDoubts] = useState([])
    const api = useAuthenticateApi()
    const user = useUser()
    const [selectDoubt, setSelectDoubt] = useState<any>(false)
    const [msg, setMsg] = useState('')
    
    const sendMessage = async () => {
        if (!selectDoubt) return
        try {
            await api.post(`/doubts/${selectDoubt.id}`, { message: msg })
            const response = await api.get(`advisor/doubts/${selectDoubt.id}`)
            console.log(response.data)
            setSelectDoubt((state: any) => response.data)
            setMsg('')
        } catch (e: any) {
            alert('Algo deu errado')
        }
    }
    const getDoubts = async () => {
        try {
            const response = await api.get(`/advisor/doubts?filter=${JSON.stringify({ where: { advisorURI: `/users/${user.id}` } })}`)
            //let doubtsMap = new Map<any
            setDoubts(response.data)
        } catch (e: any) {
            if (e.response) {
                console.log(e.response.data)
            }
        }
    }
    const genDoubt = ({ key, name, date, preMessage }: { key: string, name: string, date: string, preMessage: string }) => (
        <div className="chat_list" key={key} onClick={e => setSelectDoubt(doubts.find((_item: any) => _item.id === key))}>
            <div className="chat_people">
                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                <div className="chat_ib">
                    <h5>{name}<span className="chat_date">{date}</span></h5>
                    <p >{preMessage}</p>
                </div>
            </div>
        </div>)
    const incomingMessage = ({ message, date, userURI }: { message: string, date: string, userURI: string }) => (
        <div key={userURI + date} className="incoming_msg">
            <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{message}</p>
                    <span className="time_date">{date}</span></div>
            </div>
        </div>
    )
    const outgoingMessage = ({ message,  createdAt: date, userURI }: { message: string, createdAt: string, userURI: string }) => (
        <div key={userURI + date} className="outgoing_msg">
            <div className="sent_msg">
                <p>{message}</p>
                <span className="time_date">{date}</span>
            </div>
        </div>
    )
    useEffect(() => {
        getDoubts()
    }, [])
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
                                            <input type="text" className="search-bar" placeholder="Search" />
                                            <span className="input-group-addon">
                                                <button type="button"> <i className="fa fa-search" aria-hidden="true" /> </button>
                                            </span> </div>
                                    </div>
                                </div>
                                <div className="inbox_chat">
                                    {doubts.map((item: any) => genDoubt({
                                        name: item.studentName,
                                        date: new Date(item.createdAt ?? Date.now()).toLocaleDateString() + ' '
                                            + new Date(item.createdAt ?? Date.now()).toLocaleTimeString(),
                                        key: item.id,
                                        preMessage: item.messages[0].message
                                    }))}
                                </div>
                            </div>
                            <div className="mesgs">
                                <div className="msg_history">
                                    {
                                        selectDoubt && selectDoubt.messages && Array.isArray(selectDoubt.messages)
                                        && selectDoubt.messages.map((message: any) => message.userURI.includes(user.id) ? outgoingMessage(message) : incomingMessage(message))
                                    }
                                </div>
                                <div className="type_msg">
                                    <div className="input_msg_write">
                                        <input value={msg} type="text" onKeyDown={e => {
                                            e.key === 'Enter' && sendMessage()
                                            
                                        }} className="write_msg" onChange={e => setMsg(e.target.value)} placeholder="Escreva uma mensagem" />
                                        <button onClick={e => { e.preventDefault; sendMessage() }} className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true" /></button>
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