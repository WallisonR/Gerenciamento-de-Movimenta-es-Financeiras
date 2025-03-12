<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Sistema Financeiro
        </q-toolbar-title>

        <q-btn flat round dense icon="logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item
          clickable
          v-ripple
          to="/"
          exact
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>
            Início
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          to="/transactions"
        >
          <q-item-section avatar>
            <q-icon name="receipt_long" />
          </q-item-section>

          <q-item-section>
            Transações
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          to="/categories"
        >
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>

          <q-item-section>
            Categorias
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()
const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const logout = async () => {
  try {
    await authStore.logout()
    $q.notify({
      type: 'positive',
      message: 'Logout realizado com sucesso!'
    })
    router.push('/login')
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
  }
}
</script> 