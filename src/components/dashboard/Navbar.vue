<template>
  <b-navbar class="head-navbar">
    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a
            class="button btn-nav-log-in"
            target="_blank"
            href="https://twitter.com/neto_dev"
          >
            <i class="mdi mdi-twitter"></i>
          </a>
          <a class="button btn-nav-register is-rounded" @click="logout">
            <strong>Cerrar Sesión</strong>
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({}),
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/ingresa");
      });
    },
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
  },
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
.head-navbar {
  background-color: transparent;
  margin: 0 auto;
  max-width: 1150px;
  width: 90%;
}
.navbar-menu {
  background-color: transparent;
  box-shadow: none;
}
</style>
