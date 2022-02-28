const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const logSchema = mongoose.Schema(
    {
        INCIDENT_NUMBER: {
            type: String,
            required: true,
            trim: true,
        },
        OFFENSE_CODE: {
            type: String,
            required: true,
            trim: true,
        },
        OFFENSE_CODE_GROUP: {
            type: String,
            trim: true,
        },
        OFFENSE_DESCRIPTION: {
            type: String,
            required: true,
            trim: true,
        },
        DISTRICT: {
            type: String,
            trim: true,
        },
        REPORTING_AREA: {
            type: String,
            required: true,
            trim: true,
        },
        SHOOTING: {
            type: String,
            trim: true,
        },
        OCCURRED_ON_DATE: {
            type: Date,
            required: true,
            trim: true,
        },
        YEAR: {
            type: String,
            required: true,
            trim: true,
        },
        MONTH: {
            type: String,
            required: true,
            trim: true,
        },
        DAY_OF_WEEK: {
            type: String,
            required: true,
            trim: true,
        },
        HOUR: {
            type: String,
            required: true,
            trim: true,
        },
        UCR_PART: {
            type: String,
            trim: true,
        },
        STREET: {
            type: String,
            trim: true,
        },
        Lat: {
            type: String,
            trim: true,
        },
        Long: {
            type: String,
            trim: true,
        },
        Location: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: false,
    }
);

// add plugin that converts mongoose to json
logSchema.plugin(toJSON);
logSchema.plugin(paginate);

/**
 * @typedef Log
 */
const Log = mongoose.model('Log', logSchema);

module.exports = Log;
