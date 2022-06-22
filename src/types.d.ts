declare module "blockly" {
    import * as Blockly from 'blockly';
    const setLocale = Blockly.setLocale
    export default { ...Blockly, setLocale } 
}