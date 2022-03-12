import { useState } from "react";
import { BlocklyWorkspace, WorkspaceSvg, Workspace } from "react-blockly";
import * as Blockly from "blockly";
import * as JavaScript from 'blockly/javascript';

import * as PtBr from "blockly/msg/pt-br";
import { toolboxCategories } from '../toolBox';


Blockly.setLocale(PtBr);

export interface BlocklyWorkpaceProps {
  javascriptCode: string;
  onCodeChange(newState: string): void;
}


export const CustomBlocklyWorkpace = ({ javascriptCode, onCodeChange: setJavascriptCode }: BlocklyWorkpaceProps) => {

  const [xml, setXml] = useState("");
  const [list,setList] = useState<Blockly.VariableModel[]>([]);
  function workspaceDidChange(workspace: WorkspaceSvg) {
    const code = JavaScript.workspaceToCode(workspace as Workspace);
   
    workspace.registerButtonCallback("create_variable", () => {
      
      Blockly.Variables.createVariableButtonHandler(workspace as Workspace, undefined, 'create_variable');
      console.log(workspace.getAllVariableNames());
      console.log(workspace.getAllVariables());
      setList(workspace.getAllVariables());
      console.log(list[0].getId());
      
    })

    if (code !== javascriptCode) {
      setJavascriptCode(code);
      console.log(code)
    }
    
  }

  return (
    <BlocklyWorkspace
      toolboxConfiguration={toolboxCategories(list.length == 0,list)}
      className="full"
      workspaceConfiguration={{
        grid: {
          spacing: 20,
          length: 3,
          colour: "#ccc",
          snap: true,
        },
      }}
      onWorkspaceChange={workspaceDidChange}
      onXmlChange={setXml}
    />

  );
}