'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Notifications", deps: [Merchants, Users]
 *
 **/

var info = {
    "revision": 33,
    "name": "NotificationModel",
    "created": "2023-02-24T10:35:57.230Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Notifications",
        {
            "id": {
                "type": Sequelize.UUID,
                "field": "id",
                "defaultValue": Sequelize.UUIDV4,
                "unique": true,
                "primaryKey": true
            },
            "title": {
                "type": Sequelize.STRING,
                "field": "title"
            },
            "body": {
                "type": Sequelize.STRING,
                "field": "body",
                "unique": true
            },
            "associated_model": {
                "type": Sequelize.STRING,
                "field": "associated_model",
                "allowNull": true
            },
            "isRead": {
                "type": Sequelize.BOOLEAN,
                "field": "isRead",
                "defaultValue": false
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
            "MerchantId": {
                "type": Sequelize.UUID,
                "field": "MerchantId",
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "Merchants",
                    "key": "id"
                },
                "allowNull": true
            },
            "UserId": {
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
