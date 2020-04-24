<template>
  <div class="home">
    <header>
      <b-navbar class="head-navbar">
        <template slot="end">
          <b-navbar-item tag="div">
            <div class="buttons">
              <a class="button btn-nav-log-in" target="_blank" href="https://twitter.com/neto_dev">
                <i class="mdi mdi-twitter"></i>
              </a>
              <a class="button btn-nav-register is-rounded">
                <strong>Registrate</strong>
              </a>
              <a class="button btn-nav-log-in">
                Iniciar Sesión
              </a>
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
      <div class="head-background">
        <div class="head-titles">
          <h1 class="head-title">Una Nueva Manera De Aprender</h1>
          <h3 class="head-description">
            Con Taxky tus hijos pueden aprende el significado de la
            responsabilidad, todo esto mediante tareas diarias con puntuación,
            estas tareas le darán puntos los cuales podrá intercambiar por lo
            que ellos deseen.
          </h3>
          <b-button
            type="is-primary"
            icon-right="arrow-right-thick"
            rounded
            size="is-medium"
            class="btn-header-register"
            expanded
            >Regístrate</b-button
          >
        </div>
        <img
          src="../assets/monsters-header.png"
          alt=""
          class="monster-header"
        />
        <img
          src="../assets/one-monster.png"
          alt=""
          class="one-monster-header"
        />
      </div>
    </header>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>

<style>
.btn-header-register {
  margin-top: 20px;
  font-weight: bold;
}
.btn-nav-log-in {
  color: #604b87;
  background-color: transparent;
  border: none;
  font-weight: bold;
}
.btn-nav-log-in:hover {
  color: #795cbf;
}
.btn-nav-log-in:active {
  color: #795cbf;
}
.btn-nav-register {
  background-color: #60d0e9;
  color: white;
  border: none;
}
.btn-nav-register:hover {
  background-color: #49cde2;
  color: white;
  border: none;
}
.btn-nav-register:active {
  background-color: #49cde2;
  color: white;
  border: none;
}
header {
  padding-top: 20px;
  width: 100%;
}
.head-background {
  background: #ffd354;
  border-radius: 20px;
  margin: 0 auto;
  max-width: 1050px;
  padding-bottom: 110px;
  position: relative;
  width: 95%;
}
.head-description {
  color: #604b87;
  font-weight: bold;
  margin-top: 30px;
}
.head-navbar {
  background-color: transparent;
  margin: 0 auto;
  max-width: 1050px;
  width: 95%;
}
.head-titles {
  position: relative;
  top: 50px;
  left: 30px;
  z-index: 1000;
  width: 400px;
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
.monster-header {
  bottom: 40px;
  position: absolute;
  right: 30px;
  width: 55%;
}
.navbar-menu {
  background-color: transparent;
  box-shadow: none;
}
.one-monster-header {
  bottom: 80px;
  position: absolute;
  right: 20px;
  width: 45%;
  display: none;
}

@media (max-width: 1000px) {
  .monster-header {
    display: none;
  }
  .one-monster-header {
    display: block;
  }
}
@media (max-width: 750px) {
  .head-background {
    padding-bottom: 0px;
  }
  .head-title {
    font-size: 51px;
    line-height: 55px;
  }
  .head-titles {
    position: relative;
    padding: 50px;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
  }
  .monster-header {
    display: none;
  }
  .one-monster-header {
    display: none;
  }
}
</style>
