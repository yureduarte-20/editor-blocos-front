import { Card, Container } from '../../styles/global'
import { Input } from '../auth/Login/styled'
import { Form, Image } from './style'
import userIcon from '../../assets/user.svg'
import { useEffect } from 'react'
import useStorage from '../../utils/useStorage'
export default () => {
    return (
        <Container style={{ marginTop: 30 }}>
            <Card  >
                <h1 className='font-1-xl blue' style={{ textAlign: 'center', marginBottom: 30 }}>Meu Perfil</h1>
                <Form>
                    <div>
                        <Input style={{ alignSelf: 'start' }} placeholder='Nome' />
                        <Input style={{ alignSelf: 'start' }} placeholder='Nome' />
                        <Input style={{ alignSelf: 'start' }} placeholder='Nome' />
                    </div>
                    <span style={{
                        gridRow: '1/ span 2',
                        gridColumn: '3',
                        alignSelf: 'start'
                    }}>
                        <Image src={userIcon} style={{ width: '100%', alignSelf: 'start' }} />
                    </span>
                </Form>
            </Card>
        </Container>
    )

}