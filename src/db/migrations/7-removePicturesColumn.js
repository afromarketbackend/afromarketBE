'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "picture" from table "OrderedItems"
 * removeColumn "picture_2" from table "OrderedItems"
 * removeColumn "picture_3" from table "OrderedItems"
 *
 **/

var info = {
    "revision": 7,
    "name": "removePicturesColumn",
    "created": "2022-11-08T16:37:09.456Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["OrderedItems", "picture"]
    },
    {
        fn: "removeColumn",
        params: ["OrderedItems", "picture_2"]
    },
    {
        fn: "removeColumn",
        params: ["OrderedItems", "picture_3"]
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
