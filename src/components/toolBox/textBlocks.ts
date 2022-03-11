export const textBlocks:any ={
    kind: "category",
    name: "Texto",
    colour: "#5ba58c",
    contents: [
//////azaaaaaaaaaa
{
    kind:"block",
    "type": "text_join",
    
    "extraState": {
      "itemCount": 2
    }
  },
  { kind:"block",
    "type": "text",
  
    "fields": {
      "TEXT": ""
    }
  },
  {
    kind:"block",
    "type": "text_append",
   
    "fields": {
      "VAR": {
    
      }
    },
    "inputs": {
      "TEXT": {
        "shadow": {
          "type": "text",
          
          "fields": {
            "TEXT": ""
          }
        }
      }
    }
  },
  {
    kind:"block",
    "type": "text_length",
   
    "inputs": {
      "VALUE": {
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
    "type": "text_isEmpty",
   
    "inputs": {
      "VALUE": {
        "shadow": {
          "type": "text",
       
          "fields": {
            "TEXT": ""
          }
        }
      }
    }
  },
  {
    kind:"block",
    "type": "text_indexOf",
    
    "fields": {
      "END": "FIRST"
    },
    "inputs": {
      "VALUE": {
        "block": {
          "type": "variables_get",
         
          "fields": {
            "VAR": {
              
            }
          }
        }
      },
      "FIND": {
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
    "type": "text_charAt",
   
    "extraState": "<mutation at=\"true\"></mutation>",
    "fields": {
      "WHERE": "FROM_START"
    },
    "inputs": {
      "VALUE": {
        "block": {
          "type": "variables_get",
         
          "fields": {
            "VAR": {
             
            }
          }
        }
      }
    }
  },
  {
    kind:"block",
    "type": "text_getSubstring",

    "extraState": "<mutation at1=\"true\" at2=\"true\"></mutation>",
    "fields": {
      "WHERE1": "FROM_START",
      "WHERE2": "FROM_START"
    },
    "inputs": {
      "STRING": {
        "block": {
          "type": "variables_get",
          
          "fields": {
            "VAR": {
              
            }
          }
        }
      }
    }
  },
  {
    kind:"block",
    "type": "text_changeCase",

    "fields": {
      "CASE": "UPPERCASE"
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
  },
  {
    kind:"block",
    "type": "text_trim",
   
    "fields": {
      "MODE": "BOTH"
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
  },
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