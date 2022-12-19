'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "bvn" to table "Merchants"
 *
 **/

var info = {
    "revision": 24,
    "name": "BVN",
    "created": "2022-12-19T12:07:36.582Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Merchants",
        "bvn",
        {
            "type": Sequelize.STRING,
            "field": "bvn"
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
