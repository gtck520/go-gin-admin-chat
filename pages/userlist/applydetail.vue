<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">表单</block>
		</cu-custom>
		<form>
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+uinfo.avatar+')'}]"></view>
					<view class="content">
						<view class="text-grey">{{type==1?uinfo.nickname:uinfo.groupname}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								<text class="cuIcon-infofill text-red  margin-right-xs"></text>
								{{uinfo.sign}}
							</view> </view>
					</view>
					
				</view>
			</view>
			<!-- !!!!! placeholder 在ios表现有偏移 建议使用 第一种样式 -->
			<view class="cu-form-group">
				<textarea maxlength="-1"  @input="textareaAInput" placeholder="输入验证信息"></textarea>
			</view>
			<view class="padding flex flex-direction">
				
				<button class="cu-btn bg-red margin-tb-sm lg" @click="sendinvite">发送邀请</button>
			</view>
	
		</form>
	</view>
</template>

<script>
	import {
	    mapState 
	} from 'vuex';  
	export default {
		data() {
			return {
				textareaAValue:'',
				uinfo:{},
				type:1,
				uid:0
			};
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		onLoad(option) {
			this.uid=option.id;
			this.type=option.type;
			this.getdata();
			
		},
		methods: {
		
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			getdata(){
				this.$apiconfig.getUinfoByid_f({data:{id:this.uid,type:this.type}}).then(res2=>{
					let res=res2.data;
					if(res.code==1){
						this.uinfo=res.msg;
					}
				})
			},
			sendinvite(){
				let mid=this.userInfo.data.mine.id;
				this.$apiconfig.sendInvite_f({data:{fid:mid,tid:this.uid,content:this.textareaAValue,type:this.type}}).then(res=>{
					uni.showToast({
						icon:'none',
						title:res.data.msg,
					})
					setTimeout(function(){
						uni.navigateBack({
							
						})
					},1800)
					
				})
			}
			
			
		
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
