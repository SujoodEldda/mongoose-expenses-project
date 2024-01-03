const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
    item : string,
    amount : Number,
    date:  date,
    group: string
})

const Expense = mongoose.model("expense", expenseSchema)
module.exports = Expense