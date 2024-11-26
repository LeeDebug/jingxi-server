const _ = require('lodash');
module.exports = class extends think.Model {
    /**
     * 获取订单列表
     * @returns {Promise.<*>}
     */
    async getList() {
        return this.where({}).select();
    }
};