<template>
  <main class="pt-8 sm:pt-28 pb-10">
    <div class="flex w-full items-center justify-between mb-8">
      <h1 class="text-lg sm:text-3xl text-slate-700 font-semibold">Product Detail</h1>
    </div>
    <form @submit="onSubmit">
      <div v-show="product" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="w-full">
            <p class="text-sm mb-2">SKU</p>
            <InputText
              :disabled="!isEdit"
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
              :disabled="!isEdit"
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
              :disabled="!isEdit"
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
              :disabled="!isEdit"
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
              :disabled="!isEdit"
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
              :disabled="!isEdit"
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
              :disabled="!isEdit"
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
              :disabled="!isEdit"
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
              :disabled="!isEdit"
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
            <img class="w-80 h-80 object-cover rounded-md" :src="`${baseUrl}${product?.image}`" />
            <div class="mt-4">
              <FileUpload
                v-if="isEdit"
                mode="advanced"
                @select="onUpload"
                :showUploadButton="false"
              />
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
import { baseUrl } from '@/config/config'

const toast = useToast()
const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const productCategoryStore = useProductCategoryStore()
const { product } = storeToRefs(productStore)
const { productCategories } = storeToRefs(productCategoryStore)

const productId = route.params.id

const fetchProduct = async () => {
  await productStore.getProductById(productId)
}

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

const isEdit = ref(false)

const toggleEdit = () => {
  isEdit.value = !isEdit.value
}

watch(product, (newProduct) => {
  if (newProduct) {
    resetForm({
      values: {
        sku: newProduct.sku || '',
        name: newProduct.name || '',
        description: newProduct.description || '',
        weight: newProduct.weight || '',
        width: newProduct.width || '',
        length: newProduct.length || '',
        height: newProduct.height || '',
        price: newProduct.price || '',
        productCategoryId: newProduct.productCategoryId || ''
      }
    })

    const matchedCategory = productCategories.value.data.find(
      (category) => category.id === newProduct.productCategoryId
    )
    setFieldValue('productCategoryId', matchedCategory)
  }
})

const onUpload = (e) => {
  const file = e.files[0]
  setFieldValue('image', file)
}

const onSubmit = handleSubmit(async (values) => {
  try {
    await productStore.updateProduct(productId, values)
    fetchProduct()
    isEdit.value = false
    toast.add({
      severity: 'success',
      summary: 'Update Product',
      detail: 'Update product has been successfully',
      life: 3000
    })
    router.replace('/product')
  } catch (error) {
    console.log(error)
    toast.add({
      severity: 'error',
      summary: 'Update Product',
      detail: error.response?.data || 'Something went wrong.',
      life: 3000
    })
  }
})
onMounted(fetchProduct)
onMounted(fetchProductCategories)
</script>
