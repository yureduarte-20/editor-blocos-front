import { createRef, useRef, useState } from "react";
import { BlocklyWorkspace, WorkspaceSvg, Workspace, useBlocklyWorkspace } from "react-blockly";
import Blockly, { VariableModel } from "blockly";
import * as JavaScript from 'blockly/javascript';
import * as Python from 'blockly/python';
import * as Lua from 'blockly/lua';
import * as Dart from 'blockly/dart';
import * as Php from 'blockly/php';
import { uniqueId } from 'lodash';
import * as PtBr from "blockly/msg/pt-br";
import { toolboxCategories } from '../toolBox';
import { DivWorkspace } from './style'


Blockly.setLocale(PtBr);

export interface BlocklyWorkpaceProps {
  code: string;
  onCodeChange(newState: string): void;
  children: any;
  language:string;
}


export const CustomBlocklyWorkpace = ({ code, onCodeChange, children, language }: BlocklyWorkpaceProps) => {
  const [xml, setXml] = useState("");
  const [variables, setVariables] = useState<VariableModel[]>([])
  const [blocklyDiv,setBlocklyDiv] = useState(createRef())
  const { workspace } = useBlocklyWorkspace({
    toolboxConfiguration:toolboxCategories,
    ref: blocklyDiv,
    onWorkspaceChange: workspaceDidChange,
  });

  function workspaceDidChange(workspace: WorkspaceSvg) {
    console.log('ta chamado')
    //Registrar o CallBack de criação de variáveis
    if (!workspace.getButtonCallback('create_variable')) {
      workspace.registerButtonCallback("create_variable", () => {
        let newVariable = workspace.createVariable(window.prompt() || uniqueId('var-'));
        //adiciona todas as variáveis em um state
        setVariables([...variables, newVariable]);
      })
    }

    //Registar o callback de atualização de categorias
    if (!workspace.getToolboxCategoryCallback('VARIABLE')) {
      workspace.registerToolboxCategoryCallback('VARIABLE', _wo => {
        let _variables = [];
        for (let v of variables) {
          _variables.push(
            {
              kind: "block",
              "type": "variables_get",
              "fields": {
                "VAR": {
                  "id": v.getId()
                }
              }
            }
          )
        }
        return _variables;
      });
    }
    const _code = generateCode(language, workspace as Workspace);
    if(code !== _code)
      onCodeChange(_code);
  }

  function generateCode(lang : string, workspace : Workspace){
    switch(lang){
      case'javascript':
        return JavaScript.workspaceToCode(workspace);
      case 'dart': 
        return Dart.workspaceToCode(workspace);
      case 'php':
        return Php.workspaceToCode(workspace);
      case 'python':
        return Python.workspaceToCode(workspace);
      case 'lua':
        return Lua.workspaceToCode(workspace);
      default:
        return JavaScript.workspaceToCode(workspace);
    }
  }
  return (
    <DivWorkspace ref={blocklyDiv}>
        {children}
    </DivWorkspace>

    /* <BlocklyWorkspace
   {
      toolboxConfiguration={toolboxCategories}
      className="full"
      workspaceConfiguration={{
        grid: {
          spacing: 20,
          length: 3,
          colour: "#ccc",
          snap: true,
        },
        zoom:
         {controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
          pinch: true}
      }}
      
      onWorkspaceChange={workspaceDidChange}
      onXmlChange={setXml}
    /> 
    }*/
  );
}