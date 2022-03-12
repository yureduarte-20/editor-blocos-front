import { BlocklyWorkspace, WorkspaceSvg, Workspace } from "react-blockly";
import * as Blockly from "blockly";
import { useState } from "react";



export const variableBlocks=(isEmpty:boolean,list:Blockly.VariableModel[])=> {
  
  return  (!isEmpty?{kind: "category",
  name: "Variáveis",
  colour: "#a55b80",
  contents: [
    {
      kind: "button",
      text: "criar variavel",
      callbackKey: "create_variable"

    },

    {
      kind: "block",
      "type": "variables_set",

      "fields": {
        "VAR": {
         "id": list[list.length - 1].getId(),
        }
      }
    },
    {
      kind: "block",
      "type": "math_change",

      "fields": {
        "VAR": {
          "id": list[list.length - 1].getId()
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
          "id": list[list.length - 1].getId()
        }
      }
    },

  ]}:{kind: "category",
  name: "Variáveis",
  colour: "#a55b80",
  contents: [
    {
      kind: "button",
      text: "criar variavel",
      callbackKey: "create_variable"

    }]});
}