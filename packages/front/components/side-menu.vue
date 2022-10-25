<template>
  <div class="side-menu-wrapper flex w-screen">
    <div class="h-full flex flex-col">
      <el-menu
        :default-active="activeIndex"
        class="side-menu basis-full"
        :class="{ open: !isCollapse }"
        :collapse="isCollapse"
        :translate="false"
      >
        <template v-for="(item, index) of menuItems">
          <el-sub-menu v-if="item.children?.length" :index="`${index}`">
            <template #title>
              <GoogleIcon v-if="item.icon" :icon="item.icon" />
              <span>{{ item.label }}</span>
            </template>
            <el-menu-item
              v-for="(cItem, cIndex) of item.children"
              :index="`${index}-${cIndex}`"
              @click="selectMenu(cItem, `${index}-${cIndex}`)"
            >
              <GoogleIcon v-if="cItem.icon" :icon="cItem.icon" />
              <span>{{ cItem.label }}</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :index="`${index}`" @click="selectMenu(item, `${index}`)">
            <GoogleIcon v-if="item.icon" :icon="item.icon" />
            <template #title>
              {{ item.label }}
            </template>
          </el-menu-item>
        </template>
      </el-menu>
      <el-button style="border-radius: 0" @click="isCollapse = !isCollapse">{{ isCollapse ? '>>' : '<<' }}</el-button>
    </div>
    <div class="w-full max-w-full h-full max-h-full overflow-auto">
      <div class="p-4">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { MenuItem } from '~~/types';

const { menuItems } = defineProps<{ menuItems: MenuItem[] }>();
const isCollapse = ref(true);
const activeIndex = ref('');

const selectMenu = (menuItem: MenuItem, index: string) => {
  if (menuItem.link) {
    navigateTo({ path: menuItem.link });
  }
  activeIndex.value = index;
};

const adjustHeight = () => {
  const elements = document.getElementsByClassName('side-menu-wrapper');
  if (elements.length) {
    const el = elements[0] as HTMLElement;
    el.style.height = `${window.innerHeight - el.getBoundingClientRect().top}px`;
  }
};

onMounted(() => {
  adjustHeight();
  addEventListener('resize', () => adjustHeight());
});
</script>
<style lang="scss" scoped>
.side-menu-wrapper {
  z-index: 1;
  .side-menu {
    max-width: 200px;

    &.open {
      min-width: 200px;
    }
  }
}
</style>
