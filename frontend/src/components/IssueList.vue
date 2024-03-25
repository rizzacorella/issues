<script setup lang="ts">
  import { defineEmits } from 'vue'
  import Issue from './Issue.vue'

  import { defineProps } from 'vue'
  const props = defineProps({
    issues: {
      type: Array,
      required: true,
    },
  })
  const emits = defineEmits(['open-edit-modal'])
  const openEditModal = (id: string) => {
    emits('open-edit-modal', id)
  }
</script>

<template>
  <div id="issue-list" class="issue-list">
    <Issue @open-edit-modal="openEditModal" v-for="issue in issues" :key="issue.id" :id="issue.id" :title="issue.title" :description="issue.description" />
  </div>
</template>

<style scoped>
 .issue-list {
   list-style-type: none;
 }
</style>