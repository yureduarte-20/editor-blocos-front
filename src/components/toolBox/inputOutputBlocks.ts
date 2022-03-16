
export const inputOutputBlocks = { 
kind: "category",
name: "Entrada e saída",
colour: "#5ba58c",
contents: [
    {
        kind:"block",
        "type": "text_print",
     
        "inputs": {
          "TEXT": {
            "shadow": {
              "type": "text",
           
              "fields": {
                "TEXT": "abc"
              }
            }
          }
        }
      },
      {
        kind:"block",
        "type": "text_prompt_ext",
       
        "extraState": "<mutation type=\"TEXT\"></mutation>",
        "fields": {
          "TYPE": "TEXT"
        },
        "inputs": {
          "TEXT": {
            "shadow": {
              "type": "text",
              
              "fields": {
                "TEXT": "abc"
              }
            }
          }
        }
      }
    
]
    
}