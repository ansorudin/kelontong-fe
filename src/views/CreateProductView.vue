<template>
  <main class="pt-8 sm:pt-28 pb-10">
    <div class="flex w-full items-center justify-between mb-8">
      <h1 class="text-lg sm:text-3xl text-slate-700 font-semibold">Create Product</h1>
    </div>
    <form @submit="onSubmit">
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="w-full">
            <p class="text-sm mb-2">SKU</p>
            <InputText
              placeholder="SKU"
              name="sku"
              class="w-full"
              v-model="sku"
              v-bind="skuProps"
              :class="{ 'border-red-600': !!errors.sku }"
            />
            <div v-show="errors.sku">
              <p class="text-xs text-red-600 font-light mt-1">{{ errors.sku }}</p>
            </div>
          </div>
          <div class="w-full">
            <p class="text-sm mb-2">Product Name</p>
            <InputText
              placeholder="Product Name"
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
          <div class="w-full">
            <p class="text-sm mb-2">Price</p>
            <InputNumber
              placeholder="Price"
              name="price"
              class="w-full"
              v-model="price"
              v-bind="priceProps"
              :class="{ 'border-red-600': !!errors.price }"
            />
            <div v-show="errors.price">
              <p class="text-xs text-red-600 font-light mt-1">{{ errors.price }}</p>
            </div>
          </div>

          <div class="w-full">
            <p class="text-sm mb-2">Product Category</p>
            <Dropdown
              v-model="productCategoryId"
              v-bind="productCategoryIdProps"
              :options="productCategories.data"
              placeholder="Select a Category"
              class="w-full"
              optionLabel="name"
              name="productCategoryId"
            />
            <div v-show="errors.productCategoryId">
              <p class="text-xs text-red-600 font-light mt-1">{{ errors.productCategoryId }}</p>
            </div>
          </div>

          <div class="w-full">
            <p class="text-sm mb-2">Weight</p>
            <InputNumber
              placeholder="Weight"
              name="weight"
              class="w-full"
              v-model="weight"
              v-bind="weightProps"
              :class="{ 'border-red-600': !!errors.weight }"
            />
            <div v-show="errors.weight">
              <p class="text-xs text-red-600 font-light mt-1">{{ errors.weight }}</p>
            </div>
          </div>
          <div class="w-full">
            <p class="text-sm mb-2">Width</p>
            <InputNumber
              placeholder="Width"
              name="width"
              class="w-full"
              v-model="width"
              v-bind="widthProps"
              :class="{ 'border-red-600': !!errors.width }"
            />
            <div v-show="errors.width">
              <p class="text-xs text-red-600 font-light mt-1">{{ errors.width }}</p>
            </div>
          </div>
          <div class="w-full">
            <p class="text-sm mb-2">Lenght</p>
            <InputNumber
              placeholder="Length"
              name="length"
              class="w-full"
              v-model="length"
              v-bind="lengthProps"
              :class="{ 'border-red-600': !!errors.length }"
            />
            <div v-show="errors.length">
              <p class="text-xs text-red-600 font-light mt-1">{{ errors.length }}</p>
            </div>
          </div>
          <div class="w-full">
            <p class="text-sm mb-2">Height</p>
            <InputNumber
              placeholder="Height"
              name="height"
              class="w-full"
              v-model="height"
              v-bind="heightProps"
              :class="{ 'border-red-600': !!errors.height }"
            />
            <div v-show="errors.height">
              <p class="text-xs text-red-600 font-light mt-1">{{ errors.height }}</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="w-full">
            <p class="text-sm mb-2">Description</p>
            <Textarea
              rows="5"
              placeholder="Product Description"
              name="decription"
              class="w-full"
              v-model="description"
              v-bind="descriptionProps"
              :class="{ 'border-red-600': !!errors.description }"
            />
            <div v-show="errors.description">
              <p class="text-xs text-red-600 font-light mt-1">{{ errors.description }}</p>
            </div>
          </div>
          <div class="w-full">
            <p class="text-sm mb-2">Image</p>
            <FileUpload mode="advanced" @select="onUpload" :showUploadButton="false" />
          </div>
        </div>

        <div class="flex justify-end">
          <div class="flex gap-3">
            <Button type="submit" label="Save" icon="pi pi-save" severity="info" outlined />
            <Button label="Cancel" icon="pi pi-save" severity="danger" outlined @click="onCancel" />
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product.store'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'
import { useForm } from 'vee-validate'
import { useProductCategoryStore } from '@/stores/product-category.store'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const router = useRouter()
const productStore = useProductStore()
const productCategoryStore = useProductCategoryStore()
const { productCategories } = storeToRefs(productCategoryStore)

const fetchProductCategories = async () => {
  await productCategoryStore.getProductCategories(100)
}

const { defineField, handleSubmit, errors, resetForm, setFieldValue } = useForm({
  initialValues: {
    sku: '',
    name: '',
    description: '',
    weight: 0,
    width: 0,
    length: 0,
    height: 0,
    price: 0,
    productCategoryId: null,
    image: null
  }
})

const [sku, skuProps] = defineField('sku')
const [name, nameProps] = defineField('name')
const [description, descriptionProps] = defineField('description')
const [weight, weightProps] = defineField('weight')
const [width, widthProps] = defineField('width')
const [length, lengthProps] = defineField('length')
const [height, heightProps] = defineField('height')
const [price, priceProps] = defineField('price')
const [productCategoryId, productCategoryIdProps] = defineField('productCategoryId')

const onUpload = (e) => {
  const file = e.files[0]
  setFieldValue('image', file)
}

const onSubmit = handleSubmit(async (values) => {
  try {
    await productStore.createProduct(values)
    toast.add({
      severity: 'success',
      summary: 'Create Product',
      detail: 'Create product has been successfully',
      life: 3000
    })
    router.replace('/product')
  } catch (error) {
    console.log(error)
    toast.add({
      severity: 'error',
      summary: 'Create Product',
      detail: error.response?.data || 'Something went wrong.',
      life: 3000
    })
  }
})

const onCancel = () => {
  resetForm()
  router.back()
}
onMounted(fetchProductCategories)
</script>
