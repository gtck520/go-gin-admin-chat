import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
	    userInfo: {},
		getMsg:{},
		adduser:{},
		addgroup:{},
		msgboxuser:'',
		msgboxgroup:'',
		userstate:'',///用户状态
	    chatTolist:{},///当前聊天对话的里面是聊天的对象和
	},
	mutations: {
		login(state, provider) {

			state.hasLogin = true;
			state.userInfo = provider.data;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
			
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			state.getMsg={};
			state.adduser={};
			state.addgroup={};
			state.msgboxuser='';
			state.msgboxgroup='';
			state.userstate='';///用户状态
			state.chatTolist={};///当前聊天对话的里面是聊天的对象和
			uni.removeStorage({  
                key: 'userInfo'  
            })
		},
		setCurrentMsg(state,provider){
			provider.type=provider.type;
			state.getMsg=provider;
			///存储最后一句话
		},
		setmsgboxuser(state,provider){
			state.msgboxuser=provider;
		},
		setmsgboxgroup(state,provider){
			state.msgboxgroup=provider;
		},
		addChater(state,provider){
			let nowDate=new Date();
		    if(provider.type=="user"){
				 state.chatTolist['user'+provider.val]=provider.data;
				 state.chatTolist['user'+provider.val]['weidu']=0
				 state.chatTolist['user'+provider.val]['lasttime']=nowDate.getHours()+":"+nowDate.getMinutes();
			}else{
				 state.chatTolist['group'+provider.val]=provider.data;
				 state.chatTolist['group'+provider.val]['weidu']=0
				 state.chatTolist['group'+provider.val]['lasttime']=nowDate.getHours()+":"+nowDate.getMinutes();
			}
	
		},
		updateFriendlist(state,provider){
		   state.adduser=provider;
		   state.userInfo.data.friend['usercharacter'+provider.firstchrater].list["user"+provider.id]=provider;
		},
		updateGrouplist(state,provider){
			state.addgroup=provider;
			state.userInfo.data.group['group'+provider.id]=provider;
		},
		resetWeidu(state,provider){
			if(provider.type=="user"){
				 state.chatTolist['user'+provider.val]['weidu']=0
			}else{
				state.chatTolist['group'+provider.val]['weidu']=0
			}
		},
		setFriendstue(state,provider){
			if(typeof(state.chatTolist['user'+provider.val])=='undefined'){
			
			}else{
				state.chatTolist['user'+provider.val]['status']=provider.data;///将状态设置为在线
			}
			
		    state.userInfo.data.friend["usercharacter"+provider.character].list['user'+provider.val]['status']=provider.data;
			 state.userstate='setFriendstue'+provider.val+provider.data;

		},
		
		////更新某个回话的最后聊天内容
		updateChaterAttr(state,provider){
		let nowDate=new Date();
		   if(provider.type=="user"){
			
			   if(typeof(state.chatTolist['user'+provider.val])=='undefined'){
				  this.commit('addChater',{data:provider.addinfo,type:'user',val:provider.addinfo.id})
		       }
			   state.chatTolist['user'+provider.val][provider.attr]=provider.data;
			   state.chatTolist['user'+provider.val]['weidu']++;
			   state.chatTolist['user'+provider.val]['lasttime']=nowDate.getHours()+":"+nowDate.getMinutes();
		
         }else{
			 if(typeof(state.chatTolist['group'+provider.val])=='undefined'){
				     this.commit('addChater',{data:provider.addinfo,type:'group',val:provider.addinfo.id})
			 }
			 state.chatTolist['group'+provider.val][provider.attr]=provider.data;
			 state.chatTolist['group'+provider.val]['weidu']++;
			 state.chatTolist['group'+provider.val]['lasttime']=nowDate.getHours()+":"+nowDate.getMinutes();
		  }
		}
		
		
	},
	getters: {
		 currentdilog: (state, getters) => {
		    return state.chatTolist
		  },
		  hasLogin: (state, getters) => {
		     return state.hasLogin
		   },
		   userinfo: (state, getters) => {
		      return state.userInfo
		    }
		   	  
		  	  
	 
	 },

	actions: {
	
	}
})

export default store
