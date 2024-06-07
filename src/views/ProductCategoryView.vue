<template>
  <main class="pt-8 sm:pt-28 pb-10">
    <div
      class="flex w-full flex-col sm:flex-row items-start sm:items-center gap-2 justify-between mb-8"
    >
      <h1 class="text-lg sm:text-3xl text-slate-700 font-semibold">Product Category</h1>
      <div class="flex items-center gap-3">
        <IconField iconPosition="right" class="w-56 sm:w-72">
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText
            placeholder="Search"
            v-model="searchValue"
            @input="onSearchInput"
            @keydown.enter="onSubmitSeacrh"
          />
        </IconField>
        <RouterLink to="/product-category/create">
          <Button size="small" severity="info" outlined icon="pi pi-plus" />
        </RouterLink>
      </div>
    </div>

    <div>
      <ProductCategoryList
        :product-categories="productCategories.data"
        @edit="onEdit"
        @delete="onDelete"
      />
      <div class="mt-3">
        <Paginator
          :rows="5"
          :totalRecords="productCategories.meta.total"
          @page="onNextPage"
        ></Paginator>
      </div>
    </div>
  </main>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import InputIcon from 'primevue/inputicon'
import IconField from 'primevue/iconfield'
import Button from 'primevue/button'
import { ref, onMounted } from 'vue'
import Paginator from 'primevue/paginator'
import { storeToRefs } from 'pinia'
import { useRouter, RouterLink } from 'vue-router'
import { useProductCategoryStore } from '@/stores/product-category.store'
import ProductCategoryList from '@/components/product-category/ProductCategoryList.vue'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const confirm = useConfirm()
const toast = useToast()

const router = useRouter()
const productCategoryStore = useProductCategoryStore()
const currentPage = ref(0)
const searchValue = ref('')
const searchSubmit = ref('')

const { getProductCategories } = productCategoryStore
const { productCategories } = storeToRefs(productCategoryStore)

const fetchProductCategories = async () => {
  await getProductCategories(4, currentPage.value, searchSubmit.value)
}

const onSearchInput = async (val) => {
  searchValue.value = val.target.value
}

const onSubmitSeacrh = () => {
  currentPage.value = 0
  searchSubmit.value = searchValue.value
  fetchProductCategories()
}

const onNextPage = (val) => {
  currentPage.value = val.page
  fetchProductCategories()
}

const onEdit = (id) => {
  router.push(`/product-category/${id}`)
}

const onDelete = (id) => {
  confirm.require({
    message: 'Are you sure you want to delete product category?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete'
    },
    accept: async () => {
      await productCategoryStore.deleteProductCategory(id)
      fetchProductCategories()
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 })
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
    }
  })
}

onMounted(fetchProductCategories)
</script>
