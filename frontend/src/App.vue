<template>
  <router-view />
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