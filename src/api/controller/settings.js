const Base = require("./base.js");
module.exports = class extends Base {
  async showSettingsAction() {
    let info = await this.model("show_settings")
      .where({
        id: 1,
      })
      .find();
    return this.success(info);
  }
  async saveAction() {
    let userId = this.getLoginUserId();
    let name = this.post("name");
    let mobile = this.post("mobile");
    let nickName = this.post("nickName");
    let avatar = this.post("avatar");
    let name_mobile = 0;
    if (name != "" && mobile != "") {
      name_mobile = 1;
    }
    const newbuffer = Buffer.from(nickName);
    let nickname = newbuffer.toString("base64");
    let data = {
      name: name,
      mobile: mobile,
      nickname: nickname,
      avatar: avatar,
      name_mobile: name_mobile,
    };
    let info = await this.model("user")
      .where({
        id: userId,
      })
      .update(data);
    return this.success(info);
  }
  async userDetailAction() {

    // TODO: 尝试添加 获取手机号
    // const tokenServer = think.service('weixin', 'api');
    // console.log('\n=-=-=-> tokenServer: ', tokenServer)
    // const phoneNumber = await tokenServer.getPhoneNumber();
    // console.log('=-=-=-> phoneNumber: ', phoneNumber)

    let userId = this.getLoginUserId();
    if (userId != 0) {
      let info = await this.model("user")
        .where({
          id: userId,
        })
        .field("id,mobile,name,nickname,avatar")
        .find();
      info.nickname = Buffer.from(info.nickname, "base64").toString();

      /**
       * 在 我的 页面会用到的接口数据
       */
      // 获取当前余额
      const balance_number = '45.00'
      info.balance_number = balance_number

      // 获取当前余额
      const points_number = '798.00'
      info.points_number = points_number

      // 获取已经获得优惠券的张数
      const coupon_count = await this.model("user_coupons").where({ user_id: userId }).count()
      info.coupon_count = coupon_count

      return this.success(info);
    }
    else{
      return this.fail(100,'未登录')
    }
  }
};
