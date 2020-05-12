<template>
  <section class="dashboard">
    <Navbar></Navbar>
    <div class="principal-content">
      <img class="monster-dash-1" src="@/assets/monster-dash-1.png" alt="" />
      <img class="monster-dash-2" src="@/assets/monster-dash-2.png" alt="" />
      <h1 class="dashboard-title">
        Taxky - Dashboard
      </h1>
      <div
        v-if="characters.length > 0"
        class="columns is-multiline is-variable  content-cards-character"
      >
        <CardCharacter
          class="column is-11-mobile is-two-fifths-tablet is-one-quarter-desktop is-one-quarter-widescreen is-one-quarter-fullhd"
          v-for="item in characters"
          v-bind:key="item.ID"
          v-bind:dataCharacter="item"
        ></CardCharacter>
      </div>
      <div
        v-if="characters.length === 0"
        class="columns is-desktop content-cards-character"
      >
        <CardCharacter
          class="column"
          v-for="item in defaultUsers"
          v-bind:key="item.ID"
          v-bind:dataCharacter="item"
        ></CardCharacter>
      </div>
      <div v-if="characters.length === 0" class="no-characters">
        <h2>Aun no haz registrado participantes. ¿Que esperas?</h2>
        <b-button
          type="is-primary"
          size="is-medium"
          icon-right="account-plus"
          class="add-no-character"
          @click="$router.push({ name: 'Characters' })"
          >Registrar Participante</b-button
        >
      </div>
      <div class="menu columns">
        <div
          class="column card-menu character"
          @click="$router.push({ name: 'Characters' })"
        >
          <img src="@/assets/dash-menu-img-1.png" alt="" />
          <h3>Participantes</h3>
        </div>
        <div
          class="column card-menu activities"
          @click="$router.push({ name: 'Tasks' })"
        >
          <img src="@/assets/dash-menu-img-2.png" alt="" />
          <h3>Actividades</h3>
        </div>
        <div
          class="column card-menu awards"
          @click="$router.push({ name: 'Awards' })"
        >
          <img src="@/assets/dash-menu-img-3.png" alt="" />
          <h3>Premios</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Navbar from "@/components/dashboard/Navbar";
import CardCharacter from "@/components/dashboard/CardCharacter";
import UserRepository from "@/repository/users";

export default {
  components: {
    Navbar,
    CardCharacter,
  },
  data: () => ({
    defaultUsers: [
      {
        ID: 1,
        NickName: "Daniel",
        Points: 150,
        Tasks: 10,
      },
      {
        ID: 2,
        NickName: "Maria",
        Points: 120,
        Tasks: 14,
      },
      {
        ID: 3,
        NickName: "Paquito",
        Points: 190,
        Tasks: 8,
      },
    ],
    characters: [],
  }),
  mounted() {
    this.getCharacters();
  },
  methods: {
    getCharacters() {
      let userParse = JSON.parse(localStorage.user_data);
      let id = userParse.ID;
      UserRepository.show(id).then((data) => {
        console.log(data);
        this.characters = data.results.Characters;
      });
    },
  },
};
</script>

<style>
.activities {
  background: #7063d8;
}

.add-no-character {
  margin-top: 20px;
}

.awards {
  background: #f76a92;
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

.content-cards-character {
  padding: 70px 0;
  justify-content: space-between;
}

.menu {
  padding: 60px 0;
}

.monster-dash-1 {
  position: absolute;
  max-width: 300px;
  min-width: 180px;
  right: 20px;
  top: -50px;
  width: 25%;
  z-index: 0;
}

.monster-dash-2 {
  position: absolute;
  max-width: 300px;
  min-width: 200px;
  right: -90px;
  bottom: 20px;
  width: 25%;
  z-index: 0;
}

.no-characters {
  margin-top: -50px;
  text-align: center;
  z-index: 10;
}

.no-characters h2 {
  color: white;
  font-family: "Paytone One", sans-serif;
  font-size: 25px;
  margin: 0;
  padding: 0;
  line-height: 30px;
  text-shadow: 0px 6px 2px rgba(247, 174, 70, 0.9);
  z-index: 10;
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
