import { Header } from "./style"
export interface ITitleProps {
    title: string;
    subtitle: string;
    margin?: string;
}
export default ({ subtitle, title, margin } : ITitleProps ) => {
    return (
        <Header style={{ margin }}>
            <h1 className='font-1-xl blue'>{title}</h1>
            <p className='font-2-m font-light'>{subtitle}</p>
        </Header>
    )
}