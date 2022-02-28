/**
 * Query for diffDays
 * @param {Date} from_date - from date
 * @param {Date} to_date - to date
 * @returns {Number}
 */
const diffDays = (from_date, to_date) => {
    var diff = (new Date(to_date)).getTime() - (new Date(from_date)).getTime();
    return Math.ceil(diff / (1000 * 3600 * 24) + 1);
};

module.exports = {
    diffDays,
};
