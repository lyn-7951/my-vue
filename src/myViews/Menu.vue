<template>
  <!-- 新增遮罩层 -->
  <div v-if="isShowBottomPop" class="overlay-mask" @click="isShowBottomPop = false"></div>
  <transition name="slide">
    <div  v-if="show" class="overlay">
      <div class="box1" style="padding: 10px;margin-bottom: 50px">
        <div class="head">筛选</div>
        <!--  审核状态-->
        <div style="padding: 16px 0">
        <div style="display: flex;align-items: center">
          <span style="margin-right: 8px;">状态</span>
          <!--      单选.lyn-->
          <div style="margin-right: 8px;">
            <input  class="radio-button"  type="radio" value="0" id="wait" v-model="filterVo.picked" >
            <label for="wait">待办</label>
          </div>
          <div>
            <input  type="radio" value="1" id="over" v-model="filterVo.picked">
            <label for="over">已办</label>
          </div>
        </div>
        </div>
        <!--广告类别-->
        <div class="line">
          <div class="title">广告类别</div>
            <div class="select-date" @click="isShowBottomPop = true">{{filterVo.ad.name}}</div>

        </div>

        <!--制单人员-->
        <div class="line">
          <div class="title">制单人员</div>
          <input type="text" class="text-input" placeholder="请输入" v-model="filterVo.makeEmployeeName">
        </div>
        <!--单据编号-->
        <div class="line">
          <div class="title">单据编号</div>
          <input type="text" class="text-input" placeholder="请输入" v-model="filterVo.orderCode">
        </div>
      </div>
<!--底部-->
      <div  class="bottom">
        <!--重置-->
        <div class="button1" @click="init">重置</div>
        <!--确定-->
        <div class="button2" @click="sure">确定</div>
      </div>

    </div>
  </transition>

  <BottomPop
  :show="isShowBottomPop"
  @onCancel = "isShowBottomPop = false"
  @onConfirm = "selectAdStyle"/>
</template>

<script setup>

import {onActivated, onMounted, ref, watch} from "vue";
import BottomPop from "@/myViews/BottomPop";

const props = defineProps({
  show: {
    type: Boolean,
  },
});
const emit = defineEmits(['filters']);

const filterVo = ref(
  {
    ad:{//制单开始时间
      name:'请选择',
      id:0
    },
    orderCode:'',//单据编号,
    makeEmployeeName:'',//制单人员
    picked:0

  }
)

const init = () => {
  filterVo.value = {
    ad:{//广告类别
      name:'请选择',
      id:0
    },
    orderCode:'',//单据编号,
    makeEmployeeName:'',//制单人员
    picked:0
  };
}
const sure = () => {
  emit('filters',filterVo.value)
}


const isShowBottomPop = ref(false)

watch(() => props.show, (newVal) => {
  if (newVal) {
    // document.body.style.overflow = 'hidden';
  } else {
    // document.body.style.overflow = '';
  }
});

const selectAdStyle = (str) => {
  filterVo.value.ad = str
  isShowBottomPop.value = false
}

onMounted(()=>{
  sessionStorage.removeItem('CscEmployeeSelectPersonList')
  sessionStorage.removeItem('CscSelectAccountCompanyItem')
})
onActivated( async () => {

})
defineExpose({

})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease; /* 动画持续时间和类型 */
}

/* 定义进入时的状态 */
.slide-enter-from {
  transform: translateX(100%); /* 初始位置在屏幕外左侧 */
  opacity: 1; /* 确保内容在动画开始时可见 */
}

/* 定义离开时的状态 */
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0; /* 在动画结束时隐藏 */
}

.overlay-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1200; /* 需要比下拉菜单低 */
  background-color: rgba(0,0,0,.5); /* 半透明黑色 */
}
.overlay {
  width: 70%;
  height:100vh;
  position: fixed;
  right:0;
  top: 0;
  background-color: white; /* 背景颜色变为完全不透明 */
  z-index: 999; /* 确保遮罩层在最上层 */
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  pointer-events: auto; /* 允许 .overlay 内的元素接收点击事件 */
}
.head{
  font-size: 20px;
  color: green;
  text-align: center;
  padding: 10px;
  margin-bottom: 15px;
}
.title{
  font-size: 20px;
  color: gray;
  margin-bottom: 10px;
}
.select-date{
  font-size: 12px;
  color: grey;
  width: 90%;
  border: 1px gray solid;
  height: 32px;
  border-radius: 5px;
  line-height: 32px;
  text-align: left;
  padding-left: 8px;
 }
.line{
  margin-bottom: 15px;
}
.text-input{
  width: 90%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid gray;
}

.bottom{
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px; /* 控制高度 */
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1); /* 底部阴影 */
}
.button1{
  flex-grow: 1.5;
  background-color: #f7f7f7;
  display: flex; /* 如果需要垂直居中文字，并且item1内部可能有多行内容或更复杂布局 */
  align-items: center; /* 垂直居中文字或内容 */
  justify-content: center; /* 水平居右（如果需要的话）*/
  height: 100%;
  color: dimgrey;
}
.button2{
  flex-grow: 2;
  background-color:green;
  display: flex; /* 如果需要垂直居中文字，并且item1内部可能有多行内容或更复杂布局 */
  align-items: center; /* 垂直居中文字或内容 */
  justify-content: center; /* 水平居右（如果需要的话）*/
  height: 100%;
  color: white;
}
.box1{
  height: 90vh;
  overflow-y: auto;
}
input[type="radio"]:checked {
  accent-color: deeppink; /* 改变单选按钮的背景颜色 */
}
</style>
