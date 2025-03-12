<template>
  <div class="q-pa-md">
    <div class="row q-mb-md">
      <div class="col">
        <h5 class="q-mt-none q-mb-md">Movimentações</h5>
      </div>
      <div class="col-auto">
        <q-btn color="primary" label="Nova Movimentação" @click="showDialog = true" />
      </div>
    </div>

    <q-table
      :rows="transactions"
      :columns="columns"
      row-key="id"
      :loading="loading"
    >
      <template v-slot:body-cell-type="props">
        <q-td :props="props">
          <q-chip
            :color="props.value === 'entrada' ? 'positive' : 'negative'"
            text-color="white"
          >
            {{ props.value === 'entrada' ? 'Entrada' : 'Saída' }}
          </q-chip>
        </q-td>
      </template>

      <template v-slot:body-cell-amount="props">
        <q-td :props="props">
          R$ {{ props.value.toFixed(2) }}
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            color="primary"
            icon="edit"
            @click="editTransaction(props.row)"
          >
            <q-tooltip>Editar</q-tooltip>
          </q-btn>
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

    <!-- Dialog para criar/editar movimentação -->
    <q-dialog v-model="showDialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">{{ editMode ? 'Editar' : 'Nova' }} Movimentação</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-select
                  v-model="form.type"
                  :options="[
                    { label: 'Entrada', value: 'entrada' },
                    { label: 'Saída', value: 'saida' }
                  ]"
                  label="Tipo"
                  emit-value
                  map-options
                  :rules="[val => !!val || 'Tipo é obrigatório']"
                />
              </div>

              <div class="col-12">
                <q-input
                  v-model.number="form.amount"
                  label="Valor"
                  type="number"
                  step="0.01"
                  prefix="R$"
                  :rules="[
                    val => !!val || 'Valor é obrigatório',
                    val => val > 0 || 'Valor deve ser maior que zero'
                  ]"
                />
              </div>

              <div class="col-12">
                <q-select
                  v-model="form.category_id"
                  :options="categoryOptions"
                  label="Categoria"
                  emit-value
                  map-options
                  :rules="[val => !!val || 'Categoria é obrigatória']"
                />
              </div>

              <div class="col-12">
                <q-input
                  v-model="form.description"
                  label="Descrição"
                  :rules="[val => !!val || 'Descrição é obrigatória']"
                />
              </div>
            </div>
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
import { ref, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import api from '@/services/api';
import type { Transaction, Category } from '@/types';

const $q = useQuasar();
const transactions = ref<Transaction[]>([]);
const categories = ref<Category[]>([]);
const loading = ref(false);
const showDialog = ref(false);
const editMode = ref(false);

const form = ref({
  id: null as number | null,
  type: '',
  amount: 0,
  category_id: null as number | null,
  description: ''
});

const columns = [
  { 
    name: 'created_at',
    label: 'Data',
    field: 'created_at',
    format: (val: string) => new Date(val).toLocaleDateString(),
    sortable: true
  },
  { name: 'type', label: 'Tipo', field: 'type' },
  { name: 'amount', label: 'Valor', field: 'amount', sortable: true },
  { 
    name: 'category',
    label: 'Categoria',
    field: (row: Transaction) => row.category?.name
  },
  { name: 'description', label: 'Descrição', field: 'description' },
  { name: 'actions', label: 'Ações', field: 'actions' }
];

const categoryOptions = computed(() => 
  categories.value.map(category => ({
    label: category.name,
    value: category.id
  }))
);

const fetchTransactions = async () => {
  loading.value = true;
  try {
    const response = await api.get<Transaction[]>('/transactions');
    transactions.value = response.data;
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: 'Erro ao carregar movimentações'
    });
  } finally {
    loading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const response = await api.get<Category[]>('/categories');
    categories.value = response.data;
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: 'Erro ao carregar categorias'
    });
  }
};

const resetForm = () => {
  form.value = {
    id: null,
    type: '',
    amount: 0,
    category_id: null,
    description: ''
  };
  editMode.value = false;
};

const editTransaction = (transaction: Transaction) => {
  form.value = {
    id: transaction.id,
    type: transaction.type,
    amount: transaction.amount,
    category_id: transaction.category_id,
    description: transaction.description
  };
  editMode.value = true;
  showDialog.value = true;
};

const onSubmit = async () => {
  try {
    if (editMode.value) {
      await api.put(`/transactions/${form.value.id}`, form.value);
    } else {
      await api.post('/transactions', form.value);
    }
    await fetchTransactions();
    showDialog.value = false;
    resetForm();
    $q.notify({
      color: 'positive',
      message: `Movimentação ${editMode.value ? 'atualizada' : 'criada'} com sucesso`
    });
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: `Erro ao ${editMode.value ? 'atualizar' : 'criar'} movimentação`
    });
  }
};

const confirmDelete = (transaction: Transaction) => {
  $q.dialog({
    title: 'Confirmar exclusão',
    message: 'Deseja realmente excluir esta movimentação?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await api.delete(`/transactions/${transaction.id}`);
      await fetchTransactions();
      $q.notify({
        color: 'positive',
        message: 'Movimentação excluída com sucesso'
      });
    } catch (error) {
      $q.notify({
        color: 'negative',
        message: 'Erro ao excluir movimentação'
      });
    }
  });
};

onMounted(() => {
  fetchCategories();
  fetchTransactions();
});
</script> 