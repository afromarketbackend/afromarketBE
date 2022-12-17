'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "TrackerId" to table "Orders"
 * addColumn "UserId" to table "Orders"
 * addColumn "CategoryId" to table "Products"
 * addColumn "MerchantId" to table "Products"
 * addColumn "CategoryId" to table "Inventories"
 * addColumn "UserId" to table "Disputes"
 * addColumn "OrderId" to table "Disputes"
 * addColumn "MerchantId" to table "Inventories"
 * addColumn "MerchantId" to table "OrderedItems"
 * addColumn "OrderId" to table "OrderedItems"
 * addColumn "MerchantId" to table "Payouts"
 * addColumn "ProductId" to table "Inventories"
 * addColumn "ProductId" to table "OrderedItems"
 * addColumn "UserId" to table "Reviews"
 * addColumn "ProductId" to table "Reviews"
 * addColumn "MerchantId" to table "Withdrawals"
 *
 **/

var info = {
    "revision": 2,
    "name": "initiateModels",
    "created": "2022-10-24T16:02:18.826Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Orders",
            "TrackerId",
            {
                "type": Sequelize.UUID,
                "field": "TrackerId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Trackers",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Orders",
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
    },
    {
        fn: "addColumn",
        params: [
            "Products",
            "CategoryId",
            {
                "type": Sequelize.UUID,
                "field": "CategoryId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Categories",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Products",
            "MerchantId",
            {
                "type": Sequelize.UUID,
                "field": "MerchantId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Merchants",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Inventories",
            "CategoryId",
            {
                "type": Sequelize.UUID,
                "field": "CategoryId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Categories",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Disputes",
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
    },
    {
        fn: "addColumn",
        params: [
            "Disputes",
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
            "Inventories",
            "MerchantId",
            {
                "type": Sequelize.UUID,
                "field": "MerchantId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Merchants",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "OrderedItems",
            "MerchantId",
            {
                "type": Sequelize.UUID,
                "field": "MerchantId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Merchants",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "OrderedItems",
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
            "Payouts",
            "MerchantId",
            {
                "type": Sequelize.UUID,
                "field": "MerchantId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Merchants",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Inventories",
            "ProductId",
            {
                "type": Sequelize.UUID,
                "field": "ProductId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Products",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "OrderedItems",
            "ProductId",
            {
                "type": Sequelize.UUID,
                "field": "ProductId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Products",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Reviews",
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
    },
    {
        fn: "addColumn",
        params: [
            "Reviews",
            "ProductId",
            {
                "type": Sequelize.UUID,
                "field": "ProductId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Products",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Withdrawals",
            "MerchantId",
            {
                "type": Sequelize.UUID,
                "field": "MerchantId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Merchants",
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
