<template>
  <h3>create task</h3>


  <form method="POST" v-on:submit.prevent="saveTask()">
    <div>
      <input type="text" v-model="task" placeholder="Nueva tarea" name="todo">
      <input type="text" v-model="description" placeholder="descripcion" name="todo">
      <input type="submit" value="Agregar" color="success" />
    </div>
  </form>

  <!-- <v-table>
    <thead>
      <tr>
        <th class="text-left">Id</th>
        <th class="text-left">Titulo</th>
        <th class="text-left">Descripcion</th>
        <th class="text-left">Estado</th>
        <th class="text-left"></th>
        <th class="text-left"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="post in posts" :key="post.id">
        <td>{{ post.id }}</td>
        <td>{{ post.title }}</td>
        <td>{{ post.description }}</td>
        
        <td>
          <label><input type="checkbox" id="cbox1" value="first_checkbox" />{{
            post.status
          }} </label><br />
        </td>

        <td>
          

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
  </v-table> -->
</template>

  
<script>
//   import SvgIcon from '@jamescoyle/vue-icon';
//   import { mdiAccount } from '@mdi/js';
// import SvgIcon from '@jamescoyle/vue-icon';
import { mdiTrashCan } from '@mdi/js';
import { mdiPencil } from '@mdi/js';
const url = "http://localhost:8000/api";
import axios from "axios";


export default {

  name: "my-cool-component",

  components: {
    // SvgIcon
  },

  data() {
    return {
      task: '',
      posts: [],
      loading: true,
      path: mdiTrashCan,
      pencil: mdiPencil,
      // path: mdiAccount,
    }
  },
  mounted() {
    this.getTasks();
    // this.createTask();
  },
  methods: {
    saveTask() {
      //recarga buena de la pagina
      axios.post(url+"/tareas/", { title: this.task, description: this.description })
        .then(response => {
          console.log(response),
            this.getTasks();
          this.$router.push('/')
        })
        .catch(error => { console.log(error.response) })
      this.task = ''
    },
    getTasks() {
      try {
        axios.get(url+"/tareas/").then((response) => {
          this.posts = response.data.data;
          this.loading = false;
          // window.location.reload()
        })
      }
      catch (error) {
        console.log()
      }
    },
    deleteTasks(id) {
      axios.delete(url+"/tareas/" + id)
        .then(response => {
          console.log(response)
          this.getTasks();

          // this.posts = response.data.data;
          // this.loading = false;
        }).catch(error => { console.log(error.respnse) });
    },
    created() {
      this.getTasks();
    }
  }
}
</script>