const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const trackerRoutes = require('./routes/tracker')


require('dotenv').config({path: '.env'})

// Passport config
require('./config/passport')(passport)

/* connectDB() */


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static('public' + '/images'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/tracker', trackerRoutes)
 
/* app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on Port ${process.env.PORT}, you better catch it!`)
})  */

//Connect to the database before listening to prevent crashes on Cyclic
connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("listening for requests");
  })
})