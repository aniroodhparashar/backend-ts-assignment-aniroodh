class PricingRules{
    constructor(rule) {
        this.rule = rule
    }


    apply(count){
//
        switch (this.rule.discountType){
            case '3-for-2':
                return this.apply3For2(count)
            case 'bulk':
                return this.applyBulkDiscount(count)
            case 'regular':
                return this.applyRegularPrice(count)
            default:
                throw new Error('Invalid pricing rule type.')
        }

    }

    apply3For2(count){
        const price = this.rule.price
        const discountedCount = Math.floor(count / 3) * 2 + count % 3
        return discountedCount * price
    }
    applyBulkDiscount(count){
        const price = count >= this.rule.minQuantity ? this.rule.discountedPrice : this.applyRegularPrice(count)  
        return count * price  
    }

    applyRegularPrice(count){
        //console.log(this.rule.price)
        return count * this.rule.price
    }


}

module.exports = PricingRules