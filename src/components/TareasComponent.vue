<template>

  <div>
    <router-link to="/Create" custom v-slot="{ navigate }">
      <!-- <v-btn @click="navigate" role="link"> + </v-btn> -->
      <v-col cols="auto">
        <v-btn icon="mdi-plus" size="small" @click="navigate" role="link">+</v-btn>
      </v-col>
    </router-link>

    <!-- //boton agragar tarea modal -->
    <div class="text-left">
      <v-dialog v-model="dialog" width="auto">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props">
            +
          </v-btn>
        </template>

        <v-card>
          <v-card-text>
            <CreateComponent></CreateComponent>
          </v-card-text>
          <v-card-actions>
            <v-btn color="sprimary" block @click="dialog = false">Close Dialog</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- //comienzo tabla -->
  </div>

  <v-table>
    <thead>
      <tr>
        <th class="text-left">Estado</th>
        <th class="text-left">Id</th>
        <th class="text-left">Titulo</th>
        <th class="text-left">Descripcion</th>
        <th class="text-left"></th>
        <th class="text-left"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="post in posts" :key="post.id">
        <td>
          <label><input type="checkbox" id="cbox1" value="first_checkbox" />{{
            post.status
          }} </label><br />
        </td>
        <td>{{ post.id }}</td>
        <td>{{ post.title }}</td>
        <td>{{ post.description }}</td>
        <!-- <td><v-checkbox>{{ post.status }}</v-checkbox></td> -->
        

        <td>
          <!-- <v-btn><svg-icon type="mdi" :path="pencil"></svg-icon></v-btn> -->

          <div>
            <router-link :to="'/modify/' + post.id" custom v-slot="{ navigate }">
              <v-icon @click="navigate" role="link"> <svg-icon type="mdi" :path="pencil"></svg-icon> </v-icon>

            </router-link>
</div>

        </td>
        <td>
          <form v-on:submit.prevent="deleteTasks(post.id)">
            <button type="submit">
              <v-icon icon="mdi-vuetify"> </v-icon>
              <svg-icon type="mdi" :path="path"></svg-icon>
            </button>
          </form>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import axios from "axios";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiTrashCan } from "@mdi/js";
import { mdiPencil } from "@mdi/js";
import CreateComponent from './CreateComponent.vue';
// import ModifyComponent from './ModifyComponent.vue';
const url = "http://localhost:8000/api";
// const urlId = "http://localhost:8000/api/tareas/{id}";

export default {
  name: "TareasComponent,my-component",

  data() {
    return {
      posts: [],
      loading: true,
      path: mdiTrashCan,
      pencil: mdiPencil,
      dialog: false,
      selectedPostId: null
      
    };
  },
  mounted() {
    this.getTasks();
    this.$forceUpdate();
    // this.createTask();
  },
  components: {
    SvgIcon,
    CreateComponent,
    // ModifyComponent
  },

  methods: {
    getTasks() {
      try {
        axios.get(url + "/tareas/").then((response) => {
          this.posts = response.data.data;
          this.loading = false;

          // window.location.reload()
        });
      } catch (error) {
        console.log();
      }
    },

    deleteTasks(id) {
      axios
        .delete(url + "/tareas/" + id)
        .then((response) => {
          console.log(response);
          this.getTasks();

          // this.posts = response.data.data;
          // this.loading = false;
        })
        .catch((error) => {
          console.log(error.respnse);
        });
    },
    created() {
      this.getTasks();
    },
    openDialog(postId) {
    this.selectedPostId = postId;
    this.dialog = true;
  },
  closeDialog() {
    this.dialog = false;
    this.selectedPostId = null;
  }
  },
};

</script>

<style scoped lang="scss"></style>
