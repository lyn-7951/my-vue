<template>
    <div class="list-item-one" style="margin-bottom: 8px">
      <slot name="title"></slot>
    </div>
    <div  class="list-item-one" style="margin-bottom: 8px">
      <slot name="body"></slot>
    </div>
    <div style="display: flex;justify-content: right">
      <slot name="end"></slot>
    </div>

</template>

<script setup>
const props = defineProps({
  item: Object
});
const emit = defineEmits(['clickItem']); // 定义点击事件的自定义事件
const getInfo = (item) => {
  emit('status-change',item);//获取第一个数值
}
</script>

<style scoped>

.list-item-one {
  display:flex;justify-content: space-between;align-items: center
}
</style>
