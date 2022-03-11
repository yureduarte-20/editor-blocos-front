import { ToolboxDefinition } from "react-blockly";
import { logicBlocks } from "./logicBlocks";
import { mathBlocks } from "./mathBlocks";
import { loopBlocks } from "./loopBlocks";
import { textBlocks } from "./textBlocks";
import { listBlocks } from "./listBlocks";
import { variableBlocks } from "./variableBlocks";
import { functionBlocks } from "./functionBlocks";

export const toolboxCategories: ToolboxDefinition = {
  kind: "categoryToolbox",
  contents: [
    logicBlocks,
    loopBlocks,
    mathBlocks,
    textBlocks,
    listBlocks,
    variableBlocks,
    functionBlocks,
  ],
};