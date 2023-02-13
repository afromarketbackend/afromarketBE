'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "base_image" to table "Orders"
 *
 **/

var info = {
    "revision": 30,
    "name": "baseImageOrder",
    "created": "2023-02-13T11:41:34.964Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Orders",
        "base_image",
        {
            "type": Sequelize.STRING,
            "field": "base_image"
        }
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
