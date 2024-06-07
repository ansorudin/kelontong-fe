<template>
  <main class="w-full md:w-[35%] pt-16 md:pt-0">
    <form @submit="onSubmit">
      <p class="text-xl font-medium mb-1 text-center md:text-start">Register new account.</p>
      <p class="text-xs text-gray-500 font-light mb-10 md:mb-5 text-center md:text-start">
        Enter your email address, fullname and password to register new account.
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
          <InputText
            placeholder="Fullname"
            name="name"
            v-model="name"
            v-bind="nameProps"
            class="w-full"
            :class="{ 'border-red-600': !!errors.name }"
          />
          <div v-show="errors.name">
            <p class="text-xs text-red-600 font-light mt-1">{{ errors.name }}</p>
          </div>
        </div>
        <div>
          <IconField iconPosition="right">
            <InputIcon>
              <i :class="iconClassPassword" @click="onChangeTypePassword" />
            </InputIcon>
            <InputText
              placeholder="Password"
              name="password"
              v-model="password"
              v-bind="passwordProps"
              class="w-full"
              :type="typePassword"
              :class="{ 'border-red-600': !!errors.password }"
            />
          </IconField>
          <div v-show="errors.password">
            <p class="text-xs text-red-600 font-light mt-1">{{ errors.password }}</p>
          </div>
        </div>
        <div>
          <IconField iconPosition="right">
            <InputIcon>
              <i :class="iconClassConfirmPassword" @click="onChangeTypeConfirmPassword" />
            </InputIcon>
            <InputText
              placeholder="Confirm Password"
              name="confirmPassword"
              v-model="confirmPassword"
              v-bind="confirmPasswordProps"
              class="w-full"
              :type="typeConfirmPassword"
              :class="{ 'border-red-600': !!errors.confirmPassword }"
            />
          </IconField>
          <div v-show="errors.confirmPassword">
            <p class="text-xs text-red-600 font-light mt-1">{{ errors.confirmPassword }}</p>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        class="w-full mt-8 md:mt-5"
        severity="info"
        label="Register"
        size="small"
      />
      <div class="flex justify-center mt-5 md:mt-3">
        <p class="text-xs font-light">
          Already have an account?
          <RouterLink to="/login"><span class="text-sky-600 font-medium">Sign In</span></RouterLink>
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
const isConfirmPassword = ref(true)

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
})

const { defineField, handleSubmit, errors } = useForm({
  initialValues: {
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  },
  validationSchema: schema
})

const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')
const [confirmPassword, confirmPasswordProps] = defineField('confirmPassword')
const [name, nameProps] = defineField('name')

const authStore = useAuthStore()

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.register(values.email, values.password, values.name)
    router.replace('/')
  } catch (error) {
    console.log(error)
  }
})

const onChangeTypePassword = () => {
  isPassword.value = !isPassword.value
}

const onChangeTypeConfirmPassword = () => {
  isConfirmPassword.value = !isConfirmPassword.value
}

const iconClassPassword = computed(() => (isPassword.value ? 'pi pi-eye-slash' : 'pi pi-eye'))
const iconClassConfirmPassword = computed(() =>
  isConfirmPassword.value ? 'pi pi-eye-slash' : 'pi pi-eye'
)
const typePassword = computed(() => (isPassword.value ? 'password' : 'text'))
const typeConfirmPassword = computed(() => (isConfirmPassword.value ? 'password' : 'text'))
</script>
