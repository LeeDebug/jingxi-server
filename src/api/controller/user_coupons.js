const Base = require('./base.js');
const moment = require('moment');

module.exports = class extends Base {
    /**
     * 获取某用户下的优惠券列表
     * @returns {Promise.<*>}
     */
    async listAction() {
		// console.log('=-=-=-> func -> listAction')

		const userId = this.getLoginUserId();
        // console.log('=-=-=-> listAction -> userId: ', userId)

		// 获取列表数据
        const model = this.model('user_coupons');
		const list = await model.where({ user_id: userId }).select()
		// console.log('=-=-=-> listAction -> list: ', list)
        return this.success(list);
    }
};