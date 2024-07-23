const Base = require('./base.js');
const moment = require('moment');

module.exports = class extends Base {
    /**
     * 获取优惠券总列表
     * （无任何限制条件）
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

    /**
     * 获取该用户的优惠券
     * 即，表示出不可领取的
     */
    async getAllCouponsAction() {
		// console.log('=-=-=-> func -> getAllCouponsAction')
        const userId = this.getLoginUserId();

        const couponsModel = this.model('coupons');
		const couponsList = await couponsModel.select();
        // console.log('=-=-=-> 所有优惠券 couponsList:\n', JSON.stringify(couponsList, null, 4));

        const userCouponsModel = this.model('user_coupons');
		const userCouponsList = await userCouponsModel.where({ user_id: userId }).select();
        // console.log('=-=-=-> 该用户领过的优惠券 couponsList:\n', JSON.stringify(userCouponsList, null, 4));

        // 遍历 userCouponsList 列表，把 couponsList 列表中不能领取的标识出来
        couponsList.map(c => {
            const got = userCouponsList.find(uc => uc.coupon_id == c.id)
            // console.log('=-=-=-> got:\n', JSON.stringify(got, null, 4))
            // 如果领取过，则添加 canGet 字段
            c.canGet = got == undefined
            return c
        })

        return this.success(couponsList);
    }

};