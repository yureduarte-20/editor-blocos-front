export const functionBlocks: any = {
    kind: "category",
    name: "Funções",
    colour: "#995ba5",
    custom:'PROCEDURE',
    contents: [
        {
            kind: "block",
            "type": "procedures_defnoreturn",
            
            "icons": {
              "comment": {
                "text": "Descreva esta função...",
                "height": 80,
                "width": 160
              
              }
            },
            "fields": {
              "NAME": "faça algo"
            }
          },
          {
            kind: "block",
            "type": "procedures_defreturn",
           
            "icons": {
              "comment": {
                "text": "Descreva esta função...",
              
                "height": 80,
                "width": 160
              }
            },
            "fields": {
              "NAME": "faça algo"
            }
          },
          {
            kind: "block",
            "type": "procedures_ifreturn",
           
         
            "extraState": "<mutation value=\"1\"></mutation>"
          },
          {
            kind: "block",
            "type": "procedures_callnoreturn",
           
            "extraState": {
              "name": "faça algo"
            }
          },
          {
            kind: "block",
            "type": "procedures_callreturn",
            
            "extraState": {
              "name": "faça algo"
            }
          }
    ]
}