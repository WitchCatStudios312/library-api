import express from "express";
import db from '../db/conn.mjs'
import { ObjectId } from "mongodb";

const router = express.Router();

//get a list of all the books
router.get('/', async(req, res) => {
    let collection = await db.collection('books');
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

//get a single book by id
router.get('/:id', async(req, res) => {
    let collection = await db.collection('books');
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if(!result) res.send('Not found').status(404);
    else res.send(result).status(200);
});

//create a new book
router.post('/', async(req, res) => {
    let newDocument = {
        title: req.body.title,
        seriesNum: req.body.seriesNum,
        author: req.body.author, 
        category: req.body.category,
        recommended: req.body.recommended,
        lendable: req.body.lendable,
        format: req.body.format,
        read: req.body.read,
        purchaseDate: req.body.purchaseDate,
    };
    let collection = await db.collection('books');
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

//update book by id
router.patch('/:id', async(req, res) => {
    const query = {_id: new ObjectId(req.params.id)};
    const updates = {
        $set: {
            title: req.body.title,
            seriesNum: req.body.seriesNum,
            author: req.body.author, 
            category: req.body.category,
            recommended: req.body.recommended,
            lendable: req.body.lendable,
            format: req.body.format,
            read: req.body.read,
            purchaseDate: req.body.purchaseDate,
        }
    };

    let collection = await db.collection('books');
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
})

//delete a book
router.delete('/:id', async(req, res) => {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection('books');
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

export default router;