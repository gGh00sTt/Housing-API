import express from 'express';
import multer from 'multer';

import {
  getAll,
  getOne,
  createOne,
  uploadFile,
  updateOne,
  deleteOne,
  getJobStatus,
} from '../controllers/housing';

const router = express.Router();
const upload = multer({ dest: '../uploads' });

/**
 * @swagger
 * /api/house:
 *   get:
 *     summary: Retrieve a list of all houses
 *     tags: [Housing]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of houses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   House Address:
 *                     type: string
 *                   No of bedrooms:
 *                     type: integer
 *                   No of bathrooms:
 *                     type: integer
 *                   Year Built:
 *                     type: integer
 *                   House Type:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.get('/', getAll)

/**
 * @swagger
 * /api/house/{id}:
 *   get:
 *     summary: Retrieve a single house by ID
 *     tags: [Housing]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the house to retrieve
 *     responses:
 *       200:
 *         description: A single house
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: integer
 *                   House Address:
 *                     type: string
 *                   No of bedrooms:
 *                     type: integer
 *                   No of bathrooms:
 *                     type: integer
 *                   Year Built:
 *                     type: integer
 *                   House Type:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *       404:
 *         description: House not found
 *       500:
 *         description: Internal server error
 */

router.get('/:id', getOne)

/**
 * @swagger
 * /api/house:
 *   post:
 *     summary: Create a new single house
 *     tags: [Housing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                   House Address:
 *                     type: string
 *                   No of bedrooms:
 *                     type: integer
 *                   No of bathrooms:
 *                     type: integer
 *                   Year Built:
 *                     type: integer
 *                   House Type:
 *                     type: string
 *     responses:
 *       201:
 *         description: House created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post('/', createOne)

/**
 * @swagger
 * /api/house/upload:
 *   post:
 *     summary: Upload a CSV file
 *     description: Upload a CSV file with the housing data
 *     tags: [Housing]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: The CSV file to upload
 *     responses:
 *       '200':
 *         description: CSV file uploaded successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post('/upload', upload.single('file'), uploadFile)

/**
 * @swagger
 * /api/house/{id}:
 *   put:
 *     summary: Update the details of a single house
 *     tags: [Housing]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: true
 *         description: ID of the house to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                   id:
 *                     type: integer
 *                   House Address:
 *                     type: string
 *                   No of bedrooms:
 *                     type: integer
 *                   No of bathrooms:
 *                     type: integer
 *                   Year Built:
 *                     type: integer
 *                   House Type:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *     responses:
 *       '200':
 *         description: House details updated successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: House not found
 *       '500':
 *         description: Internal server error
 */
router.put('/:id', updateOne)

/**
 * @swagger
 * /api/house/{id}:
 *   delete:
 *     summary: Delete a house by ID
 *     tags: [Housing]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the house to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: House deleted successfully
 *       '404':
 *         description: House not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/:id', deleteOne)

/**
 * @swagger
 * /api/house/status/{jobId}:
 *   get:
 *     summary: Get the status of a upload job
 *     description: Retrieve the status of a job by its ID.
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: path
 *         name: jobId
 *         description: ID of the job to retrieve the status of
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the job
 *                 progress:
 *                   type: integer
 *                   description: Progress of the job (if applicable)
 *       '404':
 *         description: Job not found
 *       '500':
 *         description: Internal server error
 */

router.get('/status/:id', getJobStatus);

export default router;
