"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tk = require("taskobject");
class goTreeTask extends tk.Task {
    constructor(management, options) {
        super(management, options); // (1)
        this.rootdir = __dirname; // (2)
        this.coreScript = this.rootdir + '/../data/coreScript.sh'; // (3)
        this.slotSymbols = ['treeOne', 'treeTwo']; // (4)
        super.initSlots(); // (5)
    }
    prepareJob(inputs) {
        return super.configJob(inputs);
    }
    /* REMARK : 'pathOfCurrentDir' is the key you gave in your core script as JSON output */
    prepareResults(chunkJson) {
        /*
            console.log("---->");
            console.log(typeof chunkJson);
        */
        //console.dir(chunkJson);
        return {
            [this.outKey]: chunkJson.data // This.outKey is a deduced from downstream adressed slot, picked from slotSymbol
        };
    }
}
exports.goTreeTask = goTreeTask;
exports.Task = goTreeTask;
