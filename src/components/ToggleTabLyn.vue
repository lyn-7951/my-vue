<!--
    自定义单选按钮，默认横排【竖排没做】
    statuses：单选标签数组
    isHeader：是否为头部标签【必选】
     mType:【必填】
            0csc【绿色】 1vk【蓝色】
            2【自定义】
                selectColor:字体选中颜色
                unselectColor:字体未选中颜色
                lineColor:线条颜色【其他没有用到】
                backSelectColor:背景选中颜色【头标签没有用到】
                backUnselectColor:背景未选中颜色【头标签没有用到】
                borderRadius：圆角【头标签没有用到，其他默认12px】
                mSize:字体大小【头标签默认16px,其他默认10px】
                mWeight:字体粗细【头标签默认700,其他默认500】
                mLineHeight:行高【头标签默认24px,其他默认16px】
-->
<template>
    <div v-if="props.isHeader" class="headerStyle">
        <span
          :style="getTopStyle(status)"
          v-for="(status, index) in props.statuses"
          :key="index"
          :class="['m-header',status === selectedStatus ? 'selected-top' : 'unselected-top']"
          @click="handleClick(status)"
        >{{status}}</span>
    </div>
    <div v-else class="ButtonStyle">
        <span
          v-for="(status, index) in props.statuses"
          :key="index"
          :style="getButtonStyle(status)"
          :class="[ 'single',status === selectedStatus ? 'selected-button' : 'unselected-button']"
          @click="handleClick(status)"
        >{{status}}</span>
    </div>
</template>

<style scoped>
.selected-top{
  color: black;
  border-bottom: 3px solid green;
}
.unselected-top{
  color: grey;
  border-bottom: 3px solid transparent;
}
.unselected-button {
  background-color: white;
  color: rgba(120, 120, 120, 1);
}
.selected-button {
  background-color: rgba(220, 242, 234, 1);
  color: green;
}
.headerStyle{
  display: flex;  justify-content: space-around;padding-top: 10px;padding-bottom: 10px;
}
.ButtonStyle{
  display: flex;
  overflow-x: auto; /* 当内容超出容器宽度时，允许横向滚动 */
  white-space: nowrap; /* 防止换行 */
  margin-left: 16px;margin-top: 16px;margin-right: 16px
}
/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
.single{
  margin-right: 16px;border: 1px solid #e0e0e0;cursor: pointer;font-size: 10px;font-weight: 500;line-height: 16px;padding: 5px 10px;border-radius: 12px;
}
.m-header{
  /*字体*/
  font-size: 16px;
  /*字重*/
  font-weight: 700;
  /*行高*/
  line-height: 24px;
}
</style>

<script setup>
// 定义按钮的状态数组
import { ref } from "vue";

const props = defineProps({
  statuses:{
    type:Array,
    required:true//是否必填
  },
  isHeader: {
    type: Boolean,
    default: false
  },
  selectColor: {
    type:String,
    default:'black'
  },
  unSelectColor: {
    type:String,
    default:'grey'
  },
  lineColor:{
    type:String,
    default:'green'
  },
  borderRadius:{
    type:String,
    default:'12px'
  },
  backSelectColor:{
    type:String,
    default:'rgba(220, 242, 234, 1)'
  },
  mSize:{
    type:String,
    default:'10px'
  },
  mType:{//0:csc,1:vk,2:其他
    type:Number,
    default:0,
    required:true//是否必填
  }
})
const mLineColor = ref()
const textColor = ref()
const backgroundColor = ref()
switch (props.mType){
  case 0:
    mLineColor.value = 'green'
    textColor.value = 'green'
    backgroundColor.value = 'rgba(220, 242, 234, 1)';
    break
  case 1:
    mLineColor.value = 'blue'
    textColor.value = 'blue'
    backgroundColor.value = 'rgba(200, 230, 250, 1)';
    break
  default:
    mLineColor.value = props.lineColor
    textColor.value = props.selectColor
    backgroundColor.value = props.backSelectColor
    break
}
const emit = defineEmits(['status-change']);

const selectedStatus = ref(props.statuses[0]);
if(!props.isHeader)
  emit('status-change',selectedStatus.value);//获取第一个数值

const getTopStyle = (status) => ({
  borderBottom:`3px solid ${selectedStatus.value === status ? mLineColor.value : 'transparent'}`,
  // color: selectedStatus.value === status? props.selectColor : props.unSelectColor
});
const getButtonStyle = (status) => ({
  borderRadius:props.borderRadius,
  color: selectedStatus.value === status? textColor.value : 'grey',
  backgroundColor: selectedStatus.value === status? backgroundColor.value : 'white',
  fontSize:props.mSize
});
const handleClick = (status) => {
  selectedStatus.value = status;
  emit('status-change',status);
}
defineExpose({
  handleClick
})
</script>


