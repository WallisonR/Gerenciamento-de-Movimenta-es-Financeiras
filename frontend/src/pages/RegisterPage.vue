<template>
  <q-page class="flex flex-center">
    <q-card class="login-card">
      <q-card-section>
        <div class="text-h6">Criar Conta</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="form.name"
            label="Nome"
            :rules="[val => !!val || 'Nome é obrigatório']"
          />

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

          <q-input
            v-model="form.password_confirmation"
            label="Confirmar Senha"
            type="password"
            :rules="[
              val => !!val || 'Confirmação de senha é obrigatória',
              val => val === form.password || 'As senhas não conferem'
            ]"
          />

          <div>
            <q-btn label="Criar Conta" type="submit" color="primary"/>
            <q-btn label="Voltar" to="/login" flat class="q-ml-sm"/>
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
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const onSubmit = async () => {
  try {
    await authStore.register(form.value)
    $q.notify({
      type: 'positive',
      message: 'Conta criada com sucesso!'
    })
    router.push('/')
  } catch (error: any) {
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Erro ao criar conta'
    })
  }
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
}
</style> 