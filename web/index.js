const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname)));
app.use('/css', express.static(path.join(__dirname, 'assets/css')));
app.use('/js', express.static(path.join(__dirname, 'assets/js')));
app.use('/images', express.static(path.join(__dirname, 'assets/images')));
app.use('/video', express.static(path.join(__dirname, 'assets/video')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const topDestinations = [
    {
        image: 'https://media-cdn.tripadvisor.com/media/photo-o/10/de/0c/c1/photo0jpg.jpg',
        name: 'Himeji Castle',
        address: 'Himeji, Japan',
        rating: 4.7
    },
    {
        image: 'https://media-cdn.tripadvisor.com/media/photo-o/07/d1/b8/d4/caption.jpg',
        name: 'Alhambra',
        address: 'Granada, Spain',
        rating: 4.5
    },
    {
        image: 'https://media-cdn.tripadvisor.com/media/photo-m/1280/1c/ef/3c/52/caption.jpg',
        name: 'Lake Bled',
        address: 'Bled, Slovenia',
        rating: 4.6
    },
    {
        image: 'https://media-cdn.tripadvisor.com/media/photo-o/0f/43/94/09/caption.jpg',
        name: 'Banff National Park',
        address: 'Alberta, Canada',
        rating: 4.5
    },
    {
        image: 'https://media-cdn.tripadvisor.com/media/photo-m/1280/15/bc/f5/f0/caption.jpg',
        name: 'Lempuyang Temple',
        address: 'Bali, Indonesia',
        rating: 4.7
    },
    {
        image: 'https://media-cdn.tripadvisor.com/media/photo-m/1280/15/91/90/3b/caption.jpg',
        name: 'Phra Cave Beach',
        address: 'Krabi, Thailand',
        rating: 4.8
    },
    {
        image: 'https://media-cdn.tripadvisor.com/media/photo-o/0c/d5/ef/59/caption.jpg',
        name: 'Roman Colosseum',
        address: 'Rome, Italy',
        rating: 4.5
    }
];

app.get('/', (req, res) => {
    res.render('index', { topDestinations });
});

app.get('/planForm', (req, res) => {
    res.render('planForm');
});

app.get('/results', (req, res) => {
    res.render('results');
});

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});