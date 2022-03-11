

export const logicBlocks: any =
{
    kind: "category",
    name: "Lógico",
    colour: "#5b80a5",
    contents: [
        {
            kind: "block",
            type: "logic_compare",
        },

        {
            kind: "block",
            type: "logic_operation"

        },
        {
            kind: "block",
            type: "logic_negate"
        },
        {

            kind: "block",
            type: "logic_null"
        },
        
        {
            kind: "block",
            type: "logic_boolean",
            BOOL: false
        },

        {
            kind: "block",
            type: "controls_if",
        },
        {
            kind: "block",
            type: "controls_ifelse",
        },
        {
            kind: "block",
            type: "logic_ternary"
        }
    ],
};

