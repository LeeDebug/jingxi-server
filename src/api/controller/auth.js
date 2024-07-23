const Base = require("./base.js");
const rp = require("request-promise");
module.exports = class extends Base {
  async loginByWeixinAction() {
    // console.log('\n=-=-=-> func -> loginByWeixinAction')
    // const code = this.post('code');
    const code = this.post("code");
    // console.log('=-=-=-> code: ', code)
    let currentTime = parseInt(new Date().getTime() / 1000);
    const clientIp = ""; // 暂时不记录 ip test git
    // 获取openid
    const options = {
      method: "GET",
      url: "https://api.weixin.qq.com/sns/jscode2session",
      qs: {
        grant_type: "authorization_code",
        js_code: code,
        secret: think.config("weixin.secret"),
        appid: think.config("weixin.appid"),
      },
    };
    // console.log('=-=-=-> options:\n', JSON.stringify(options, null, 4))
    let sessionData = await rp(options);
    sessionData = JSON.parse(sessionData);
    if (!sessionData.openid) {
      return this.fail("登录失败，openid无效");
    }
    // console.log('=-=-=-> sessionData:\n', JSON.stringify(sessionData, null, 4))
    // 根据openid查找用户是否已经注册
    let userId = await this.model("user")
      .where({
        weixin_openid: sessionData.openid,
      })
      .getField("id", true);
    let is_new = 0;
    const buffer = Buffer.from('微信用户');
    let nickname = buffer.toString("base64");
    if (think.isEmpty(userId)) {
      // 注册
      userId = await this.model("user").add({
        username: "微信用户" + think.uuid(6),
        password: sessionData.openid,
        register_time: currentTime,
        register_ip: clientIp,
        last_login_time: currentTime,
        last_login_ip: clientIp,
        mobile: "",
        weixin_openid: sessionData.openid,
        nickname: nickname,
        avatar:'/static/images/default_avatar.png'
      });
      is_new = 1;
    }
    // console.log('=-=-=-> userId: ', userId)
    sessionData.user_id = userId;
    // 更新登录信息
    await this.model("user")
      .where({
        id: userId,
      })
      .update({
        last_login_time: currentTime,
        last_login_ip: clientIp,
      });
    const newUserInfo = await this.model("user")
      .field("id,username,nickname, avatar")
      .where({
        id: userId,
      })
      .find();
    newUserInfo.nickname = Buffer.from(
      newUserInfo.nickname,
      "base64"
    ).toString();
    const TokenSerivce = this.service("token", "api");
    const sessionKey = await TokenSerivce.create(sessionData);
    if (think.isEmpty(newUserInfo) || think.isEmpty(sessionKey)) {
      return this.fail("登录失败4");
    }

    /**
     * 在 我的 页面会用到的接口数据
     */
    // 获取当前余额
    const balance_number = '45.00'
    newUserInfo.balance_number = balance_number

    // 获取当前余额
    const points_number = '798.00'
    newUserInfo.points_number = points_number

    // 获取已经获得优惠券的张数
    const coupon_count = await this.model("user_coupons").where({ user_id: userId }).count()
    newUserInfo.coupon_count = coupon_count

    return this.success({
      token: sessionKey,
      userInfo: newUserInfo,
      is_new: is_new,
    });
  }
  async logoutAction() {
    return this.success();
  }
};
