<template>
  <div class="card">
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
</template>

<script>
export default {
  name: "TaskModal",
  props: ["task"],
};
</script>

<style>
.card {
  border-radius: 20px;
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
