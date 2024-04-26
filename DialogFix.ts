// Copyright (c) 2024 tbzsantaroh
// This software is released under the MIT License, see LICENSE.

const diaBtnList = [...<NodeList>document.querySelectorAll('[data-dmodal-id]')] as HTMLElement[]; // すべてのボタンとdialogのNodeListを取得
const dialogList: HTMLDialogElement[] = [...diaBtnList].filter(elm => elm.tagName.toLowerCase() === 'dialog') as HTMLDialogElement[]; // 全dialogの配列
const btnList: HTMLElement[] = [...diaBtnList].filter(elm => elm.tagName.toLowerCase() !== 'dialog') as HTMLElement[]; // 全ボタンの配列

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
    const diaWrapElement = dElement.firstElementChild as HTMLDivElement;  // ラッパーdiv1を変数化
    const diaUnCloseElement = diaWrapElement.firstElementChild as HTMLDivElement;  // ラッパーdiv2を変数化

    // 閉じる処理ここから
    const close = () => {
      dElement.dataset.hideTo = 'true'; // 閉じるアニメーション
      dElement.addEventListener('transitionend', () => {
        delete dElement.dataset.hideTo;
        if (dElement.dataset.dmodalType === 'youtube') { // youtubeモード時
          dElement.querySelector('iframe').src = dElement.querySelector('iframe').src;  // srcを一旦消してリロードすることで動画再生を停止する
        }
        dElement.close();
      }, { once: true, },
      );
    }

    dElement.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement; // HTMLElement型にキャスト

      if (targetElement.matches('[data-dmodal-type="close"]')) { // クリックされた要素にdata-dmodal-type="close"属性があるかどうかを確認
        close();
      }
      else if (targetElement === dElement || targetElement === diaWrapElement) {  // クリックされた要素がダイアログであるか、diaWrap自体であるかを確認
        close();
      }
      else if (targetElement.closest('.diaUnClose')) { // ダイアログのコンテンツ内をクリックしたときにダイアログが閉じないようにする
        event.stopPropagation();
      }
    });
    // 閉じる処理ここまで

    if (dElement.dataset.dmodalType === 'img') { // imgモード時
      dElement.querySelector('img').setAttribute('data-dmodal-type', 'close');  // 画像クリックで閉じるようにdata属性closeを付与
    }
    dElement.dataset.showFrom = 'true';
    dElement.showModal();  // 同名data属性のdialogを開く
    requestAnimationFrame(() => delete dElement.dataset.showFrom);
  }, false);
});