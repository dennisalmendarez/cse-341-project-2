const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Animes']
    try {
        const result = await mongodb.getDatabase().db().collection('Animes').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch animes', error });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Animes']
    try {
        const animeId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('Animes').findOne({ _id: animeId });

        if (!result) {
            return res.status(404).json({ message: 'Anime not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Invalid ID or server error', error });
    }
};

const createAnime = async (req, res) => {
    //#swagger.tags = ['Animes']
    const anime = {
        title: req.body.title,
        description: req.body.description || '',
        startDate: req.body.startDate,
        endDate: req.body.endDate || null,
        status: req.body.status || 'Ongoing',
        episodes: req.body.episodes || 0,
        genres: req.body.genres || [],
        popularity: req.body.popularity || 0,
        source: req.body.source || '',
        studio: req.body.studio || '',
    };

    try {
        const response = await mongodb.getDatabase().db().collection('Animes').insertOne(anime);

        if (response.acknowledged) {
            res.status(201).json({ message: 'Anime created successfully', animeId: response.insertedId });
        } else {
            res.status(500).json({ message: 'Failed to create anime' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while creating anime', error });
    }
};

const updateAnime = async (req, res) => {
    //#swagger.tags = ['Animes']
    try {
        const animeId = new ObjectId(req.params.id);
        const anime = {
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status,
            episodes: req.body.episodes,
            genres: req.body.genres,
            popularity: req.body.popularity,
            source: req.body.source,
            studio: req.body.studio,
        };

        const response = await mongodb.getDatabase().db().collection('Animes').updateOne({ _id: animeId }, { $set: anime });

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Anime updated successfully' });
        } else {
            res.status(404).json({ message: 'Anime not found or no changes made' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating anime', error });
    }
};

const deleteAnime = async (req, res) => {
    //#swagger.tags = ['Animes']
    try {
        const animeId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('Animes').deleteOne({ _id: animeId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Anime deleted successfully' });
        } else {
            res.status(404).json({ message: 'Anime not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting anime', error });
    }
};

module.exports = {
    getAll,
    getSingle,
    createAnime,
    updateAnime,
    deleteAnime,
};