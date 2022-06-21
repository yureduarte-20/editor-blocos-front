
import { logicBlocks } from "./logicBlocks";
import { mathBlocks } from "./mathBlocks";
import { loopBlocks } from "./loopBlocks";
import { textBlocks } from "./textBlocks";
import { listBlocks } from "./listBlocks";
import { variableBlocks } from "./variableBlocks";
import { functionBlocks } from "./functionBlocks";
import { inputOutputBlocks } from "./inputOutputBlocks";

export const toolboxCategories = {

  kind: "categoryToolbox",
  contents: [
    inputOutputBlocks,
    logicBlocks,
    loopBlocks,
    mathBlocks,
    textBlocks,
    listBlocks,
    variableBlocks,
    functionBlocks,
  ]
};