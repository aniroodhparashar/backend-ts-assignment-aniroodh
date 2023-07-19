class Checkout{
    constructor(pricingRules) {
        this.items = []
        this.pricingRules = pricingRules
    }

    scan(item){
        this.items.push(item)
    }

    total(){

        const itemCounts = this.items.reduce((counts, item) => {
            counts[item] = (counts[item] || 0) + 1  
            return counts  
        }, {})
        const totalPrice = Object.keys(itemCounts).reduce((total, item) => {
            const count = itemCounts[item]  
            const pricingRule = this.pricingRules.find((rule) => rule.rule.sku === item)  

            if (pricingRule) {
                return total + pricingRule.apply(count)  
            } else {
                const regularPrice = this.getRegularPrice(item)  
                return total + regularPrice * count  
            }
        }, 0)  

        return totalPrice.toFixed(2)  

    }

    getRegularPrice(item){
        const defaultPrices = {
            op10: 849.99,
            wtch: 229.99,
            buds: 129.99,
            op11: 949.99,
        }
        return defaultPrices[item] || 0  
    }

}

module.exports = Checkout