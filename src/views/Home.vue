<template>
  <div class="div-body">
    <div  class="contract-item">
      <ImgLyn
          :title ="'上传图片'"
          :imgList = "idCardImgList"
          :count="2"
      />
    </div>
    <!--  下面按钮-->
    <ButtonLyn
        :button-list="buttonList"
        @mClick="nextView"/>
  </div>
</template>

<script setup>
import ImgLyn from '@/components/ImgLyn.vue';
import ButtonLyn from '@/components/ButtonLyn.vue';
import {onMounted, ref} from "vue";
import axios from "axios";

const idCardImgList = ref([
  {
    url:'img_id_card_front.png',//传给后端的路径
    alt:"身份证正面",
    name: '',//传给后端的图片名称,
    type:0//传给后端的图片类型
  },
  {
    url: 'img_id_card_back.png',
    alt: "身份证反面",
    name: '',//传给后端的图片名称,
    type: 1//传给后端的图片类型
  }
])
const buttonList = ref([
  {
    title: '提交',
    color: 'white',
    border: 'none',
    backgroundColor: 'rgba(12, 148, 99, 1)',
  }
])
//上传
let UpLoadTypeFiles = []
//检查图片是否都已经上传
const checkIsUpload =(Array)=>{
  for (let i = 0; i < Array.length; i++) {
    const item = Array[i];
    if (!item.imgName) {
      // util.toast('请上传' + item.alt)
      return false;
    }
  }
  return true;
}
//添加上传图片
const addImgList = (Array) => {
  Array.forEach(item => {
    UpLoadTypeFiles.push(
        {
          DataType: item.key,
          FileName: item.imgName,
          FilePath: item.imgUrl
        })
  })
}
const nextView = async (index) => {
  alert('提交成功')
  if(!checkIsUpload(idCardImgList.value)) return;
  UpLoadTypeFiles = [];
  addImgList(idCardImgList.value)

  const request = UpLoadTypeFiles
  // try {
  //   const res = await axios.post('http://192.168.10.28:5009/uploadImageUrl',  request);
  //   console.log("提交成功");
  //   // 跳转到签合同
  //   await router.push({
  //     name: 'CscSignContract'
  //   })
  // } catch (error) {
  //   console.log(error);
  // }

}

onMounted(async ()=>{
  try{
    const res = await axios.get('http://192.168.10.28:5009/personInfo?id=0');
    item.value = res.data;
  }catch (error){
    console.log(error);
  }
})
</script>

<style scoped>
.div-body{
  overflow: auto;
  background-color: rgba(245, 245, 245, 1);
  display: flex; /* 使用Flexbox布局 */
  flex-direction: column; /* 子元素垂直排列 */
  /*height: 100vh; !* 高度铺满 *!*/
  /*background-color: red;*/
  margin: 16px;
}
/*表单样式*/
.contract-item {
  padding: 16px;
  background-color: white;
  margin-bottom: 16px;
  border-radius: 8px;
}
</style>
