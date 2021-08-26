<template>
	<view>
		
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="true"><block slot="backText" style="display: none;">返回</block>
				<block slot="content">消息列表</block>
			
			</cu-custom>
			<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="输入搜索的关键词" v-model="searchtitle" confirm-type="search"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-gradual-green shadow-blur round" @click="nowsearing()">搜索</button>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 结果列表
				</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item" v-for="(item,index) in this.msgList" :key="index">
					<block v-if="item.self">
							<view class="cu-avatar round lg" style="backgroundImage:url(../../static/info.png)"></view>
							<view class="content">
						     <block v-if="item.handle=='not_operated'"><text style="margin: 0 auto;">{{item.disdata.nickname}}尚未处理请求</text></block>
							 <block v-else-if="item.handle=='agree'">
								 <text style="margin: 0 auto;" v-if="item.type==2">{{item.disdata.nickname}}同意你加入{{item.todata.groupname}}的请求</text>
								 <text style="margin: 0 auto;" v-if="item.type==1">{{item.disdata.nickname}}同意你的好友请求</text>
							 </block>
							 <block v-else>
								  <text style="margin: 0 auto;"  v-if="item.type==2">{{item.disdata.nickname}}拒绝你加入{{item.todata.groupname}}的请求</text>
								 <text style="margin: 0 auto;"  v-if="item.type==1">{{item.disdata.nickname}}拒绝你好友的请求</text>
							 </block>
							 </view>
					</block>
					<block v-else>
						<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+item.disdata.avatar+')'}]"></view>
						<view class="content">
							<view class="text-grey" v-if="item.type==1">{{item.disdata.nickname}}申请加好友{{item.type}}</view>
							<view class="text-grey" v-else-if="item.type==2">{{item.disdata.nickname}}申请加群{{item.todata.groupname}}</view>
							<view class="text-gray text-sm flex">
								<view class="text-cut">
									<text class=" margin-right-xs"></text>
									验证消息:{{item.content}}
								</view> </view>
						</view>
						<view class="action" style="width: 160upx;" v-if="item.handle=='not_operated'">
						    <button class="cu-btn round line-mauve" @click="operappley(1,item.id)">同意</button>
							<button class="cu-btn round line-mauve" @click="operappley(2,item.id)">拒绝</button>
						</view>
						<view class="action" style="width: 160upx;" v-else-if="item.handle=='agree'">
							<text>已同意</text>
						</view>
						<view class="action" style="width: 160upx;" v-else>
							<text>已拒绝</text>
						</view>
					</block>
					
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
				CustomBar: this.CustomBar,
				modalName: null,
				gridCol: 3,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null,
				searchtitle:'',
				msgList:[],
			};
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		onLoad() {
			this.getData();
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
			getData(){
				let tempmy=this.userInfo.data.mine;
				this.$apiconfig.getMsgbox_f({data:{id:tempmy.id}}).then(res=>{
					let templist=res.data;
					 for(let i=0;i< templist.length;i++){
						if( templist[i].from==tempmy.id){
								///如果是我自己的
							  templist[i].todata=eval("("+templist[i].todata+")");
							  templist[i].fromdata=eval("("+templist[i].fromdata+")");
							  templist[i].disdata=templist[i].todata
							  templist[i].self=true;
						}else{
							templist[i].todata=eval("("+templist[i].todata+")");
							templist[i].fromdata=eval("("+templist[i].fromdata+")");
							  templist[i].disdata= templist[i].fromdata;
							  templist[i].self=false;
						}
					
					 }
					   this.msgList=templist;
					   console.log(this.msgList)
					
				})
			},
			operappley(res,recodeid){
				let ress="rejust";
				if(res==1){
					ress="agree";
				}
				this.$apiconfig.handlefirend_f({data:{id:recodeid,type:ress}}).then(res=>{
					this.getData();
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
