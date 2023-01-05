'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Messages", deps: []
 *
 **/

var info = {
    "revision": 27,
    "name": "MEssageModel",
    "created": "2023-01-05T10:14:56.827Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Messages",
        {
            "id": {
                "type": Sequelize.UUID,
                "field": "id",
                "defaultValue": Sequelize.UUIDV4,
                "unique": true,
                "primaryKey": true
            },
            "receiverEmail": {
                "type": Sequelize.STRING,
                "field": "receiverEmail"
            },
            "senderEmail": {
                "type": Sequelize.STRING,
                "field": "senderEmail"
            },
            "text": {
                "type": Sequelize.STRING,
                "field": "text"
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
