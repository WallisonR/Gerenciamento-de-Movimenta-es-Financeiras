<template>
  <div class="q-pa-md">
    <div class="row q-mb-md">
      <div class="col">
        <h5 class="q-mt-none q-mb-md">Categorias</h5>
      </div>
      <div class="col-auto">
        <q-btn color="primary" label="Nova Categoria" @click="showDialog = true" />
      </div>
    </div>

    <q-table
      :rows="categories"
      :columns="columns"
      row-key="id"
      :loading="loading"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            color="negative"
            icon="delete"
            @click="confirmDelete(props.row)"
          >
            <q-tooltip>Excluir</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <!-- Dialog para criar categoria -->
    <q-dialog v-model="showDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Nova Categoria</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              v-model="form.name"
              label="Nome"
              :rules="[val => !!val || 'Nome é obrigatório']"
            />
            <q-input
              v-model="form.description"
              label="Descrição"
              type="textarea"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Salvar" color="primary" @click="onSubmit" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import api from '@/services/api';
import type { Category } from '@/types';

const $q = useQuasar();
const categories = ref<Category[]>([]);
const loading = ref(false);
const showDialog = ref(false);

const form = ref({
  name: '',
  description: ''
});

const columns = [
  { name: 'name', label: 'Nome', field: 'name', sortable: true },
  { name: 'description', label: 'Descrição', field: 'description' },
  { name: 'actions', label: 'Ações', field: 'actions' }
];

const fetchCategories = async () => {
  loading.value = true;
  try {
    const response = await api.get<Category[]>('/categories');
    categories.value = response.data;
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: 'Erro ao carregar categorias'
    });
  } finally {
    loading.value = false;
  }
};

const onSubmit = async () => {
  try {
    await api.post('/categories', form.value);
    await fetchCategories();
    showDialog.value = false;
    form.value = { name: '', description: '' };
    $q.notify({
      color: 'positive',
      message: 'Categoria criada com sucesso'
    });
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: 'Erro ao criar categoria'
    });
  }
};

const confirmDelete = (category: Category) => {
  $q.dialog({
    title: 'Confirmar exclusão',
    message: `Deseja realmente excluir a categoria "${category.name}"?`,
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await api.delete(`/categories/${category.id}`);
      await fetchCategories();
      $q.notify({
        color: 'positive',
        message: 'Categoria excluída com sucesso'
      });
    } catch (error: any) {
      $q.notify({
        color: 'negative',
        message: error.response?.data?.message || 'Erro ao excluir categoria'
      });
    }
  });
};

onMounted(fetchCategories);
</script> 