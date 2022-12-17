'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "new_balance" to table "Transactions"
 * addColumn "previous_balance" to table "Transactions"
 *
 **/

var info = {
    "revision": 22,
    "name": "NEWbAL",
    "created": "2022-12-08T18:38:59.811Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Transactions",
            "new_balance",
            {
                "type": Sequelize.FLOAT,
                "field": "new_balance"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Transactions",
            "previous_balance",
            {
                "type": Sequelize.FLOAT,
                "field": "previous_balance"
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
