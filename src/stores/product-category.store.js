import axiosInstance from '@/api/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductCategoryStore = defineStore('productCategory', () => {
  const productCategories = ref({ data: [], meta: { total: 0 } })
  const productCategory = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const getProductCategories = async (limit = 4, page = 0, search = '') => {
    loading.value = true
    try {
      const response = await axiosInstance.get('/product-category', {
        params: {
          limit,
          page,
          search
        }
      })
      productCategories.value = response.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const getProductCategoryById = async (id) => {
    loading.value = true
    try {
      const response = await axiosInstance.get(`/product-category/${id}`)
      productCategory.value = response.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const createProductCategory = async (productCategory) => {
    loading.value = true
    try {
      const response = await axiosInstance.post('/product-category', productCategory)
      productCategories.value.push(response.data)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const updateProductCategory = async (id, productCategory) => {
    loading.value = true
    try {
      const response = await axiosInstance.put(`/product-category/${id}`, productCategory)
      const index = productCategories.value.findIndex((p) => p.id === id)
      if (index !== -1) {
        productCategories.value[index] = response.data
      }
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const deleteProductCategory = async (id) => {
    loading.value = true
    try {
      await axiosInstance.delete(`/product-category/${id}`)
      productCategories.value = productCategories.value.filter((p) => p.id !== id)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    productCategories,
    productCategory,
    loading,
    error,
    getProductCategories,
    getProductCategoryById,
    createProductCategory,
    updateProductCategory,
    deleteProductCategory
  }
})
