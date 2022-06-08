const gallery = document.querySelector(".memes-gallery");

// 連接Memes API
const getJSON = (async function () {
  try {
    const res = await fetch("https://api.imgflip.com/get_memes");
    const data = await res.json();

    createGallery(data.data.memes);
  } catch (err) {
    console.log(err);
  }
})();

const createGallery = function (data) {
  const html = data
    .map(function (img) {
      return `
      <img class="gallery-img" src="${img.url}" alt="memes"/>
    `;
    })
    .join("");

  gallery.insertAdjacentHTML("afterbegin", html);
};
