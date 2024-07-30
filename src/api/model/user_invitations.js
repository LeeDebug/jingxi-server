module.exports = class extends think.Model {
	
    async getInvitationStatusText(record_id) {
		// console.log('=-=-=-> getInvitationStatusText -> record_id: ', record_id)
        const recordInfo = await this.where({
            id: record_id
        }).find();
        let statusText = '';
        switch (recordInfo.status) {
            case '1': // pending
                statusText = '未接收';
                break;
			case '2': // accepted
				statusText = '已注册';
				break;
            case '3': // ordered
                statusText = '已下单';
                break;
            case '4': // rebated
                statusText = '已返利';
                break;
			default:
                statusText = '未接收';
                break;
        }
        return statusText;
    }

};