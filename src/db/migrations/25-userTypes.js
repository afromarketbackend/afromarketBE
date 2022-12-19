'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "user_type" to table "Merchants"
 * addColumn "user_type" to table "Users"
 *
 **/

var info = {
    "revision": 25,
    "name": "userTypes",
    "created": "2022-12-19T12:12:42.954Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Merchants",
            "user_type",
            {
                "type": Sequelize.ENUM('user', 'merchant'),
                "field": "user_type",
                "defaultValue": "user"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "user_type",
            {
                "type": Sequelize.ENUM('user', 'merchant'),
                "field": "user_type",
                "defaultValue": "user"
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
