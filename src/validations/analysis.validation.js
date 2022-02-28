const Joi = require('joi');

const getAnalysis = {
    query: Joi.object().keys({
        from_date: Joi.date().raw().required(),
        to_date: Joi.date().raw().greater(Joi.ref('from_date')).required(),
        district: Joi.string().allow(null, ''),
        limit: Joi.number().integer().default(10),
        page: Joi.number().integer().default(1),
    }),
};

module.exports = {
    getAnalysis,
};
