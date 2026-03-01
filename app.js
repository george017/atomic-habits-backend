require('./config/database');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Habilita la conexión entre puertos distintos

var habitsRouter = require('./routes/index'); 
var usersRouter = require('./routes/users');

var app = express();
//const cors = require('cors');
//app.use(cors()); // Permite peticiones de cualquier origen

// Middlewares
app.use(cors()); // <--- ¡VITAL! Permite que React vea tus datos
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Motor de vistas (necesario para errores por defecto)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Rutas de la API
app.use('/api/habits', habitsRouter); 
app.use('/users', usersRouter);

// Manejo de 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejo de errores
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;