const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const analysisValidation = require('../../validations/analysis.validation');
const analysisController = require('../../controllers/analysis.controller');

const router = express.Router();

router
    .route('/')
    .get(auth(), validate(analysisValidation.getAnalysis), analysisController.getAnalysis);


module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Analysis
 *   description: Analyze crime by returning a 7-day moving average
 */

/**
 * @swagger
 * /analysis:
 *   get:
 *     summary: Get 7-day moving average
 *     description: Only admins can retrieve 7-day moving average per day.
 *     tags: [Analysis]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from_date
 *         required: true
 *         schema:
 *           type: date
 *         description: From Date
 *       - in: query
 *         name: to_date
 *         required: true
 *         schema:
 *           type: date
 *         description: To Date
 *       - in: query
 *         name: district
 *         schema:
 *           type: string
 *         description: District
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of dates
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Analysis'
 *                 scope:
 *                   type: string
 *                   example: all
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */