<template>
  <CurrencyInput v-model="amount" />
  <van-field ref="inputRef1"  v-model="formattedValue" type="number" label="价格1"  placeholder="请输入" />
  <van-field ref="inputRef2"  v-model="formattedValue2"  type="number" label="价格2" placeholder="请输入" />
  <div>总价：{{total}}</div>
</template>


<script setup>
import {computed, ref, watchEffect} from "vue";
import utils from '@/util/utils';
import { useCurrencyInput } from 'vue-currency-input'
import CurrencyInput from "@/input/CurrencyInput";

const number1 = ref('');
const number2 = ref('');


const total = computed(() =>
    // parseFloat(Number(Number(number1.value) + Number(number2.value)).toFixed(2))
  Number(formattedValue.value) + Number(formattedValue2.value)
);

// 输入值的响应式变量
const amount = ref()

const { inputRef: inputRef1, formattedValue } = useCurrencyInput({
  currency: 'CNY',
  locale: 'zh-CN',          // 中文格式（千分位逗号分隔）
  hideCurrencySymbolOnFocus: false,//是否在焦点上隐藏货币符号
  hideGroupingSeparatorOnFocus: true,//是否在焦点上隐藏分组分隔符
  precision: 2,//2位小数
});

const { inputRef: inputRef2, formattedValue:formattedValue2 } = useCurrencyInput({
  currency: 'CNY',
  locale: 'zh-CN',          // 中文格式（千分位逗号分隔）
  hideCurrencySymbolOnFocus: false,//是否在焦点上隐藏货币符号
  hideGroupingSeparatorOnFocus: true,//是否在焦点上隐藏分组分隔符
  precision: 2,//2位小数
});

watchEffect(()=>{
  console.log(formattedValue.value)
})

</script>


<style scoped>

</style>
