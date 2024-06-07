<template>
  <main class="w-full md:w-[35%] pt-16 md:pt-0">
    <form @submit="onSubmit">
      <p class="text-xl font-medium mb-1 text-center md:text-start">Login in to your account.</p>
      <p class="text-xs text-gray-500 font-light mb-10 md:mb-5 text-center md:text-start">
        Enter your email address and password to login.
      </p>
      <div class="flex flex-col gap-3">
        <div class="w-full">
          <InputText
            placeholder="Email"
            name="email"
            v-model="email"
            v-bind="emailProps"
            class="w-full"
            :class="{ 'border-red-600': !!errors.email }"
          />
          <div v-show="errors.email">
            <p class="text-xs text-red-600 font-light mt-1">{{ errors.email }}</p>
          </div>
        </div>
        <div>
          <IconField iconPosition="right">
            <InputIcon>
              <i :class="iconClass" @click="onChangeTypePassword" />
            </InputIcon>
            <InputText
              v-model="password"
              v-bind="passwordProps"
              name="password"
              placeholder="Password"
              :type="typePassword"
              :class="{ 'border-red-600': !!errors.password }"
            />
          </IconField>
          <div v-show="errors.password">
            <p class="text-xs text-red-600 font-light mt-1">{{ errors.password }}</p>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        class="w-full mt-8 md:mt-5"
        label="Login"
        size="small"
        severity="info"
      />
      <div class="flex justify-center mt-5 md:mt-3">
        <p class="text-xs font-light">
          Don't you have an accout?
          <RouterLink to="/register"
            ><span class="text-sky-600 font-medium">Sign Up</span></RouterLink
          >
        </p>
      </div>
    </form>
  </main>
</template>

<script setup>
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { RouterLink, useRouter } from 'vue-router'
import * as Yup from 'yup'
import { useAuthStore } from '@/stores/auth.store'
import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'

const router = useRouter()

const isPassword = ref(true)

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required()
})

const { defineField, handleSubmit, errors } = useForm({
  initialValues: {
    email: '',
    password: ''
  },
  validationSchema: schema
})

const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')

const authStore = useAuthStore()

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.login(values.email, values.password)
    router.replace('/')
  } catch (error) {
    console.log(error)
  }
})

const onChangeTypePassword = () => {
  isPassword.value = !isPassword.value
}

const iconClass = computed(() => (isPassword.value ? 'pi pi-eye-slash' : 'pi pi-eye'))
const typePassword = computed(() => (isPassword.value ? 'password' : 'text'))
</script>
