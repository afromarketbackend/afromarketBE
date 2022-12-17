'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "UserId" on table "Orders"
 *
 **/

var info = {
    "revision": 19,
    "name": "cascading",
    "created": "2022-12-08T15:52:44.099Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "Orders",
        "UserId",
        {
            "type": Sequelize.UUID,
            "field": "UserId",
            "onUpdate": "CASCADE",
            "onDelete": "CASCADE",
            "references": {
                "model": "Users",
                "key": "id"
            },
            "allowNull": true
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
