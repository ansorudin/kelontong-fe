<template>
  <main class="h-screen overflow-x-hidden">
    <div
      class="hidden sm:block fixed bg-white w-full left-0 right-0 ml-auto mr-auto container mx-auto pt-2"
    >
      <div class="flex justify-center mb-2">
        <p class="text-md font-light">Hi {{ user?.name }}, welcome to kelontong store 😉</p>
      </div>
      <nav class="border py-2 px-4 rounded-md">
        <div class="flex justify-between items-center">
          <div class="flex gap-1">
            <RouterLink to="/">
              <Button label="Products" text severity="secondary" size="small" />
            </RouterLink>
            <RouterLink to="/product-category">
              <Button label="Product Category" text severity="secondary" size="small" />
            </RouterLink>
          </div>
          <Button @click="onLogout" label="Logout" severity="success" size="small" />
        </div>
      </nav>
    </div>
    <div class="md:hidden">
      <Button @click="toogleSidebar" icon="pi pi-bars" outlined severity="success" />
      <Sidebar v-model:visible="visible" header="Kelontong Store">
        <div class="flex flex-col justify-between h-full">
          <div class="flex gap-1 flex-col">
            <RouterLink to="/">
              <Button label="Products" text severity="secondary" size="small" />
            </RouterLink>
            <RouterLink to="/product-category">
              <Button label="Product Category" text severity="secondary" size="small" />
            </RouterLink>
          </div>
          <Button @click="onLogout" label="Logout" severity="info" size="small" />
        </div>
      </Sidebar>
    </div>

    <router-view />
  </main>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.store'
import Button from 'primevue/button'
import { RouterLink, useRouter } from 'vue-router'
import Sidebar from 'primevue/sidebar'
import { ref } from 'vue'

const router = useRouter()
const visible = ref(false)

const { user, logout } = useAuthStore()

const onLogout = () => {
  logout()
  router.replace('/login')
}

const toogleSidebar = () => {
  visible.value = !visible.value
}
</script>
