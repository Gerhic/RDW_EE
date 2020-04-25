var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var expressVue = require('express-vue')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// pass your app through express-vue here
// expressVueOptions is optional and explained later in the docs
// this is a promise, so you can either await it or do this.
const vueOptions = {
  rootPath: path.join(__dirname, '../views'),
  head: {
    title: 'Hello this is a global title',
    scripts: [
      { src: 'https://example.com/script.js' }
    ],
    styles: [
      { style: '/assets/rendered/style.css' }
    ]
  },
  data: {
    foo: true,
    bar: 'yes',
    qux: {
      id: 123,
      baz: 'anything you wish, you can have any kind of object in the data object, it will be global and on every route'
    }
  }
}

expressVue.use(app, vueOptions).then(() => {
  // the rest of your express routes.
  app.use('/', indexRouter)
  app.use('/users', usersRouter)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
