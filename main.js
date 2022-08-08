/**
 * TODO:
 * Save tileList in local storage
 * Style card and menus
 * Go further on tiles CRUD
 * Improve categories
 * 
 */

/**
 * HELPERS
 */
const removeItemFromArr = (arr, item) => {
    let i = arr.indexOf(item);
    i !== -1 && arr.splice(i, 1);
};

/**
 * Card component
 * @param {tileImg, tileName, tileUrl, tileCategory} props
 * @returns string
 */
const Card = (props) => {
    let { tileImg, tileName, tileUrl, tileCategory, tileLike, tileDate } = props;

    tileLike ? tileLike = `<span>👍</span>` : tileLike = `<span>👎</span>`

    return `
    <div class="tileCard">
      <img class="tile-img" src="${tileImg}">
      <h1 class="title">${tileName}</h1>
      <p class="tile-url"><a href="${tileUrl}" target="_blank">${tileUrl}</a></p>
      <p>Category: ${tileCategory}</p>
      <p>${tileLike}</p>
      <p>Create date: ${tileDate}</p>
      

      <button class="actionBtn">
        <a href="${tileUrl}" target="_blank">Go</a>
      </button>
  </div>`;
};

/**
 * Render engine
 */

const renderEngine = (elementWrapper) => {
    let elementToRenderOn;

    const renderApi = {
        to: (tagName, attr, attrName) => {
            elementToRenderOn = document.createElement(tagName);
            elementToRenderOn.setAttribute(attr, attrName);
            return renderApi;
        },

        render: (contentToRender) => {
            elementToRenderOn.innerHTML = contentToRender;
            elementWrapper.appendChild(elementToRenderOn);
        },
    };

    return renderApi;
};

/*************
var array = localStorage.getItem('myArray');
// Se parsea para poder ser usado en js con JSON.parse :)
array = JSON.parse(array);

localStorage.setItem('myArray', JSON.stringify(array));

/**
 * VARIABLES
 */
let catList = []
let tilesList = []
// function checkCatList() {
//   if (localStorage.getItem('Categories')) {
//     catList = JSON.parse(localStorage.getItem('Categories'))
//     console.log(typeof catList);
    
//   } else {
//     catList = []
//     console.log(typeof catList);
//   }
// }

// checkCatList()

// checkAndParseArrFromStorage(catList)
console.log(catList)

const root = document.getElementById("root"); // captures root element
let catMenu = document.createElement("menu"); // creates category buttons catMenu

let catListContainer = document.createElement("container"); // creates a categories list container
catListContainer.setAttribute("id", "catListContainer");

let catListContainerList = document.createElement("ul");
catListContainer.appendChild(catListContainerList);
root.appendChild(catListContainer);

/**
 * CATEGORIES MENU
 */
renderEngine(catMenu)
    .to("button", "id", "createCatBtn")
    .render("Create Category");

renderEngine(catMenu)
    .to("button", "id", "deleteCatBtn")
    .render("Delete Category");

renderEngine(catMenu)
    .to("button", "id", "showCatBtn")
    .render("Show Category");

root.appendChild(catMenu);

createCatBtn.addEventListener("click", () => {
    renderEngine(root)
        .to("dialog", "id", "createCatDialog")
        .render(
            `
            <input type="text" id="createCatInput" placeholder="Type new Category">
            <button id="createCatBtnDialog">Ok</button>
            <button id="cancelCreateCatBtn">Cancel</button>
            `
        );

    let createCatDialog = document.getElementById("createCatDialog");

    let cancelCreateCatBtn = document.getElementById("cancelCreateCatBtn");
    cancelCreateCatBtn.addEventListener("click", () => {
        createCatDialog.close();
        root.removeChild(createCatDialog);
    });

    createCatDialog.showModal();

    let createCatBtnDialog = document.getElementById("createCatBtnDialog");

    createCatBtnDialog.addEventListener("click", () => {
        let createCatInput = document.getElementById("createCatInput").value;
        console.log(createCatInput);
        catList.push(createCatInput);
        localStorage.setItem('Categories', JSON.stringify(catList))
        catListContainerList.innerHTML = `Categories: <li>${catList}</li>`;
        // localStorage.setItem('Categories', JSON.stringify(catList))
        console.log(catList);
        createCatDialog.close();
        root.removeChild(createCatDialog);
    });
});

deleteCatBtn.addEventListener("click", () => {
  catList = JSON.parse(localStorage.getItem('Categories'))
    renderEngine(root)
        .to("dialog", "id", "deleteCatDialog")
        .render(
            `
          <span id="categoriesSpanList">Categories: ${catList}
          <input type="text" id="deleteCatInput" placeholder="Delete Category">
          <button id="deleteCatBtnDialog">Ok</button>
          <button id="cancelDeleteCatBtn">Cancel</button>
          `
        );

    let deleteCatDialog = document.getElementById("deleteCatDialog");

    let cancelDeleteCatBtn = document.getElementById("cancelDeleteCatBtn");
    cancelDeleteCatBtn.addEventListener("click", () => {
        deleteCatDialog.close();
        root.removeChild(deleteCatDialog);
    });

    deleteCatDialog.showModal();

    let deleteCatBtnDialog = document.getElementById("deleteCatBtnDialog");
    console.log(deleteCatBtnDialog);

    deleteCatBtnDialog.addEventListener("click", () => {
        let deleteCatInput = document.getElementById("deleteCatInput").value;

        removeItemFromArr(catList, deleteCatInput);

        localStorage.setItem('Categories', JSON.stringify(catList))

        let categoriesSpanList = document.getElementById("categoriesSpanList");
        categoriesSpanList.innerHTML = `Categories: ${catList}`;
        catListContainerList.innerHTML = `Categories: <li>${catList}</li>`;
        deleteCatDialog.close();
        root.removeChild(deleteCatDialog);
    });
});

showCatBtn.addEventListener("click", () => {
    catList = JSON.parse(localStorage.getItem('Categories'))
    console.log(catList)
    renderEngine(root)
        .to("dialog", "id", "showCatDialog")
        .render(
            `
      <div id="showCatContainer">
          Categories:
          ${catList}
          </div>
          <button id="okShowButton">OK</button>
      `
        );

    showCatDialog.showModal();
    let okShowButton = document.getElementById("okShowButton");
    okShowButton.addEventListener("click", () => {
        showCatDialog.close();
        root.removeChild(showCatDialog);
    });
});

/**
 * TILES MENU
 */
let id = 0;

let tilesMenu = document.createElement("menu"); // creating tiles buttons menu

renderEngine(tilesMenu)
    .to("button", "id", "createTileBtn")
    .render("Create Tile");

root.appendChild(tilesMenu);

let createTileBtn = document.getElementById("createTileBtn");

let tilesContainer = document.createElement('div')
tilesContainer.setAttribute('id', 'tilesContainer')
root.appendChild(tilesContainer)

createTileBtn.addEventListener("click", () => {
    renderEngine(root)
        .to("dialog", "id", "createTileDialog")
        .render(
            `
          <label for="tileName">Name:</label>
          <input type="text" name="tileName" id="tileName" placeholder="Name">

          <label for="tileUrl">URL:</label>
          <input type="text" name="tileUrl" id="tileUrl" placeholder="URL"> 

          <label for="selectCategory"></label>
          <select name="selectCategory" id="selectCategory"></select>
          
          
          <input type="text" name="tileImg" id="tileImg" placeholder="Paste image URL">

          <label for="like">Like</label>
          👍<input type="radio" name="like" value="like">
          👎<input type="radio" name="like" value="unlike">
          <button id="createTileBtnDialog">Create Tile</button>
          <button id="cancelTileBtn">Cancel</button>
        `
        );

    catList = JSON.parse(localStorage.getItem('Categories'))

    let select = document.getElementById("selectCategory");
      catList.forEach((cat) => {
        select.innerHTML += `<option>${cat}</option>`;
    });



    let createTileDialog = document.getElementById("createTileDialog");

    let cancelTileBtn = document.getElementById("cancelTileBtn");
    cancelTileBtn.addEventListener("click", () => {
        createTileDialog.close();
        root.removeChild(createTileDialog);
    });

    createTileDialog.showModal();

    let createTileBtnDialog = document.getElementById("createTileBtnDialog");
    createTileBtnDialog.addEventListener("click", () => {
        const tileName = document.getElementById("tileName").value;
        const tileUrl = document.getElementById("tileUrl").value;
        const tileCategory = document.getElementById("selectCategory").value;
        const tileImg = document.getElementById("tileImg").value;
        const tileLike = document.querySelector('[name="like"]').checked;
        let date = new Date().toDateString();

        let newTile = {
            tileName: tileName,
            tileUrl: tileUrl,
            tileCategory: tileCategory,
            tileImg: tileImg,
            tileLike: tileLike,
            tileDate: date,
            id: id++,
        };
        tilesList.push(newTile)


        renderEngine(tilesContainer).to("div", "class", "tile").render(Card(newTile));
        createTileDialog.close();
        root.removeChild(createTileDialog);
    });
});
