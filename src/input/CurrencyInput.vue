<!-- CurrencyInput.vue -->
<template>
  <input
      ref="inputRef"
      type="text"
      v-model="formattedValue"
      placeholder="请输入"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useCurrencyInput } from 'vue-currency-input'

const props = defineProps({
  modelValue: Number,
  options: Object
})

const emit = defineEmits(['update:modelValue'])

const amount = ref(props.modelValue)
const { inputRef, formattedValue, numberValue, setValue } = useCurrencyInput({
  currency: 'CNY',
  locale: 'zh-CN',          // 中文格式（千分位逗号分隔）
  hideCurrencySymbolOnFocus: true,//是否在焦点上隐藏货币符号
  hideGroupingSeparatorOnFocus: true,//是否在焦点上隐藏分组分隔符
  precision: 2,//2位小数
});

watch(
    () => props.modelValue,
    (value) => {
      setValue(value);
    }
);
</script>
