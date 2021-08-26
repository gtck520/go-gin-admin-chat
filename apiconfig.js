/**
 * version 1.1.7
 */
import request from 'request.js'
class apiconfig {
  constructor(config = {}) {
        this.baseurl= 'http://127.0.0.1:8000/v1/';
		this.merchcode='cb0ac353f02a73a7c45885a862fe4de1';
		this.pathconfig={
		  	login:"api/user/login", ///第三方登录,
			regist:"apicom/user/regist", ///第三方注册,
			checklogout:"apicom/user/checklogout", ///第三方注册,
			registClientid:"/apicom/chat/registchater",///注册聊天通道,
			initInfo:"api/user/info",///获取用户个人信息  [usign=34],
			sendMessage:'apicom/commapi/sendmessageapp',///发送数据
		    getMessagelog:'apicom/chatlog/mochatlog',///获取历史记录,
		    upload_image:this.baseurl+'/apicom/commapi/upload_image',///图片上传地址,
			upload_voice:this.baseurl+'/apicom/commapi/upload_voice',///图片上传地址,
			searchuser:'/apicom/commapi/searchapp',///图片上传地址,
			getUinfoByid:'/apicom/set/getuserinfoByid',///图片上传地址,
			sendInvite:'/apicom/commapi/savemsgapp',///图片上传地址,
			getMsgbox:'/apicom/commapi/msgbox',///获取消息盒子的信息,
			getlevemsg:'/apicom/commapi/levemsg',///获取与某个好友的留言信息,这样在第一次加载对话的时候就去检测一次
			handlefirend:'/apicom/set/changeHandle',///同意好友请求,
			createGroup:'apicom/set/createGroup',
			updateuserinfo:'apicom/set/update',
			getrecentmsg:'apicom/chatlog/mochatlog',///最近20条记录
			
			
			
		}
  }
  ///把存聊天缓存放主文件里面 可全局调用  cacheid 缓存的对象的id  cachetype对象类型(user,group)
   cacheMessage(val,cachetype,cacheid,tempmy){
  	////聊天记录存入缓存
  	let msg=val;
  
  	uni.getStorage({
  				key: 'chatim',
  				fail(res) {
  				
  					if(res.data==''||typeof(res.data)=='undefined'){
  						///如果没有缓存
  						let tempcache=new Object();
  						let chatlog=new Object();
  						let temparr=new Array();
  									
  						temparr.push(msg);
  						if(cachetype=='group'){
  							chatlog['group'.concat(cacheid)]=temparr;
  						
  						}else{
  							chatlog['friend'.concat(cacheid)]=temparr;
  							
  						}
  					
  						tempcache[tempmy.id]= {chatlog:chatlog};
  					    uni.setStorage({
  							key: 'chatim',
  							data:tempcache
  						})
  					}
  				},
  				success(res){
  					console.log(res.data)
  				 
				    if(typeof(res.data[tempmy.id])=='undefined'){
						///处理同一台设备登录过多个账户
						res.data[tempmy.id]=new Object();
					}
				 
  					///如果有
  					//1判断有没有对应该用户的聊天记录  有没有都添加
  					  					
  					if(typeof(res.data[tempmy.id]['chatlog'])=='undefined'){
  						res.data[tempmy.id]['chatlog']=new Object();
  						if(cachetype=='group'){
  						    res.data[tempmy.id]['chatlog']['group'+cacheid]=new Array();
  						    res.data[tempmy.id]['chatlog']['group'+cacheid].push(msg)
  							res.data[tempmy.id]['chatlog']['group'+cacheid]=res.data[tempmy.id]['chatlog']['group'+cacheid].slice(-10);
  						}else{
  							res.data[tempmy.id]['chatlog']['friend'+cacheid]=new Array();
  							res.data[tempmy.id]['chatlog']['friend'+cacheid].push(msg)
  							res.data[tempmy.id]['chatlog']['friend'+cacheid]=res.data[tempmy.id]['chatlog']['friend'+cacheid].slice(-10);
  						}
  						
  					}else{
  						if(cachetype=='group'){
  					      if(typeof(res.data[tempmy.id]['chatlog']['group'+cacheid])=='undefined'){
  						        res.data[tempmy.id]['chatlog']['group'+cacheid]=new Array();
  					      }
  						    res.data[tempmy.id]['chatlog']['group'+cacheid].push(msg)
  							res.data[tempmy.id]['chatlog']['group'+cacheid]=res.data[tempmy.id]['chatlog']['group'+cacheid].slice(-10);////只存10条记录
  						
  						}else{
  							if(typeof(res.data[tempmy.id]['chatlog']['friend'+cacheid])=='undefined'){
  								res.data[tempmy.id]['chatlog']['friend'+cacheid]=new Array();
  							}
  							res.data[tempmy.id]['chatlog']['friend'+cacheid].push(msg)
  							res.data[tempmy.id]['chatlog']['friend'+cacheid]=res.data[tempmy.id]['chatlog']['friend'+cacheid].slice(-10);
  					
  						}
  					}
  					  					
  					uni.setStorage({
  						key: 'chatim',
  						data:res.data
  					})
  				}
  			})
  }
  getrecentmsg_f(config){
  	   return request.post(this.pathconfig.getrecentmsg,config); 
  }
  getlevemsg_f(config){
  	   return request.post(this.pathconfig.getlevemsg,config); 
  }
  updateuserinfo_f(config){
  	   return request.post(this.pathconfig.updateuserinfo,config); 
  }
  createGroup_f(config){
  	   return request.post(this.pathconfig.createGroup,config); 
  }
  handlefirend_f(config){
  	   return request.post(this.pathconfig.handlefirend,config); 
  }
  getMsgbox_f(config){
  	   return request.post(this.pathconfig.getMsgbox,config); 
  }
  sendInvite_f(config){
  	   return request.post(this.pathconfig.sendInvite,config); 
  }
  getUinfoByid_f(config){
  	   return request.post(this.pathconfig.getUinfoByid,config); 
  }
  searchuser_f(config){
  	   return request.post(this.pathconfig.searchuser,config); 
  }
  login_f(config){
  	   return request.post(this.pathconfig.login,config); 
  }
  regist_f(config){
  	   return request.post(this.pathconfig.regist,config); 
  }
  checklogout_f(config){
  	   return request.post(this.pathconfig.checklogout,config); 
  }
  registClientid_f(config){
  	   return request.post(this.pathconfig.registClientid,config); 
  }
  initInfo_f(config){
  	   return request.post(this.pathconfig.initInfo,config); 
  }
  sendMessage_f(config){
  	   return request.post(this.pathconfig.sendMessage,config); 
  }
  getMessagelog_f(config){
  	   return request.post(this.pathconfig.getMessagelog,config); 
  }
 
}

if (!global.$apiconfig) {
  global.$apiconfig = new apiconfig();
}

export default global.$apiconfig;