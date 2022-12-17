'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Rates", deps: []
 *
 **/

var info = {
    "revision": 13,
    "name": "RateCard",
    "created": "2022-12-06T07:08:19.156Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Rates",
        {
            "id": {
                "type": Sequelize.UUID,
                "field": "id",
                "defaultValue": Sequelize.UUIDV4,
                "unique": true,
                "primaryKey": true
            },
            "country": {
                "type": Sequelize.STRING,
                "field": "country"
            },
            "state": {
                "type": Sequelize.STRING,
                "field": "state",
                "unique": true
            },
            "region": {
                "type": Sequelize.STRING,
                "field": "region",
                "allowNull": true
            },
            "price": {
                "type": Sequelize.INTEGER,
                "field": "price",
                "defaultValue": 1
            },
            "currency": {
                "type": Sequelize.STRING,
                "field": "currency",
                "allowNull": true
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
