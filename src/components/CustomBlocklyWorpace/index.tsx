import { useState } from "react";
import { BlocklyWorkspace, WorkspaceSvg, Workspace  } from "react-blockly";

import * as JavaScript from 'blockly/javascript';
import * as Python from 'blockly/python';
import * as Lua from 'blockly/lua';
import * as Dart from 'blockly/dart';
import * as Php from 'blockly/php';
import * as BlocklyCore from 'blockly/core';
import { uniqueId } from 'lodash';
import Blockly from "blockly";
import { toolboxCategories } from '../toolBox';
import { DivWorkspace } from './style'
import colors from "../../styles/colors";
import * as PtBr from "blockly/msg/pt-br";


export interface BlocklyWorkpaceProps {
  code: string;
  onCodeChange(newState: string): void;
  children: any;
  language: string;
  onXmlChange?(xml: (string)): void
  initialXml?:string;
}

export const CustomBlocklyWorkpace = ({ code, onCodeChange, onXmlChange, children, language, initialXml }: BlocklyWorkpaceProps) => {
  Blockly.setLocale(PtBr)
  const [variables, setVariables] = useState<BlocklyCore.VariableModel[]>([])
  /*   const blocklyDiv = createRef();
    const { workspace, xml } = useBlocklyWorkspace({
      ref: blocklyDiv.current,
      toolboxConfiguration:toolboxCategories,
      onWorkspaceChange: workspaceDidChange,
    
    }); */
  function workspaceDidChange(workspace: WorkspaceSvg) {
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
      workspace.registerToolboxCategoryCallback('VARIABLE', (_wo : BlocklyCore.WorkspaceSvg) => {
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
    if (code !== _code)
      onCodeChange(_code);
  }

  function generateCode(lang: string, workspace: Workspace) {
    switch (lang) {
      case 'javascript':
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
    <>
      <BlocklyWorkspace
        toolboxConfiguration={toolboxCategories}
        className="full"
        workspaceConfiguration={{
          grid: {
            spacing: 20,
            length: 3,
            colour: "#ccc",
            snap: true,
          },
          zoom:{
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2,
            pinch: true
          },
        }}

        onWorkspaceChange={workspaceDidChange}
        onXmlChange={onXmlChange}
        initialXml={initialXml}
      />
      {children}

    </>
  );
}