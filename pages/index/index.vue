<template>
    <view>
        <web-view :webview-styles="webviewStyles" :src="'http://111.229.100.131/index/index/chat?uid='+uid"></web-view>
    </view>
</template>

<script>
	import {
	    mapState 
	} from 'vuex';  
    export default {
        data() {
			
            return {
				uid:0,
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
            }
        },
		computed: {
			...mapState(['hasLogin','userInfo'])
			
		},
		onShow() {
			let that=this;
			uni.getStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    success: function (res) {
					console.log(res.data)
				   that.uid=res.data.data.id;
				}
			});
		},
		onLoad() {
			
		}
		
		
    }
</script>

<style>

</style>