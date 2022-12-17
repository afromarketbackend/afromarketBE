'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "picture" from table "Products"
 * removeColumn "picture_2" from table "Products"
 * removeColumn "picture_3" from table "Products"
 *
 **/

var info = {
    "revision": 5,
    "name": "removeColumns",
    "created": "2022-11-07T21:57:38.587Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Products", "picture"]
    },
    {
        fn: "removeColumn",
        params: ["Products", "picture_2"]
    },
    {
        fn: "removeColumn",
        params: ["Products", "picture_3"]
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
