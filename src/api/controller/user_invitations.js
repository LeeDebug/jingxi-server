const Base = require('./base.js');
const moment = require('moment');

module.exports = class extends Base {
    /**
     * 获取该用户所有邀请记录
     * @returns {Promise.<*>}
     */
    async listAction() {
		// console.log('=-=-=-> func -> user_invitations -> listAction')
		const userId = this.getLoginUserId();;

		// 获取列表数据
        const model = this.model('user_invitations');
		const list = await model.where({
            referrer_user_id: userId
        }).select()
		// console.log('=-=-=-> listAction -> list: ', list)

        // 处理 邀请记录状态 的展示文字
        for (const item of list) {
            // 将状态转换为文字
            item.status_text = await model.getInvitationStatusText(item.id)
            
            // 如果邀请人已经注册，查询邀请人的头像
            if (item.status > 1 && item.invitee_user_id) {
                item.invitee_user_avatar = await this.model('user').getUserAvatar(item.invitee_user_id)
                // console.log('=-=-=-> item.invitee_user_avatar: ', item.invitee_user_avatar)
            }
        }
        return this.success(list);
    }

};