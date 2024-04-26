// Copyright (c) 2024 tbzsantaroh
// This software is released under the MIT License, see LICENSE.

const diaBtnList = document.querySelectorAll('[data-dmodal-id]'); // すべてのボタンとdialogのNodeListを取得
const dialogList = [...diaBtnList].filter(elm => elm.tagName.toLowerCase() === 'dialog'); // 全dialogの配列
const btnList = [...diaBtnList].filter(elm => elm.tagName.toLowerCase() !== 'dialog'); // 全ボタンの配列

btnList.forEach(btn => {
  btn.addEventListener('click', () => {
    const dElement = dialogList.find(id => id.dataset.dmodalId === btn.dataset.dmodalId);  // ボタンと同名data属性のdialog要素を探して変数化

    // ラッパーdivふたつ追加
    if (!(dElement.firstElementChild.classList.contains('diaWrap'))) {  // すでに子要素.diaWrapがある場合はスキップ
      const diaWrap = document.createElement('div');  // 最初のラッパー 
      diaWrap.classList.add('diaWrap');
      const diaUnClose = document.createElement('div'); // 2つ目ラッパー
      diaUnClose.classList.add('diaUnClose');

      while (dElement.firstElementChild) {
        diaUnClose.appendChild(dElement.firstChild);
      }
      diaWrap.appendChild(diaUnClose);
      dElement.appendChild(diaWrap);
    }
    const diaWrapElement = dElement.firstElementChild;  // ラッパーdiv1を変数化
    const diaUnCloseElement = diaWrapElement.firstElementChild;  // ラッパーdiv2を変数化

    // 閉じる処理ここから
    const close = () => {
      dElement.dataset.hideTo = true; // 閉じるアニメーション
      dElement.addEventListener('transitionend', () => {
        delete dElement.dataset.hideTo;
        if(dElement.dataset.dmodalType === 'youtube') { // youtubeモード時
          dElement.querySelector('iframe').src = dElement.querySelector('iframe').src;  // srcを一旦消してリロードすることで動画再生を停止する
        }
        dElement.close();
        }, {once: true,},
      );
    }

    dElement.addEventListener('click', (event) => {
      if (event.target.matches('[data-dmodal-type="close"]')) { // クリックされた要素にdata-dmodal-type="close"属性があるかどうかを確認
        close();
      }
      else if (event.target === dElement || event.target === diaWrapElement) {  // クリックされた要素がダイアログであるか、diaWrap自体であるかを確認
        close();
      }
      else if (event.target.closest(diaUnCloseElement)) { // ダイアログのコンテンツ内をクリックしたときにダイアログが閉じないようにする
        event.stopPropagation();
      }
    });
    // 閉じる処理ここまで

    if(dElement.dataset.dmodalType === 'img') { // imgモード時
      dElement.querySelector('img').setAttribute('data-dmodal-type', 'close');  // 画像クリックで閉じるようにdata属性closeを付与
    }
    dElement.dataset.showFrom = true;
    dElement.showModal();  // 同名data属性のdialogを開く
    requestAnimationFrame(() => delete dElement.dataset.showFrom);
  }, false);
});