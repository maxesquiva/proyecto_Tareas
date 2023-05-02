<template>
  <h1>modificar tarea {{ store.id }}</h1>
  <form method="PATCH" v-on:submit.prevent="store.updateTask(store.id)">
    <div>
      <input type="text" v-model="store.task" placeholder="Nueva tarea" name="todo">
      <input type="text" v-model="store.description" placeholder="descripcion" name="todo">
      <input type="checkbox" v-model="store.check" placeholder="descripcion" name="todo">
      <input type="submit" value="Agregar" color="success" />
    </div>
  </form>
</template>




<script>
import { useModifyTaskStore } from "../stores/modifyStore";
import { mdiDelete } from '@mdi/js';
import { mdiPencil } from '@mdi/js';
import { computed } from 'vue';


export default {
  props: {
    postId: {
      type: Number,
      required: true
    }
  },
  name: "my-component",
  components: {

  },
  data() {
    return {
      path: mdiDelete,
      pencil: mdiPencil,
    }
  },


  setup(props) {

    const store = useModifyTaskStore();
    store.setId(props.postId);


    const post = computed(() => {
      return store.post;
    });
    return {
      store,
      post
    }
  }
}
</script>






<!-- import { mdiTrashCan } from '@mdi/js';
import { mdiPencil } from '@mdi/js';
const url = "http://localhost:8000/api";
import axios from "axios";


export default {

    name: "my-cool-component",

    components: {
    
    },

    data() {
        return {
            id: this.$route.params.id,
            task: '',
            description: '',
            check: false,
            posts: [],
            loading: true,
            path: mdiTrashCan,
            pencil: mdiPencil,
            // path: mdiAccount,
        }
    },
    mounted() {
       
    },
    methods: {
        updateTask() {
            axios.patch(url+"/tareas/" + this.id, { title: this.task, description: this.description, status: this.check })
                .then(response => {
                    console.log(response),
                        this.getTasks();
                    this.$router.push('/'); 
                    //   window.location.reload()
                }).then()
                .catch(error => {
                    console.log(error.response);
                });
            this.task = '';
        },
    }
} -->
