import { createStore } from "vuex";

const defaultData = [
  {
    title: "vue",
    done: false,
    editFlag: false,
    id: 0,
  },
  {
    title: "vuex",
    done: false,
    editFlag: false,
    id: 1,
  },
  {
    title: "javascript",
    done: true,
    editFlag: false,
    id: 2,
  },
];

export default createStore({
  state() {
    return {
      todoList: defaultData,
    };
  },
  mutations: {
    doneChange(state, id) {
      console.log(id);
      for(let i = 0; i < state.todoList.length; i++) {
        if(state.todoList[i].id === id) {
          if(state.todoList[i].done) {
            state.todoList[i].done = false;
          } else {
            state.todoList[i].done = true;
          }
        }
      }
    },
  },
});
