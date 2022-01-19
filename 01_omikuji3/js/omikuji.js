"use strict";
window.addEventListener("DOMContentLoaded",
  function(){

    $("header").textillate({
      loop: false, // ループのオンオフ
      minDisplayTime: 2000, // テキストが置き換えられるまでの表示時間
      initialDelay: 2000, // 遅延時間
      autoStart: true, // アニメーションを自動的にスタート
      in: { // フェードインのエフェクトの詳細設定
      effect: "fadeInLeftBig", // エフェクトの名前(animate.css参照)
      delayScale: 1.5, // 遅延時間の指数
      delay: 50, // 文字ごとの遅延時間
      sync: false, // trueはアニメーションをすべての文字に同時に適用
      shuffle: true // trueは文字を順番にではなく、ランダムに
      }
    });
    // おみくじボタン(id="btn1") ボヤァと表示させる
    $(function(){
      ScrollReveal().reveal("#btn1", { duration: 9000 });
    });

    setTimeout(
      function(){
      let popmsg="いらっしゃい！おみくじ引いてって！";
      window.alert(popmsg);
      },
      "5000"
    );
  },false
);

const btn1 = document.getElementById("btn1");

const omikujiText = document.getElementById("omikujiText");

const omikujiTextImage = document.getElementById("omikujiTextImage");


btn1.addEventListener("click",
  function(){
      let resultText = ["img/daikichi.png","img/chukichi.png","img/syokichi.png","img/suekichi.png","img/daikyo.png"];
      let resultSound = ["sound/omikuji_sound1.mp3","sound/omikuji_sound2.mp3","sound/omikuji_sound3.mp3","sound/omikuji_sound4.mp3","sound/omikuji_sound5.mp3"];
      let n = Math.floor(Math.random() * resultText.length);
      let music = new Audio(resultSound[n]);
      music.currentTime = 0;
      music.play();//再生
      
      omikujiTextImage.src=resultText[n];
      omikujiTextImage.classList.add("omikujiPaper");
      omikujiTextImage.addEventListener("animationend",
        function(){
          omikujiTextImage.classList.remove("omikujiPaper");
      },false
    );
    
      // snowfall stop
      $(document).snowfall("clear");

      // jQueryのsnowfall
      $(document).ready(function(){
          let resultsMaxSpeed = [10,10,8,5,5];
          let resultsMaxSize = [30,30,30,15,20];
          let resultImage =["img/star.png","img/sakura_hanabira.png","img/greenLeaves1.png","img/leaf.png","img/snowflakes.png"];
        $(document).snowfall({
          maxSpeed : resultsMaxSpeed[n], // 最大速度
          minSpeed : 1, // 最小速度
          maxSize : resultsMaxSize[n], // 最大サイズ
          minSize : 1, // 最小サイズ
          image : resultImage[n]
        });
      });
  },false
);