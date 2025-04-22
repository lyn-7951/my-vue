<template>
  <van-tabs v-model:active="active">
    <van-tab title="标签 1" >
      <my-table
          :key="list.length"
          @get="get"
          :list = "list"
          @refresh = "refresh"
         />
    </van-tab>
    <van-tab title="标签 2">
      <my-table
          @get="get"
          :list = "list2"
          @refresh = "refresh"
      />
    </van-tab>
    <van-tab title="标签 3">
      <my-table
          @get="get"
          :list = "list3"
          @refresh = "refresh"
      />
    </van-tab>
  </van-tabs>
</template>

<script setup>
import MyTable from "@/mytabs/MyTable";
import {inject, provide, ref} from "vue";
const active = ref(0);

const {save} = inject('message')

save('MyTabsPage')

const list = ref(gen(1, 5))
const list2 = ref(gen(1, 20))
const list3 = ref(gen(1, 20))

function gen(current, size) {
  return Array.from({ length: size }).fill(null).map((_, index) => {
    const id = (current - 1) * size + index + 1
    return {
      name: `Name ${id}`,
      math: id,
      english: id,
      english1: id,
      english2: id,
      english3: id,
    }
  })
}
provide( 'gen', {
  gen
})
const get =  (list5,current5, size) => {
  list5.value = gen(current5, size)
}


const off = ref(false)
const  refresh = () => {
  off.value = true
  if(off.value){
    const obj = {
      name: 9999
    }
//刷新只改变这个页面的原数据源list，list2，list3，不能通过上个页面传，之前因为是子页面
    list.value[0].name = '9999'
  }


}

</script>

<style scoped>

</style>
