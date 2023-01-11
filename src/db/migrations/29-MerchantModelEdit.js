'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "tax_id_number" on table "Merchants"
 * changeColumn "bank_verification_number" on table "Merchants"
 *
 **/

var info = {
    "revision": 29,
    "name": "MerchantModelEdit",
    "created": "2023-01-11T11:43:50.677Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "Merchants",
            "tax_id_number",
            {
                "type": Sequelize.STRING,
                "field": "tax_id_number"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Merchants",
            "bank_verification_number",
            {
                "type": Sequelize.STRING,
                "field": "bank_verification_number"
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
