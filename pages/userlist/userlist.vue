<template>
	<view>
		<cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="false">
			<block slot="left" >
				<text class="lg text-white cuIcon-friendadd"  @click="gotoadduser()" style="font-size: 40upx; margin-left: 30upx;"></text>
			</block>
			<block slot="content">用户列表</block>
			<block slot="right" >
        	<view class="lg text-white cuIcon-message"  @click="gotomsgbox()" style="font-size: 40upx; margin-right: 60upx;">
					<view class='cu-tag badge' v-if="getMsgbox" style="top:24upx; right:56upx"></view>
			</view>
			</block>
		</cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" v-model="searchtitle" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @click="nowsearing">搜索</button>
			</view>
		</view>
		
		
		<scroll-view scroll-y class="indexes"   :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - '+ CustomBar + 'px - 50px)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true">
			<block v-for="(item,index) in list" :key="index">
				<view :class="'indexItem-' + item.group_id" :id="'indexes-' + item.group_id" :data-index="item.group_id" >
					<view class="padding">{{item.group_name}}</view>
					<view class="cu-list menu-avatar no-padding">
						<view class="cu-item" v-for="(items,sub) in item.group_members" :key="sub" @click="clicktochat(index,sub)" >
							<view class="cu-avatar round lg">
								<image :src="items.id" mode="aspectFit" class="cu-avatar round lg " :class="items.status=='offline'?'grayscale':''"></image>
							</view>
							<view class="content">
								<view class="text-grey"><text class="text-abc">{{items.id}}</text>君</view>
								<view class="text-gray text-sm">
									{{items.id}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view class="indexBar" :style="[{height:'calc(100vh - ' + CustomBar + 'px - 50px)'}]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur" @touchend="setCur"> {{item.firstchrater}}</view>
			</view>
		</view>
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">
			{{listCur}}
		</view>
	</view>
</template>

<script>
	import {
	    mapState 
	} from 'vuex';  
	import {
	    mapMutations  
	} from 'vuex';
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				listCurID: '',
				list: [],
				getMsgbox:false,
				listCur: '',
			    searchtitle:''
			};
		},
		computed: {
			...mapState(['hasLogin','userInfo','userstate','adduser','msgboxuser'])
		},
		///监听好友上下线
		watch:{
		 userstate:function(val){
	        console.log(val)
			this.list=this.userInfo.friends;
			this.$forceUpdate() //二维数组，开启强制渲染
			
		  },
		  adduser:function(val){
			
			  this.list=this.userInfo.friends;
			  this.$forceUpdate() //二维数组，开启强制渲染
		  },
		  msgboxuser:function(val){
			    this.getMsgbox=true;
		  }
			
		},
		onLoad() {
			//let list = [{}];
			let list= this.userInfo.friends;
			console.log("好友列表："+JSON.stringify(list))
			this.list = list;		    
			this.listCur = list[0];
		},
		onReady() {
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top
			}).exec();
			uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
				that.barTop = res.top
			}).exec()
		},
		methods: {
			...mapMutations(['addChater']),
			//获取文字信息
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id].name;
			},
			setCur(e) {
				this.hidden = true;
				this.listCur = this.listCur
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.list[num].firstchrater
				};
			},

			//触发全部开始选择
			tStart() {
				this.hidden = false
			},
			

			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur
			},
			indexSelect(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].name;
						that.movableY = i * 20
						return false
					}
				}
			},
			///////////////////////////
			clicktochat(index,sub){
				///
				let that=this;
				let mineid=this.userInfo.userinfo.id;
				console.log(this.list)
				let toid=this.list[index]['group_members'][sub]['friend_id'];
				if(toid==mineid){
					toid =this.list[index]['group_members'][sub]['user_id'];
				}
				let chattoinfo=new Object();
				chattoinfo=this.list[index]['group_members'][sub];
                 console.log(chattoinfo)
				
				this.$store.commit('addChater',{data:chattoinfo,type:'user',val:toid});
		          uni.navigateTo({
					url:"../chat/chat?chatto="+toid+'&title='+chattoinfo.id
				})
			},
			gotoadduser(){
				uni.navigateTo({
				   url:"adduser"
				})
			},
			gotomsgbox(){
				this.getMsgbox=false;
				uni.navigateTo({
				   url:"../msgbox/msgbox"
				})
			}
			
		}
	}
</script>

<style>
	page {
		padding-top: 100upx;
	}

	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		/* height: 40upx; */
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
</style>
