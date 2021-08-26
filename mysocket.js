/**
 * version 1.1.7
 */
import apirequest from 'apiconfig.js'
import store from './store'


class mysocket {
	constructor(config = {}) {
		this.mineid = 0;
		this.sockettast = null;
		this.config = {
			socketurl: 'ws://127.0.0.1:8000/ws/chat'
		};

	}

	connectserver(usign, token) {
		this.mineid = usign;
		this.sockettast = uni.connectSocket({
			url: this.config.socketurl + "?X-Token=" + token,
			//protocols: [token],
			complete: function(res) {
				if (res.errMsg == 'connectSocket:ok') {
					console.log('成功连接服务器')
					heartCheck.reset().start();
				} else {
					uni.showModal({
						title: '链接服务器失败'
					})
				}

			}
		})

		this.sockettast.onMessage(function(res) {
			let that = this;
			let temdata = JSON.parse(res.data);
			//let temdata= eval("("+res.data+")");
			console.log("receive message:" + res.data)
			heartCheck.reset().start();
			switch (temdata.type) {
				case 'init':
					apirequest.registClientid_f({
						data: {
							'cid': temdata.client_id,
							'usign': usign
						}
					}).then(res => {
						if (res.data.code != 1) {
							uni.showToast({
								icon: 'none',
								title: res.data.msg
							})
						}

					});

					break;
				case 'getmessage':
					let msg = temdata.message;
					let tempv = 0;
					store.commit("setCurrentMsg", msg)
					if (msg.sendmethod == 'group') {
						tempv = msg.toid;
					} else {
						tempv = msg.fromid;
					}
					store.commit('updateChaterAttr', {
						type: msg.sendmethod,
						val: tempv,
						attr: 'lastmsg',
						data: msg.msg.content,
						time: msg.msg.time,
						addinfo: msg.msg.senderinfo
					})

					let tempmy = {
						id: usign
					};
					apirequest.cacheMessage(msg, msg.sendmethod, tempv, tempmy);

					break;
				case 'setfriendstue':
					///设置好友状态
					let msg2 = temdata.message;
					store.commit('setFriendstue', {
						val: msg2.toid,
						data: msg2.state,
						character: msg2.character
					})

					break;
				case 'msgboxuser':
					///获取到信息盒子
					store.commit('setmsgboxuser', temdata.message)
					break;
				case 'msgboxgroup':
					///获取到信息盒子
					store.commit('setmsgboxgroup', temdata.message)
					break;
				case 'addgroup':
					//自己成功创建群
					store.commit('updateGrouplist', temdata.message)
					break;
				case 'addfriend':
					///成功添加好友
					store.commit('updateFriendlist', temdata.message)
					break;
			}
		})
	}

}
//心跳检测
var heartCheck = {
	timeout: 10000, //9分钟发一次心跳
	timeoutObj: null,
	serverTimeoutObj: null,
	reset: function() {
		clearTimeout(this.timeoutObj);
		clearTimeout(this.serverTimeoutObj);
		return this;
	},
	start: function() {
		var self = this;
		this.timeoutObj = setTimeout(function() {
			//这里发送一个心跳，后端收到后，返回一个心跳消息，
			//onmessage拿到返回的心跳就说明连接正常
			var pingstr=
			uni.sendSocketMessage({
				data: '{"type":"ping","data":""}',
				success: () => {},
				fail: () => {
				}
			});
			console.log("ping!")
			self.serverTimeoutObj = setTimeout(function() { //如果超过一定时间还没重置，说明后端主动断开了
				console.log("try=close")
				uni.closeSocket(); //这里为什么要在send检测消息后，倒计时执行这个代码呢，因为这个代码的目的时为了触发onclose方法，这样才能实现onclose里面的重连方法
				//所以这个代码也很重要，没有这个方法，有些时候发了定时检测消息给后端，后端超时（我们自己设定的时间）后，不会自动触发onclose方法。我们只有执行ws.close()代码，让ws触发onclose方法
				//的执行。如果没有这个代码，连接没有断线的情况下而后端没有正常检测响应，那么浏览器时不会自动超时关闭的（比如谷歌浏览器）,谷歌浏览器会自动触发onclose
				//是在断网的情况下，在没有断线的情况下，也就是后端响应不正常的情况下，浏览器不会自动触发onclose，所以需要我们自己设定超时自动触发onclose，这也是这个代码的
				//的作用。
			}, self.timeout)
		}, this.timeout)
	}
}
if (!global.$mysocket) {
	global.$mysocket = new mysocket();
}

export default global.$mysocket;
