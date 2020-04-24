<template>
  <section>
    <div class="login">
      <div class="login-form">
        <img
          src="../../assets/monster-login.png"
          alt=""
          class="monster-img"
        />
        <div class="form-content">
          <h1 class="head-title">Ingresar</h1>
          <div class="inputs">
            <b-field>
              <b-input placeholder="Correo Electrónico" size="is-medium" icon="email">
              </b-input>
            </b-field>

            <b-field>
              <b-input type="password" placeholder="Contraseña" size="is-medium" icon="key" password-reveal>
              </b-input>
            </b-field>
          </div>
          <b-button
            type="is-primary"
            icon-right="arrow-right-thick"
            rounded
            size="is-medium"
            class="btn-header-register"
            expanded
            >Regístrate</b-button
          >
          <div class="with-account">
            <p>¿No tienes cuenta?</p>
            <a href="/registrate">Regístrate</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>

<style>
.login {
  padding-top: 100px;
  width: 100%;
}
.login-form {
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

.form-content .inputs{
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

.with-account{
  display: flex;
  justify-content: center;
  padding: 10px 0;
}

.with-account p {
  color: #604B87;
  
}

.with-account a{
  color:#604B87;
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
