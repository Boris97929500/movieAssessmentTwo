const express = require('express')
const app = express()
const allData = [];
app.use(express.static('public'))
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.listen(3000, ()=>{
    console.log('listening on port 3000')
} )

app.post('/api', (req, res) =>{
    const data = req.body
    allData.push(data)
    console.log(allData)
    res.json(allData)
})

app.get('/api', (req,res)=>{
    res.json(allData)
})

// app.get('/api', (req, res)=>{
//     res.render('ejsFile/index.ejs',{allData})
// })