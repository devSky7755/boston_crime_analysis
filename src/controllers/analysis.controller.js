const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { analysisService } = require('../services');

const getAnalysis = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['from_date', 'to_date', 'district']);
    const options = pick(req.query, ['limit', 'page']);
    const result = await analysisService.queryAnalysis(filter, options);
    res.send(result);
});

module.exports = {
    getAnalysis,
};
