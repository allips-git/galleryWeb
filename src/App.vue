<template>
  <TopHeader/>
  <main class=""
  >
  <!-- :class="{ 'min-h-[calc(100vh-112px)]': showTopHeader }" -->
      <RouterView />
  </main>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router'; // useRoute 임포트
import TopHeader from '@/components/layouts/TopHeader.vue'


const route = useRoute();



</script>

<style scoped>

</style>
