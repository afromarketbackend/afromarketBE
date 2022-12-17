'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "wallet_id" to table "Transactions"
 * changeColumn "type" on table "Transactions"
 *
 **/

var info = {
    "revision": 21,
    "name": "transactionEnum",
    "created": "2022-12-08T18:34:41.617Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Transactions",
            "wallet_id",
            {
                "type": Sequelize.STRING,
                "field": "wallet_id"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Transactions",
            "type",
            {
                "type": Sequelize.ENUM('inbound', 'outbound', 'walletTopUp', 'walletDebit'),
                "field": "type"
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
