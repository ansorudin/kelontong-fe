<template>
  <main class="pt-8 sm:pt-28 pb-10">
    <div class="flex w-full items-center justify-between mb-8">
      <h1 class="text-lg sm:text-3xl text-slate-700 font-semibold">Product Category Detail</h1>
    </div>
    <form @submit="onSubmit">
      <div v-show="productCategory" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="w-full">
            <p class="text-sm mb-2">Name</p>
            <InputText
              :disabled="!isEdit"
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
          <div v-if="isEdit" class="flex gap-3">
            <Button type="submit" label="Save" icon="pi pi-save" severity="info" outlined />
            <Button
              label="Cancel"
              icon="pi pi-save"
              severity="danger"
              outlined
              @click="toggleEdit"
            />
          </div>
          <Button
            v-else
            label="Edit"
            icon="pi pi-file-edit"
            severity="warning"
            outlined
            @click="toggleEdit"
          />
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useForm } from 'vee-validate'
import { useProductCategoryStore } from '@/stores/product-category.store'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const route = useRoute()
const router = useRouter()
const productCategoryStore = useProductCategoryStore()
const { productCategory } = storeToRefs(productCategoryStore)

const productCategoryId = route.params.id

const fetchProductCategory = async () => {
  await productCategoryStore.getProductCategoryById(productCategoryId)
}

const { defineField, handleSubmit, errors, resetForm } = useForm({
  initialValues: {
    name: ''
  }
})

const [name, nameProps] = defineField('name')

const isEdit = ref(false)

const toggleEdit = () => {
  isEdit.value = !isEdit.value
}

watch(productCategory, (newProduct) => {
  if (newProduct) {
    resetForm({
      values: {
        name: newProduct.name || ''
      }
    })
  }
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await productCategoryStore.updateProductCategory(productCategoryId, values)
    fetchProductCategory()
    isEdit.value = false
    toast.add({
      severity: 'success',
      summary: 'Update Product Category',
      detail: 'Update product category has been successfully',
      life: 3000
    })
    router.replace('/product-category')
  } catch (error) {
    console.log(error)
    toast.add({
      severity: 'error',
      summary: 'Update Product Category',
      detail: error.response?.data || 'Something went wrong.',
      life: 3000
    })
  }
})
onMounted(fetchProductCategory)
</script>
