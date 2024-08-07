<template>
  <!--  头部待签/已签标签 -->
<!--  <ToggleTabLyn-->
<!--      :statuses="pageStatuses"-->
<!--      :isHeader="true"-->
<!--      :mType = "0"-->
<!--      @status-change="selectPage"/>-->

<!--  <ToggleTabLyn-->
<!--      :statuses="statuses"-->
<!--      :isHeader="false"-->
<!--      :mType = "0"-->
<!--      @status-change="getStatus"-->
<!--      />-->
<!--  <ul>-->
<!--    <TreeItem class="item" :model="treeData"></TreeItem>-->
<!--  </ul>-->

<!--  <div id="app">-->
<!--    <router-view>-->
<!--    </router-view>-->
<!--  </div>-->

  <div id="app">
    <router-view v-slot="{ Component,route }">
      <keep-alive>
        <component v-if="route.meta && route.meta.keepAlive" :is="Component"/>
      </keep-alive>
      <component v-if="!(route.meta.keepAlive)" :is="Component"/>
    </router-view>
  </div>
  <!--    <nav>-->
<!--      <router-link to="/">Home</router-link>-->
<!--      <router-link to="/swipe-refresh">SwipeRefreshLayout</router-link> &lt;!&ndash; 新增关于页面链接 &ndash;&gt;-->
<!--      &lt;!&ndash; 添加更多链接... &ndash;&gt;-->
<!--    </nav>-->
<!--    <router-view/>-->

</template>
<style>
#app {
  min-height: 100vh;
  background-color: #f7f7f7;
}
a:-webkit-any-link {
  cursor: none;
}
a, .green {
  transition: 0s;
}
.item {
  cursor: pointer;
  line-height: 1.5;
}
.bold {
  font-weight: bold;
}
</style>

<script setup>

// import TreeItem from 'components/TreeItem.vue';
// import SwipeRefreshLayout2 from '@/utils/SwipeRefreshLayout2';
// import ToggleTabLyn from '@/components/ToggleTabLyn.vue';
// import CardInfoLyn from '@/components/CardInfoLyn.vue';


import {computed, onMounted, ref, watch} from "vue";
import axios from "axios";
// const textList = ref(
//   [
//     {  name:'1',value:'2',isBlock:false},
//     {  name:'1',value:'2',isBlock:true},
//   ]
// );
const item = ref([]);

// 将 textList 改写为计算属性
const textList = computed(() => [
  { name: '1', value: 'l', isBlock: false },
  { name: '2', value: '00', isBlock: false },
  { name: '3', value: '000', isBlock: false },
  { name: '4', value: item.value.preDepartment, isBlock: false },
  { name: '5', value: item.value.preLocation, isBlock: false },
  { name: '6', value: item.value.jobAttribute, isBlock: false },
  { name: '7', value: item.value.signingRemarks, isBlock: true }
]);


// 定义头标签数组
const pageStatuses = ref([
  '待签',
  '已签',
    '1'
]);
const statuses = ref(
    //_ :数组里的元素
    Array.from({ length: 10 }, (_, index) => index + 1)
);

const currentPage = ref(0);
const selectPage = (newStatus) => {
  switch (newStatus){
    case '待签':
      currentPage.value = 0;
      break
    case '已签':
      currentPage.value = 1;
      break
  }
  // console.log('待签:', newStatus);
}

const getStatus = (newStatus) => {
  console.log('单选按钮组:', newStatus);
}

// export default {
//   name:'App',
//   components: {TreeItem,ToggleTabLyn},
//   setup(){
//     const treeData = ref({
//       name: 'My Tree',
//       children: [
//         { name: 'hello' },
//         { name: 'world' },
//         {
//           name: 'child folder',
//           children: [
//             {
//               name: 'child folder',
//               children: [{ name: 'hello' }, { name: 'world' }]
//             },
//             { name: 'hello' },
//             { name: 'world' },
//             {
//               name: 'child folder',
//               children: [{ name: 'hello' }, { name: 'world' }]
//             }
//           ]
//         }
//       ]
//     })
//     return{
//       treeData
//     }
//   }
//
// }
</script>
