import { createStore } from "vuex";

const defaultData = [
  {
    title: "vue",
    details: "vueタスクの詳細",
    done: false,
    editFlag: false,
    id: 1,
  },
  {
    title: "vuex",
    details: "vuexタスクの詳細",
    done: false,
    editFlag: false,
    id: 2,
  },
  {
    title: "javaScript",
    details: "javaScriptタスクの詳細",
    done: true,
    editFlag: false,
    id: 3,
  },
];

export default createStore({
  state() {
    return {
      todoList: defaultData,
      lastId: defaultData[defaultData.length - 1].id + 1,
    };
  },
  mutations: {
    doneChange(state, id) {
      for (let i = 0; i < state.todoList.length; i++) {
        if (state.todoList[i].id === id) {
          if (state.todoList[i].done) {
            state.todoList[i].done = false;
          } else {
            state.todoList[i].done = true;
          }
        }
      }
    },
    openEditor(state, id) {
      state.todoList.forEach((element) => {
        element.editFlag = false;
      });
      // 編集するtodoのエディターを表示
      for (let i = 0; i < state.todoList.length; i++) {
        if (state.todoList[i].id === id) {
          state.todoList[i].editFlag = true;
        }
      }
    },
    removeTodo(state, id) {
      for (let i = 0; i < state.todoList.length; i++) {
        if (state.todoList[i].id === id) {
          state.todoList.splice(i, 1);
        }
      }
    },
    updateLastId(state) {
      // 最後に追加したtodoのidに+1することでかぶらない数値のidを作成
      state.lastId = state.todoList[state.todoList.length - 1].id + 1;
    },
  },
});
