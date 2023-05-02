import { defineStore } from "pinia";
import axios from "axios";

const url = "http://localhost:8000/api";

export const useTaskStore = defineStore("task", {
  id: "myStore",
  state: () => ({
    posts: [],
    id: null,
    selectedPostId: null,
    // id:'',
  }),
  actions: {
    saveTask() {
      //recarga buena de la pagina
      axios
        .post(url + "/tareas/", {
          title: this.task,
          description: this.description,
        })
        .then((response) => {
          console.log(response), this.getTasks();
          this.show = false;
          //window.location.reload();
          this.getTasks();
          // this.$router.push('/')
        })
        .catch((error) => {
          console.log(error.response);
        });
      this.task = "";
    },
    async getTasks() {
      try {
        await axios.get(url + "/tareas/").then((response) => {
          this.posts = response.data.data;
        });
      } catch (error) {
        console.log();
      }
    },
    async deleteTasks(id) {
      axios
        .delete(url + "/tareas/" + id)
        .then((response) => {
          this.getTasks();

          this.posts = response.data.data;
          console.log(this.posts);
          // this.loading = false;
        })
        .catch((error) => {
          console.log(error.respnse);
        });
    }, updateTask() {
      axios
        .patch(url + "/tareas/" + this.id, {
          title: this.task,
          description: this.description,
          status: this.check,
        })
        .then((response) => {
          console.log(response), console.log("eeeee");
          this.getTasks();
          // this.$router.push('/');
          // window.location.reload();
        })
        .then()
        .catch((error) => {
          console.log(error.response);
          console.log("aaaaaa");
          // this.$router.push('/');
        });
      this.task = "";
    },
    

    cambiarEstado(post) {
      post.status = post.status === 0 ? 1 : 0;
      if (post.status === 1) {
        axios
          .patch(url + "/tareas/" + post.id, { status: post.status })
          .then((response) => {
            console.log(response.data);
            this.getTasks(); // Actualizar la lista de tareas después de hacer la petición PATCH
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .patch(url + "/tareas/" + post.id, { status: post.status })
          .then((response) => {
            console.log(response.data);
            this.getTasks(); // Actualizar la lista de tareas después de hacer la petición PATCH
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    setId(id) {
      this.id = id;
      console.log(id);
    },
  },
  getters: {
    getPosts(state) {
      return state.posts;
    },
  },
});
