<template>
  <div class="issue">
    <div class="issue__body">
      <h4 class="issue__title">{{ title }}</h4>
      <p class="issue__description">{{ description }}</p>
    </div>
    <div class="issue__buttons-container">
      <button class="issue__delete-button" @click="deleteIssue(id)"><img src="@/assets/trash.svg" class="issue__delete-icon" alt="Delete" /></button>
      <button class="issue__edit-button" @click="handleEditButtonClick(id)"><img src="@/assets/edit.svg" class="issue__edit-icon" alt="Edit" /></button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, inject, defineEmits } from 'vue'
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  })
  const emits = defineEmits(['open-edit-modal'])
  const handleEditButtonClick = (id: string) => {
    emits('open-edit-modal', id)
  }
  const deleteIssue = inject('deleteIssue')
</script>

<style scoped>
  .issue {
    border: 1px solid white;
    border-radius: 2px;
    color: #5A5A5A;
    background-color: #FAF9F6;
    margin-top: 7px;
    margin-bottom: 7px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .issue__body {
    display: flex;
    flex-direction: column;
  }
  .issue__description {
    font-size: 12px;
  }
  .issue__delete-icon {
    width: 10px;
  }
  .issue__edit-icon {
    width: 10px;
  }
  .issue__buttons-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;
  }
  .issue__delete-button {
    border: none;
    background-color: #7d2b2b;
    padding: 5px;
    border-radius: 3px;
  }
  .issue__edit-button {
    border: none;
    background-color: #50C878;
    padding: 5px;
    border-radius: 3px;
    margin-left: 2px;
  }
  .issue__delete-button:active {
    background-color: #933232;
  }
  .issue__edit-button:active {
    background-color: #59de85;
  }
</style>
