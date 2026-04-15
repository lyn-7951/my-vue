<template>
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedViews">
        <component :is="Component" />
      </keep-alive>
    </router-view>
</template>

<script setup>
import {computed, provide} from "vue";
import { useKeepAliveStore } from "./store/keepAlive";


const keepAliveStore = useKeepAliveStore()

const cachedViews = computed(() => keepAliveStore.cachedViews)

</script>

<style>

::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;height: 0;
}
#app {
  min-height: 100vh;
  background-color: #f7f7f7;
}
a:-webkit-any-link {
  cursor: none;
}
a, .green {
  transition: 0s;
}
.item {
  cursor: pointer;
  line-height: 1.5;
}
.bold {
  font-weight: bold;
}
</style>


