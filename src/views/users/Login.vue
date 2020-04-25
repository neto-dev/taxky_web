<template>
  <section>
    <div class="login">
      <div class="login-form">
        <img src="../../assets/monster-login.png" alt="" class="monster-img" />
        <div class="form-content">
          <ValidationObserver ref="observer" v-slot="{ passes }">
            <h1 class="head-title">Ingresa</h1>
            <div class="inputs">
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
              >Ingresa</b-button
            >
            <div class="with-account">
              <p>¿No tienes cuenta?</p>
              <a href="/registrate">Regístrate</a>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// @ is an alias to /src
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
      let email = this.Email;
      let password = this.Password;
      this.$store
        .dispatch("login", { email, password })
        .then(data => {
          console.log(data)
          this.$router.push('dashboard');
        })
        .catch(err => {
          console.log("Error: ", err);
          this.$buefy.toast.open({
            duration: 5000,
            message: `Nombre de usuario o contraseña incorrectos.`,
            position: "is-bottom",
            type: "is-danger",
          });
        });
    },
  },
};
</script>

<style>
.login {
  padding-top: 130px;
  width: 100%;
}
.login-form {
  background: #ffd354;
  border-radius: 20px;
  margin: 0 auto;
  max-width: 800px;
  padding-bottom: 120px;
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
  bottom: 10px;
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
  .login-form {
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
