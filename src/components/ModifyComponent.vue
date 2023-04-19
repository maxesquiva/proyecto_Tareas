<template>
    <h1>modificar tarea {{ id }}</h1>
    <form method="PATCH" v-on:submit.prevent="saveTask()">
        <div>
            <input type="text" v-model="task" placeholder="Nueva tarea" name="todo">
            <input type="text" v-model="description" placeholder="descripcion" name="todo">
            <input type="checkbox" v-model="check" placeholder="descripcion" name="todo">
            <input type="submit" value="Agregar" color="success" />
        </div>
    </form>
</template>
<script>
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
        // this.getTasks();
        this.saveTasks();
        // this.createTask();
    },
    methods: {
        saveTask() {
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
        getTasks() {
            try {
                axios.patch(url+"/tareas/" + this.id).then((response) => {
                    this.posts = response.data.data;
                    this.loading = false;
                    this.$router.push('/');
                    window.location.reload()
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
            //   this.getTasks();
            this.saveTask();
        }
    }
}
</script>