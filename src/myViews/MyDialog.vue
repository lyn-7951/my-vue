<template>
  <div >
  <teleport to="body">
  <div class="mask" >
    <div class="dialog">
      <div style="display: flex">
          <span style="flex-grow: 1">请选择</span>
          <img style="width: 16px;height: 16px" src="@/assets/ic_et_clear.png" @click="closeDialog"/>
      </div>
      <div class="line"/>
      <!--    滚动容器-->
      <div class="scroll-container">
      <div @click="showDialog(item)" class="pop-list-item" v-for="(item,index) in dialogOptions" :key="index">
        <span>{{ item.myName }}</span>
      </div>
    </div>
    </div>
  </div>
  </teleport>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  dialogOptions:{
    type:Array,
    default: () => [] // 提供一个不共用的默认的空数组
  }
});


const emit = defineEmits(['closeDialog','showDialog']);
const closeDialog = () => {
  emit('closeDialog');
};
const showDialog = (item) => {
  emit('showDialog',item);
}

onMounted(()=>{

})
</script>

<style scoped>
.mask {
  position: fixed; /* 改为fixed，使dialog在屏幕上的位置固定 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999; /* 确保dialog在其他元素之上 */
  background-color: rgba(0, 0, 0, 0.1);
  display: flex; /* 使用flex布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  overflow-y: auto; /* 允许mask内元素滚动 */
}

.dialog {
  width: 50%;
  height: 20%;
  background-color: #fff;
  padding: 10px 5px;
  border-radius: 10px;
  overflow: hidden;
  text-align: center
  /* 不需要transform，因为mask已经是flex布局 */
}

.pop-list-item{
  text-align: center;
  padding-bottom: 10px;
  margin-left: -16px;
}
.line {
  margin: 10px 0;
  height: 0.5px;
  background-color: rgba(237, 239, 242, 1);
}
.scroll-container {
  /* 允许内容在Y轴上滚动，当内容超出容器高度时 */
  overflow-y: auto;
  height: calc(100% - 25px);
}
span{
  font-size: 12px;
  margin: 0 10px;
  color: grey;
}

</style>
