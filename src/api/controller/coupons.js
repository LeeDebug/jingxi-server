const Base = require('./base.js');
const moment = require('moment');

module.exports = class extends Base {
    /**
     * 获取时令菜单
     * @returns {Promise.<*>}
     */
    async listAction() {
		// console.log('=-=-=-> func -> listAction')
		// 获取列表数据
        const model = this.model('coupons');
		const list = await model.where({}).select()
		// console.log('=-=-=-> listAction -> list: ', list)
        return this.success(list);
    }
};