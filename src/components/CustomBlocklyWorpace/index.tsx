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
  const [list, setList] = useState<Blockly.VariableModel[]>([]);
  const [currentToolBox, setCurrentToolBox] = useState(toolboxCategories(true, list));
  function workspaceDidChange(workspace: WorkspaceSvg) {
    const code = JavaScript.workspaceToCode(workspace as Workspace);
    if (!workspace.getButtonCallback('create_variable')) {
      workspace.registerButtonCallback("create_variable", () => {
        Blockly.Variables.createVariableButtonHandler(workspace as Workspace, undefined, 'create_variable');
        let newVariables = workspace.getAllVariables();
        let tmpToolBox: typeof currentToolBox = { kind: '', contents: [] };
        Object.assign(tmpToolBox, currentToolBox);
        if (currentToolBox.contents[5].contents.length <= 1) {
          tmpToolBox.contents[5].contents = [
            ...currentToolBox.contents[5].contents,
            {
              kind: "block",
              "type": "variables_set",
              "fields": {
                "VAR": {
                  "id": newVariables[newVariables.length - 1].getId(),
                }
              }
            },
            {
              kind: "block",
              "type": "math_change",
              "fields": {
                "VAR": {
                  "id": newVariables[newVariables.length - 1].getId()
                }
              },
              "inputs": {
                "DELTA": {
                  "shadow": {
                    "type": "math_number",
                    "fields": {
                      "NUM": 1
                    }
                  }
                }
              }
            },
            {
              kind: "block",
              "type": "variables_get",
              "fields": {
                "VAR": {
                  "id": newVariables[newVariables.length - 1].getId()
                }
              }
            }
          ]
        } else {
          tmpToolBox.contents[5].contents = [
            ...currentToolBox.contents[5].contents,
            {
              kind: "block",
              "type": "variables_get",
              "fields": {
                "VAR": {
                  "id": newVariables[newVariables.length - 1].getId()
                }
              }
            }
          ]
        }
        setCurrentToolBox(tmpToolBox);
      })
    }

    if (code !== javascriptCode) {
      setJavascriptCode(code);
      console.log(code)
    }


  }
  console.log(currentToolBox)
  return (
    <BlocklyWorkspace
      toolboxConfiguration={currentToolBox}
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