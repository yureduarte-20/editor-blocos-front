
export const mathBlocks: any = {
    kind: "category",
    name: "Matemática",
    colour: "#5b67a5",
    contents: [{
        kind: "block",
        type: "math_number",
    },
    {
      kind: "block",
      type: "round_with_digits",
    },
    {
        kind: "block",
        type: "math_arithmetic",
        inputs: {
            A: {
                shadow: {
                    type: "math_number",

                    fields: {
                        NUM: 0
                    }
                }
            },
            B: {
                shadow: {
                    type: "math_number",

                    fields: {
                        NUM: 0
                    }
                }
            }
        }
    }
        ,
    {
        kind: "block",
        type: "math_round",
        "inputs": {
            "NUM": {
                "shadow": {
                    "type": "math_number",
                    "fields": {
                        "NUM": 3.1
                    }
                }
            }
        }

    },
    {
        kind: "block",
        type: "math_single",
        "inputs": {
            "NUM": {
                "shadow": {
                    "type": "math_number",
                   
                    "fields": {
                        "NUM": 9
                    }
                }
            }
        }
    },
    {
        kind: "block",
        "type": "math_trig",
        "fields": {
            "OP": "SIN"
        },
        "inputs": {
            "NUM": {
                "shadow": {
                    "type": "math_number",

                    "fields": {
                        "NUM": 45
                    }
                }
            }
        }
    },
    {
        kind: "block",
        "type": "math_constant",

        "fields": {
            "CONSTANT": "PI"
        }
    },
    {
        kind: "block",
        "type": "math_number_property",
        "extraState": "<mutation divisor_input=\"false\"></mutation>",
        "fields": {
            "PROPERTY": "EVEN"
        },
        "inputs": {
            "NUMBER_TO_CHECK": {
                "shadow": {
                    "type": "math_number",

                    "fields": {
                        "NUM": 0
                    }
                }
            }
        }
    },
    {   
        kind: "block",
        "type": "math_on_list",
       
        "extraState": "<mutation op=\"SUM\"></mutation>",
        "fields": {
          "OP": "SUM"
        }
      },
      {
          kind: "block",
        "type": "math_modulo",
        
        "inputs": {
          "DIVIDEND": {
            "shadow": {
              "type": "math_number",
             
              "fields": {
                "NUM": 64
              }
            }
          },
          "DIVISOR": {
            "shadow": {
              "type": "math_number",
            
              "fields": {
                "NUM": 10
              }
            }
          }
        }
      },
      {
        kind:"block",
        "type": "math_constrain",
        
        "inputs": {
          "VALUE": {
            "shadow": {
              "type": "math_number",
            
              "fields": {
                "NUM": 50
              }
            }
          },
          "LOW": {
            "shadow": {
              "type": "math_number",
             
              "fields": {
                "NUM": 1
              }
            }
          },
          "HIGH": {
            "shadow": {
              "type": "math_number",
             
              "fields": {
                "NUM": 100
              }
            }
          }
        }
      },
      {
        kind:"block",
        "type": "math_random_int",
     
        "inputs": {
          "FROM": {
            "shadow": {
              "type": "math_number",
              
              "fields": {
                "NUM": 1
              }
            }
          },
          "TO": {
            "shadow": {
              "type": "math_number",
              "fields": {
                "NUM": 100
              }
            }
          }
        }
      },
      {
        kind:"block",
        "type": "math_random_float",
       
      },
      {
        kind:"block",
        "type": "math_atan2",
        
        "inputs": {
          "X": {
            "shadow": {
              "type": "math_number",
             
              "fields": {
                "NUM": 1
              }
            }
          },
          "Y": {
            "shadow": {
              "type": "math_number",
            
              "fields": {
                "NUM": 1
              }
            }
          }
        }
      },
      

    ],
}