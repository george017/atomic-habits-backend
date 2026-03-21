const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('./config/database');

const habitsRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// CONFIGURACIÓN DE CORS
app.use(cors({
  origin: 'http://localhost:5173', // Puerto de tu Vite/React
  credentials: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// RUTAS (Ajustado para evitar duplicados)
app.use('/api', habitsRouter); 
app.use('/users', usersRouter);

module.exports = app;