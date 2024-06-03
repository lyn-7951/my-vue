/*
* 参数：容器，滚动位置，几个页面
* 用法  @scroll="saveScrollPosition"*/
import {nextTick, onBeforeUnmount, onMounted, ref, watch, watchEffect} from 'vue';
export default function useScrollPosition(scrollContainer,scrollPositions, currentPage, refreshData) {
  //上拉刷新
  const startY = ref(0); // 触摸开始的Y坐标
  const pulling = ref(false); // 是否正在下拉
  const onTouchStart = (event) => {
    if (scrollContainer.value.scrollTop === 0) {
      startY.value = event.touches[0].clientY;
      pulling.value = true;
    }
  };
  const onTouchMove = (event) => {
    if (pulling.value) {
      const currentY = event.touches[0].clientY;
      if (currentY > startY.value) { // 判断是否向下拉
        const distance = currentY - startY.value;
        if (distance > 50) { // 拉动距离超过50px
          refreshData();
          pulling.value = false; // 重置状态
        }
      }
    }
  };
  const onTouchEnd = () => {
    pulling.value = false; // 重置状态
  };

  // 保存滚动位置
  const saveScrollPosition = () => {
    if (scrollContainer.value) {
      console.log('保存滚动位置:'+currentPage.value+":", scrollContainer.value.scrollTop); // 调试输出
      scrollPositions.value[currentPage.value] = scrollContainer.value.scrollTop;
    }
  };
// 保存滚动位置
  watch(currentPage, (newPage) => {
    nextTick(() => {
      if (scrollContainer.value) {
        console.log('恢复滚动位置:'+currentPage.value + "-"+newPage +":", scrollPositions.value[newPage]); // 调试输出
        scrollContainer.value.scrollTop = scrollPositions.value[newPage];
      }
    });
  },
      // { deep: true }

  );

  onMounted(() => {
    //上拉刷新
    const element = scrollContainer.value;
    if (element) {
      element.addEventListener('touchstart', onTouchStart,{passive: true});
      element.addEventListener('touchmove', onTouchMove,{passive: true});
      element.addEventListener('touchend', onTouchEnd,{passive: true});
    }

    // 保存滚动位置
    nextTick(() => {
      saveScrollPosition()
    });
  });
  onBeforeUnmount(() => {
    //上拉刷新
    const element = scrollContainer.value;
    if (element) {
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
    }
  });
  return { saveScrollPosition };
}
