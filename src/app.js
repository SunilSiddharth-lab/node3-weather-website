const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views' )
const partialsPath = path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sunil'
    })
})


app.get('/about', (req,res) => {
    res.render('about', {
       title: 'About Us',
       name: 'Sunil'  
    })
})


app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sunil',
        text: 'This is some helpful text'
    })
})


app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({
            error: 'Give an address'
        })
    }
    geocode( req.query.address, (error, { latitude, longitude, location} = {}) => {

        if (error){
            return res.send({ error })
        }
    
        forecast( latitude, longitude, (error, forecastData) => {
            
            if(error){
                return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location
            })              
        })
    })
})

app.get('/products', (req,res) => {

    if (!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Sunil',
        errorMessage: 'Page not found'
    })
})

app.get('/help/*', (req,res) => {
    res.render('404' ,{
        title: '404',
        name: 'Sunil',
        errorMessage: 'Help article not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})