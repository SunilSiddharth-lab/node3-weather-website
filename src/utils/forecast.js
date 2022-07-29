const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3805334acd1ce275fbd95f71ec5414ac&query=' + latitude + ' ,' + longitude + '&units=m'

    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather services!', undefined)
        } else if ( body.error){
            callback('Unable to forecast weather for the given latitude and longitude', undefined)
        } else {
            callback( undefined , {
                forecast: body.current.weather_descriptions[0] 
            })
        }
    })
}

module.exports = forecast