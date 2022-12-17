'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "WalletId" to table "Wallets"
 *
 **/

var info = {
    "revision": 20,
    "name": "cascadingA",
    "created": "2022-12-08T15:57:56.349Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Wallets",
        "WalletId",
        {
            "type": Sequelize.UUID,
            "field": "WalletId",
            "onUpdate": "CASCADE",
            "onDelete": "SET NULL",
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
