<template>

<!--  <var-collapse v-model="value1"  v-for="item in list">-->
<!--    <var-collapse-item :title="item.name" :name="item.name">-->
<!--      <var-checkbox-group @change="handleChange" direction="vertical" v-model="item.checked" :options="item.list" label-key="name" value-key="name" />-->
<!--    </var-collapse-item>-->
<!--  </var-collapse>-->

<!--  <var-collapse-->
<!--      v-model="value11"-->
<!--      v-for="item in list1">-->
<!--    <var-collapse-item-->
<!--        :title="item.name"-->
<!--        :name="item.name">-->
<!--      <var-checkbox-group-->
<!--          @change="handleChange2"-->
<!--          direction="vertical"-->
<!--          v-model="checked"-->
<!--          :options="item.list"-->
<!--          label-key="name"-->
<!--          value-key="name" />-->
<!--      <var-counter @click = "handleChangeCount(item)" :min="0" :max="5" v-model="item.count"/>-->
<!--    </var-collapse-item>-->
<!--  </var-collapse>-->

<!--  折叠下拉-->
<!--  <var-collapse-->
<!--      v-model="value11"-->
<!--      v-for="item in list1">-->
<!--    <var-collapse-item-->
<!--        :title="item.name"-->
<!--        :name="item.name">-->
<!--      <var-checkbox-group-->
<!--          @change="handleChange3(item)"-->
<!--          direction="vertical"-->
<!--          v-model="item.checked"-->
<!--          :options="item.list"-->
<!--          label-key="name"-->
<!--          value-key="name" />-->
<!--      <var-counter-->
<!--          @click = "handleChangeCount(item)"-->
<!--          :min="0"-->
<!--          v-model="item.count"-->
<!--          :max="item.max"/>-->
<!--    </var-collapse-item>-->
<!--  </var-collapse>-->

<!--  弹出层-->
  <van-field
      input-align="right"
      v-for="item in list1"
      v-model="item.text"
      is-link
      readonly
      :label="item.name"
      @click="showBottomPopup(item)"
  />

<CheckBoxPopup2
    v-model="bottom"
    :obj="currentItem"
    @submit="closeBottomPopup"
/>

</template>

<script>
export default {
  name: "MyCheckBox"
}
</script>

<script setup >
import {onMounted, ref} from "vue";
import {showToast} from "vant";
import CheckboxPopup from "./checkboxPopup";
import CheckBoxPopup2 from "./CheckBoxPopup2";

const value1 = ref([])
const value11 = ref([])
const checked = ref([])

const list = ref([
    {
      name:'吃饭',
      list:[
        {
          name:'吃饭1'
        },
        {
          name:'吃饭2'
        },
        {
          name:'吃饭3'
        },
      ]
    },
  {
    name:'睡觉',
    list:[
      {
        name:'睡觉1'
      },
      {
        name:'睡觉2'
      },
      {
        name:'睡觉3'
      },
    ]
  },
    ])
const list1 = ref([
    {
      maxCount:1,
      name:'吃饭',
      list:[
        {
          name:'吃饭1'
        },
        {
          name:'吃饭2'
        },
        {
          name:'吃饭3'
        },
      ]
    },
  {
    maxCount:1,
    name:'睡觉',
    list:[
      {
        name:'睡觉1'
      },
      {
        name:'睡觉2'
      },
      {
        name:'睡觉3'
      },
    ]
  },
    ])

const handleChange = () => {
  list.value?.forEach((item, i) => {
    const max = i === 0 ? 2 : 1;
    item.checked && item.checked.splice(0, Math.max(0, item.checked.length - max));
  })
}

const checkFen = () => {

  list1.value?.forEach(item => {
    item.checked = item.list
        .map(({ name }) => name)//['苹果', '香蕉']
        .filter(name => checked.value?.includes(name));//过滤留下符合的
    console.log(item.name,item.checked)
    if( item.checked.length > item.maxCount){
      console.log('checked:',checked.value)
      const removeItem = item.checked.shift()
      console.log('removeItem:',removeItem)
      if(removeItem){
        const index = checked.value.indexOf(removeItem);
        if (index !== -1) {
          checked.value.splice(index, 1);
        }
      }
      // item.checked.splice(0, Math.max(0, item.checked.length - item.maxCount))
      // checked.value?.shift()
      // checkFen()
    }
  })

}

const handleChange2 = () => {
  checked.value.length > 3 && checked.value?.shift();   // 最多留 2 个

  //检查分开组的
  checkFen()

  console.log('list1:',list1.value)

}

const handleChange3 = (item) => {
  item?.checked?.length + item.count > item.maxCount && item?.checked?.shift();
}

const handleChangeCount = (item) => {
  item.max = item.maxCount - (item?.checked?.length || 0);
  item.max === 0 && (item.count = 0)
}

const bottom = ref(false)

const currentItem = ref({})
const showBottomPopup = (item) => {
  currentItem.value = item
  item.checked = []
  item.checked .push(item.text)
  console.log('item.checked:',item.checked)
  bottom.value = true
}

const closeBottomPopup = (str) => {
  currentItem.value.text = str
  bottom.value = false
}

onMounted(()=>{

})




</script>

<style scoped>

</style>
