import { createStore } from 'vuex';

// userの追加 'mike', 'john', 'jane', 'bob'
// const userList = [
//   { name: 'mike', id: 0 },
//   { name: 'john', id: 1 },
//   { name: 'jane', id: 2 },
//   { name: 'bob', id: 3 },
// ];

// ユーザーデータ用下のtodoリスト用のものと処理は特に変わらないです。
const localStorageKeyUser = 'userList';
let userData = localStorage.getItem(localStorageKeyUser);
let userInitId = 0;
if (userData) {
  userData = JSON.parse(userData);
  userInitId = userData[userData.length - 1].id + 1;
} else {
  userData = [];
}

// todoリスト用のローカルストレージのデータのやり取り
const localStorageKey = 'todoList';
// ローカルストレージのデータを取得
let data = localStorage.getItem(localStorageKey); // ローカルストレージからkeyがtodoListのデータを取得
let initId = 0; // データがない場合のタスクIDの初期値
if (data) {
  // ローカルストレージにデータが存在している時の処理
  data = JSON.parse(data); // 文字列になっているデータをパースする
  initId = data[data.length - 1].id + 1; // データの配列の最後のIDに+1した数値を代入
} else {
  // ローカルストレージにデータがない場合
  data = []; // オブジェクトを配列にしてtodoリストを管理しているため空の配列を代入
}

export default createStore({
  state() {
    return {
      todoList: data,
      lastId: initId,
      userList: userData,
      userLastId: userInitId,
    };
  },
  mutations: {
    doneChange(state, id) {
      // todoの完了、未完了の切り替え
      // 日時の入力で一桁の時先頭に「0」を付ける関数
      function dateFormat(number) {
        let target = String(number);
        if (target.length === 1) {
          return `0${target}`;
        } else {
          return target;
        }
      }
      const today = new Date(); // 完了を押したときのDateオブジェクト
      const year = today.getFullYear(); // 年の取得
      const month = dateFormat(today.getMonth() + 1); // 月の取得
      const day = dateFormat(today.getDate()); // 日付の取得
      const hours = dateFormat(today.getHours()); // 時間の取得
      const minutes = dateFormat(today.getMinutes()); // 分の取得
      const doneDate = `${year}-${month}-${day}`; // 日付のフォーマットをYYYY-MM-DDにする
      const doneTime = `${hours}:${minutes}`; // 時間のフォーマットをHH:MM
      for (let i = 0; i < state.todoList.length; i++) {
        if (state.todoList[i].id === id) {
          if (state.todoList[i].done) {
            // 未完了に変更するときの処理
            state.todoList[i].done = false;
            state.todoList[i].doneDate = '';
            state.todoList[i].doneTime = '';
          } else {
            // 完了に変更する時の処理
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
    addUser(state, newUserName) {
      let newUser = {
        name: newUserName,
        id: state.userLastId,
      };
      state.userList.push(newUser);
      state.userLastId = state.userList[state.userList.length - 1].id + 1;
    },
    removeUser(state, id) {
      for (let i = 0; i < state.userList.length; i++) {
        if (state.userList[i].id === id) {
          state.userList.splice(i, 1);
        }
      }
    },
    updateLastId(state) {
      // 最後に追加したtodoのidに+1することでかぶらない数値のidを作成
      state.lastId = state.todoList[state.todoList.length - 1].id + 1;
    },
    pushLocalStorage(state) {
      // ローカルストレージのデータを更新する関数
      localStorage.removeItem(localStorageKey); // 既存のデータを削除
      let json = JSON.stringify(state.todoList, undefined, 1); // 現在のtodoリスト(オブジェクトの配列)をローカルストレージのvalueに入れる為文字列型に変換
      localStorage.setItem(localStorageKey, json); //
    },
    pushLocalStorageUser(state) {
      localStorage.removeItem(localStorageKeyUser); // 既存のデータを削除
      let json = JSON.stringify(state.userList, undefined, 1); // 現在のtodoリスト(オブジェクトの配列)をローカルストレージのvalueに入れる為文字列型に変換
      localStorage.setItem(localStorageKeyUser, json); //
    },
  },
});
