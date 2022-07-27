const form = document.getElementById("form");
const container = document.getElementById("container");
const createCatBtn = document.getElementById("createCategory");
const deleteCatBtn = document.getElementById("deleteCategory");
const showCatBtn = document.getElementById("showCategory");
const createTileBtn = document.getElementById("createButton");
let tilesList = [];
let categories = [];
let id = 0;

createCatBtn.addEventListener("click", () => {
  let createTileConfirm = true
  do {
  let newCat = prompt("Type new Category name");
  categories.push(newCat);
  alert(`New ${newCat} category added`);
  console.log(categories);
  createTileConfirm = confirm('Create another?') 
} while(createTileConfirm == true)

const select = document.getElementById('selectCategory')
categories.forEach(category => {
    let option = document.createElement('option')
    option.innerHTML = category
    select.appendChild(option)
});
});

deleteCatBtn.addEventListener("click", () => {
  console.log(`CATEGORIES:
  ${categories}`);
  let toDeleteCat = prompt("Type which Category delete");
  const removeItemFromArr = (arr, item) => {
    let i = arr.indexOf(item);
    i !== -1 && arr.splice(i, 1);
  };
  removeItemFromArr(categories, toDeleteCat);
  console.log(`
  Category ${toDeleteCat} has been succesfully deleted. 
  CATEGORIES:
  ${categories}
  `);
});

showCatBtn.addEventListener("click", () => {
  let catTable = document.createElement("table");
  catTable.innerHTML = 'Categories:'
  categories.forEach((category) => {
    let catTableRow = document.createElement("tr");
    let cat = document.createElement("td");
    cat.innerHTML = category;
    catTableRow.appendChild(cat);

    catTable.appendChild(catTableRow);
    container.appendChild(catTable);
  });
  console.table(categories)
});

createTileBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const tileName = document.getElementById("tileName").value;
  const tileUrl = document.getElementById("tileUrl").value;
  const tileCategory = document.getElementById("selectCategory").value;
  const tileImg = document.getElementById("tileImg").value;
  const tileLike = document.querySelector('[name="like"]').checked;

  const newTileDiv = document.createElement("div");

  let newTile = {
    tileName: tileName,
    titleUrl: document.getElementById("tileUrl").value,
    category: tileCategory,
    tileImg: tileImg,
    like: tileLike,
    id: id++,
  };

  form.reset();
  tilesList.push(newTile);
  console.log(tilesList);

  newTileDiv.innerHTML = `
    <div class="card">
    <img class="tile-img" src="${tileImg}">
    <h1 class="title">${tileName}</h1>
    <p class="tile-url">${tileUrl}</p>
    <p>${tileCategory}</p>
  
  <button class="actionBtn"><a href="${tileUrl}" target="_blank">Go</a></button>
  </div>
  `;
  container.appendChild(newTileDiv);
});
