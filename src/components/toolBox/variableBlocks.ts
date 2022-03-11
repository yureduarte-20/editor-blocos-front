
export const variableBlocks: any = {
    kind: "category",
    name: "Variáveis",
    colour: "#a55b80",
    contents: [
        {
            kind: "button",
            text: "yure eh viado",
            callbackKey: "cu"

        },
       
        {
            kind: "block",
            "type": "variables_set",
        
            "fields": {
              "VAR": {
            
              }
            }
          },
          {
            kind: "block",
            "type": "math_change",
    
            "fields": {
              "VAR": {
               
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
               
              }
            }
          },
          
    ]
}