const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');

const data = require('./routes/api/data');
const movies = require('./routes/api/movies');
const series = require('./routes/api/series');
const search = require('./routes/api/search');
const movieId = require('./routes/api/moviesID');
const seriesId = require('./routes/api/tvSeriesID');
const register = require('./routes/api/register');
const login = require('./routes/api/login');
const profile = require('./routes/api/profile');

const app = express();

let whitelist = [ 'https://razeftv.herokuapp.com/']
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
if(process.env.NODE_ENV === 'production'){
  app.use(cors(corsOptions));
} else {
  app.use(cors());
}

app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());

app.use('/api/data', data);
app.use('/api/movies', movies);
app.use('/api/series', series);
app.use('/api/search', search);
app.use('/api/movieId', movieId);
app.use('/api/seriesId', seriesId);
app.use('/api/signup', register);
app.use('/api/signin', login);
app.use('/api/profile', profile);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/client/build/index.html'))
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server starter on ${PORT}`));