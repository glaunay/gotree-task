import fs = require('fs');
import util = require('util');
import streams = require('stream');
import program = require("commander");
import {setLogLevel, logger} from '../logger'
import goTree = require('../index');

import jobManager = require('ms-jobmanager');

program
  .version('0.1.0')
  .option('-a, --treeOne [treeFile1]', '*.nhx like file')
  .option('-b, --treeTwo [treeFile2]', '*.nhx like file')
  .option('-v, --verbosity [logLevel]', 'Set log level', setLogLevel, 'info')
.parse(process.argv);

jobManager.start({ "TCPip": "localhost", "port": "2323" })
.on("ready", () => {
    let myManagement = {
        'jobManager' : jobManager,
        'jobProfile' : 'dummy'
    }

    let goTreeTask = new goTree.Task(myManagement);
    goTreeTask.on('processed', (d)=>{
        logger.info(`goTreeTask output content:\n${util.format(d)}`);
    })
    fs.readFile(program.treeOne, function (err, data) {
        if (err) throw err;
       // console.log(data.toString());
        let container = {"treeOne" : data.toString()};
        let TreeStreamOne = new streams.Readable();
        TreeStreamOne.push( JSON.stringify(container));
        TreeStreamOne.push(null);
        TreeStreamOne.pipe(goTreeTask.treeOne);
        fs.readFile(program.treeTwo, function (err, data) {
            if (err) throw err;
           // console.log(data.toString());
            let container = {"treeTwo" : data.toString()};
            let TreeStreamTwo = new streams.Readable();
            TreeStreamTwo.push( JSON.stringify(container));
            TreeStreamTwo.push(null);
            TreeStreamTwo.pipe(goTreeTask.treeTwo);
        });
    });
});