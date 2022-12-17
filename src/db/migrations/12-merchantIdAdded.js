'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Customers", deps: []
 * addColumn "product_owner_id" to table "Reviews"
 * addColumn "merchant_id" to table "Reviews"
 *
 **/

var info = {
    "revision": 12,
    "name": "merchantIdAdded",
    "created": "2022-12-05T17:11:44.094Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Customers",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "customer_id": {
                    "type": Sequelize.STRING,
                    "field": "customer_id"
                },
                "customer_name": {
                    "type": Sequelize.STRING,
                    "field": "customer_name"
                },
                "customer_contact": {
                    "type": Sequelize.STRING,
                    "field": "customer_contact",
                    "unique": true
                },
                "customer_address": {
                    "type": Sequelize.STRING,
                    "field": "customer_address",
                    "allowNull": true
                },
                "user_id": {
                    "type": Sequelize.STRING,
                    "field": "user_id"
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
    },
    {
        fn: "addColumn",
        params: [
            "Reviews",
            "product_owner_id",
            {
                "type": Sequelize.STRING,
                "field": "product_owner_id"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Reviews",
            "merchant_id",
            {
                "type": Sequelize.STRING,
                "field": "merchant_id"
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
