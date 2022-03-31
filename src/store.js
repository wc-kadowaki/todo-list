import { createStore } from "vuex";

const defaultData = [
  {
    title: "vue",
    done: false,
    editFlag: false,
  },
  {
    title: "vuex",
    done: false,
    editFlag: false,
  },
  {
    title: "javascript",
    done: true,
    editFlag: false,
  },
];

export default createStore({
  state() {
    return {
      todoList: defaultData,
    };
  },
});

