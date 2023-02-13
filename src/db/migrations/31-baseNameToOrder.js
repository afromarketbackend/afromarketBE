'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "base_name" to table "Orders"
 *
 **/

var info = {
    "revision": 31,
    "name": "baseNameToOrder",
    "created": "2023-02-13T15:55:09.432Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Orders",
        "base_name",
        {
            "type": Sequelize.STRING,
            "field": "base_name"
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
