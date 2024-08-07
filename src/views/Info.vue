<template>
  <div style="background-color: white;padding: 10px 15px">
  <CustomerList>
      <template #body>
          <span class="zi">项目</span>
          <span class="zi">{{ request.name }}</span>
      </template>
  </CustomerList>
    <div style="height: 1px;background-color: #f7f7f7;margin:4px 0"></div>
    <CustomerList>
      <template #body>
        <span class="zi">客户</span>
        <span class="zi">{{ request.customer }}</span>
      </template>
    </CustomerList>
  </div>

  <!--    滚动容器-->
  <div  class="scroll-container">
  <div class="list-item" v-for="(item, index) in list" :key="index">
    <CustomerList>
      <template #title>
        <span style="color: grey;font-size: 20px">??</span>
        <span :style="getStatusColor(item.state)">{{ item.stateName }}</span>
      </template>
      <template #body>
        <div>
          <span class="zi">客户：</span>
          <span class="zi">??</span>
        </div>
        <div>
          <span class="zi">钱：</span>
          <span class="zi">??</span>
        </div>
      </template>
    </CustomerList>
  </div>
  </div>
</template>

<script setup>
import CustomerList from "@/views/CustomerList";
import {onMounted, ref} from "vue";
import axios from "axios";
import {getStateColor} from "@/enty/StatusColorEnum";

const props = defineProps({
  item:{
    type:String,
  }
});
const request = ref({})
const list = ref([])

let loadingTimer;
const showLoading = ref(false)

const isShowLoading = () =>{
  clearTimeout(loadingTimer)
  showLoading.value = true
  loadingTimer =  setTimeout(()=>{
    showLoading.value = false
  },3000)
}
const getState = async() => {
  if(list.value.length === 0){
    isShowLoading()
  }
  try {
    const res = await axios.get('/api/getState');
    list.value = res.data;
  } catch (error) {
    console.log(error)
  }
}
const getStatusColor = (num) => {
  return{
    color:getStateColor(num,'grey'),
    fontSize:'12px'}
};
onMounted(() => {
  request.value  = JSON.parse(props.item)
  getState()
})
</script>

<style scoped>
.zi{
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}
.scroll-container {
  /* 允许内容在Y轴上滚动，当内容超出容器高度时 */
  overflow-y: auto;
  /* 设置一个高度，可以根据需要调整，例如占满剩余空间 */
  height: calc(100vh - 110px);
}
.list-item {
  margin: 16px;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
}
</style>
