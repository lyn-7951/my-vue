// 枚举在JavaScript中可以使用对象来模拟
const StatusColorEnum = {
  0: { text: '待通过', value: 0, color: 'orange' },
  1: { text: '通过', value: 1, color: 'green' },
  2: { text: '不通过', value: 2, color: 'red' },
};

// 辅助函数，根据枚举值获取颜色
function getStateColor(value,defaultColor) {
  const statusEntry  = Object.values(StatusColorEnum).find(item => item.value === value);
  // 如果找到了状态对象，返回其 color 属性，否则返回 undefined
  return statusEntry ? statusEntry.color : defaultColor;
}

// 使用ES6模块导出语法导出变量和函数
export { StatusColorEnum, getStateColor };
