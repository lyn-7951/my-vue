<template >
  <ToggleTabLyn
      ref="changeStateRef"
      style="background-color: white"
      :statuses="pageStatuses"
      :isHeader="true"
      :currentPage = "currentPage"
      :mType = "3"
      :line-color="'pink'"
      @status-change="selectPage"/>

  <!--  内容-->
  <div class="body">
    <!--    搜索框-->
    <div class="mInput" style="margin-bottom: 16px;width: 100%">
      <input style="width:100%;border:none;font-size: 12px;padding: 0 5px"  type="text" placeholder="请输入" v-model="searchText"/>
      <button style="border: none;width: 100px; height: 25px;padding: 5px 30px;font-size: 12px"  @click="search">搜索</button>
    </div>

    <!--    滚动容器-->
    <div  class="scroll-container" ref="scrollContainer" @scroll="saveScrollPosition">
      <!--请求加载-->
      <div v-if="showLoading"  class="load-container">
        <div class="loader"></div>
      </div>
      <div v-else>
        <!--  1-->
        <div v-show="currentPage === 0 && lists.oneList.data.length >0" >
          <div class="list-item" v-for="(item, index) in lists.oneList.selected" :key="index" @click="getInfo(item)">
            <CustomerList>
              <template #title>
                <span style="color: grey;font-size: 20px">{{ item.name }}</span>
                <span style="color: #30A778;font-size: 12px">查看详情</span>
              </template>
              <template #body>
                <div>
                  <span class="zi">客户：</span>
                  <span class="zi">{{ item.customer }}</span>
                </div>
                <div>
                  <span class="zi">钱：</span>
                  <span class="zi">{{ item.money }}</span>
                </div>
              </template>
              <template #end>
                <span style="line-height: 18px;color: grey;font-size: 12px;margin-right: 8px">{{
                    getMTime(item.time)
                  }}</span>
                <span style="color: grey;font-size: 12px">结束</span>
              </template>
            </CustomerList>
          </div>
        </div>
        <!-- 1无数据提示 -->
        <div v-show="currentPage === 0 && lists.oneList.data.length === 0">
          <NoData/>
        </div>
        <!-- 2-->
        <div  v-show="currentPage === 1  && lists.twoList.data.length >0">
          <!--    列表 -->
          <div class="list-item"  v-for="(item, index) in lists.twoList.selected" :key="index" @click="getInfo(item)">
            <CustomerList>
              <template #title>
                <span style="color: grey;font-size: 20px">{{ item.name }}</span>
                <span style="color: #30A778;font-size: 12px">查看详情</span>
              </template>
              <template #body>
                <div>
                  <div class="zi">客户1</div>
                  <div class="zi" style="text-align: center;margin-top: 2px">{{ item.money1 }}</div>
                </div>
                <div>
                  <div class="zi">客户2</div>
                  <div class="zi" style="text-align: center;margin-top: 2px">{{ item.money2 }}</div>
                </div>
                <div>
                  <div class="zi">客户3</div>
                  <div class="zi" style="text-align: center;margin-top: 2px">{{ item.money3 }}</div>
                </div>
                <div>
                  <div class="zi">客户1：</div>
                  <div class="zi">？？？</div>
                </div>
              </template>
            </CustomerList>
          </div>
        </div>
        <!-- 2无数据提示 -->
        <div v-show="currentPage === 1 && lists.twoList.data.length === 0">
          <no-data/>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>

import ToggleTabLyn from '@/components/ToggleTabLyn';
import {onActivated, onMounted, ref} from "vue";
import useScrollPosition from "@/hooks/useScrollPosition";
import CustomerList from "@/views/CustomerList";
import axios from "axios";
import {format} from "date-fns";//时间戳转字符串
import NoData from "@/components/NoData";
import router from "@/router";

const pageStatuses = ref([
  '1',
  '2',
]);
const currentPage = ref(0);

const lists = ref({
  oneList:{data:[],selected:[]},
  twoList:{data:[],selected:[]},
})
let loadingTimer;

//刷新 保存滚动条数据
const scrollContainer = ref(null);
const scrollPositions = ref([0, 0]); // 假设有四个页面
const {  saveScrollPosition } = useScrollPosition( scrollContainer,scrollPositions, currentPage
    , () => {
      isShowLoading()
      switch (currentPage.value){
        case 0:
          getCustomer1()
          break
        case 1:
          getCustomer2()
          break
      }
    });

const searchText = ref('')

const showLoading = ref(false)

const changeStateRef = ref(null)


const selectPage = (newStatus) => {
  switch (newStatus){
    case '1':
      currentPage.value = 0;
      getCustomer1()
      break
    case '2':
      currentPage.value = 1;
      getCustomer2()
      break
    case '3':
      currentPage.value = 2;
      break
    case '4':
      currentPage.value = 3;
      break
  }
}
const filterListBySearchText = (listRef, searchText) => {
  return listRef.filter(item => item.name.includes(searchText.value));
};
const search = () => {
  switch (currentPage.value){
    case 0://0
      lists.value.oneList.selected = filterListBySearchText(lists.value.oneList.data,searchText)
      break
    case 1://1
      lists.value.twoList.selected = filterListBySearchText(lists.value.twoList.data,searchText)
      break
  }

}
const getInfo = (item) => {
  sessionStorage.setItem('page', JSON.stringify(currentPage.value));
  router.push({
    name:'Info',
    query: {
      item:JSON.stringify(item)
    }

  })
}

const isShowLoading = () =>{
  clearTimeout(loadingTimer)
  showLoading.value = true
  loadingTimer =  setTimeout(()=>{
    showLoading.value = false
  },3000)
}

const fetchData= async (url,list)=>{
  if(list.data.length === 0){
   isShowLoading()
  }
  try {
    const res = await axios.get(url);
    console.log(res.data)
    list.data = res.data;
    list.selected = res.data;
  } catch (error) {
    console.log(error)
  }
}

//获取1
const getCustomer1 = async () => {
   await fetchData('/api/getCustomer1', lists.value.oneList)
}
//获取2
const getCustomer2 = async () => {
  await fetchData('/api/getCustomer2', lists.value.twoList)
}

//组件激活
onActivated(() => {
  scrollContainer.value.scrollTop = scrollPositions.value[currentPage.value]
})

onMounted(async () => {
  await getCustomer1()
  currentPage.value = sessionStorage.getItem('page')? JSON.parse(sessionStorage.getItem('page')) : 0
  if(sessionStorage.getItem('page'))
    changeStateRef.value.handleClick(pageStatuses.value[currentPage.value])
})
//时间
const getMTime = (time) => {
  return format(new Date(time), 'yyyy-MM-dd HH:mm')
}
</script>

<style scoped>
.load-container{
  display: flex;
  justify-content: center;
}
.loader {
  margin-top: 50px;
  border: 3px solid transparent;
  border-top: 3px solid #ffc0cb; /* 浅粉色 */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
    border-top-color: #ffc0cb; /* 较深的蓝色 */
  }
  25% {
    transform: rotate(90deg);
    border-top-color:#9fd8f7; /* 较深的青色 */
  }
  50% {
    transform: rotate(180deg);
    border-top-color: #f06292; /* 较深的灰色 */
  }
  75% {
    transform: rotate(270deg);
    border-top-color: #ff6eb4; /* 较深的粉色 */
  }
  100% {
    transform: rotate(360deg);
    border-top-color: yellow; /* 返回较深的蓝色 */
  }
}
.body{
  padding-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  padding-bottom: 16px;
}
.mInput{
  display: flex; /* 使用Flexbox布局 */
  justify-content: space-between; /* 子元素水平排列 */
  background-color: white;
  border-radius: 8px;
  padding: 5px 5px;
}
.scroll-container {
  /* 允许内容在Y轴上滚动，当内容超出容器高度时 */
  overflow-y: auto;
  /* 设置一个高度，可以根据需要调整，例如占满剩余空间 */
  height: calc(100vh - 115px);
}
::-webkit-scrollbar {
  width: 0;  /* 滚动条宽度 */
}

.list-item {
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 16px;
}

.zi{
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}


</style>
