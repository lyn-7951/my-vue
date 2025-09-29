<template>
  <!-- 底部弹出 -->
    <var-popup position="bottom" v-model:show="bottom" >
    <var-checkbox-group
        @change="handleChange3(item)"
        direction="vertical"
        v-model="item.checked"
        :options="item.list"
        label-key="name"
        value-key="name" />
    <var-counter
        @click = "handleChangeCount(item)"
        :min="0"
        v-model="item.count"
        :max="item.max"/>
      <var-button @click="confirm(item)"  style="position: absolute;right: 16px;bottom: 3px"  type="danger" loading-type="wave">
        确定
      </var-button>


  </var-popup>

</template>

<script setup>

import {onMounted, ref, watchEffect} from "vue";
const bottom = defineModel()
const props = defineProps({
  obj:Object
});

const emit = defineEmits(['submit'])

const item = ref({})


const handleChange3 = (item) => {
  ((item?.checked?.length || 0) + (item.count|| 0) > item.maxCount) && item?.checked?.shift();
}

const handleChangeCount = (item) => {
  item.max = item.maxCount - (item?.checked?.length || 0);
  item.max === 0 && (item.count = 0)
}

const confirm = (item) => {
  emit('submit',item.checked[0])
}

watchEffect(()=>{
  item.value = JSON.parse(JSON.stringify(props.obj))//深度拷贝
})

</script>

<style scoped>

</style>
