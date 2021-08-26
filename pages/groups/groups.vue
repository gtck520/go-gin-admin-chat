<template>
	<view>
		
		<cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="false">
			<block slot="left" >
				<text class="lg text-white cuIcon-friend"  @click="gotojoingroup()" style="font-size: 40upx; margin-left: 30upx;"></text>
			</block>
			<block slot="content">组群列表</block>
			<block slot="right" >
			<view class="lg text-white cuIcon-message"  @click="gotomsgbox()" style="font-size: 40upx; margin-right: 60upx;">
					<view class='cu-tag badge' v-if="getMsgbox" style="top:24upx; right:56upx"></view>
			</view>
			</block>
		</cu-custom>
		<view class="cu-bar bg-white search fixed" @click="addnewgroup" :style="[{top:CustomBar + 'px'}]">
				<text class="lg text-white cuIcon-add"  style="font-size: 40upx; margin-left: 30upx; color: #333;">创建群</text>
		</view>
		<scroll-view :scroll-y="modalName==null" class="page" style="height:calc(100vh - 200upx)" :class="modalName!=null?'show':''">
			

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 消息列表
				</view>
			</view>
			<view class="cu-list menu-avatar">
			
				<view class="cu-item" v-for="(item,key) in grouplist" :key="key" @click="clicktochat(item.id,key)">
					<view class="cu-avatar round lg"  :style="'background-image:url('+item.avatar+');'" >
						<view class="cu-tag badge">99+</view>
					</view>
					<view class="content">
						<view class="text-grey">
							<view class="text-cut">{{item.groupname}}</view>
						
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								{{item.sign}}
							</view>
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">22:20</view>
						<view class="cuIcon-notice_forbid_fill text-gray"></view>
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
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: 'VR'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '录像'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '图像'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '通知'
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '排行榜'
				}, {
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '皮肤'
				}, {
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '发现'
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '帮助'
				}, {
					cuIcon: 'commandfill',
					color: 'purple',
					badge: 0,
					name: '问答'
				}, {
					cuIcon: 'brandfill',
					color: 'mauve',
					badge: 0,
					name: '版权'
				}],
				modalName: null,
				gridCol: 3,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				getMsgbox:false,
				listTouchStart: 0,
				listTouchDirection: null,
				grouplist:[]
			};
		},
		computed: {
			...mapState(['hasLogin','userInfo','addgroup','msgboxgroup'])
			
		},
		///监听好友上下线
		watch:{
		  addgroup:function(val){
			  console.log(val);
		       this.grouplist=this.userInfo.data.group;
			  this.$forceUpdate() //二维数组，开启强制渲染
		  },
		  msgboxgroup:function(val){
			  this.getMsgbox=true;
		  }
			
		},
		onShow() {
		   this.grouplist=this.userInfo.data.group;
		  
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
addnewgroup(e){
	uni.navigateTo({
		url:"addgroup"
	})
},
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			clicktochat(id,sub){
				let toid='group'+id;
				let that=this;
				let mineid=this.userInfo.data.mine.id;
			
				let chattoinfo=new Object();
				this.grouplist[sub]['logtype']="group";
				chattoinfo=this.grouplist[sub];
				this.$store.commit('addChater',{data:chattoinfo,type:'group',val:id});
				uni.navigateTo({
				    url:"../chat/chat?chatto="+id+"&type=1&title="+chattoinfo.groupname
				})
			},
			gotojoingroup(e){
				uni.navigateTo({
					url:"joingroup"
				})
			},
			gotomsgbox(){
				this.getMsgbox=false;
				uni.navigateTo({
				   url:"../msgbox/msgbox"
				})
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
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
