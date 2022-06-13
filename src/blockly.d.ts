declare module 'blockly/msg/pt-br' {
    import * as PtBr from "blockly/msg/pt-br";
    export default PtBr;
  }
declare module 'blockly' {
  import * as PtBr from 'blockly';
  const setLocale = Blockly.setLocale;

  export default { Blockly, setLocale }
}