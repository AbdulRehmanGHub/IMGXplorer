// Access Key:  GZ6KFar1nVj8QBLdCSy33Bj8CsWn6JIA9Mu5sNBR2e4
// URL:         https://api.unsplash.com/search/photos?page=1&query=office

let page = 1;
let accessKey = "GZ6KFar1nVj8QBLdCSy33Bj8CsWn6JIA9Mu5sNBR2e4";

let inputField = document.querySelector("#inp");
let searchBtn = document.querySelector("#searchBtn");
let imgg = document.querySelector(".imgs");
let pageBtns = document.querySelector(".pageBtns");
let prevBtn = document.querySelector("#prevBtn");
let nextBtn = document.querySelector("#nextBtn");

let getAPI = async (value) => {
  let url = `https://api.unsplash.com/search/photos?page=${page}&query=${value}&client_id=${accessKey}`;
  let response = await fetch(url);
  let data = await response.json();
  let array = data.results;

  prevBtn.disabled = page === 1;
  nextBtn.disabled = array.length === 0;

  imgg.innerHTML = "";

  array.map((oneValue) => {
    let newImg = document.createElement("div");
    newImg.className = "imageContainer2";

    let img = document.createElement("img");
    img.src = oneValue.urls.small;
    img.className = "imgInContainer";

    let imgDesc = document.createElement("p");
    imgDesc.innerHTML = oneValue.alt_description;
    imgDesc.id = "img-description";

    imgg.append(newImg);
    newImg.appendChild(img);
    newImg.append(imgDesc);
  });
};

searchBtn.addEventListener("click", () => {
  let inpValue = inputField.value;
  if (inpValue == "") {
    alert("Please write something to search!");
  } else {
    page = 1;
    getAPI(inpValue);
    pageBtns.style.display = "flex";
  }
});

inputField.addEventListener("keypress", (e) => {
  let inpValue = inputField.value;
  if (e.key === "Enter") {
    page = 1;
    getAPI(inpValue);
    setInterval(() => {
      pageBtns.style.display = "flex";
    }, 1000);
  }
});

prevBtn.addEventListener("click", () => {
  if (page > 1) {
    page--;
    getAPI(inputField.value);
  }
});

nextBtn.addEventListener("click", () => {
  page++;
  getAPI(inputField.value);
});
