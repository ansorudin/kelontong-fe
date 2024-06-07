import axiosInstance from '@/api/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const products = ref({ data: [], meta: { total: 0 } })
  const product = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const getProducts = async (limit = 4, page = 0, search = '') => {
    loading.value = true
    try {
      const response = await axiosInstance.get('/products', {
        params: {
          limit,
          page,
          search
        }
      })
      products.value = response.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const getProductById = async (id) => {
    loading.value = true
    try {
      const response = await axiosInstance.get(`/products/${id}`)
      product.value = response.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const createProduct = async (product) => {
    loading.value = true
    try {
      const payload = new FormData()
      payload.append('name', product.name)
      payload.append('price', product.price)
      payload.append('sku', product.sku)
      payload.append('description', product.description)
      payload.append('weight', product.weight)
      payload.append('width', product.width)
      payload.append('height', product.height)
      payload.append('length', product.length)
      payload.append('productCategoryId', product.productCategoryId.id)
      payload.append('file', product.image)

      const response = await axiosInstance.post('/products', payload)
      products.value.push(response.data)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const updateProduct = async (id, product) => {
    loading.value = true
    try {
      const payload = new FormData()
      payload.append('name', product.name)
      payload.append('price', product.price)
      payload.append('sku', product.sku)
      payload.append('description', product.description)
      payload.append('weight', product.weight)
      payload.append('width', product.width)
      payload.append('height', product.height)
      payload.append('length', product.length)

      if (product.image) {
        payload.append('file', product.image)
      }

      const response = await axiosInstance.put(`/products/${id}`, payload)
      const index = products.value.findIndex((p) => p.id === id)
      if (index !== -1) {
        products.value[index] = response.data
      }
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const deleteProduct = async (id) => {
    loading.value = true
    try {
      await axiosInstance.delete(`/products/${id}`)
      products.value = products.value.filter((p) => p.id !== id)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    product,
    loading,
    error,
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
  }
})
