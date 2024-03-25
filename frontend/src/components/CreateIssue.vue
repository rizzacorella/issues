<script setup lang="ts">
  import { ref, inject } from 'vue'

  const title = ref('')
  const description = ref('')
  const createIssue = inject('createIssue')

  const handleClick = async () => {
    const issueData = {
      title: title.value,
      description: description.value,
    }

    await createIssue(issueData)

    title.value = ''
    description.value = ''
  }
</script>

<template>
  <div class="add-issue__container">
    <label class="add-issue__title-label" for="title">Title</label>
    <input class="add-issue__title-field" type="text" v-model="title" name="title" />
    <label class="add-issue__description-label" for="description">Description</label>
    <textarea v-model="description" name="description" rows="5"></textarea>
    <button class="add-issue__save-button" @click="handleClick">Save</button>
  </div>
</template>

<style scoped>
  .add-issue__container {
    display: flex;
    flex-direction: column;
  }
  .add-issue__save-button {
    margin: 10px 0;
    border: none;
    background-color: #228B22;
    padding: 5px;
    color: white;
  }
  .add-issue__title-label, .add-issue__description-label{
    font-size: 12px;
  }
  .add-issue__title-field {
    margin-bottom: 5px;
  }
</style>