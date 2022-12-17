const {sequelize} = require('../../db/models')

exports.searchModel = async (
model, {limit:specifiedLimit = 10, page, searchField}
) =>{
    try {
      const limit = Math.min(specifiedLimit, 100); // restrict limit to 100
      const offset = 0 + (page - 1) * limit;
      let searchResult
        const raw = await model.findAll({
            where: {
                name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchField + '%')
            },
            order: [
             ["created_at", "DESC"]
            ],
        }) 
      const total = raw.length
        if(Number(total) > 0){
            searchResult = await model.findAndCountAll({
                limit: limit,
                offset,
                where: {
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchField + '%')
                },
                order: [
                ["created_at", "DESC"]
                ],
            })
        }
        const altNoResult = {
            count: 0,
            rows: []
        }
       

        return {
            data:(Number(total) > 0)? searchResult: altNoResult,
            total: total,
            currentPage: page,
            hasNext: (page * limit) < total,
            hasPrevious: page > 1,
            perPage: limit,
            totalPages: Math.ceil(total / limit),
        };
    } catch (err) {
      console.log(err);
        
    }
}