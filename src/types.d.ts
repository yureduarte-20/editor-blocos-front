declare module "blockly" {
    import * as Blockly from 'blockly';
    const setLocale = Blockly.setLocale
    export default { ...Blockly, setLocale }
}
declare module "types" {
    export type Doubt = {
        id: string,
        problemURI: string,
        problemTitle: string
        status: 'COMPLETE' | 'OPEN' | 'ON_GOING'
        advisorURI?: string,
        advisorName?: string,
        studentURI: string,
        studentName: string,
        createdAt: string,
        messages?: Message[]
    }
    export type Message = {
        message: string,
        userURI: string,
        userName?: string,
        createdAt: string
    }
}