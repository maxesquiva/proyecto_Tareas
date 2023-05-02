import { defineStore } from "pinia";
import axios from "axios";

const url = "http://localhost:8000/api";

export const useModifyTaskStore = defineStore("modifyStore", {
  state: () => ({
    posts: [],
    task: "",
    loading: true,
    id: null,
    post: null,
  }),

  actions: {
    setId(id) {
      this.id = id;
    },
    updateTask() {
      axios
        .patch(url + "/tareas/" + this.id, {
          title: this.task,
          description: this.description,
          status: this.check,
        })
        .then((response) => {
          console.log(response), console.log("eeeee");
          // this.getTasks();
          // this.$router.push('/');
          window.location.reload();
        })
        .then()
        .catch((error) => {
          console.log(error.response);
          console.log("aaaaaa");
          // this.$router.push('/');
        });
      this.task = "";
    },
  },
});
