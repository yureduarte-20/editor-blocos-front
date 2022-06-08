declare module 'blockly/msg/pt-br' {
    import * as PtBr from "blockly/msg/pt-br";
    export default PtBr;
  }
  declare module 'blockly'{
    import * as Blockly from "blockly";
    let setLocale : any = Blockly.setLocale 
    export  {Blockly, setLocale};
  }