<template>
  <div class="edit-modal" v-if="isOpen">
    <div class="edit-modal-content">
      <label class="edit-modal__title-label" for="title">Title</label>
      <input class="edit-modal__title-field" type="text" v-model="title" name="title" />
      <label class="edit-modal__description-label" for="description">Description</label>
      <textarea v-model="description" name="description" rows="5"></textarea>
      <button class="edit-modal__save-button" @click="handleSaveClick">Save</button>
      <button class="edit-modal__close-button" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps, defineEmits, inject, watch } from 'vue'

  const title = ref('')
  const description = ref('')

  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    originalTitle: {
      type: String,
      required: true,
    },
    originalDescription: {
      type: String,
      required: true,
    },
  })

  watch(() => props.originalTitle, (newValue) => {
    title.value = newValue || ''
  })

  watch(() => props.originalDescription, (newValue) => {
    description.value = newValue || ''
  })

  const emits = defineEmits(['close-edit-modal'])

  const closeModal = () => {
    emits('close-edit-modal')
  }

  const updateIssue: Function = inject('updateIssue')

  const handleSaveClick = async () => {
    await updateIssue({
      id: props.id,
      title: title.value,
      description: description.value,
    })
  }
</script>

<style scoped>
.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.edit-modal__title-label, .edit-modal__description-label {
  color: darkgray;
  font-size: 12px;
}

.edit-modal__title-field {
  margin-bottom: 5px;
}

.edit-modal__save-button {
  border: none;
  background-color: #228B22;
  padding: 5px;
  margin: 5px 0;
  color: white;
}

.edit-modal__close-button {
  border: none;
  background-color: #B8860B;
  padding: 5px;
  color: white;
}
</style>