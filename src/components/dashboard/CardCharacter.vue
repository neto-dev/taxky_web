<template class="template-card">
  <div class="content-cards">
    <div class="card-character">
      <img
        :src="avatarImage(dataCharacter.NickName)"
        class="avatar-img"
        alt=""
      />
      <h1 class="character-name">{{ dataCharacter.NickName }}</h1>
      <div class="divider div-transparent div-arrow-down"></div>
      <div class="pints-tasks columns">
        <div class="points column">
          <h2 class="section-title">Puntos</h2>
          <h3 class="highlighted-title">{{ dataCharacter.Points }}</h3>
          <p class="light-text">Totales</p>
        </div>
        <div class="tasks column">
          <h2 class="section-title">Tareas</h2>
          <h3 class="highlighted-title">{{ dataCharacter.Tasks }}</h3>
          <p class="light-text">Totales</p>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-tooltip label="Registrar Actividad">
            <b-button
              class="btn-action-task"
              icon-right="plus"
              size="is-large"
              @click="activeTaskModal"
            />
          </b-tooltip>
        </div>
        <div class="column">
          <b-tooltip label="Cambiar Puntos">
            <b-button
              class="btn-action-points"
              icon-right="cart-plus"
              size="is-large"
            />
          </b-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardCharacter",
  props: ["dataCharacter"],
  data: () => ({}),
  methods: {
    avatarImage(name) {
      return `https://api.adorable.io/avatars/130/${name}`;
    },
    activeTaskModal() {
      this.$emit("activeTaskModal", true);
    },
  },
};
</script>

<style>
.avatar-img {
  border-radius: 50%;
  border: 8px solid white;
  left: -30px;
  position: absolute;
  top: -40px;
  width: 90px;
}

.btn-action-points,
.btn-action-points:active,
.btn-action-points:hover,
.btn-action-points:enabled {
  background: #f33d47;
  color: white;
}

.btn-action-task,
.btn-action-task:active,
.btn-action-task:hover,
.btn-action-task:enabled {
  background: #7063d8;
  color: white;
}

.character-name {
  color: #604b87;
  font-family: "Paytone One", sans-serif;
  font-size: 30px;
  margin: 0;
  padding: 0;
  line-height: 35px;
  text-shadow: 0px 3px 2px rgba(94, 67, 158, 0.4);
}

.content-cards {
  background: white;
  border-radius: 20px;
  margin: 30px 30px 30px 30px;
  position: relative;
  text-align: center;
  z-index: 10;
}

.divider {
  position: relative;
  margin: 25px 0px;
  height: 1px;
}

.div-transparent:before {
  content: "";
  position: absolute;
  top: 0;
  left: 5%;
  right: 5%;
  width: 90%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    transparent,
    rgba(94, 67, 158, 0.4),
    transparent
  );
}

.div-arrow-down:after {
  content: "";
  position: absolute;
  z-index: 1;
  top: -7px;
  left: calc(50% - 7px);
  width: 14px;
  height: 14px;
  transform: rotate(45deg);
  background-color: white;
  border-bottom: 1px solid rgba(94, 67, 158, 0.6);
  border-right: 1px solid rgba(94, 67, 158, 0.6);
}

.highlighted-title {
  color: #ff6568;
  font-family: "Paytone One", sans-serif;
  font-size: 30px;
  margin: 0;
  padding: 0;
  line-height: 35px;
  /* text-shadow: 0px 3px 2px rgba(94, 67, 158, 0.4); */
}

.light-text {
  font-size: 12px;
}

.section-title {
  font-weight: bold;
}

.wrapper {
  padding-bottom: 90px;
}

@media (max-width: 1000px) {
  .content-cards {
    margin: 75px 30px 10px 30px !important;
  }
}
</style>
