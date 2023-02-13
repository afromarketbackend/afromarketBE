'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "product_type" to table "Products"
 * addColumn "real_product_id" to table "Products"
 * addColumn "inventory_owner" to table "Products"
 *
 **/

var info = {
    "revision": 32,
    "name": "ProductType",
    "created": "2023-02-13T16:23:41.225Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Products",
            "product_type",
            {
                "type": Sequelize.ENUM('product', 'inventory'),
                "field": "product_type",
                "defaultValue": "product"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Products",
            "real_product_id",
            {
                "type": Sequelize.STRING,
                "field": "real_product_id"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Products",
            "inventory_owner",
            {
                "type": Sequelize.STRING,
                "field": "inventory_owner"
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
