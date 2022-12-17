'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Wallets", deps: [Users]
 *
 **/

var info = {
    "revision": 15,
    "name": "WalletModel",
    "created": "2022-12-08T15:17:38.619Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Wallets",
        {
            "id": {
                "type": Sequelize.UUID,
                "field": "id",
                "defaultValue": Sequelize.UUIDV4,
                "unique": true,
                "primaryKey": true
            },
            "text": {
                "type": Sequelize.STRING,
                "field": "text"
            },
            "available_balace": {
                "type": Sequelize.FLOAT,
                "field": "available_balace",
                "defaultValue": 0
            },
            "previous_balance": {
                "type": Sequelize.FLOAT,
                "field": "previous_balance",
                "defaultValue": 0
            },
            "deleted": {
                "type": Sequelize.BOOLEAN,
                "field": "deleted",
                "defaultValue": false
            },
            "created_at": {
                "type": Sequelize.DATE,
                "field": "created_at",
                "allowNull": false
            },
            "updated_at": {
                "type": Sequelize.DATE,
                "field": "updated_at",
                "allowNull": false
            },
            "UserId": {
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
        },
        {}
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
