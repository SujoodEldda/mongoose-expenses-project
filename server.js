const express = require('express')
const app = express()
const api = require('./server/routes/api')
const expense_Data = require('./expenses.json')
var Expense = require("./server/model/Expense")


const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/expense_DB").catch((err)=> console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', api)

const port = 5433
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})