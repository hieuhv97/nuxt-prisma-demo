<script setup lang="ts">
const form = reactive({
  id: null as number | null,
  title: '',
  content: ''
})

const { data: posts, refresh } = await useFetch('/api/posts')

const resetForm = () => {
  form.id = null
  form.title = ''
  form.content = ''
}

const submitForm = async () => {
  if (!form.title.trim()) return

  if (form.id) {
    await $fetch(`/api/posts/${form.id}`, {
      method: 'PUT',
      body: {
        title: form.title,
        content: form.content
      }
    })
  } else {
    await $fetch('/api/posts', {
      method: 'POST',
      body: {
        title: form.title,
        content: form.content
      }
    })
  }

  resetForm()
  await refresh()
}

const editPost = (post: any) => {
  form.id = post.id
  form.title = post.title
  form.content = post.content || ''
}

const deletePost = async (id: number) => {
  await $fetch(`/api/posts/${id}`, {
    method: 'DELETE'
  })
  await refresh()
}
</script>

<template>
  <div style="max-width: 800px; margin: 40px auto; font-family: Arial, sans-serif;">
    <h1>Nuxt 3 Prisma CRUD</h1>

    <form @submit.prevent="submitForm" style="margin-bottom: 24px;">
      <div style="margin-bottom: 12px;">
        <input
          v-model="form.title"
          type="text"
          placeholder="Title"
          style="width: 100%; padding: 10px;"
        />
      </div>

      <div style="margin-bottom: 12px;">
        <textarea
          v-model="form.content"
          placeholder="Content"
          rows="4"
          style="width: 100%; padding: 10px;"
        />
      </div>

      <button type="submit" style="padding: 10px 16px; margin-right: 8px;">
        {{ form.id ? 'Update' : 'Create' }}
      </button>

      <button type="button" @click="resetForm" style="padding: 10px 16px;">
        Clear
      </button>
    </form>

    <div v-if="posts?.length">
      <div
        v-for="post in posts"
        :key="post.id"
        style="border: 1px solid #ddd; padding: 16px; margin-bottom: 12px;"
      >
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>

        <button @click="editPost(post)" style="margin-right: 8px;">
          Edit
        </button>
        <button @click="deletePost(post.id)">
          Delete
        </button>
      </div>
    </div>

    <p v-else>No posts yet.</p>
  </div>
</template>
