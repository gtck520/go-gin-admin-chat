<template>
	<view>
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="false">
				<block slot="content">消息列表</block>
			</cu-custom>
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 列表左滑
				</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in histtorylist" :key="index"
				 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" @click="tochat(item.id,item.logtype=='group'?item.groupname:item.username,item.logtype=='group'?1:0)" :data-target="'move-box-' + index">
					<view class="cu-avatar round lg" :class="item.status=='offline'?'grayscale':''" :style="[{backgroundImage:'url('+item.avatar+')'}]">
						<view class="cu-tag badge" v-show="item.weidu>0">{{item.weidu>99?'99+':item.weidu}}</view>
					</view>
					<view class="content">
						<view class="text-grey">{{item.logtype=='group'?item.groupname:item.username}}</view>
						<view class="text-gray text-sm">
						   <rich-text :nodes="item.lastmsg==undefined?'':item.lastmsg.text"></rich-text>
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.lasttime}}</view>
					</view>
					<view class="move">
						<view class="bg-grey">置顶</view>
						<view class="bg-red">删除</view>
					</view>
				</view>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	import {
	    mapState 
	} from 'vuex'; 
	export default {
		data() {
			return {
				
				modalName: null,
				gridCol: 3,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null,
			
				histtorylist:{}
			};
		},
		computed: {
			...mapState(['hasLogin','userInfo','getMsg'])
			
		},
		watch:{
		  getMsg:function(val){
		  			let tempdilog=this.$store.getters.currentdilog;
					this.histtorylist=tempdilog;
		  		    this.$forceUpdate() //二维数组，开启强制渲染
		  			//taht.cacheMessage(val);
		   }
		},
		onLoad() {
		},
		onShow() {
		    if(this.hasLogin==false){
				uni.reLaunch({
					url:"../login"
				})
				return;
			}else{
				let tempdilog=this.$store.getters.currentdilog;
						this.histtorylist=tempdilog;
						this.$forceUpdate() //二维数组，开启强制渲染
						let that=this;
						let mineid=this.userInfo.id;
			}
	
	
		
		},
		onLoad() {
			
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			Gridchange(e) {
				this.gridCol = e.detail.value
			},
			Gridswitch(e) {
				this.gridBorder = e.detail.value
			},
			MenuBorder(e) {
				this.menuBorder = e.detail.value
			},
			MenuArrow(e) {
				this.menuArrow = e.detail.value
			},
			MenuCard(e) {
				this.menuCard = e.detail.value
			},
			SwitchSex(e) {
				this.skin = e.detail.value
			},

			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			tochat(id,titl,gtyp){
				uni.navigateTo({
					url:"../chat/chat?chatto="+id+"&title="+titl+"&type="+gtyp
				})
			}
		}
	}
</script>

<style>
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}
</style>
