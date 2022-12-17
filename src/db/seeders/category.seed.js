const { QueryInterface } = require("sequelize");
const { uuid } = require('uuidv4');

module.exports = {
    up: async(QueryInterface, sequelize) => {
        await QueryInterface.bulkInsert(
            "Categories",
            [
                {   id: uuid(),
                    name:"appliances",
                    description:"household appliances",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuid(),
                    name:"education",
                    description:" education related products",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuid(),
                    name:"phones and accessories",
                    description:" mobile phones, tablets, accessories",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuid(),
                    name:"fashion",
                    description:"clothes, shoes, bags,",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuid(),
                    name:"computers",
                    description:" laptops, desktops and accessories",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuid(),
                    name:"consumables",
                    description:" food items and comsumables",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ]
        )
    }
}