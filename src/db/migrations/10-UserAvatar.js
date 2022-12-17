'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "avatar" to table "Users"
 *
 **/

var info = {
    "revision": 10,
    "name": "UserAvatar",
    "created": "2022-12-05T10:30:33.247Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Users",
        "avatar",
        {
            "type": Sequelize.STRING,
            "field": "avatar",
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
