<template>
  <q-page class="flex flex-center">
    <q-card class="login-card">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="form.email"
            label="E-mail"
            type="email"
            :rules="[
              val => !!val || 'E-mail é obrigatório',
              val => val.includes('@') || 'E-mail inválido'
            ]"
          />

          <q-input
            v-model="form.password"
            label="Senha"
            type="password"
            :rules="[val => !!val || 'Senha é obrigatória']"
          />

          <div>
            <q-btn label="Entrar" type="submit" color="primary"/>
            <q-btn label="Criar conta" to="/register" flat class="q-ml-sm"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const onSubmit = async () => {
  try {
    await authStore.login(form.value)
    $q.notify({
      type: 'positive',
      message: 'Login realizado com sucesso!'
    })
    router.push('/')
  } catch (error: any) {
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Erro ao fazer login'
    })
  }
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
}

@media (max-width: 599px) {
  .login-card {
    margin: 1rem;
  }
}
</style> 