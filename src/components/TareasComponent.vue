<template>
  <v-card class="mx-auto" max-width="448">
    <v-layout>
      <v-app-bar color="yellow-accent-4" density="compact">
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
        <svg-icon type="mdi" :path="notes"></svg-icon>
        <v-app-bar-title>Lista de tareas </v-app-bar-title>

        <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>
    </v-layout>
  </v-card><br><br>


  <!-- aqui comienza la tabla -->

    <!-- formulario oculto -->
  <div>
    <div>
      <button @click="show = !show">{{ show ? 'Ocultar formulario' : 'Nueva tarea' }}</button>
      <div v-show="show">
        <form>
          <CreateComponent></CreateComponent>
          <!-- <button @click="submitForm">Enviar</button> -->
        </form>
      </div>
    </div>
 </div>



    <!-- //comienzo tabla -->
  <v-table>
    <!-- <thead>
      <tr>
        <th class="text-left">Estado</th>
        <th class="text-left">Id</th>
        <th class="text-left">Titulo</th>
        <th class="text-left">Descripcion</th>
        <th class="text-left"></th>
        <th class="text-left"></th>
      </tr>
    </thead> -->
    <tbody>
      <tr v-for="post in posts" hide-details :key="post.id" v-show="post.status === 0">
        <td>
          <v-checkbox color="blue"  method="PATCH"  :model-value="false" hide-details @change="cambiarEstado(post)" :checked="post.status === 1">{{ post.status }}</v-checkbox>
          <!-- <label><input type="checkbox" id="cbox1" value="first_checkbox" @change="cambiarEstado(post)" :checked="post.status === 1"/>{{
            post.status
          }} </label><br /> -->
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




          <div>
            <td>
              <div class="text-center">
    <v-icon @click="dialog = true" role="link" :to="post.id"> <svg-icon type="mdi" :path="pencil"></svg-icon> </v-icon>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card>
        <ModifyComponent :post="postId"></ModifyComponent>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
            </td> 
          </div>


        </td>
        <td>
          <form v-on:submit.prevent="deleteTasks(post.id)">
            <button type="submit">
              <svg-icon type="mdi" :path="path"></svg-icon>
            </button>
          </form>
        </td>
      </tr>
    </tbody>
  </v-table>


  <!-- tabla para tareas finalizadas -->


  <!-- <div>
    <button @click="finishtask = !finishtask">{{ finishtask ? '👇 Ocultar completado recientemente ' :'☝️Tareasfinalizadas ' }}</button>
    <div v-show="finishtask">

      <v-table> -->
        <!-- <thead>
            <tr>
              <th class="text-left">Estado</th>
              <th class="text-left">Id</th>
              <th class="text-left">Titulo</th>
              <th class="text-left">Descripcion</th>
              <th class="text-left"></th>
              <th class="text-left"></th>
            </tr>
          </thead> -->
        <!-- <tbody>
          <tr v-for="post in posts" :key="post.id" v-show="post.status === 1">
            <td>
              <v-checkbox color="blue" hide-details>{{ post.status }}</v-checkbox>
            </td> -->
            <!-- <td>{{ post.id }}</td> -->
            <!-- <td>{{ post.title }}</td> -->
            <!-- <td>{{ post.description }}</td> -->
            <!-- <td><v-checkbox>{{ post.status }}</v-checkbox></td> -->


            <!-- <td>
              <div>
                <router-link :to="'/modify/' + post.id" custom v-slot="{ navigate }">
                  <v-icon @click="navigate" role="link"> <svg-icon type="mdi" :path="pencil"></svg-icon> </v-icon>

                </router-link>
              </div>
            </td>

            <td>
              <form v-on:submit.prevent="deleteTasks(post.id)">
                <button type="submit">
                  <svg-icon type="mdi" :path="path"></svg-icon>
                </button>
              </form>
            </td>
          </tr>
        </tbody>
      </v-table>

    </div>
  </div> -->



  <!-- tareas finalizadas nuevas tabla -->

<!-- TODO que cambie de pasasr por metodo put modificar estado y mostrar en la tabla solo los 1 -->

  <div>
    <button @click="finishtask = !finishtask">{{ finishtask ? '👇 Ocultar completado recientemente ' :'☝️Tareasfinalizadas ' }}</button>
    <div v-show="finishtask">

      <v-table>
        <!-- <thead>
            <tr>
              <th class="text-left">Estado</th>
              <th class="text-left">Id</th>
              <th class="text-left">Titulo</th>
              <th class="text-left">Descripcion</th>
              <th class="text-left"></th>
              <th class="text-left"></th>
            </tr>
          </thead> -->
        <tbody >
          <tr v-for="post in posts" :key="post.id" v-show="post.status === 1">
            <td>
              <v-checkbox color="blue"  method="PATCH" :model-value="true"  hide-details @change="cambiarEstado(post)" :checked="post.status === 0">{{ post.status }}</v-checkbox>
            </td>
            <!-- <label><input type="checkbox" id="cbox1" value="first_checkbox" @change="cambiarEstadoEnd(finishTarea)" :checked="finishTarea.status === 1"/>{{
            finishTarea.status
          }} </label><br /> -->
            <td class="red-background">{{ post.id }}</td>
            <td class="red-background">{{ post.title }}</td>
            <td class="red-background">{{ post.description }}</td>
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
              <div class="text-center">
    <v-icon @click="dialog = true" role="link" :to="post.id"> <svg-icon type="mdi" :path="pencil"></svg-icon> </v-icon>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card>
        <ModifyComponent :post="postId"></ModifyComponent>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
            </td>









            <td>
              <form v-on:submit.prevent="deleteFinshTasks(finishTarea.id)">
                <button type="submit">
                  <svg-icon type="mdi" :path="path"></svg-icon>
                </button>
              </form>
            </td>
          </tr>
        </tbody>
      </v-table>

    </div>
  </div>






<!-- pruebas -->



  <!-- <div class="text-center">
    <v-icon @click="dialog = true" role="link" :to="post.id"> <svg-icon type="mdi" :path="pencil"></svg-icon> </v-icon>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card>
        <ModifyComponent></ModifyComponent>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div> -->


</template>

<script>
import axios from "axios";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiTrashCan } from "@mdi/js";
import { mdiPencil } from "@mdi/js";
import { mdiNoteTextOutline } from '@mdi/js';
import CreateComponent from './CreateComponent.vue';
import ModifyComponent from "./ModifyComponent.vue";
// import ModifyComponent from './ModifyComponent.vue';
const url = "http://localhost:8000/api";
// const urlId = "http://localhost:8000/api/tareas/{id}";

export default {
  name: "TareasComponent,my-component",

  data() {
    return {
      ex4: ['red', 'indigo', 'orange', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'red darken-3', 'indigo darken-3', 'orange darken-3'],
      posts: [],
      finishTareas:[],
      loading: true,
      path: mdiTrashCan,
      notes: mdiNoteTextOutline,
      pencil: mdiPencil,
      dialog: false,
      selectedPostId: null,
      show: false,
      finishtask: false,

    };
  },
  mounted() {
    this.getTasks();
    this.$forceUpdate();
    this.getFinisTasks()
    // this.createTask();
  },
  components: {
    SvgIcon,
    CreateComponent,
    ModifyComponent
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

    cambiarEstado(post){
  post.status = post.status === 0 ? 1 : 0;
  if (post.status === 1) {
    axios.patch(url + "/tareas/" + post.id, { status: post.status }).then(response => {
      console.log(response.data);
      this.getTasks(); // Actualizar la lista de tareas después de hacer la petición PATCH
    }).catch(error => {
      console.log(error);
    });
  } else {
    axios.patch(url + "/tareas/" + post.id, { status: post.status }).then(response => {
      console.log(response.data);
      this.getTasks(); // Actualizar la lista de tareas después de hacer la petición PATCH
    }).catch(error => {
      console.log(error);
    });
  }
},
    // cambiarEstadoEnd(finishTarea){
    //   finishTarea.status = finishTarea.status === 1 ? 0 : 1;
    //   if ( finishTarea.status === 0){
    //     axios.post(url + "/tareas/", finishTarea).then(response=>{
    //       console.log(response.data.data)
    //       this.deleteFinshTasks(finishTarea.id)
    //       this.getTasks()
    //     }).catch(error=>{
    //       console.log(error)
    //     })
    //   }
    // },




    // updateStatus() {
    //         axios.patch(url+"/tareas/" + this.id, { title: this.task, description: this.description, status: this.check })
    //             .then(response => {
    //                 console.log(response),
    //                     this.getTasks();
    //                 this.$router.push('/'); 
    //                 //   window.location.reload()
    //             }).then()
    //             .catch(error => {
    //                 console.log(error.response);
    //             });
    //         this.task = '';
    //     },










    getFinisTasks() {
      try {
        axios.get(url + "/checks/").then((response) => {
          console.log(response.data);
          this.finishTareas = response.data.data;
          this.loading = false;

          // window.location.reload()
        });
      } catch (error) {
        console.log();
      }
    },
    deleteFinshTasks(id) {
      axios
        .delete(url + "/checks/" + id)
        .then((response) => {
          console.log(response);
          this.getFinisTasks()

          // this.posts = response.data.data;
          // this.loading = false;
        })
        .catch((error) => {
          console.log(error.respnse);
        });
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
    },


    showForm() {
      this.show = true;
    },
    submitForm() {
      this.show = false;
    },





    showTable() {
      this.finishtask = true;
    },
    submitTable() {

      this.finishtask = false;
    },
  },
};

</script>

<style >
  .red-background {
    text-decoration: line-through;
}
</style>
