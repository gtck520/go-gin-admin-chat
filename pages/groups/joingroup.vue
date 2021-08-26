<template>
	<view>
		
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="true"><block slot="backText" style="display: none;">返回</block>
				<block slot="content">搜索添加群</block>
			
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
				<view class="cu-item" v-for="(item,index) in searchList" :key="index" >
					<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+item.avatar+')'}]"></view>
					<view class="content">
						<view class="text-grey">{{item.groupname}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								<text class="cuIcon-infofill margin-right-xs"></text>
								{{item.sign}}
							</view> </view>
					</view>
					<view class="action" style="width: 160upx;">
						<button class="cu-btn round line-mauve" @click="clickgotodetail(item.id)">添加</button>
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
				searchList:[],
			};
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
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
			nowsearing(e){
				let tempmy= this.userInfo.data.mine;
				this.$apiconfig.searchuser_f({data:{id:tempmy.id,content:this.searchtitle,type:2}}).then(res=>{
			
					this.searchList=res.data;
				})
			},
			clickgotodetail(id){
				uni.navigateTo({
					url:"../userlist/applydetail?id="+id+"&type=2"
					
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
