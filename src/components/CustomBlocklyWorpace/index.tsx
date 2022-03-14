import { useState } from "react";
import { BlocklyWorkspace, WorkspaceSvg, Workspace } from "react-blockly";
import Blockly, { VariableModel } from "blockly";
import * as JavaScript from 'blockly/javascript';
import { uniqueId } from 'lodash'
import * as PtBr from "blockly/msg/pt-br";
import { toolboxCategories } from '../toolBox';


Blockly.setLocale(PtBr);

export interface BlocklyWorkpaceProps {
  javascriptCode: string;
  onCodeChange(newState: string): void;
}


export const CustomBlocklyWorkpace = ({ javascriptCode, onCodeChange: setJavascriptCode }: BlocklyWorkpaceProps) => {
  const [xml, setXml] = useState("");
  const [variables, setVariables] = useState<VariableModel[]>([])

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
    const code = JavaScript.workspaceToCode(workspace as Workspace);
    if (code !== javascriptCode) {
      setJavascriptCode(code);
      console.log(code)
    }

  }
  return (
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

  );
}