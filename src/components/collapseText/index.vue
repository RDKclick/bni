<template>
  <div class="text-collapse" :class="{ close: isCollapsed }">
    <div v-if="isCollapsed" v-html="collapsedText"></div>
    <div v-else v-html="fullText"></div>
    <!-- <button @click="toggleText">{{ isCollapsed ? '展开' : '收起' }}</button> -->
    <div class="btn-box">
      <wd-icon class="btn" @click="toggleText" v-if="isCollapsed" name="arrow-down" color="#323233"
        size="28px"></wd-icon>
      <wd-icon class="btn" @click="toggleText" v-else name="arrow-up" color="#323233" size="28px"></wd-icon>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface TextCollapseProps {
  text: string;
  lines?: number;
}

const props = defineProps<TextCollapseProps>();

const text = ref(props.text);
const lines = ref(props.lines || 3);
const isCollapsed = ref(true);

const fullText = computed(() => text.value);
const collapsedText = computed(() => {
  const textLines = text.value.split('\n');
  let collapsedLines = textLines.slice(0, lines.value).join('\n');
  if (textLines.length > lines.value) {
    collapsedLines += '...';
  }
  return collapsedLines;
});

const toggleText = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped lang="scss">
.text-collapse {
  position: relative;
  /* 3行文本的高度，根据实际字体大小调整 */
  overflow: hidden;
  transition: max-height 0.3s ease;

  &.close {
    max-height: 4.5em;
  }
}

.text-collapse div {
  line-height: 1.5em;
  /* 单行文本的高度，根据实际字体大小调整 */
}

.btn-box {
  position: absolute;
  right: 12px;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #E1E1E1;
  border-radius: 40px;
}

button,
.btn {

  padding: 0.5em 1em;
  border-radius: 50%;
}
</style>
