<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg"  :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">创建群</block>
		</cu-custom>
		<form>
			<view class="cu-bar bg-white ">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					{{imgList.length}}/1
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">群名称</view>
				<input placeholder="输入群名称" name="input" v-model="senddata.groupname"></input>
			</view>
			<!-- !!!!! placeholder 在ios表现有偏移 建议使用 第一种样式 -->
			<view class="cu-form-group ">
				<textarea maxlength="-1" :disabled="modalName!=null" v-model="senddata.sign" @input="textareaAInput" placeholder="群说明"></textarea>
			</view>
			
			<view class="cu-form-group">
				<button class="cu-btn bg-red margin-tb-sm lg" style="width: 100%; border-radius: 100upx;" @click="nowcreatgroup">创建</button>
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
				
				imgList: [],
				modalName: null,
				textareaAValue: '',
				senddata:{
					groupname:'',
					sign: '',
					avatar: '',
					orderid: 39
				},
				textareaBValue: ''
			};
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		onLoad() {
			this.senddata.orderid=this.userInfo.data.mine.id;
		},
		methods: {
		
			TimeChange(e) {
				this.time = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			RegionChange(e) {
				this.region = e.detail.value
			},
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			SwitchB(e) {
				this.switchB = e.detail.value
			},
			SwitchC(e) {
				this.switchC = e.detail.value
			},
			SwitchD(e) {
				this.switchD = e.detail.value
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
			ChooseImage() {
				let that=this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					   let urlpaht=this.$apiconfig.pathconfig.upload_image;
					
					   let tempFilePaths = this.imgList;
						        uni.uploadFile({
						            url: urlpaht, //仅为示例，非真实的接口地址
						            filePath: tempFilePaths[0],
									header: {
									'merchcode':that.$apiconfig.merchcode
									},
						            name: 'file',
						            formData: {
						                'user': 'test'
								    },
						            success: (uploadFileRes) => {
						         
										this.senddata.avatar=uploadFileRes.data;
						            }
					   });
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			nowcreatgroup(e){
				console.log(this.senddata)
				this.$apiconfig.createGroup_f({data:this.senddata}).then(res=>{
				
					 uni.showToast({
					 	icon:"none",
						title:res.data.msg
					 })
				});
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
