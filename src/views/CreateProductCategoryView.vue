<template>
  <main class="pt-8 sm:pt-28 pb-10">
    <div class="flex w-full items-center justify-between mb-8">
      <h1 class="text-lg sm:text-3xl text-slate-700 font-semibold">Create Product Category</h1>
    </div>
    <form @submit="onSubmit">
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="w-full">
            <p class="text-sm mb-2">Name</p>
            <InputText
              placeholder="Name"
              name="name"
              class="w-full"
              v-model="name"
              v-bind="nameProps"
              :class="{ 'border-red-600': !!errors.name }"
            />
            <div v-show="errors.name">
              <p class="text-xs text-red-600 font-light mt-1">{{ errors.name }}</p>
            </div>
          </div>
        </div>

        <div class="flex justify-end border-t pt-4">
          <div class="flex gap-3">
            <Button type="submit" label="Save" icon="pi pi-save" severity="info" outlined />
            <Button
              label="Cancel"
              icon="pi pi-save"
              severity="danger"
              outlined
              @click="toggleEdit"
            />
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useForm } from 'vee-validate'
import { useProductCategoryStore } from '@/stores/product-category.store'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const router = useRouter()
const productCategoryStore = useProductCategoryStore()

const { defineField, handleSubmit, errors } = useForm({
  initialValues: {
    name: ''
  }
})

const [name, nameProps] = defineField('name')

const onSubmit = handleSubmit(async (values) => {
  try {
    await productCategoryStore.createProductCategory(values)
    toast.add({
      severity: 'success',
      summary: 'Create Product Category',
      detail: 'Create product category has been successfully',
      life: 3000
    })
    router.replace('/product-category')
  } catch (error) {
    console.log(error)
    toast.add({
      severity: 'error',
      summary: 'Create Product Category',
      detail: error.response?.data || 'Something went wrong.',
      life: 3000
    })
  }
})
</script>
