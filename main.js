//要素の特定
const main_container = document.querySelector(".main_container");
const start_btn = document.querySelector("#start_button");
const end_image = document.querySelector(".end_image");
const main_image = document.querySelector(".main_image");
const timer_div = document.querySelector("#timer");
const continuous = document.querySelector("#continuous");
const count_div = document.querySelector("#count");
const display_div = document.querySelector(".display");
const japanese_h1 = document.querySelector("#japanese");
const word_h2 = document.querySelector("#word");
const scores_div = document.querySelector(".scores");
//手配書写真
const left_picture = document.querySelector(".left_picture");
const right_picture = document.querySelector(".right_picture");
//ココまで
const wpm_p = document.querySelector(".WPM"); //divのつもりだったがpでスタイルを設定してしまった
const percent_div = document.querySelector(".percent");
const my_image = document.querySelector("#my_image");
const close_btn = document.querySelector(".close");
const score_people_image = document.querySelector(".score_people_image"); //エンディング ランクの画像要素
const score_lank_div = document.querySelector(".score_lank");

//ゲーム要素の指定
let ready_time = 3; //カウントダウン 3秒に設定
let time_limit = 60; //時間制限 60秒
let total_score = 0; //全体のスコア
let correct = 0; //正解タイプ数
let mistake = 0; //ミスタイプ数
let current_type = 0; //現在の名言のあってるタイプ数
let current_answer; //現在のタイプの正解
let random = 0; //出題をランダムで選ぶ変数
let key_bool = true; //キー入力が可能かどうか trueは可能
let all_close = false; //すべて消す trueになるとすべて消す
//ここまでゲーム要素

//ゲームの効果音
let efffect_1 = new Audio("music/effect_1.mp3");
//エンディング音楽
let end_music_1 = new Audio("music/end_music_1.mp3");

//close_btnをクリックしたらすべて消す
close_btn.addEventListener("click", function () {
    main_container.style.display = "none";
    key_bool = false;
    all_close = true;
    //エンディングを初期化
    end_music_1.pause();
    end_music_1.currentTime = 0;
    //effect_1を止める
    efffect_1.pause();
    efffect_1.currentTime = 0;
});

//start_btnをクリックしたらready()に行く
//もう一度打った時用にすべてこの中で変数を宣言する
start_btn.addEventListener("click", function () {
    // onepiece キャラのボイス
    let char_voices =
        "music/sound_1.mp3 music/sound_2.mp3 music/sound_3.mp3 music/sound_4.mp3 music/sound_5.mp3 music/sound_6.mp3 music/sound_7.mp3 music/sound_8.mp3 music/sound_9.mp3 music/sound_10.mp3 music/sound_11.mp3 music/sound_12.mp3 music/sound_13.mp3 music/sound_14.mp3 music/sound_15.mp3 music/sound_16.mp3 music/sound_17.mp3";

    //画像 本番
    let images_source =
        "https://livedoor.blogimg.jp/yossikuppa/imgs/0/f/0f5f0f37.jpg https://wordstacks.nocebo.jp/storage/posts/164/0.webp?undefined https://pbs.twimg.com/media/EZv6az_UcAAnSuF.jpg https://blogimg.goo.ne.jp/user_image/08/03/38f1cb9728db1938405b70898d8fcc7b.png https://i.gyazo.com/042fded2457c57f1f7007e0c2f7949f8.jpg https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/21990220/picture_pc_fd34ba0a6635efabbfb7920d43d8ff4a.jpeg?width=800 https://pics.prcm.jp/01011214/49794337/jpeg/49794337_480x374.jpeg https://i.gyazo.com/b438ecdecba750833a98d324ef02e5b6.png https://blogimg.goo.ne.jp/user_image/5b/7a/439e2115d0d4fdc1078ff35004098383.png https://i.gyazo.com/c4fd8740191d3935df8eae71eccd413e.jpg https://i.gyazo.com/9857b483e10391a82b6be06f2ea6c9a0.jpg https://livedoor.blogimg.jp/yossikuppa/imgs/d/3/d3da83ad-s.jpg https://i.gyazo.com/fbb57e26aa111a2d105626e52e190ab4.jpg https://blogimg.goo.ne.jp/user_image/23/90/f2bb3960662825b1e309763246128184.png https://pbs.twimg.com/media/DxHy7oLUcAAZ9Zk.jpg https://stat.ameba.jp/user_images/20170331/23/1013takechang/77/63/p/o0600068613902931662.png https://i.gyazo.com/fc93e46bd6cfd7dc156efd17b92fd726.png";

    //名言 必ずスペースでくぎる
    let onepiece_ja_1_source =
        "海賊王に、俺はなる！ この海で一番自由なのが海賊王だ！ 女の嘘は、許すのが男だ 力に屈したら男に生まれた意味がねえだろう 本心を、言えよ！ 今の時代を作れるのは、今を生きてる人間だけだよ 人の夢は!終わらねえ! 人はいつ死ぬと思う...人に忘れられた時さ！ 俺は友達を傷つける奴は許さない！ 未来を変える権利は皆平等にあるんだよ！ 俺は一生神には祈らねえ！ いきなりキングは取れねエだろうよい 勝者だけが正義だ！ 男が一度！必ず帰ると言ったのだから！ 愛してくれて...ありがとう！ 長い間！くそお世話になりました！ この帽子をお前に預ける";
    let onepiece_en_1_source =
        "kaizokuouni,orehanaru! konoumideitibannziyuunanogakaizokuouda! onnnanousoha,yurusunogaotokoda tikaranikussitaraotokoniumaretaimiganeedarou honnsinnwo,ieyo! imanozidaiwotukurerunoha,imawoikiteruninngenndakedayo hitonoyumeha!owaranee! hitohaitusinutoomou...hitoniwasureraretatokisa! orehatomodatiwokizutukeruyatuhayurusanai! miraiwokaerukennrihaminabyoudouniarunndayo! orehaissyoukaminihainoranee! ikinarikinnguhatoreneedarouyoi syousyadakegaseigida! otokogaitido!kanarazukaerutoittanodakara! aisitekurete...arigatou! nagaiaida!kusoosewaninarimasita! konobousiwoomaeniazukeru";
    //ここまで名言

    // 正規表現 スペースで区切るようにしている
    let pattern = /[ ]/;
    onepiece_ja_1_source = onepiece_ja_1_source.split(pattern);
    onepiece_en_1_source = onepiece_en_1_source.split(pattern);
    images_source = images_source.split(pattern);
    char_voices = char_voices.split(pattern);

    // ここまで正規表現

    //onepieceキャラのボイスをAudio形式に変換して、リストに格納
    let char_voices_list_source = [];
    char_voices.forEach((voice) => {
        char_voices_list_source.push(new Audio(voice));
    });
    //ここまで音声格納
    //キーをうちこめるようにする
    key_bool = true;
    //エンディングを初期化 もう一度用
    end_music_1.pause();
    end_music_1.currentTime = 0;
    // 問題を初期化 もう一度ボタンを押した時用
    onepiece_en_1 = onepiece_en_1_source;
    onepiece_ja_1 = onepiece_ja_1_source;
    images = images_source;
    char_voices_list = char_voices_list_source;
    // 3つの要素を消す
    main_image.style.display = "none";
    start_btn.style.display = "none";
    end_image.style.display = "none";
    //スコア全体を消す
    scores_div.style.display = "none";
    //timer要素に値を代入
    timer_div.innerHTML = "<i class='fas fa-stopwatch'></i>60";
    ready();
});

//ready()の定義 ready()ではカウントダウンをした後に、GameStart()に行く
function ready() {
    //カウントダウンのタイム 3秒に設定したのを＋1してcloneに代入
    let ready_time_clone = ready_time + 1;
    //japanese_h1要素とword_h2要素、count_div要素、my_image要素になにも表示しなくする
    japanese_h1.innerHTML = "";
    word_h2.innerHTML = "";
    count_div.innerHTML = "";
    my_image.setAttribute("src", "");
    //カウントダウンの関数
    let ready_timer = setInterval(function () {
        if (ready_time_clone == 1) {
            efffect_1.play();
            //ready_timeが1ならstartを表示
            count_div.innerHTML =
                "<p class='fade' style = 'font-family:'Times New Roman''>GAME START</p>";
        } else {
            //count_divにカウントダウンを表示 ready_timeから1引いた数を表示
            count_div.innerHTML =
                "<p class='fade'>" + (ready_time_clone - 1) + "</p>";
        }
        ready_time_clone--;
        //もしall_closeがtrueならすべて消す
        if (all_close) {
            efffect_1.pause();
            efffect_1.currentTime = 0;
            clearInterval(ready_timer);
        }
        if (ready_time_clone < 0) {
            //effect_1をストップ
            efffect_1.pause();
            efffect_1.currentTime = 0;
            //count_divを非表示
            count_div.innerHTML = "";
            //タイマーストップ
            clearInterval(ready_timer);
            //GameStart()へ行く
            GameStart();
        }
    }, 1000);
}

// GameStart()の定義 Game全体の制限時間を管理 諸々の値を初期化
function GameStart() {
    //display要素を表示
    display_div.style.display = "block";
    //諸々初期化
    total_score = 0;
    correct = 0;
    mistake = 0;
    //Question()へ行く
    Question();
    //時間制限の変数の受け渡し +1する
    let time_limit_clone = time_limit + 1;
    //ゲーム全体のカウントダウン
    let all_timer = setInterval(function () {
        //カウントダウンの文字列を初期化
        count_div.innerHTML = "";
        //もしall_closeがtrueならすべて消す
        if (all_close) {
            //キャラの音声をとめる
            char_voices_list[random].pause();
            char_voices_list[random].currentTime = 0;
            //タイマーストップ
            clearInterval(all_timer);
        }
        //タイムリミットに時間を入れていく
        //もし残り時間が〇〇秒以下なら時計の文字を赤くする
        //もし残り時間が0秒ならばend_image要素を表示し、そのほかを非表示にする
        if (time_limit_clone - 1 == 0) {
            //キャラの音声をとめる
            char_voices_list[random].pause();
            char_voices_list[random].currentTime = 0;
            //effect_1を再生
            efffect_1.play();
            //end_image要素を表示
            end_image.style.display = "inline";
            //display_div要素をなくす
            display_div.style.display = "none";
            //my_image要素をなくす
            my_image.setAttribute("src", "");
            //timer_div要素の値を""に
            timer_div.innerHTML = "";
            // 入力禁止
            key_bool = false;
        } else if (time_limit_clone - 1 < 11) {
            timer_div.innerHTML =
                "<i class='fas fa-stopwatch fade' style = 'color:red;'></i>" +
                "<span class = 'fade'>" +
                (time_limit_clone - 1) +
                "</span>";
        } else {
            timer_div.innerHTML =
                "<i class='fas fa-stopwatch'></i>" + (time_limit_clone - 1);
        }
        time_limit_clone--;
        if (time_limit_clone < 0) {
            //timer_div要素を非表示
            timer_div.innerHTML = "";
            //タイマーストップ
            clearInterval(all_timer);
            //GameFinish()へ行く
            GameFinish();
        }
    }, 1000);
}

//Question()の定義 実際に問題を行うメイン機能
function Question() {
    //randomの変数にランダムな値を生成 日本語のリストの要素の数までのランダムな数
    random = Math.floor(Math.random() * onepiece_ja_1.length);
    // japanese_h1に問題を入力
    japanese_h1.innerHTML = onepiece_ja_1[random];
    //word_h2に答えを入力
    word_h2.innerHTML = onepiece_en_1[random];
    //my_imageに画像を表示
    my_image.setAttribute("src", images[random]);
    //キャラの音声を再生
    char_voices_list[random].play();
    //current_answerに現在打つべき文字を代入
    current_answer = onepiece_en_1[random].charAt(current_type);
}

//GameFinish()の定義 ゲームを終了した後の後処理やスコア表示を行う
function GameFinish() {
    //手配書スライドゾーン
    let images_people =
        "https://i.gyazo.com/48a458a6bb4232afc93aa496f2bf31f6.png https://i.gyazo.com/911db10da4e814b06197fc3d24717391.png https://i.gyazo.com/145cb8fd0409164c4ffd6f53777281f8.png https://i.gyazo.com/9b331e6ddabe190689849825321a83d8.png https://i.gyazo.com/6ed4984ac40e8ec0a1bfe4fd9f90dd57.png https://i.gyazo.com/e1232d7733af5d42ec5fbb2f22c98d73.png https://i.gyazo.com/6054b15ce702fe80782291d698cca2a6.png https://i.gyazo.com/2c7bb4b39135159aabf84f105ee9cf80.png https://i.gyazo.com/b3ede0b5ebebdd8322c00bf8a64fe591.png https://i.gyazo.com/ea235f8eab83cbb57ddc07b2974a8d0b.png";
    let original_pattern = /[ ]/;
    images_people = images_people.split(original_pattern);
    let original_count = 0;
    let original_count_clone = 0;
    let image_timer = setInterval(() => {
        right_picture.classList.add("wide_2");
        right_picture.classList.remove("wide_2_over");
        right_picture.setAttribute("src", images_people[original_count]);
        left_picture.classList.add("wide_2");
        left_picture.classList.remove("wide_2_over");
        if (original_count == images_people.length - 1) {
            left_picture.setAttribute("src", images_people[0]);
        } else {
            left_picture.setAttribute("src", images_people[original_count + 1]);
        }
        original_count++;
        if (original_count == images_people.length) {
            original_count = 0;
        }
        let iamge_timer_and = setInterval(() => {
            if (original_count_clone == 3) {
                right_picture.classList.add("wide_2_over");
                left_picture.classList.add("wide_2_over");
                clearInterval(iamge_timer_and);
                original_count_clone = -1;
            } else if (original_count_clone == 1) {
                right_picture.classList.remove("wide_2");
                left_picture.classList.remove("wide_2");
            }
            console.log(original_count_clone);
            original_count_clone++;
        }, 1000);
    }, 5000);
    //ココまで

    //effect_1を止める
    efffect_1.pause();
    efffect_1.currentTime = 0;
    //エンディングを流す
    end_music_1.play();
    //end_image要素の画像をエンディング画像に変更
    end_image.setAttribute(
        "src",
        "https://i.ytimg.com/vi/sGVkLN9Novg/maxresdefault.jpg"
    );
    //main_imageを表示
    main_image.style.display = "inline";
    //main_imageにendding_imageクラスを追加し、位置をずらす
    main_image.classList.add("endding_image");
    //total_scoreの定義
    total_score = correct * Math.pow(correct / (correct + mistake), 3);
    console.log(total_score);
    //total_scoreに応じて画像を変える
    //画像のリストの定義
    let my_pattern = /[ ]/;
    let score_people_images =
        "https://i.gyazo.com/9e8a0999a1830af74ddf7920ac722375.png https://i.gyazo.com/73beeaf38ebc80366a8ea2c1e67bfbd7.png https://i.gyazo.com/8ed8dab83711b4f8ca6072ce99a8c7b4.jpg https://i.gyazo.com/02c61d2271882ed7c5a56e1267fbf6f8.png https://i.gyazo.com/2e1223099e8cdd85c1b68b99e04e1d2a.png https://i.gyazo.com/2d3a8864dc244cb545cb34f6ffb85746.png https://i.gyazo.com/26ce083bb5c9949b65b80a2c810648be.png https://i.gyazo.com/dfbb40c296433316ed8073f9dcffb933.png https://i.gyazo.com/a83d707e8036685d11fb7a93302e0f2b.jpg https://i.gyazo.com/ee1eddcbb46efd10fb54c939448923eb.png";
    score_people_images = score_people_images.split(my_pattern);
    if (total_score >= 450) {
        score_people_image.setAttribute("src", score_people_images[0]);
        score_lank_div.innerHTML = "海賊王";
    } else if (total_score >= 400) {
        score_people_image.setAttribute("src", score_people_images[1]);
        score_lank_div.innerHTML = "世界最強の男";
    } else if (total_score >= 350) {
        score_people_image.setAttribute("src", score_people_images[2]);
        score_lank_div.innerHTML = "四皇";
    } else if (total_score >= 300) {
        score_people_image.setAttribute("src", score_people_images[3]);
        score_lank_div.innerHTML = "５番目の皇帝";
    } else if (total_score >= 250) {
        score_people_image.setAttribute("src", score_people_images[4]);
        score_lank_div.innerHTML = "四皇の幹部";
    } else if (total_score >= 200) {
        score_people_image.setAttribute("src", score_people_images[5]);
        score_lank_div.innerHTML = "七武海";
    } else if (total_score >= 150) {
        score_people_image.setAttribute("src", score_people_images[6]);
        score_lank_div.innerHTML = "最悪の世代";
    } else if (total_score >= 100) {
        score_people_image.setAttribute("src", score_people_images[7]);
        score_lank_div.innerHTML = "我が神なり";
    } else if (total_score >= 50) {
        score_people_image.setAttribute("src", score_people_images[8]);
        score_lank_div.innerHTML = "友情の盆暮れ";
    } else {
        score_people_image.setAttribute("src", score_people_images[9]);
        score_lank_div.innerHTML = "東の海の赤鼻";
    }
    // スコア全体の表示
    scores_div.style.display = "block";
    //WPMを代入
    wpm_p.innerHTML = "WPM : " + correct;
    //正答率を代入
    percent_div.innerHTML =
        "VALIDITY : " + Math.floor((correct / (correct + mistake)) * 100) + "%";
    // ゲーム要素の初期化
    random = 0;
    current_type = 0;
    current_answer = 0;
    //gamestartボタンを文字列をCharange Againに変えて表示 marginを加え中央へ block要素にしたからでは？
    start_btn.style.display = "inline";
    start_btn.innerHTML = "PLAY AGAIN";
}

//キーボード入力と判定
document.addEventListener("keypress", (event) => {
    //now_key変数に今何のキーを入力したかを代入
    let now_key = event.key;
    //入力可能な状態で、入力したキーが正解のキーとあっていたら
    if (now_key === current_answer && key_bool == true) {
        //正解タイプ数を＋1
        correct++;
        //現在のあってるタイプ数を＋1
        current_type++;
        // word_h2の表示を変更 正解した文字を暗くする
        //substr関数で文字列の始まりと終わりを指定
        word_h2.innerHTML =
            "<span style='color:gray'>" +
            onepiece_en_1[random].substr(0, current_type) +
            "</span>" +
            onepiece_en_1[random].substr(
                current_type,
                onepiece_en_1[random].length
            );
        //正解キーを次の文字へ
        current_answer = onepiece_en_1[random].charAt(current_type);
    } //間違っていたら
    else if (now_key !== current_answer && key_bool == true) {
        //mistakeを＋1
        mistake++;
    }

    //もし正解タイプ数が名言の答えの文字列の数と一致したら
    if (current_type === onepiece_en_1[random].length) {
        //音声をストップして最初の位置に戻す
        char_voices_list[random].pause();
        char_voices_list[random].currentTime = 0;
        // 効果音 ドーンを流す
        efffect_1.play();
        //現在のあってるタイプ数を初期化
        current_type = 0;
        //名言リストから日本語、英語、画像、音声それぞれ削除
        onepiece_ja_1.splice(random, 1);
        onepiece_en_1.splice(random, 1);
        images.splice(random, 1);
        char_voices_list.splice(random, 1);
        //Question()に行く
        Question();
    }
});
