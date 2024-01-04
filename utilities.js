
const count_expenses = function(expenses){
    count = 0
    expenses.forEach(element => {
        count+=element.amount
    })
    return count
}

module.exports = count_expenses