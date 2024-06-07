<template>
  <DataView :value="products" class="min-h-[60vh]">
    <template #list="slotProps">
      <div class="grid border rounded-md">
        <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
          <div
            class="flex flex-col sm:flex-row sm:items-center p-4 gap-5"
            :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }"
          >
            <div class="w-full md:w-[14rem]">
              <img
                class="rounded-md w-full h-36 object-cover"
                :src="`${baseUrl}${item.image}`"
                :alt="item.name"
              />
            </div>
            <div
              class="flex items-start sm:items-center sm:flex-row flex-col justify-between w-full"
            >
              <div class="md:flex-[0.7]">
                <span class="font-medium text-secondary text-sm">{{
                  item?.productCategory?.name
                }}</span>
                <div class="text-lg font-medium text-surface-700 dark:text-surface-0/80 mt-2">
                  {{ item.name }}
                </div>
                <div
                  class="text-sm font-light text-surface-700 dark:text-surface-0/80 line-clamp-3"
                >
                  {{ item.description }}
                </div>
              </div>
              <div class="sm:w-80 mt-5 sm:mt-0 flex flex-col items-start sm:items-end">
                <p class="text-md sm:text-lg font-medium">
                  Rp {{ parseInt(item.price).toLocaleString('id') }}
                </p>
                <div class="flex gap-3 mt-3">
                  <Button
                    size="small"
                    icon="pi pi-file-edit"
                    severity="success"
                    outlined
                    label="Edit"
                    @click="emitEdit(item.id)"
                  />
                  <Button
                    label="Delete"
                    size="small"
                    icon="pi pi-trash"
                    severity="danger"
                    outlined
                    @click="emitDelete(item.id)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>

<script setup>
import { defineProps } from 'vue'
import Button from 'primevue/button'
import DataView from 'primevue/dataview'
import { baseUrl } from '@/config/config'

defineProps({
  products: Array
})

const emit = defineEmits(['edit', 'delete'])

const emitEdit = (id) => {
  emit('edit', id)
}

const emitDelete = (id) => {
  emit('delete', id)
}
</script>
