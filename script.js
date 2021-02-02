// 要素の特定
const close_btn_clone = document.querySelector(".close"); //閉じるボタン 同じ名前がだめみたいだからcloneに
const main_div = document.querySelector("#main");
const play_btns = document.querySelectorAll(".play_btn");  //押されるとゲーム画面を表示,そこまでスクロール
const main_container_clone = document.querySelector(".main_container");

close_btn_clone.addEventListener("click",function(){
    main_div.classList.remove("main");
    scrollTo(0, 0); //ページトップまで移動
})

play_btns.forEach(play_btn => {
    play_btn.addEventListener("click", () => {
        main_div.classList.add("main");
        main_container_clone.style.display = "block";
    });
})
