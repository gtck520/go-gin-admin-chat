<script>
	import Vue from 'vue'
	import store from './store'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		
		},
		
		onShow: function() {
		  ///验证是否掉线
           var that=this;
            var logined=(store.getters.hasLogin);
			if(logined){
				///检测是否当前还处于在线
				let checkdata= store.getters.userinfo;
				 that.$apiconfig.checklogout_f({data:checkdata}).then(res=>{
					if(parseInt(res.data.code)==0){
						that.$mysocket.connectserver(checkdata.id)
					}
				 })
			}else{
				uni.reLaunch({
					url:"pages/login"
				})
			}
		
		
		
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	
</style>
