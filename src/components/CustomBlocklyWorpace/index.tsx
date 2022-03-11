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
  function workspaceDidChange(workspace: WorkspaceSvg) {
    const code = JavaScript.workspaceToCode(workspace as Workspace);
    workspace.registerButtonCallback("cu", () => { 
      console.log("asdsadsadsadsasaddsasadfdsasad"); 
      Blockly.Variables.createVariableButtonHandler(workspace as Workspace, null, 'cu') 
      console.log(workspace.getAllVariableNames())
    })
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
      }}
      onWorkspaceChange={workspaceDidChange}
      onXmlChange={setXml}
    />

  );
}