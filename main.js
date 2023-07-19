// const yargs = require('yargs')
const chalk = require('chalk')
const Checkout = require('./Checkout')
const PricingRules=require('./PricingRules')
/*Create rules for discounts*/
const pricingRules = [
    new PricingRules({
        discountType:'3-for-2',
        sku:'buds',
        price:129.99
    }),
    new PricingRules({
        discountType:'bulk',
        sku:'op11',
        minQuantity:4,
        discountedPrice:899.99,
         price:949.99
    }),
    new PricingRules({
        discountType: 'regular',
        sku: 'op10',
        price: 849.99
    }),
    new PricingRules({
        discountType: 'regular',
        sku: 'wtch',
        price: 229.99
    }),

]

const catalog = {
    buds: 'Earbuds',
    op10: 'Oneplus 10',
    op11: 'Oneplus 11',
    wtch: 'Smart Watch',
}


// Example 1 - SKUs Scanned: buds, op10, buds, buds Total expected: $1109.97
function example1() {
    const co = new Checkout(pricingRules)

    co.scan('buds')  
    co.scan('op10')  
    co.scan('buds')  
    co.scan('buds')  


    console.log(chalk.bgBlue('Items Purchased - ' + catalog['buds'] + ',' + catalog['op10']))
    console.log(chalk.bgGreen('Total: $' + co.total()))
}


// Example 2 - SKUs Scanned: wtch, op11, op11, op11, buds, buds, op11, op11 Total expected: $4989.92
function example2() {
    const co = new Checkout(pricingRules)
    co.scan('wtch')  
    co.scan('op11')  
    co.scan('op11')  
    co.scan('op11')  
    co.scan('buds')  
    co.scan('buds')  
    co.scan('op11')  
    co.scan('op11')  
    console.log(chalk.bgBlue('Items Purchased - ' + catalog['wtch'] + ',' + catalog['op11'] + ',' + catalog['buds']))
    console.log(chalk.bgGreen('Total: $' + co.total()))
}
// Test Case: Scanning Only One Item (No Discounts)
function testCase1(){
    const co = new Checkout(pricingRules)

    co.scan('op11')
    console.log(chalk.bgBlue('Items Purchased - ' + catalog['op11']))
    console.log(chalk.bgGreen('Total: $' + co.total()))
}

// Test Case 2 - SKUs Scanned: wtch, op10, op10, op10, op10, wtch Total expected: $3859.94

function testCase2(){
    const co = new Checkout(pricingRules)
    co.scan('wtch')
    co.scan('op10')
    co.scan('op10')
    co.scan('op10')
    co.scan('op10')
    co.scan('wtch')
    console.log(chalk.bgBlue('Items Purchased - ' + catalog['wtch'] + ',' + catalog['op10']))
    console.log(chalk.bgGreen('Total: $' + co.total()))
    
}
example1()
example2()
testCase1()
testCase2()