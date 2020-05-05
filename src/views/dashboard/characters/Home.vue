<template>
  <section class="dashboard">
    <Navbar></Navbar>
    <div class="principal-content">
      <h1 class="dashboard-title">
        Taxky - Personajes
      </h1>
      <b-table
        style="margin-top: 50px"
        empty
        :data="characters"
        :loading="loading"
        paginated
        backend-pagination
        :total="total"
        :per-page="perPage"
        @page-change="onPageChange"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        backend-sorting
        :default-sort-direction="defaultSortOrder"
        :default-sort="[sortField, sortOrder]"
        @sort="onSort"
      >
        <template slot-scope="props">
          <b-table-column field="Name" label="Nombre" sortable>
            {{ props.row.Name }}
          </b-table-column>
          <b-table-column field="Points" label="Puntos" sortable>
            <span class="tag is-success">
              {{ props.row.Points }}
            </span>
          </b-table-column>
          <b-table-column label="Sexo">
            <span>
              <b-icon
                size="is-small"
                :icon="props.row.Sex === 1 ? 'heart-circle' : 'star-circle'"
              >
              </b-icon>
              {{ props.row.Sex === 1 ? "M" : "H" }}
            </span>
          </b-table-column>
          <b-table-column centered label="Editar">
            <b-button type="is-info" outlined icon-left="account-edit">
            </b-button>
          </b-table-column>
          <b-table-column centered label="Eliminar">
            <b-button type="is-danger" outlined icon-left="delete-outline">
            </b-button>
          </b-table-column>
        </template>
        <template slot="footer" v-if="!isCustom">
          <div class="has-text-right">
            <b-button
              type="is-primary"
              outlined
              icon-left="plus"
              @click="isComponentModalActive = true"
            >
              Registrar nuevo
            </b-button>
          </div>
        </template>
        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon icon="emoticon-sad" size="is-large"> </b-icon>
              </p>
              <p>Aún no se registran personajes a tu perfil.</p>
              <b-button
                type="is-primary"
                outlined
                icon-left="plus"
                @click="isComponentModalActive = true"
              >
                Registrar nuevo
              </b-button>
            </div>
          </section>
        </template>
      </b-table>
    </div>
    <b-modal
      :active.sync="isComponentModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <div class="modal-card" style="width: auto">
        <ValidationObserver
          class="modal-card-body"
          ref="observer"
          v-slot="{ passes }"
        >
          <header class="modal-card-head">
            <p class="modal-card-title">{{ formTitle }}</p>
          </header>
          <section class="modal-card-body">
            <ValidationProvider
              rules="required"
              name="Name"
              v-slot="{ errors, valid }"
            >
              <b-field
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input
                  v-model="Name"
                  placeholder="Nombre"
                  size="is-medium"
                  icon="account"
                >
                </b-input>
              </b-field>
            </ValidationProvider>
            <ValidationProvider
              rules="required"
              name="NickName"
              v-slot="{ errors, valid }"
            >
              <b-field
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input
                  v-model="NickName"
                  placeholder="Sobrenombre"
                  size="is-medium"
                  icon="account"
                >
                </b-input>
              </b-field>
            </ValidationProvider>
            <b-field label="Sexo">
              <b-switch v-model="Sex" true-value="Hombre" false-value="Mujer">
                {{ Sex }}
              </b-switch>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <button
              class="button"
              type="button"
              @click="isComponentModalActive = false"
            >
              Cerrar
            </button>
            <button @click="passes(submit)" class="button is-primary">
              Registrar
            </button>
          </footer>
        </ValidationObserver>
      </div>
    </b-modal>
  </section>
</template>

<script>
import Navbar from "@/components/dashboard/Navbar";
import UserRepository from "@/repository/users";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    Navbar,
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    isComponentModalActive: false,
    characters: [],
    total: 0,
    loading: false,
    sortField: "vote_count",
    sortOrder: "desc",
    defaultSortOrder: "desc",
    page: 1,
    perPage: 5,

    // Variable donde guardaremos el indice del elemento a editar
    editedIndex: null,
    Name: "",
    NickName: "",
    Sex: "Hombre",
  }),
  computed: {
    formTitle() {
      return this.editedIndex === null ? "Nuevo Personaje" : "Editar Personaje";
    },
  },
  mounted() {
    this.getCharacters();
  },
  methods: {
    getCharacters() {
      let userParse = JSON.parse(localStorage.user_data);
      let id = userParse.ID;
      UserRepository.show(id).then((data) => {
        this.characters = data.results.Characters;
      });
    },
  },
};
</script>

<style>
.add-no-character {
  margin-top: 20px;
}

.card-menu {
  border-radius: 20px;
  cursor: pointer;
  margin: 30px 30px 10px 30px;
  padding: 30px;
  position: relative;
  text-align: center;
  z-index: 10;
}

.card-menu h3 {
  color: white;
  font-family: "Paytone One", sans-serif;
  font-size: 25px;
  margin: 0;
  padding: 0;
  line-height: 30px;
  /* text-shadow: 0px 6px 2px rgba(247, 174, 70, 0.9); */
  z-index: 10;
}

.character {
  background: #60d0e9;
}

.dashboard {
  padding: 80px 0;
}

.dashboard-title {
  color: white;
  font-family: "Paytone One", sans-serif;
  font-size: 30px;
  margin: 0;
  padding: 0;
  line-height: 35px;
  text-shadow: 0px 6px 2px rgba(247, 174, 70, 0.9);
}

.menu {
  padding: 60px 0;
}

.principal-content {
  background: #ffd354;
  border-radius: 20px;
  margin: 0 auto;
  max-width: 1150px;
  overflow: hidden;
  padding: 50px 30px;
  position: relative;
  width: 90%;
}
</style>
