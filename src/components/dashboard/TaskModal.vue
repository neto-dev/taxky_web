<template>
  <b-modal
    :active.sync="active"
    :width="800"
    scroll="keep"
    :on-cancel="cancelCallback"
  >
    <div
      class="columns is-11-mobile is-two-fifths-tablet is-one-quarter-desktop is-one-quarter-widescreen is-one-quarter-fullhd"
    >
      <div
        class="card"
        v-bind:v-if="Tasks.length !== 0"
        v-bind:v-for="task in Tasks"
      >
        <div class="card-content">
          <div class="content content-task">
            <div class="points-container">
              <h1 class="title-task">{{ task.Points }}</h1>
              <span>Puntos</span>
            </div>
            <p class="name-task">{{ task.Name }}</p>
            <p class="description-task">
              {{ task.Description }}
            </p>
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">Agregar</a>
        </footer>
      </div>
    </div>
  </b-modal>
</template>

<script>
import UserRepository from "@/repository/users";
export default {
  name: "TaskModal",
  props: {
    active: Boolean,
  },
  data: () => ({
    Tasks: [],
  }),
  mounted() {
    this.getTasks();
  },
  methods: {
    cancelCallback() {
      this.$emit("desactiveTaskModal", false);
    },
    getTasks() {
      this.loading = true;
      let userParse = JSON.parse(localStorage.user_data);
      this.userID = userParse.ID;
      let id = userParse.ID;
      UserRepository.show(id).then((data) => {
        this.Tasks = data.results.Tasks;
        this.loading = false;
      });
    },
  },
};
</script>

<style>
.card {
  margin: 20px;
}
.content-task {
  text-align: center;
}

.name-task {
  font-weight: bold;
}

.points-container h1 {
  font-size: 80px;
  margin: 0;
  color: #ff6568;
  line-height: 60px;
}

.points-container span {
  font-size: 12px;
  color: #ff6568;
}
</style>
