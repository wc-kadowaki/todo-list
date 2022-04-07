import { createStore } from 'vuex';

const defaultData = [
  {
    title: 'vue',
    details: 'vueタスクの詳細',
    date: '2022-04-07',
    time: '18:00',
    done: false,
    doneDate: '',
    doneTime: '',
    editFlag: false,
    id: 1,
  },
  {
    title: 'vuex',
    details: 'vuexタスクの詳細',
    date: '2022-04-08',
    time: '18:00',
    done: false,
    doneDate: '',
    doneTime: '',
    editFlag: false,
    id: 2,
  },
  {
    title: 'javaScript',
    details: 'javaScriptタスクの詳細',
    date: '2022-04-09',
    time: '18:00',
    done: true,
    doneDate: '2022-01-01',
    doneTime: '18:00',
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
      function dateFormat(number) {
        let target = String(number);
        if (target.length === 1) {
          return `0${target}`;
        } else {
          return target;
        }
      }
      const today = new Date();
      const year = today.getFullYear();
      const month = dateFormat(today.getMonth() + 1);
      const day = dateFormat(today.getDate());
      const hours = dateFormat(today.getHours());
      const minutes = dateFormat(today.getMinutes());
      const doneDate = `${year}-${month}-${day}`;
      const doneTime = `${hours}:${minutes}`;
      for (let i = 0; i < state.todoList.length; i++) {
        if (state.todoList[i].id === id) {
          if (state.todoList[i].done) {
            state.todoList[i].done = false;
            state.todoList[i].doneDate = '';
            state.todoList[i].doneTime = '';
          } else {
            state.todoList[i].done = true;
            state.todoList[i].doneDate = doneDate;
            state.todoList[i].doneTime = doneTime;
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
