// config inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()


// forma de let JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person',personRoutes)


// rota inicial / endpoint
app.get('/',(req, res) => {

    //mostrar req

    res.json({ message: 'Oi Express!'})

})

// mateus147

// mongodb+srv://mateus:mateus147@apicluster.tofgbch.mongodb.net/bancodaapi?retryWrites=true&w=majority


// entregar uma porta
const DB_USER = process.env.DB_USER
const DB_SENHA = encodeURIComponent(process.env.DB_SENHA)
mongoose
.connect(
    `mongodb+srv://${DB_USER}:${DB_SENHA}@apicluster.tofgbch.mongodb.net/?retryWrites=true&w=majority`,
    )
.then(() => {
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
})
.catch((err) => console.log(err))
