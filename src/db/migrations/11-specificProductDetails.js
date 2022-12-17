'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "specific_details" to table "Products"
 *
 **/

var info = {
    "revision": 11,
    "name": "specificProductDetails",
    "created": "2022-12-05T14:04:58.557Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Products",
        "specific_details",
        {
            "type": Sequelize.JSON,
            "field": "specific_details",
            "defaultValue": Sequelize.Object
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
