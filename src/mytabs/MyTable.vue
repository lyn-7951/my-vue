<template>
  <nut-searchbar v-model="val" @search="search"></nut-searchbar>

  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <var-table scroller-height="400px">
      <thead style="position: sticky; top: 0;z-index:2;">
      <tr style=" background-color: white;">
        <th  style="position: sticky; left: 0;background-color: inherit">姓名</th>
        <th>数学</th>
        <th style="position: sticky; right: 0;background-color: inherit">英语</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="l in list2" :key="l.name">
        <td style="position: sticky; left: 0;z-index:1;background-color: inherit">{{ l.name }}</td>
        <td>{{ l.math }}</td>
        <td  style="position: sticky; right: 0;z-index:1;background-color: inherit">{{ l.english3 }}</td>
      </tr>
      </tbody>

      <template #footer>
        <div class="table-example-footer">
          <var-pagination
              :current="1"
              :size="20"
              :total="100"
              :size-option="[5, 10]"
              @change="get"
          />
        </div>
      </template>
    </var-table>
  </van-pull-refresh>

</template>

<script setup>
import {inject, onActivated, onMounted, ref, watch, watchEffect} from "vue";
import {showToast} from "vant";

const props = defineProps({
  list:Array,
});
const emit = defineEmits(['refresh','get']);

const val = ref('')
const search = (text) => {
  console.log('search', text)
}

const loading = ref(false);
const onRefresh = () => {
  setTimeout(() => {
    showToast('刷新成功');
    loading.value = false;
    emit('refresh')
  }, 1000);
};


const {gen} = inject('gen')
const get = (current, size) => {
  list2.value = gen(current, size)
  // emit('get',list2,current, size)
}


const list2 = ref([])
onMounted(()=>{
  list2.value = props.list
  console.log('MyTable:',list2.value)
})




</script>

<style scoped>

</style>
