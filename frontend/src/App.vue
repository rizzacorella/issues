<script setup lang="ts">
  import axios from 'axios'
  import { ref, onMounted, provide } from 'vue'

  import Header from './components/Header.vue'
  import IssueList from './components/IssueList.vue'
  import CreateIssue from './components/CreateIssue.vue'
  import UpdateIssue from './components/UpdateList.vue'

  const issues = ref([])

  const isEditModalOpen = ref(false)
  const titleBeingEdited = ref('')
  const descriptionBeingEdited = ref('')
  const idBeingEdited = ref('')

  const fetchIssues = async () => {
    try {
      const response = await axios.get('http://localhost:3000/v1/issues')
      issues.value = response.data
    } catch (error) {
      console.error('Error in fetching data', error)
    }
  }

  const createIssue = async (issueData: any) => {
    const { title, description } = issueData
    try {
      await axios.post('http://localhost:3000/v1/issues', {
        title,
        description,
      })
      await fetchIssues()
    } catch (error) {
      console.error('Error in fetching an issue')
    }
  }

  const deleteIssue = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/v1/issues/${id}`)
      await fetchIssues()
    } catch (error) {
      console.error('Error in adding a todo')
    }
  }

  const getIssue = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/issues/${id}`)
      titleBeingEdited.value = response.data.title
      descriptionBeingEdited.value = response.data.description
      idBeingEdited.value = response.data.id
    } catch (error) {
      console.error('Error in getting todo')
    }
  }

  const updateIssue = async (todoData: any) => {
    try {
      const { id, title, description } = todoData
      await axios.put(`http://localhost:3000/v1/issues/${id}`, {
        title,
        description,
      })
      closeEditModal()
      await fetchIssues()
    } catch (error) {
      console.error('Error in updating todo')
    }
  }

  const openEditModal = async (id: string) => {
    isEditModalOpen.value = true
    await getIssue(id)
  }

  const closeEditModal = () => {
    isEditModalOpen.value = false
  }

  onMounted(fetchIssues)

  provide('deleteIssue', deleteIssue)
  provide('createIssue', createIssue)
  provide('updateIssue', updateIssue)
</script>

<template>
  <div class="main__container">
    <div class="main__left"></div>
    <div class="main__center">
      <Header />

      <IssueList @open-edit-modal="openEditModal" :issues="issues" />

      <CreateIssue />

      <UpdateIssue @close-edit-modal="closeEditModal" :id="idBeingEdited" :isOpen="isEditModalOpen" :originalTitle="titleBeingEdited" :originalDescription="descriptionBeingEdited" />
    </div>
    <div class="main__right"></div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}
.main__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main__left, .main__right {
  flex: 0 0 5%;
}
.main__center {
  flex: 1;
}
</style>
