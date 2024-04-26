# DialogFix

htmlのDialog要素を使いやすくするスクリプト。  

- 開く、閉じる時のアニメーションを追加
- 画面外クリックで閉じるを追加
- 画像のレスポンシブ化を追加
- youtube埋め込み時、ウィンドウを閉じると再生停止する機能を追加
- dialog要素なので、一般的なモーダルスクリプトと違ってz-indexを使っていない = 必ず最前面に表示される

## Setup

`DialogFix.js` or `DialogFix.ts`  
`DialogFix.scss`  

## Usage

### JavaScript & CSS files

`DialogFix.js` or `DialogFix.ts` のスクリプトどちらかと、  
`DialogFix.scss` このSCSSを読み込む。  

### HTML dialog要素の書き方

#### スタンダードモード

```html
<button data-dmodal-id="d01">開くボタン1</button>
<button data-dmodal-id="d01">開くボタン2</button>
<button data-dmodal-id="d01">開くボタン3</button>

<dialog data-dmodal-id="d01">
  <p>sample text</p>
  <button data-dmodal-type="close">とじる</button>
  <button data-dmodal-type="close">とじる</button>
</dialog>
```

dialog要素と開くボタンの要素に、データ属性`data-dmodal-id="***"`を指定し、同じプロパティにします。  
開くボタンと閉じるボタンは複数指定可能。  

#### 画像モード

```html
<button data-dmodal-id="d01">画像開くボタン</button>

<dialog data-dmodal-id="d01" data-dmodal-type="img">
  <img src="imageURL" alt="">
</dialog>
```

スタンダードモード時の設定 + dialog要素に`data-dmodal-type="img"`を追加します。  
画像は1つだけを入れるようにして、その他の要素は入れないでください。  

#### YouTubeモード

```html
<button data-dmodal-id="d01">Youtube開くボタン</button>

<dialog data-dmodal-id="d01" data-dmodal-type="youtube">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/7YnI1h8HNZo?si=sCieT-7I_a7HKp5K" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</dialog>
```

スタンダードモード時の設定 + dialog要素に`data-dmodal-type="youtube"`を追加します。  
youtube埋め込みのiframeだけを入れるようにして、その他の要素は入れないでください。  

#### CSSセレクターの注意

dialog要素の下にラッパーdivを2つ自動生成するので、CSSセレクターでdialogの直下子要素を指定すると認識しません。

```css
dialog > .sample {
  ❌ NG
}
```

```css
dialog .sample {
  ⭕ OK
}
.sample {
  ⭕ OK
}
```

以下のようにラッパーdivが生成されます。

```html
<dialog>
  ~~~
</dialog>

⬇

<dialog>
  <div class="diaWrap">
    <div class="diaUnClose">
      ~~~
    </div>
  </div>
</dialog>
```

## License

This software is released under the MIT License, see LICENSE.

## Authors

<https://github.com/tbzsantaroh>
