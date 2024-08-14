/**
 * @swagger
 * components:
 *   schemas:
 *     Listing:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - photos
 *         - price
 *         - available
 *         - min_duration
 *         - max_duration
 *         - extras
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the listing
 *         title:
 *           type: string
 *           description: The title of the listing
 *         description:
 *           type: string
 *           description: The description of the listing
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *           description: The photos of the listing
 *         price:
 *           type: number
 *           description: The price per day
 *         available:
 *           type: boolean
 *           description: Is listing available for rent
 *         min_duration:
 *           type: number
 *           description: The minimum available rent duration
 *         max_duration:
 *           type: number
 *           description: The maximum available rent duration
 *         extras:
 *           type: array
 *           items:
 *             type: string
 *           description: The extras of the listing
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the listing was added
 *       example:
 *         _id: 66b464fd46bb6822133bdc4d
 *         title: Volkswagen Golf
 *         description: 2024 Volkswagen Golf 2.0TSI
 *         photos: [img1.jpg, img2.jpg]
 *         price: 32
 *         available: true
 *         min_duration: 2
 *         max_duration: 60
 *         extras: [vaiko kėdutė, maišas slidėms]
 *         createdAt: 2020-03-10T04:05:06.157Z
 *     ListingInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - photos
 *         - price
 *         - available
 *         - min_duration
 *         - max_duration
 *         - extras
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the listing
 *         description:
 *           type: string
 *           description: The description of the listing
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *           description: The photos of the listing
 *         price:
 *           type: number
 *           description: The price per day
 *         available:
 *           type: boolean
 *           description: Is listing available for rent
 *         min_duration:
 *           type: number
 *           description: The minimum available rent duration
 *         max_duration:
 *           type: number
 *           description: The maximum available rent duration
 *         extras:
 *           type: array
 *           items:
 *             type: string
 *           description: The extras of the listing
 *       example:
 *         title: Volkswagen Golf
 *         description: 2024 Volkswagen Golf 2.0TSI
 *         photos: [img1.jpg, img2.jpg]
 *         price: 32
 *         available: true
 *         min_duration: 2
 *         max_duration: 60
 *         extras: [vaiko kėdutė, maišas slidėms]
 *   responses:
 *     NotFound:
 *       description: The specified resource was not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *     InvalidID:
 *       description: The specified ID is not valid
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *
 * tags:
 *   name: Listing
 *   description: The listing managing API
 * /api/listings:
 *   get:
 *     summary: Returns the list of all listings
 *     tags: [Listing]
 *     responses:
 *       200:
 *         description: The list of the listings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Listing'
 *   post:
 *     summary: Create a new listing
 *     tags: [Listing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ListingInput'
 *     responses:
 *       200:
 *         description: The created listing.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Listing'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 emptyFields:
 *                   type: array
 *                   items:
 *                     type: string
 *
 * /api/listings/{id}:
 *   get:
 *     summary: Get the listing by id
 *     tags: [Listing]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The listing id
 *     responses:
 *       200:
 *         description: The listing description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Listing'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update the listing by the id
 *     tags: [Listing]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The listing id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ListingInput'
 *     responses:
 *       200:
 *         description: The listing was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Listing'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Remove the listing by id
 *     tags: [Listing]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The listing id
 *     responses:
 *       200:
 *         description: The listing was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Listing'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

import express from "express";
import * as controller from "../controller/listingsController.js";

const router = express.Router();

// GET - get all listings
router.get("/", controller.getListings);

// GET - get a single listing
router.get("/:id", controller.getListing);

// POST - create new listing
router.post("/", controller.createListing);

// PATCH - update a listing
router.patch("/:id", controller.updateListing);

// DELETE - delete a listing
router.delete("/:id", controller.deleteListing);

export default router;
