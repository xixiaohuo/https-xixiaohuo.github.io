"use strict";

//ページの本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
  function() {

    //1.localStorageが使えるか確認
    if (typeof localStorage ==="undefined") {
      window.alert("このブラウザはLocal Storage機能が実装されていません");
      return;
    } else {
      viewStorage();     //localStorageからのデータの取得とテーブルへの表示
      saveLocalStorage();//2.localStorageへの保存
      delLocalStorage();//3.LocalStorageから1件削除
      selectTable();     //5.データ選択
      allClearLocalStorage();//4.localStorageからすべて削除
    }
  }
);

//2.localStorageへの保存
function saveLocalStorage() {
  const save = document.getElementById("save");
  save.addEventListener("click",
    function(e) {
      e.preventDefault();
      const key = document.getElementById("textKey").value;
      const value = document.getElementById("textMemo").value;

      //値の入力チェック
      if(key=="" || value=="") {
        window.alert("Key、Memoはいずれも必須です。");
        return;
      } else {
        let w_confirm = window.confirm("LocalStorageに\n「"+ key + " " + value + "」\n保存しますか");
        //確認ダイアログで「OK」を押された時、保存します
        if(w_confirm === true){
          localStorage.setItem(key,value);
          viewStorage();     //localStorageからのデータの取得とテーブルへの表示
          let w_msg = "localStorageに" + key + " " + value + "を保存しました。";
          window.alert(w_msg);
          document.getElementById("textKey").value = "";
          document.getElementById("textMemo").value = "";
        }
      }
    },false
  );
};

//3.LocalStorageから選択件削除
function delLocalStorage() {
  const del = document.getElementById("del");
  del.addEventListener("click",
    function(e) {
      e.preventDefault();
      const chkbox1 = document.getElementsByName("chkbox1");
      const table1 = document.getElementById("table1");
      let w_cnt = "0";//選択されているチェックボックス数が返却される
      w_cnt = selectCheckBox("del");//テーブルからデータ選択

      if(w_cnt >= 1) {
        //const key = document.getElementById("textKey").value;
        //const value = document.getElementById("textMemo").value;
        let w_confirm = window.confirm("LocalStorageから選択されている" + w_cnt +"削除しますか?");
        //確認ダイアログで「OK」を押された時、削除する
        if(w_confirm === true){
          for(let i = 0; i< chkbox1.length; i++){
            if(chkbox1[i].checked) {
              localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);
            }
          }

          //localStorage.removeItem(key);
          viewStorage();//LocalStorageからのデータの取得とテーブルへ表示
          let w_msg = "localStorageから" + w_cnt + "を削除しました。";
          window.alert(w_msg);
          document.getElementById("textKey").value = "";
          document.getElementById("textMemo").value = "";
        }
      }
    },false
  );
};

//4.localStorageからすべて削除
function allClearLocalStorage(){
  const allClear = document.getElementById("allClear");
  allClear.addEventListener("click",
  function(e){
    e.preventDefault();
    let w_confirm = window.confirm("LocalStorageのデータをすべて削除（all clear）します。\nよろしいですか？");
    //確認ダイアログで「OK」を押された時、すべて削除する
    if(w_confirm === true){
      localStorage.clear();
      viewStorage();//LocalStorageからのデータの取得とテーブルへ表示
      let w_msg = "localStorageのデータをすべて削除(all clear)しました。";
      window.alert(w_msg);
      document.getElementById("textKey").value = "";
      document.getElementById("textMemo").value = "";
      }
    },false
  );
};
//5.データ選択
function selectTable() {
  const select = document.getElementById("select");
  select.addEventListener("click",
    function(e) {
      e.preventDefault;
      selectCheckBox("select"); //テーブルからデータ選択
    },false
  );
};


//テーブルからデータ選択
function selectCheckBox(mode) {
  //let w_sel = "0"; //選択されていれば”1”にする
  let w_cnt = 0;   //選択されているチェックブックスの数
  const chkbox1 = document.getElementsByName("chkbox1");
  const table1 = document.getElementById("table1");
  let w_textKey = "";  //work
  let w_textMemo = ""; //work

  for(let i=0; i < chkbox1.length; i++){
    if(chkbox1[i].checked) {
      if(w_cnt === 0){     //最初にチェックされている行をワークに退避
        w_textKey = table1.rows[i+1].cells[1].firstChild.data; //document.getElementById("textKey").value = table1.rows[i+1].cells[1].firstChild.data;
        w_textMemo = table1.rows[i+1].cells[2].firstChild.data;//document.getElementById("textMemo").value = table1.rows[i+1].cells[2].firstChild.data;
        //return w_sel="1";
      }
      w_cnt++;
    }
  }
  document.getElementById("textKey").value = w_textKey;
  document.getElementById("textMemo").value = w_textMemo;
  //選択ボタンを押されたときのチェックロジック
  if(mode === "select"){
    if(w_cnt === 1) {
      return w_cnt;
    }
    else{
      window.alert("一つ選択（select）してください")
    }
  }

  //削除ボタンを押されたときのチェックロジック
  if(mode === "del"){
    if(w_cnt >= 1) {
      return w_cnt;
    }
    else{
      window.alert("一つ以上選択（select）してください")
    }
  }
};

//localStorageからのデータの取得とテーブルへの表示
function viewStorage() {
  const list = document.getElementById("list");
  // htmlのテーブル初期化
  while(list.rows[0]) list.deleteRow(0);

  //localStorageすべての情報の取得
  for(let i=0; i < localStorage.length;i++){
    let w_key = localStorage.key(i);

  //localStorageのキーと値を表示
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    list.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
    td2.innerHTML = w_key;
    td3.innerHTML = localStorage.getItem(w_key);
  }
  //JQueryのplugin tablesorterを使ってテーブルのソート
  //sortList:引数1...最初からソートしておく列を指定、引数2...0.昇順 1.降順
  $("#table1").tablesorter({     //tablesort add
    sortList: [[1,0]]            //tablesort add
  });                            //tablesort add

  $("#table1").trigger("update");//tablesort add
};