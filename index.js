const express = require('express')
const app = express()
const path = require('path');
const Database = require('nedb')

app.use(express.static('public'))
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

const database = new Database('movieData.db')
database.loadDatabase();




app.listen(3000, ()=>{
    console.log('listening on port 3000')
} )
//saving data to database
app.post('/api', (req, res) =>{
    const data = req.body
    database.insert(data);
})
//rendering database info
app.get('/api',  (req,res)=>{
    database.find({}, (err, data)=>{
        if(err){
            res.end();
        }

        res.render('index', {data});
    })

})
//going to info page
app.get('/info', (req, res)=>{
    res.render('info')
})
