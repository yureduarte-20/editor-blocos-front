export const loopBlocks: any = {
    kind: "category",
    name: "Laços",
    colour: "#5ba55b",
    contents: [
        {
            kind: "block",
            type: "controls_repeat_ext",
            inputs: {
                TIMES: {
                    shadow: {
                        type: "math_number",

                        fields: {
                            NUM: 0
                        }
                    }
                }
            }

        },
        {
            kind: "block",
            type: "controls_whileUntil",
            fields: {
                MODE: "WHILE"
            }
        },
        {
            kind: "block",
            type: "controls_for",
            fields: {
                VAR: {
                }
            },
            inputs: {
                FROM: {
                    shadow: {
                        type: "math_number",

                        fields: {
                            "NUM": 1
                        }
                    }
                },
                TO: {
                    shadow: {
                        type: "math_number",

                        fields: {
                            NUM: 10
                        }
                    }
                },
                BY: {
                    shadow: {
                        type: "math_number",

                        fields: {
                            NUM: 1
                        }
                    }
                }

            }
        },
        {
            kind: "block",
            type: "controls_forEach",
            fields: {
                VAR: {

                }
            }
        },
        {
            kind: "block",
            type: "controls_flow_statements",
            fields: {
                FLOW: "BREAK"
            }
        }


    ]
}