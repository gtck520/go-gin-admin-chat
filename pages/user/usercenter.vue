<template>
  <view>
    <view class="person-head">
      <cmd-avatar :src="mine.avatar" @click="gotouserinfo" size="lg" :make="{'background-color': '#fff'}"></cmd-avatar>
      <view class="person-head-box" >
        <view class="person-head-nickname">{{mine.username}}</view>
        <view class="person-head-username">{{mine.sign}}</view>
      </view>
    </view>
    <view class="person-list">
      <cmd-cell-item title="我的设备" slot-left arrow>
        <cmd-icon type="bullet-list" size="24" color="#368dff"></cmd-icon>
      </cmd-cell-item>
      <cmd-cell-item title="消息通知" slot-left arrow>
        <cmd-icon type="message" size="24" color="#368dff"></cmd-icon>
      </cmd-cell-item>
      <cmd-cell-item title="个人设置" @click="gotouserinfo" slot-left arrow>
        <cmd-icon type="settings" size="24" color="#368dff"></cmd-icon>
      </cmd-cell-item>
      <cmd-cell-item title="检查版本" addon="v1.0" slot-left arrow>
        <cmd-icon type="alert-circle" size="24" color="#368dff"></cmd-icon>
      </cmd-cell-item>
	  
    </view>
  </view>
  </template>

<script>
  import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
  import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
  import cmdCellItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	import {
	    mapState 
	} from 'vuex';  
  export default {
    components: {
      cmdAvatar,
      cmdCellItem,
      cmdIcon
    },
    data() {
      return {
		  mine:null
		 };
    },
	computed: {
		...mapState(['hasLogin','userInfo'])
		
	},
	onShow() {

		this.mine=this.userInfo.data.mine;
	},
    methods: {
      /**
       * 打开用户信息页
       */
     
	  gotouserinfo(){
		  uni.navigateTo({
		    url:"userinfo"
		  })
	  }
	  
    }
  }
</script>

<style>
	page{
		background-color: #fff;
	}
  .person-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 150px;
    padding-left: 20px;
	background:url('https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg');
    /* background: linear-gradient(to right, #365fff, #36bbff); */
  }

  .person-head-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 10px;
  }

  .person-head-nickname {
    font-size: 18px;
    font-weight: 500;
    color: #fff;
  }

  .person-head-username {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
  }

  .person-list {
    line-height: 0;
  }
</style>
