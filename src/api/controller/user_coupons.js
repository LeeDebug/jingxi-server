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
        // ! 暂时先这样用着吧！！！
		let list = await model.alias('uc').join({
            table: 'coupons',
            join: 'inner', // left right inner
            as: 'c',
            on: ['uc.coupon_id', 'c.id']
        }).where({ user_id: userId }).select()
		// console.log('=-=-=-> listAction -> list: ', list)

        /**
         * 根据不同的 coupon_type 返回数据
         *      0: 所有优惠券
         *      1: 待使用
         *      2: 已使用
         *      3: 已过期
         */
        const coupon_type = this.get('coupon_type')
        console.log('=-=-=-> coupon_type: ', coupon_type)
        // 未使用
        if (coupon_type == 1) {
            list = list.filter(v => v.redeemed == 0)
        }
        // 已使用
        if (coupon_type == 2) {
            list = list.filter(v => v.redeemed == 1)
        }
        // 已过期
        if (coupon_type == 3) {
            list = []
        }

        return this.success(list);
    }

    /**
     * 领取优惠券到用户账户
     */
    async getCouponAction() {
		console.log('=-=-=-> func -> getCouponAction')

		const userId = this.getLoginUserId();
        console.log('=-=-=-> getCouponAction -> userId: ', userId)

        const coupon_id = this.post("coupon_id")
        console.log('=-=-=-> getCouponAction -> coupon_id: ', coupon_id)

        const userCouponInfo = {
            user_id: userId,
            coupon_id: coupon_id
        }
        console.log('=-=-=-> getCouponAction -> userCouponInfo:\n', JSON.stringify(userCouponInfo, null, 4))

        const model = this.model('user_coupons');
		const item = await model.where(userCouponInfo).count()
        console.log('=-=-=-> getCouponAction -> item:\n', JSON.stringify(item, null, 4))

        // 多一层校验，数据库是否已经存在此关联
        if (item != 0) {
            return this.fail(400, "您已经领取过该优惠券")
        }

        // 将该关联关系存入数据库
        const userCouponId = await model.add(userCouponInfo);
        console.log('=-=-=-> getCouponAction -> userCouponId: ', userCouponId)

        return this.success({
            userCouponInfo: userCouponInfo
        })
    }

};