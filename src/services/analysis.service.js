const { dateService } = require('.');
const { Log } = require('../models');
const moment = require('moment');

const makeQuery = (beforeDay, now, district = null) => {
  const query = {
    OCCURRED_ON_DATE: {
      $gt: (beforeDay.format('YYYY-MM-DD')),
      $lte: (now.format('YYYY-MM-DD')),
    }
  };
  if (district) {
    query.DISTRICT = district;
  }
  return query;
}

/**
 * Query for analysis
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAnalysis = async (filter, options) => {
  const totalDates = dateService.diffDays(filter.from_date, filter.to_date);
  const totalPages = Math.ceil(totalDates / options.limit);
  const offset = (options.page - 1) * options.limit;

  let itDate = moment(filter.from_date).add(offset, 'days');
  let itNum = 0;

  let results = [];
  while (moment(filter.to_date).isSameOrAfter(itDate) && itNum < options.limit) {
    const sevenBeforeDay = moment(itDate).subtract(7, 'days');
    results.push({
      date: itDate.format('YYYY-MM-DD'),
      average: await Log.countDocuments(makeQuery(sevenBeforeDay, itDate, filter.district)) / 7
    })

    itNum++;
    itDate = itDate.add(1, 'days');
  }

  return {
    results,
    ...options,
    totalPages,
    totalResults: totalDates,
    scope: filter.district || 'all'
  };
};

module.exports = {
  queryAnalysis,
};
