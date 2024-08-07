<template >
        <nav class="m-header">
<!--    replace 不增加历史记录      -->
          <router-link to="/a">1</router-link>
          <router-link to="/b">2</router-link>
          <!-- 添加更多链接... -->
        </nav>
  <main>
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </main>

</template>

<style scoped>
.m-header{
  display: flex;  justify-content: space-around;padding-top: 10px;padding-bottom: 10px;background-color: white;
}
a, .green {
  padding: 0;
  text-decoration: none;
  color: grey;
  /*字体*/
  font-size: 16px;
  /*字重*/
  font-weight: 700;
  /*行高*/
  line-height: 24px;
}
.router-link-exact-active {
    border-bottom: 3px solid pink; /* 横线的样式，可以根据需要调整 */
    color: black;
}

/*.router-link-active {*/
/*  border-bottom: 2px solid pink; !* 横线的样式，可以根据需要调整 *!*/
/*  color: red;*/
/*  !*cursor: none;*!*/
/*}*/

.load-container{
  display: flex;
  justify-content: center;
}
.loader {
  margin-top: 50px;
  border: 3px solid transparent;
  border-top: 3px solid #ffc0cb; /* 浅粉色 */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
    border-top-color: #ffc0cb; /* 较深的蓝色 */
  }
  25% {
    transform: rotate(90deg);
    border-top-color:#9fd8f7; /* 较深的青色 */
  }
  50% {
    transform: rotate(180deg);
    border-top-color: #f06292; /* 较深的灰色 */
  }
  75% {
    transform: rotate(270deg);
    border-top-color: #ff6eb4; /* 较深的粉色 */
  }
  100% {
    transform: rotate(360deg);
    border-top-color: yellow; /* 返回较深的蓝色 */
  }
}
.body{
  padding-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  padding-bottom: 16px;
}
.mInput{
  display: flex; /* 使用Flexbox布局 */
  justify-content: space-between; /* 子元素水平排列 */
  background-color: white;
  border-radius: 8px;
  padding: 5px 5px;
}
.scroll-container {
  /* 允许内容在Y轴上滚动，当内容超出容器高度时 */
  overflow-y: auto;
  /* 设置一个高度，可以根据需要调整，例如占满剩余空间 */
  height: calc(100vh - 115px);
}
/*::-webkit-scrollbar {*/
/*  width: 0;  !* 滚动条宽度 *!*/
/*}*/

.list-item {
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 16px;
}

.zi{
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}


</style>
