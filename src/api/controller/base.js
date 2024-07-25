module.exports = class extends think.Controller {
	async __before() {
		// 根据token值获取用户id
		const token = this.ctx.header['x-hioshop-token'] || '';
		const tokenSerivce = think.service('token', 'api');
		think.userId = tokenSerivce.getUserId(token);
	}
	/**
	 * 获取时间戳
	 * @returns {Number}
	 */
	getTime() {
		return parseInt(Date.now() / 1000);
	}
	/**
	 * 获取时间戳
	 * @returns {Number}
	 */
	getFullDate() {
		const date = new Date(); // 将秒级时间戳转换为毫秒级
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');

		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	}
	/**
	 * 获取当前登录用户的id
	 * @returns {*}
	 */
	getLoginUserId() {
		const token = this.ctx.header['x-hioshop-token'] || '';
		const tokenSerivce = think.service('token', 'api');
		return tokenSerivce.getUserId(token);
	}
};
