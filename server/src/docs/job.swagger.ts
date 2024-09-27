/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - location
 *         - category
 *         - company
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the job
 *         title:
 *           type: string
 *           description: The title of the job
 *         description:
 *           type: string
 *           description: A detailed job description
 *         qualifications:
 *           type: string
 *           description: The qualifications required for the job
 *         responsibilities:
 *           type: string
 *           description: The responsibilities involved in the job
 *         location:
 *           type: string
 *           description: The location of the job
 *         salaryRange:
 *           type: object
 *           properties:
 *             min:
 *               type: number
 *               description: The minimum salary for the job
 *             max:
 *               type: number
 *               description: The maximum salary for the job
 *           description: The salary range for the job
 *         category:
 *           type: string
 *           description: The ID of the job category
 *         company:
 *           type: string
 *           description: The name of the company offering the job
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the job was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last date the job was updated
 *       example:
 *         id: 605c72a4f92d2c73b5f1d39e
 *         title: Software Engineer
 *         description: Responsible for developing software solutions
 *         qualifications: Bachelor's degree in Computer Science
 *         responsibilities: Develop, test, and maintain software
 *         location: Berlin, Germany
 *         salaryRange:
 *           min: 50000
 *           max: 70000
 *         category: 5fca3b4b14a55d2f50ef3c89
 *         company: Kreativstorm
 *         createdAt: 2023-09-20T08:45:12.302Z
 *         updatedAt: 2023-09-20T08:45:12.302Z
 * 
 * /jobs:
 *   get:
 *     summary: Returns a list of jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: The list of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *   post:
 *     summary: Creates a new job
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: The job was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad request
 * 
 * /jobs/{id}:
 *   get:
 *     summary: Get a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The job ID
 *     responses:
 *       200:
 *         description: The job description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       404:
 *         description: Job not found
 *   put:
 *     summary: Update a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The job ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: The job was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       404:
 *         description: Job not found
 *       400:
 *         description: Bad request
 *   delete:
 *     summary: Deletes a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The job ID
 *     responses:
 *       200:
 *         description: The job was deleted
 *       404:
 *         description: Job not found
 */

