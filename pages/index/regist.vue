<template>
  <view class="content">
	  
      <section>
		  <view class="modifybank-text">
		        <view><span>+86</span></view>
		        <view class="">
		  					  <input  style="width: 100%; " type="number"maxlength="11" v-model="senddata.user_name"  placeholder="请输入手机号"/>
		  			 </view>
		    
		    </view>
		  
		  <view class="modifybank-text " style="line-height: 70upx; width: 100%;">
			
			 <view><span>图片码</span></view>
				  <view class="">
				  		  <input type="text" value="" v-model="senddata.code" placeholder="请输入图片验证码" />
				  		  </view>
				  <image :src='yzm' mode="aspectFit" style="-webkit-user-select: none; width: 200upx; height: 70upx;"  @click = "url" ></image>
		
	
		  						
		                    
		  </view>
		  		   
		  		   
		  <view class="modifybank-text " style="line-height: 70upx; width: 100%;">
			                     <view><span>聊天昵称</span></view>
		      
		  						 <view class="">
		  							     <input  placeholder="请输入聊天昵称" v-model="senddata.nickname"  type="text" />
		  						 </view>
		  					
		  </view>
		  <view class="modifybank-text">
		        <view><span>密码</span></view>
		        <view class="" style="flex-grow: 1;">
		  				 <input type="password" style="width: 100%; " v-model="senddata.user_pass"  placeholder="请输入6位以上包含数字、字母的密码"/>
		  	   </view>
		    
		    </view>
		    
			
			<view class="modifybank-text">
			      <view><span>确认密码</span></view>
			      <view class="">
								  <input type="password" style="width: 100%; " v-model="senddata.repassword"  placeholder="请确认你的密码"/>
						 </view>
			  
			  </view>
			       <button type="warn" class="round" style="margin-bottom: 0upx;" @tap="save">立即注册</button>
					 <button type="default" class="round" style="margin-top: 10upx;" @tap="gotologin">已有账号</button>
         </section>
  </view>
</template>

<script>
	import {
	    mapState 
	} from 'vuex';  
import {formValidate} from "../../util/util.js";

export default {
	components:{
	
		},
       data() {
          return {
			  code_reg:'',
			  yzm:'',
			   key:'',
			  code:'',
			  sendAuthCode:true,
			   auth_time:0,
			   thessid:'',
			 senddata:{
				       user_name: '',
				       code: '',    ///图片验证码
					   user_pass: '',
				       repassword: '',
					   invite:'',
					   refer:'app',
					   nickname:'',
					   key:''
			  },
			  
			
          }
        },
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
     created() {
		 
         this.key = Math.floor(Math.random()*100000)+100000;
		 this.senddata.key= this.key ;
		
         // this.yzm = 'http://www.8000026.com/apicom/index/getyzm?w=120&h=60&n=2&key='+ this.key;
         let webroot=(this.$request.getConfig()["baseUrl"]);	
         this.yzm = webroot+'apicom/index/getyzm?w=120&h=60&n=2&key='+ this.key+'&apitype=1';
     },
        mounted() {
            
            // console.log(this.$route.query.id)
           
			
		},
		onShow() {
		   this.senddata.mobile=this.userInfo.data.mobile;
		},
		
        methods: {
			getAuthCode:function () {
				   if(!this.code_reg){
						uni.showToast({
							icon:"none",
							title:"请先输入图片中的验证码"
						})
			          
			            return
			        }
			        let params = {
			            mobile: this.userInfo.data.mobile,
			            key:this.key,
						ssid:this.thessid,
			            code:this.code_reg
			        }
				    this.sendAuthCode = false;
					this.$apiconfig.sendcode({data:params}).then(res2=>{
				        let res=res2.data;
						if(res.code == 1){
							uni.showToast({
								icon:"none",
								title:res.msg
							})
						  
						
						    this.auth_time = 80;
						    var auth_timetimer =  setInterval(()=>{
						    this.auth_time--;
						    if(this.auth_time<=0){
						        this.sendAuthCode = true;
						        clearInterval(auth_timetimer);
						        }
						    }, 1000);
						}else{
							uni.showToast({
								icon:"none",
								title:res.msg
							})
							 this.key = Math.floor(Math.random()*100000)+100000
							 let webroot=(this.$request.getConfig()["baseUrl"]);	
						    // this.yzm = 'http://www.8000026.com/apicom/index/getyzm?w=120&h=60&n=2&key='+ this.key;
						    this.yzm = webroot+'apicom/index/getyzm?w=120&h=60&n=2&key='+ this.key+'&apitype=1';
						}
					})
			       
			},
             url(){
                 this.key = Math.floor(Math.random()*100000)+100000;
				  this.senddata.key= this.key;
                 // this.yzm = 'http://www.8000026.com/apicom/index/getyzm?w=120&h=60&n=2&key='+ this.key;
             	 let webroot=(this.$request.getConfig()["baseUrl"]);	
                  this.yzm = webroot +'apicom/index/getyzm?w=120&h=60&n=2&key='+ this.key+'&apitype=1';
                 // console.log(this.key)
             },
			 gotologin(e){
				 uni.navigateTo({
				 	url:"/pages/index/login"
				 })
			 },
			save(e){
				 if(!formValidate(this.senddata.user_name,'require') || !formValidate(this.senddata.user_pass,'require')
				                    || !formValidate(this.senddata.repassword,'require') || !formValidate(this.senddata.code,'require')){
										uni.showModal({
											showCancel:false,
											title:"请将表格填写完整"
										})
				           
				                    return
				                }
				                if(!formValidate(this.senddata.user_name,'phone')){
									uni.showModal({
										showCancel:false,
										title:"手机号格式不正确"
									})
				               
				                    return
				                }
				                if(!formValidate(this.senddata.user_pass,'password')){
									uni.showModal({
										showCancel:false,
										title:"请输入6位以上包含数字、字母的密码"
									})
													               
				                  
				                    return
				                }
				                if(this.senddata.user_pass !== this.senddata.repassword){
									uni.showModal({
										showCancel:false,
										title:"两次密码不一致"
									})
									return
				                }          

			
			
				   this.$apiconfig.regist_f({data:this.senddata}).then(res=>{
					   uni.showToast({
					   	icon:"none",
						title:res.data.msg
					   })
					   if(res.data.code=="1"){
						   setTimeout(function(){
							   /*uni.navigateBack({
							   	delta:1
							   })*/
							  uni.reLaunch({
							  	url:"login"
							  })
						   },1500)
						 }
				   });
				
			}
     
        }
}
</script>

 <style scoped lang="less">
	
  .router-view{
          background:#F1F1F1; 
       }
   section{
       .modifybank-text{
           background:#fff;
           position:relative;
           display:flex;
           justify-content:flex-start;
           width: 100%;
      
       
           padding:26upx 20upx;
           border-bottom: 1upx solid #dcdcdc;
             i{
               color:#999;
               position:absolute;
               left:92%;
               top:15upx;
               font-size:40upx;
             }
             select{
                 width: 65%;
                 height: 100%;
                 margin-right: 20upx;
                 line-height: 60upx;
                 color: #222;
                 font-size: 28upx;
                 border:none;
                 color:black;
                 background:#fff;
                 // appearance:none;
                 // -moz-appearance:none;
                 // -webkit-appearance:none;
                 // -ms-appearance:none;
             }
     
             input{
                 width: 65%;
                 height: 100%;
                 margin-right: 20upx;
                 line-height: 60upx;
                 color: #222;
                 font-size:28upx;
                 background:#fff;
                 overflow: hidden;
                 text-overflow:ellipsis;
                 white-space: nowrap;
                 background:none;
             }
           
       }
       button{
               width:90%;
               margin:40upx auto;
             
       }
	   button:after{
	      border: none;
	   }
       .item-lable{
           line-height:80upx;
           padding-left: 30upx;
           padding-right: 30upx;
           color: #999;
           font-size: 28upx;
       }
   .item_bock {
     display: flex;
     align-items: center;
     justify-content: space-between;
     height:94upx;
     width: 300upx;
     padding:0upx 24upx 0upx 38upx;
     border-bottom: 1upx solid #f7f7f7;
     background: #fff;
   }  
		
       .modifybank-text>view:nth-child(1){
       			width: 150upx;
				font-size: 26upx;
       		}
   }
     
		
</style>