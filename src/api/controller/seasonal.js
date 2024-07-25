const Base = require('./base.js');
const moment = require('moment');

module.exports = class extends Base {

    // async indexAction() {
    //     const model = this.model('goods');
    //     const goodsList = await model.select();
    //     return this.success(goodsList);
    // }

    /**
     * 获取时令菜单
     * @returns {Promise.<*>}
     */
    async listAction() {
		// console.log('=-=-=-> func -> listAction')
        // const page = this.get('page');
		// console.log('=-=-=-> listAction -> page: ', page)
        // const size = this.get('size');
		// console.log('=-=-=-> listAction -> size: ', size)

		// 获取列表数据
        const model = this.model('seasonal');
		// console.log('=-=-=-> listAction -> model: ', model)
		const list = await model.where({}).select()
		// console.log('=-=-=-> listAction -> list: ', list)
        return this.success(list);
    }
};