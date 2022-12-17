'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "available_balace" from table "Wallets"
 * addColumn "available_balance" to table "Wallets"
 *
 **/

var info = {
    "revision": 23,
    "name": "NEWbALance",
    "created": "2022-12-08T18:42:32.080Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Wallets", "available_balace"]
    },
    {
        fn: "addColumn",
        params: [
            "Wallets",
            "available_balance",
            {
                "type": Sequelize.FLOAT,
                "field": "available_balance",
                "defaultValue": 0
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
