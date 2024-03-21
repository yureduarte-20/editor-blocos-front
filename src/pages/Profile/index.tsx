import { Card, Container } from '../../styles/global'
import { Input } from '../auth/Login/styled'
import { Form, Image } from './style'
import userIcon from '../../assets/user.svg'
import { useEffect, useState } from 'react'
import useStorage from '../../utils/useStorage'
import { useApi, useAuthenticateApi } from '../../utils/useApi'
import { useUser } from '../../store/userContext'
import Button from '../../components/Button'
import { Store } from 'react-notifications-component'
export default () => {
    const api = useAuthenticateApi()
    const _user = useUser()
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirmation, setNewConfirmation] = useState('')
    const [user, setUser] = useState(Object.assign({}, _user))
    useEffect(() => {
        api.get('/profile')
            .then(d => setUser(d.data))
    }, [])


    const changeUser = () => {
        api
            .patch('/profile', { name: user.name })
            .then(() => Store.addNotification({
                container: 'top-center',
                insert: 'top',
                title: 'Alterado com sucesso',
                type: 'success',

                dismiss: {
                    duration: 3000,
                    onScreen: true
                },
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],

            }))
            .catch(e => Store.addNotification({
                container: 'top-center',
                insert: 'top',
                title: 'Erro',
                type: 'danger',
                message: e.response.data.error.message ?? 'Erro ao tentar atualizar seu perfil',
                dismiss: {
                    duration: 3000,
                    onScreen: true
                },
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],

            }))

    }
    const changePassword = () => {
        api
            .post('/password-reset', { oldPassword, newPasswordConfirmation, newPassword })
            .then(() => {
                Store.addNotification({
                    container: 'top-center',
                    insert: 'top',
                    title: 'Senha alterado com sucesso',
                    type: 'success',

                    dismiss: {
                        duration: 3000,
                        onScreen: true
                    },
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],

                })
                setNewConfirmation('')
                setNewPassword('')
                setOldPassword('')
            }).catch(e => {
                if(e?.response?.data?.error?.details && Array.isArray(e.response.data.error.details)){
                    return e.response.data.error.details.forEach((item:any) => {
                        Store.addNotification({
                            container: 'top-center',
                            insert: 'top',
                            title: 'Erro',
                            type: 'danger',
                            message: item.message ?? 'Erro ao tentar atualizar seu perfil',
                            dismiss: {
                                duration: 3000,
                                onScreen: true
                            },
                            animationIn: ["animate__animated", "animate__fadeIn"],
                            animationOut: ["animate__animated", "animate__fadeOut"],
        
                        })
                    })  
                }
                Store.addNotification({
                    container: 'top-center',
                    insert: 'top',
                    title: 'Erro',
                    type: 'danger',
                    message: e?.response.data.error.message ?? 'Erro ao tentar atualizar seu perfil',
                    dismiss: {
                        duration: 3000,
                        onScreen: true
                    },
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],

                })
            })

    }
    return (
        <Container style={{ marginTop: 30 }}>
            <Card style={{ marginBottom: 30 }} >
                <h1 className='font-1-xl blue' style={{ textAlign: 'center', marginBottom: 30 }}>Meu Perfil</h1>
                <Form onSubmit={(e) => { e.preventDefault(); changeUser(); }}>
                    <div>
                        <Input style={{ alignSelf: 'start' }}
                            value={user.name}
                            onChange={d => setUser(u => ({ ...u, name: d.target.value }))}
                            placeholder='Nome' />
                        <Input value={user.email} style={{ alignSelf: 'start' }} disabled placeholder='Email' />
                    </div>
                    <span style={{
                        gridRow: '1/ span 2',
                        gridColumn: '3',
                        alignSelf: 'start'
                    }}>
                        <Image src={userIcon} style={{ width: '100%', alignSelf: 'start' }} />
                    </span>
                    <div>
                        <Button type='submit' >
                            Alterar
                        </Button>
                    </div>
                </Form>
            </Card>
            <Card>
                <h1 className='font-1-xl blue' style={{ textAlign: 'center', marginBottom: 30 }}>Resetar senha</h1>
                <Form onSubmit={e => { e.preventDefault(); changePassword() }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        <Input
                            placeholder='Senha antiga'
                            onChange={e => setOldPassword(e.target.value)}
                            required
                            type='password'
                            value={oldPassword}
                        />
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                            <Input
                                style={{ width: '50%' }}
                                placeholder='Senha Nova'
                                onChange={e => setNewPassword(e.target.value)}
                                type='password'
                                required
                                value={newPassword}
                            />
                            <Input
                                required
                                style={{ width: '50%' }}
                                placeholder='Confirmação de Senha Nova'
                                onChange={e => setNewConfirmation(e.target.value)}
                                type='password'
                                value={newPasswordConfirmation}
                            />
                        </div>

                        <div style={{
                            marginTop: 20
                        }} >
                            <Button type='submit' >
                                Alterar Senha
                            </Button>
                        </div>
                    </div>
                </Form>
            </Card>
        </Container>
    )

}