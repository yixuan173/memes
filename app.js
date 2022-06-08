"use strict";

const imgFileInput = document.querySelector("#image-file-input");
const topTextInput = document.querySelector(".top-text-input");
const bottomTextInput = document.querySelector(".bottom-text-input");
const canvas = document.querySelector(".memeImage");
const memesGallery = document.querySelector(".memes-gallery");
const topTextSize = document.querySelector(".top-text-input-size");
const bottomTextSize = document.querySelector(".bottom-text-input-size");
const topTextX = document.querySelector(".top-text-x");
const topTextY = document.querySelector(".top-text-y");
const bottomTextX = document.querySelector(".bottom-text-x");
const bottomTextY = document.querySelector(".bottom-text-y");
const btn = document.querySelector(".btn-download");

let image = new Image();
// 跨域圖片進行保存
image.setAttribute("crossorigin", "anonymous");
let ctx, fontSize, width, height;

// 文字設定
const handlerText = function (baseLine, text, size, x, y) {
  fontSize = width * size;
  ctx.lineWidth = fontSize / 4;
  ctx.font = `${fontSize}px Impact`;

  ctx.textBaseline = baseLine;
  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
};

// 更新圖片及文字
const updateMemesImg = function (
  canvas,
  image,
  topText,
  bottomText,
  topSize,
  bottomSize,
  topX,
  topY,
  bottomX,
  bottomY
) {
  ctx = canvas.getContext("2d");
  width = image.width;
  height = image.height;

  // 設定畫布寬度及文字 Range 最大X值
  canvas.width = width;
  topTextX.setAttribute("max", width);
  bottomTextX.setAttribute("max", width);

  // 設定畫布高度及文字 Range 最大Y值
  canvas.height = height;
  topTextY.setAttribute("max", height);
  bottomTextY.setAttribute("max", height);

  // 文字樣式
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.lineJoin = "round";

  ctx.drawImage(image, 0, 0);

  handlerText("top", topText, topSize, topX, topY);
  handlerText("bottom", bottomText, bottomSize, bottomX, bottomY);
};

// 綁訂多事件的監聽器
const addMultipleEventListener = function (element) {
  ["mouseup", "touchend"].forEach((e) =>
    element.addEventListener(e, () =>
      updateMemesImg(
        canvas,
        image,
        topTextInput.value,
        bottomTextInput.value,
        topTextSize.value,
        bottomTextSize.value,
        topTextX.value,
        topTextY.value,
        bottomTextX.value,
        bottomTextY.value
      )
    )
  );
};

// 初始化設定
const init = (function () {
  image.src = "https://i.imgflip.com/2ybua0.png";
  topTextInput.value = "頂部文字";
  bottomTextInput.value = "底部文字";
})();

///////////////////////////////////////////////////////
///////////////////事 件 監 聽 器//////////////////////
/////////////////////////////////////////////////////

memesGallery.addEventListener("click", function (e) {
  if (!e.target.src) return;

  image.src = e.target.src;
});

image.addEventListener("load", function () {
  updateMemesImg(
    canvas,
    image,
    topTextInput.value,
    bottomTextInput.value,
    topTextSize.value,
    bottomTextSize.value,
    topTextX.value,
    topTextY.value,
    bottomTextX.value,
    bottomTextY.value
  );
});

// 顯示從本地端上傳的圖片
imgFileInput.addEventListener("change", function () {
  const imgDataUrl = URL.createObjectURL(imgFileInput.files[0]);
  image.src = imgDataUrl;
});

topTextInput.addEventListener("input", () =>
  updateMemesImg(
    canvas,
    image,
    topTextInput.value,
    bottomTextInput.value,
    topTextSize.value,
    bottomTextSize.value,
    topTextX.value,
    topTextY.value,
    bottomTextX.value,
    bottomTextY.value
  )
);

bottomTextInput.addEventListener("input", () =>
  updateMemesImg(
    canvas,
    image,
    topTextInput.value,
    bottomTextInput.value,
    topTextSize.value,
    bottomTextSize.value,
    topTextX.value,
    topTextY.value,
    bottomTextX.value,
    bottomTextY.value
  )
);

// range操作
addMultipleEventListener(topTextSize);
addMultipleEventListener(bottomTextSize);
addMultipleEventListener(topTextX);
addMultipleEventListener(topTextY);
addMultipleEventListener(bottomTextX);
addMultipleEventListener(bottomTextY);

// 下載圖片
btn.addEventListener("click", function (e) {
  canvas.toBlob(
    (blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "memes.jpeg";
      link.click();

      // 使用完的物件記得手動清除，不然GC不會幫你清
      URL.revokeObjectURL(url);
    },
    "image/jpeg",
    1
  );
});
