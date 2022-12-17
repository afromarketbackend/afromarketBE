'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "address" to table "Merchants"
 * addColumn "images" to table "Products"
 *
 **/

var info = {
    "revision": 4,
    "name": "imageArray",
    "created": "2022-11-07T21:38:02.218Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Merchants",
            "address",
            {
                "type": Sequelize.STRING,
                "field": "address"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Products",
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
