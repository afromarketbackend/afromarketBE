'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "OrderId" to table "Trackers"
 * addColumn "UserId" to table "Transactions"
 *
 **/

var info = {
    "revision": 3,
    "name": "associations",
    "created": "2022-10-24T16:03:44.723Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Trackers",
            "OrderId",
            {
                "type": Sequelize.UUID,
                "field": "OrderId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Orders",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Transactions",
            "UserId",
            {
                "type": Sequelize.UUID,
                "field": "UserId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    }
];

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
