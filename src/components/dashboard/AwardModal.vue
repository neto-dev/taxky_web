<template>
  <div class="card">
    <div class="card-content">
      <div class="content content-award">
        <div class="points-container">
          <h1 class="title-award">{{ award.Points }}</h1>
          <span>Puntos</span>
        </div>
        <p class="name-award">{{ award.Name }}</p>
        <p class="description-award">
          {{ award.Description }}
        </p>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Canjear</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: "AwardModal",
  props: ["award"],
};
</script>

<style>
.card {
  border-radius: 20px;
  margin: 20px;
}
.content-award {
  text-align: center;
}

.name-award {
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
