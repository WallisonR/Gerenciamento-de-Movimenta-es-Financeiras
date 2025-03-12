<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          Gerenciamento Financeiro
        </q-toolbar-title>

        <q-tabs>
          <q-route-tab to="/transactions" label="Movimentações" />
          <q-route-tab to="/categories" label="Categorias" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Configuração padrão das notificações
$q.notify.setDefaults({
  position: 'top-right',
  timeout: 2500,
  textColor: 'white'
})
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  height: 100%;
}
</style> 