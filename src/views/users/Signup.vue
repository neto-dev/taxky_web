<template>
  <section>
    <div class="signup">
      <div class="signup-form">
        <img
          src="../../assets/monster-sign-up.png"
          alt=""
          class="monster-img"
        />
        <div class="form-content">
          <ValidationObserver ref="observer" v-slot="{ passes }">
            <h1 class="head-title">Regístrate</h1>
            <div class="inputs">
              <ValidationProvider
                rules="required"
                name="FirstName"
                v-slot="{ errors, valid }"
              >
                <b-field
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input
                    v-model="FirstName"
                    placeholder="Nombre"
                    size="is-medium"
                    icon="account"
                  >
                  </b-input>
                </b-field>
              </ValidationProvider>
              <ValidationProvider
                rules="required"
                name="LastName"
                v-slot="{ errors, valid }"
              >
                <b-field
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input
                    v-model="LastName"
                    placeholder="Apellidos"
                    size="is-medium"
                    icon="account"
                  >
                  </b-input>
                </b-field>
              </ValidationProvider>
              <ValidationProvider
                rules="required|email"
                name="Email"
                v-slot="{ errors, valid }"
              >
                <b-field
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input
                    placeholder="Email"
                    v-model="Email"
                    type="email"
                    icon="email"
                    icon-right="close-circle"
                    icon-right-clickable
                    size="is-medium"
                    @icon-right-click="clearIconClick"
                  >
                  </b-input>
                </b-field>
              </ValidationProvider>
              <ValidationProvider
                rules="required"
                vid="password"
                name="Password"
                v-slot="{ errors, valid }"
              >
                <b-field
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input
                    v-model="Password"
                    type="password"
                    placeholder="Contraseña"
                    size="is-medium"
                    icon="key"
                    password-reveal
                  >
                  </b-input>
                </b-field>
              </ValidationProvider>
            </div>
            <b-button
              type="is-primary"
              icon-right="arrow-right-thick"
              rounded
              size="is-medium"
              class="btn-header-register"
              expanded
              @click="passes(submit)"
              >Regístrate</b-button
            >
            <div class="with-account">
              <p>¿Ya tienes cuenta?</p>
              <a href="/ingresa">Ingresa</a>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// @ is an alias to /src
// Importamos el repositorio de usuario
import UserRepository from "@/repository/users";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  $_veeValidate: {
    validator: "new",
  },
  name: "Home",
  data: () => ({
    // Variales para almacenar informacion de los inputs de nuestro formulario de registro
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",

    //Variable para validar si ha surgido un error con el email
    error_email: false,
  }),
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  methods: {
    submit() {
      UserRepository.filter({ Where: `email = '${this.Email}'` })
        .then((data) => {
          console.log("Data", data)
          if (data.results.length == 0) {
            let data = {
              FirstName: this.FirstName,
              LastName: this.LastNamme,
              Email: this.Email,
              Password: this.Password,
            };
            this.$store
            .dispatch("register", data)
            .then(data => {
              console.log(data)
              this.$router.push('dashboard');
            })
            .catch(err => {
              this.error_email = true;
              console.log(err);
            });
          } else {
            this.$buefy.toast.open({
              duration: 5000,
              message: `El Correo Electronico ingresado ya se encuentra registrado, intenta con otro.`,
              position: "is-bottom",
              type: "is-danger",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$buefy.toast.open({
            duration: 5000,
            message: `El Correo Electronico ingresado ya se encuentra registrado, intenta con otro.`,
            position: "is-bottom",
            type: "is-danger",
          });
        });
    },
  },
};
</script>

<style>
.signup {
  padding-top: 80px;
  width: 100%;
}
.signup-form {
  background: #ffd354;
  border-radius: 20px;
  margin: 0 auto;
  max-width: 800px;
  padding-bottom: 110px;
  position: relative;
  overflow: hidden;
  width: 95%;
}
.head-description {
  color: #604b87;
  font-weight: bold;
  margin-top: 30px;
}

.form-content {
  position: relative;
  top: 50px;
  right: 30px;
  z-index: 1000;
  float: right;
  width: 400px;
}

.form-content .inputs {
  padding: 50px 0 10px 0;
}

.head-title {
  color: white;
  font-family: "Paytone One", sans-serif;
  font-size: 70px;
  margin: 0;
  padding: 0;
  line-height: 65px;
  text-shadow: 0px 8px 2px rgba(247, 174, 70, 0.9);
}

.monster-img {
  bottom: 40px;
  position: absolute;
  left: -90px;
  width: 50%;
}

.with-account {
  display: flex;
  justify-content: center;
  padding: 10px 0;
}

.with-account p {
  color: #604b87;
}

.with-account a {
  color: #604b87;
  font-weight: bold;
  margin-left: 5px;
}

@media (max-width: 750px) {
  .signup-form {
    padding-bottom: 0px;
  }
  .head-title {
    font-size: 55px;
    line-height: 55px;
  }
  .form-content {
    position: relative;
    padding: 50px;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
  }
}
</style>
