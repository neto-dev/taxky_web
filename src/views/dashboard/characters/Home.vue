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
        :data="Characters"
        :loading="loading"
        paginated
        :per-page="perPage"
        aria-next-label="Sig"
        aria-previous-label="Prev"
        aria-page-label="Pagina"
        aria-current-label="Pagina Actual"
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
                :icon="
                  props.row.Sex === 'Mujer' ? 'heart-circle' : 'star-circle'
                "
              >
              </b-icon>
              {{ props.row.Sex === "Mujer" ? "M" : "H" }}
            </span>
          </b-table-column>
          <b-table-column centered label="Editar">
            <b-button
              type="is-info"
              outlined
              icon-left="account-edit"
              @click="editItem(props.row)"
            >
            </b-button>
          </b-table-column>
          <b-table-column centered label="Eliminar">
            <b-button
              type="is-danger"
              outlined
              icon-left="delete-outline"
              @click="remove(props.row)"
            >
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
                  v-model="workingItem.Name"
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
                  v-model="workingItem.NickName"
                  placeholder="Sobrenombre"
                  size="is-medium"
                  icon="account"
                >
                </b-input>
              </b-field>
            </ValidationProvider>
            <b-field label="Sexo">
              <b-switch
                v-model="workingItem.Sex"
                true-value="Hombre"
                false-value="Mujer"
              >
                {{ workingItem.Sex }}
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
import CharacterRepository from "@/repository/characters";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    Navbar,
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    // Variable encargada de activar o desactivar nuestro modal con el cual registramos/editamos información
    isComponentModalActive: false,
    // Variable que almacena la información de nuestra tabla
    Characters: [],
    // Variable que nos mostrara un gif de cargando miesntras se carga la información de nuestra tabla
    loading: false,
    // Numero de registros por pagina/paginación
    perPage: 5,

    // Variable para almacenar el valor del id de nuestro usuario logeado !Lo utilizaomos para referenciar información
    userID: null,

    // Variable donde guardaremos el indice del elemento a editar
    editedIndex: null,

    // Objeto en el que almacenamos información temporal para enviar a la api rest editar/crear
    workingItem: {
      Name: "",
      NickName: "",
      Sex: "Hombre",
      UserID: null,
    },
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
      this.loading = true;
      let userParse = JSON.parse(localStorage.user_data);
      this.userID = userParse.ID;
      let id = userParse.ID;
      UserRepository.show(id).then((data) => {
        this.Characters = data.results.Characters;
        this.loading = false;
      });
    },
    editItem(item) {
      this.editedIndex = this.Characters.indexOf(item);
      this.workingItem = Object.assign({}, item);
      this.isComponentModalActive = true;
    },
    remove(item) {
      this.$buefy.dialog.confirm({
        title: "Eliminar Personaje",
        message: `¿Estas seguro que deseas <b>Eliminar</b> el personaje <b>${item.NickName}</b>? Esta acción no se puede deshacer.`,
        confirmText: "Eliminar Personaje",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => this.removeItem(item),
      });
    },
    removeItem(item) {
      let index = this.Characters.indexOf(item);
      CharacterRepository.delete(item.ID).then(() => {
        this.Characters.splice(index, 1);
        this.$buefy.toast.open({
          message: "¡Personaje Eliminado!",
          type: "is-success",
          position: "is-bottom",
        });
      });
    },
    submit() {
      if (this.editedIndex === null) {
        this.workingItem.userID = this.userID;
        CharacterRepository.create(this.workingItem)
          .then((res) => {
            this.$buefy.toast.open({
              message: "Personaje creado Corractamente!",
              type: "is-success",
            });
            this.isComponentModalActive = false;
            this.workingItem.Name = this.workingItem.NickName = "";
            this.Characters.unshift(res.results);
          })
          .catch((err) => {
            console.log(err);
            this.$buefy.toast.open({
              message: "Ocurrio un error, vuelve a interntarlo.",
              type: "is-danger",
            });
          });
      } else {
        CharacterRepository.update(this.workingItem, this.workingItem.ID)
          .then((res) => {
            this.$buefy.toast.open({
              message: "Personaje editado Corractamente!",
              type: "is-success",
            });
            this.isComponentModalActive = false;
            this.workingItem.Name = this.workingItem.NickName = "";
            this.editedIndex = null;
            this.Characters.splice(this.editedIndex, 1, res.results);
          })
          .catch((err) => {
            console.log(err);
            this.$buefy.toast.open({
              message: "Ocurrio un error, vuelve a interntarlo.",
              type: "is-danger",
            });
          });
      }
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
