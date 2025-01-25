const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Movies']
    try {
        const result = await mongodb.getDatabase().db().collection('Movies').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch movies', error });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Movies']
    try {
        const movieId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('Movies').findOne({ _id: movieId });

        if (!result) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Invalid ID or server error', error });
    }
};

const createMovie = async (req, res) => {
    //#swagger.tags = ['Movies']
    const movie = {
        title: req.body.title,
        description: req.body.description || '',
        releaseDate: req.body.releaseDate,
        genres: req.body.genres || [],
        popularity: req.body.popularity || 0,
        source: req.body.source || '',
        studio: req.body.studio || '',
    };

    try {
        const response = await mongodb.getDatabase().db().collection('Movies').insertOne(movie);

        if (response.acknowledged) {
            res.status(201).json({ message: 'Movie created successfully', movieId: response.insertedId });
        } else {
            res.status(500).json({ message: 'Failed to create movie' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while creating movie', error });
    }
};

const updateMovie = async (req, res) => {
    //#swagger.tags = ['Movies']
    try {
        const movieId = new ObjectId(req.params.id);
        const movie = {
            title: req.body.title,
            description: req.body.description,
            releaseDate: req.body.releaseDate,
            genres: req.body.genres,
            popularity: req.body.popularity,
            source: req.body.source,
            studio: req.body.studio,
        };

        const response = await mongodb.getDatabase().db().collection('Movies').updateOne({ _id: movieId }, { $set: movie });

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Movie updated successfully' });
        } else {
            res.status(404).json({ message: 'Movie not found or no changes made' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating movie', error });
    }
};


const deleteMovie = async (req, res) => {
    //#swagger.tags = ['Movies']
    try {
        const movieId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('Movies').deleteOne({ _id: movieId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Movie deleted successfully' });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting movie', error });
    }
};

module.exports = {
    getAll,
    getSingle,
    createMovie,
    updateMovie,
    deleteMovie,
};