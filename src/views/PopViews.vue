<template>
  <!-- 新增遮罩层 -->
  <div v-if="isShowMenu" class="overlay-mask" @click="isShowMenu = false"></div>
  <div class="head">
    <div style="position: relative">
      <div class="mInput">
        <input class="no-border-input" type="text" placeholder="请输入" v-model="searchText"/>
        <img style="height: 16px;" src="@/assets/search.png" alt="search" @click="getSearch( searchText.toLowerCase(),false)"/>
      </div>
      <img style="width: 20px; height: 20px;position: absolute;right:-2%;top: 25%;" src="@/assets/icon_select.png" alt="search" @click="isShowMenu = true"/>
    </div>

    <div class="tips_search">提示：如果没有搜索结果，请多输入几个关键字再试</div>
    <div />
  </div>

  <div style="height: 10px;background-color: #f7f7f7"/>

  <div class="scroll-container">
    <div  v-for="(item,index) in selectLists" :key="index" style="background-color: white;" @click="showDialog">
      <two-split>
        <div style="padding: 15px;color: black">{{ item.name }}</div>
        <div :style="getStatusColor(item)" style="padding-right: 16px;font-size: 12px">{{ item.stateName }}</div>
      </two-split>

      <div style="height: 2px;background-color: #f7f7f7;margin: 0 16px"/>
    </div>

    <no-data v-show="selectLists.length === 0"/>
  </div>

  <!--弹窗 -->
  <my-dialog
      v-if = "isShowDialog"
      :dialogOptions="dialogOptions"
      @showDialog = "getOption"
      @closeDialog = "isShowDialog = false"/>
<!--筛选菜单-->
  <Menu
      :show = "isShowMenu"
      @filters = "getFilters"
  />
</template>

<script setup>
import {onMounted, ref, watchEffect} from "vue";
import TwoSplit from "@/myViews/TwoSplit";
import MyDialog from "@/myViews/MyDialog";
import Menu from "@/myViews/Menu";
import NoData from "@/components/NoData";

const list = ref([
  {
    name:'1',
    stateName:'通过',
    state:1
  },
  {
    name:'2',
    stateName:'未通过',
    state:-1
  },
  {
    name:'3',
    stateName:'审核中',
    state:2
  },
  {
    name:'4',
    stateName:'待审核',
    state:3
  },
  {
    name:'5',
    stateName:'通过',
    state:1
  },
  {
    name:'6',
    stateName:'未通过',
    state:-1
  },
  {
    name:'7',
    stateName:'待审核',
    state:3
  },
  {
    name:'8',
    stateName:'待审核',
    state:3
  },
  {
    name:'9',
    stateName:'待审核',
    state:3
  },
  {
    name:'10',
    stateName:'待审核',
    state:3
  },
  {
    name:'10',
    stateName:'待审核',
    state:3
  },
  {
    name:'10',
    stateName:'待审核',
    state:3
  },
  {
    name:'10',
    stateName:'待审核',
    state:3
  },
  {
    name:'11',
    stateName:'待审核',
    state:3
  },
  ])
const getStatusColor = (item) => {
  let color = '';
  switch (item.state){
    case -1:
      color = 'red'
      break;
    case 1:
      color = 'green'
      break;
    case 3:
      color = 'orange'
      break;
    default:
      color = 'gray'
      break;
  }
  return{
    color
  }
};

//搜索
const selectLists = ref([])
const searchText = ref('')
const filterListBySearchText = (listRef, searchText) => {
  //toLowerCase不区分大小写；确保item.name是字符串，否则includes方法会抛出错误。
  return listRef.filter(item => item.name.toLowerCase().includes(searchText));
};
// 定义防抖函数
const debounce = (func, delay) => {
  let debounceTimer;
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), delay);
  };
};
// 使用防抖的getSearch函数
const debouncedSearch  = debounce((text) => {
  selectLists.value = filterListBySearchText(list.value, text);
}, 300); // 300毫秒内连续输入只会在间隔结束后执行一次
const getSearch = (text,off) => {
  if (!off) {
    // 立即执行搜索
    selectLists.value = filterListBySearchText(list.value, text);
  } else {
    // 使用防抖执行搜索
    debouncedSearch(text);
  }
};
// 在用户输入时调用getSearch
watchEffect(() => {
  getSearch( searchText.value.toLowerCase(),true);
});

const isShowDialog = ref(false)
const showDialog = () => {
  isShowDialog.value = true
}
const dialogOptions = ref([
  {
    name: '广告',
    value:1001
  },
  {
    name: '装修',
    value:1002
  },
  {
    name: '活动',
    value:1003
  },
  {
    name: '媒体',
    value:1004
  },
  {
    name: '市场',
    value:1005
  },
  {
    name: '培训',
    value:1006
  }
])
const getOption = (option) => {
  console.log(option)
  isShowDialog.value = false
}

const isShowMenu = ref(false)
const getFilters = (filters) => {
  console.log(filters)
  isShowMenu.value = false
}
onMounted(()=>{
  selectLists.value = list.value
  dialogOptions.value.forEach((item) => {
    item.myName = item.name
  });
})

</script>

<style scoped>
.overlay-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999; /* 需要比下拉菜单低 */
  background-color: rgba(0,0,0,.5); /* 半透明黑色 */
}
.head{
  padding: 15px;
  background-color: white;
}
.mInput{
  display: flex; /* 使用Flexbox布局 */
  justify-content: space-between; /* 子元素水平排列 */
  background-color: #f7f7f7;
  width: 90%;
  border-radius: 8px;
  padding: 5px 5px;
}
.scroll-container {
  /* 允许内容在Y轴上滚动，当内容超出容器高度时 */
  overflow-y: auto;
  /* 设置一个高度，可以根据需要调整，例如占满剩余空间 */
  height: calc(100vh - 120px);
}
.tips_search{
  padding-top: 16px;
  font-size: 12px;
  color: darkorange;
}
.no-border-input{
  width:100%;border:none;font-size: 12px;padding-left: 5px;background-color: transparent
}
/* 移除输入框聚焦时的边框和外框 */
.no-border-input:focus {
  outline: none;
  border: none;
  box-shadow: none; /* 如果有box-shadow也一并移除 */
}
</style>
