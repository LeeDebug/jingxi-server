const Base = require('./base.js');
module.exports = class extends Base {
    async infoAction() {
        //auto render template file index_index.html
        return this.display();
    }

    /**
     * 获取订单列表
     * @returns 
     */
    async listAction() {
        const billList = await this.model('alipay').where({}).select();
        return this.success(billList);
    }

    /**
     * 根据 年-月 获取订单列表
     * @returns 
     */
    async listByYearMonthAction() {
        const page = this.post('page');
        console.log('=-=-=-> page: ', page)
        const size = this.post('size');
        console.log('=-=-=-> size: ', size)

        const year = this.post('year');
        // console.log('=-=-=-> year: ', year)
        const month = this.post('month');
        // console.log('=-=-=-> month: ', month)

        const billList = await this.model('alipay').where({
            year,
            month
        }).page(page, size).select();
        // 处理数据
        billList.forEach(b => {
            // 强制保留两位小数
            b.amount_cny_string = b.amount_cny.toFixed(2)
            // 如果是支出，则前面加上 - 符号
            if (b.income_or_expense.includes("支出")) {
                b.amount_cny_string = '-' + b.amount_cny_string
            }
            // return b
        })

        const transactionRecordsList = [{
            year,
            month,
            // 支出
            out: billList.reduce((sum, item) => {
                if (item.income_or_expense.includes("支出")) {
                    return sum + item.amount_cny;
                }
                return sum;
            }, 0.00).toFixed(2),
            // 收入
            get: billList.reduce((sum, item) => {
                if (item.income_or_expense.includes("收入")) {
                    return sum + item.amount_cny;
                }
                return sum;
            }, 0.00).toFixed(2),
            billList,
        }]
        // console.log('=-=-=-> billList: ', billList[0])
        return this.success(transactionRecordsList);
    }
};