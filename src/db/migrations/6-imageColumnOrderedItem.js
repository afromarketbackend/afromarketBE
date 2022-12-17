'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "images" to table "OrderedItems"
 *
 **/

var info = {
    "revision": 6,
    "name": "imageColumnOrderedItem",
    "created": "2022-11-08T16:32:35.832Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "OrderedItems",
        "images",
        {
            "type": Sequelize.STRING,
            "field": "images"
        }
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
