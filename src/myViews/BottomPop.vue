<template>
  <transition name="slide-up">
    <div  v-if="show"  class="slide-up-overlay">
      <!--底部-->
      <div  class="top">
        <!--取消-->
        <div class="button" style="color: #969799" @click="onCancel">取消</div>
        <!--确定-->
        <div class="button" style="color: #1989fa" @click="onConfirm">确定</div>
      </div>

      <div ref="slideUpBodyRef" class="slide-up-body">
        <div class="slide-up-font" v-for="(item,index) in dialogOptions" :key="index" :class="{ 'selected': index === selectedIndex }">{{ item.name }}</div>
     <div style="height: 300px"/>
      </div>

    </div>
  </transition>
</template>

<script setup lang="ts">
import {nextTick, onActivated, onMounted, onUnmounted, ref, watch} from "vue";
const props = defineProps({
  show: {
    type: Boolean,
  },
});
const emit = defineEmits(['onCancel','onConfirm']);
const slideUpBodyRef = ref(null);
const onCancel = () => {
  emit('onCancel')
}
const onConfirm = () => {
  emit('onConfirm',dialogOptions.value[selectedIndex.value])
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

const selectedIndex = ref(0);

watch(() => props.show, async (newVal) => {
  if (newVal) {
    // document.body.style.overflow = 'hidden';
    await nextTick();
    selectedIndex.value = 0
      slideUpBodyRef.value?.addEventListener('scroll', handleScroll);
  } else {
    // document.body.style.overflow = '';
      slideUpBodyRef.value?.removeEventListener('scroll', handleScroll);
  }
});
const handleScroll = (event) => {
  const element = event.target;
  const scrollTop = element.scrollTop*2;
  const itemHeight = element.scrollHeight / dialogOptions.value.length;
  selectedIndex.value = Math.round(scrollTop / itemHeight);
  // 回弹到最后一个元素
  if (selectedIndex.value >= dialogOptions.value.length - 1) {
    element.scrollTop = (dialogOptions.value.length - 1) * itemHeight / 2;
  }
};

onMounted(async () => {
  if (props.show) {
    await nextTick();
      slideUpBodyRef.value?.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
    slideUpBodyRef.value?.removeEventListener('scroll', handleScroll);
});
onActivated( async () => {

})
defineExpose({

})
</script>
<style scoped>

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease; /* 动画持续时间和类型 */
}

/* 定义进入时的状态 */
.slide-up-enter-from,
.slide-up-leave-to{
  transform: translateY(100%); /* 初始位置在屏幕外左侧 */
  opacity: 0; /* 确保内容在动画开始时可见 */
}

.slide-up-overlay {
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  width: 100%;
  height:40vh;
  position: fixed;
  bottom: 0;
  background-color: white; /* 背景颜色变为完全不透明 */
  z-index: 1300; /* 确保遮罩层在最上层 */
  pointer-events: auto; /* 允许 .overlay 内的元素接收点击事件 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.55);

}

.button{
  font-size: 14px;
}
.top{
  padding: 16px;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slide-up-body{
  text-align: center;
  margin-top: 16px;

  overflow-y: auto;
  /* 设置一个高度，可以根据需要调整，例如占满剩余空间 */
  height: calc(40vh - 60px);
}
.slide-up-font{
  padding: 16px;
  color: #969799;
}
.selected {
  font-weight: bold;
  color: deeppink;
  border-top: 1px dashed rgba(0,0,0,.1); /* 只设置上边框为1px实线蓝色 */
  border-bottom: 1px dashed rgba(0,0,0,.1); /* 只设置下边框为1px实线蓝色 */
}
</style>
