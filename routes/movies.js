import express from "express";
const router = express.Router();

//Data
const genres = [
    { id: '1', name: "Drama"},
    { id: '2', name: "Thriller"},
    { id: '3', name: "Action"},
]


//Routes
router.get('/', (req, res) => {
    res.render('index', {
        title: 'My express app',
        message: 'Hello World!'
    })
})
router.get('/api/genres', (req, res) => {
    res.send(genres)
})

export default router;