'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "category" to table "Products"
 *
 **/

var info = {
    "revision": 9,
    "name": "categoryNameToProduct",
    "created": "2022-11-08T19:53:16.197Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Products",
        "category",
        {
            "type": Sequelize.STRING,
            "field": "category"
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
