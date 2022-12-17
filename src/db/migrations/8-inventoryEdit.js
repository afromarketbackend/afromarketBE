'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "picture_3" from table "Inventories"
 * removeColumn "picture_2" from table "Inventories"
 * removeColumn "picture" from table "Inventories"
 * addColumn "images" to table "Inventories"
 *
 **/

var info = {
    "revision": 8,
    "name": "inventoryEdit",
    "created": "2022-11-08T16:40:44.118Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Inventories", "picture_3"]
    },
    {
        fn: "removeColumn",
        params: ["Inventories", "picture_2"]
    },
    {
        fn: "removeColumn",
        params: ["Inventories", "picture"]
    },
    {
        fn: "addColumn",
        params: [
            "Inventories",
            "images",
            {
                "type": Sequelize.STRING,
                "field": "images"
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
