export const listBlocks: any = {
    kind: "category",
    name: "Listas",
    colour: "#745ba5",
    contents: [
        {
            kind: "block",
            "type": "lists_create_with",
           
            "extraState": {
                "itemCount": 0
            }
        },
        {
            kind: "block",
            "type": "lists_create_with",
           
            "extraState": {
                "itemCount": 3
            }
        },
        {
            kind: "block",
            "type": "lists_length",
          
        },
        {
            kind: "block",
            "type": "lists_repeat",
           
            "inputs": {
                "NUM": {
                    "shadow": {
                        "type": "math_number",
                     
                        "fields": {
                            "NUM": 5
                        }
                    }
                }
            }
        },
        {
            kind: "block",
            "type": "lists_isEmpty",
            
        },
        {
            kind: "block",
            "type": "lists_indexOf",
           
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
                }
            }
        },
        {
            kind: "block",
            "type": "lists_getIndex",
            "extraState": "<mutation statement=\"false\" at=\"true\"></mutation>",
            "fields": {
                "MODE": "GET",
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
            kind: "block",
            "type": "lists_setIndex",
            
            "extraState": "<mutation at=\"true\"></mutation>",
            "fields": {
                "MODE": "SET",
                "WHERE": "FROM_START"
            },
            "inputs": {
                "LIST": {
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
            kind: "block",
            "type": "lists_getSublist",
         
            "extraState": "<mutation at1=\"true\" at2=\"true\"></mutation>",
            "fields": {
                "WHERE1": "FROM_START",
                "WHERE2": "FROM_START"
            },
            "inputs": {
                "LIST": {
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
            kind: "block",
            "type": "lists_split",
            
            "extraState": "<mutation mode=\"SPLIT\"></mutation>",
            "fields": {
                "MODE": "SPLIT"
            },
            "inputs": {
                "DELIM": {
                    "shadow": {
                        "type": "text",
                    
                        "fields": {
                            "TEXT": ","
                        }
                    }
                }
            }
        },
        {
            kind: "block",
            "type": "lists_sort",
           
            "fields": {
                "TYPE": "NUMERIC",
                "DIRECTION": "1"
            }
        }
    ]
}