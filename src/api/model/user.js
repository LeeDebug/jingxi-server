module.exports = class extends think.Model {
	
    async getUserAvatar(user_id) {
		// console.log('=-=-=-> getUserAvatar -> user_id: ', user_id)
        const userInfo = await this.where({
            id: user_id
        }).find();
        return userInfo.avatar;
    }

};