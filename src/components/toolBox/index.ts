import { ToolboxDefinition } from "react-blockly";

export const toolboxCategories : ToolboxDefinition = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Lógico",
        colour: "#5C81A6",
        contents: [
          {
            kind: "block",
            type: "logic_compare",
          },

          {
            kind:"block",
            type:"logic_operation"
          },
          {
            kind:"block",
            type:"logic_negate"
          },
           {
             kind:"block",
             type:"logic_boolean"
           }
        ],
      },
      {
        kind: "category",
        name: "Matemático",
        colour: "#5CA65C",
        contents: [
          {
            kind: "block",
            type: "math_round",
          },
          {
            kind: "block",
            type: "math_number",
          },
          {
            kind:"block",
            type:"math_arithmetic"
          },
          {
            kind:'block',
            type:"math_single"
          }          
        ],
      },
      {
        kind:"category",
        name:"Condicionais",
        colour:"",
        contents:[
          {
            kind: "block",
            type: "controls_if",
          },
          {
            kind: "block",
            type: "controls_ifelse",
          },
        ]
      },
      {
        kind:"category",
        name:"Loops",
        colour: "#5ba55b",
        contents:[
          {
            kind:"block",
            type:"controls_repeat_ext"
          },
          
        ]
      }
    ],
  };