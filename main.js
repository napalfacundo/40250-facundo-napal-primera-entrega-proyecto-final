/**
 * 
 * Save data in local storage 
 * Style card and menus
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
  const { tileImg, tileName, tileUrl, tileCategory, tileDate } = props;

  return `
    <div class="tileCard">
      <img class="tile-img" src="${tileImg}">
      <h1 class="title">${tileName}</h1>
      <p class="tile-url">${tileUrl}</p>
      <p>${tileCategory}</p>
      <p>${tileDate}</p>
      

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
      to: (tagName) => {
          elementToRenderOn = document.createElement(tagName);
          return renderApi;
      },

      render: (contentToRender, attr, attrName) => {
          elementToRenderOn.innerHTML = contentToRender;
          elementToRenderOn.setAttribute(attr, attrName);
          elementWrapper.appendChild(elementToRenderOn);
      },
  };

  return renderApi;
};

/**
* VARIABLES
*/
let catList = []; // category list
const root = document.getElementById("root"); // capturing root element
let catMenu = document.createElement("menu"); // creating category buttons catMenu

let catListContainer = document.createElement("container");
catListContainer.setAttribute("id", "catListContainer");

let catListContainerList = document.createElement("ul");
catListContainer.appendChild(catListContainerList);
root.appendChild(catListContainer);

/**
* CATEGORIES catMenu
*/
renderEngine(catMenu)
  .to("button")
  .render("Create Category", "id", "createCatBtn");

renderEngine(catMenu)
  .to("button")
  .render("Delete Category", "id", "deleteCatBtn");

renderEngine(catMenu)
  .to("button")
  .render("Show Category", "id", "showCatBtn");

root.appendChild(catMenu);

createCatBtn.addEventListener("click", () => {
  renderEngine(root)
      .to("dialog")
      .render(
          `
<input type="text" id="createCatInput" placeholder="Type new Category">
  <span>
  <button id="createCatBtnDialog">Ok</button>
  <button id="cancelCreateCatBtn">Cancel</button>`,
          "id",
          "createCatDialog"
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
      catListContainerList.innerHTML = `Categories: <li>${catList}</li>`;
      // localStorage.setItem('Categories', JSON.stringify(catList))
      console.log(catList);
      createCatDialog.close();
      root.removeChild(createCatDialog);
  });
});

deleteCatBtn.addEventListener("click", () => {
  renderEngine(root)
      .to("dialog")
      .render(
          `
          <span id="categoriesSpanList">Categories: ${catList}
          <input type="text" id="deleteCatInput" placeholder="Delete Category">
          <button id="deleteCatBtnDialog">Ok</button>
          <button id="cancelDeleteCatBtn">Cancel</button>
          `,
          "id",
          "deleteCatDialog"
      );
  
  let deleteCatDialog = document.getElementById('deleteCatDialog')

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

      let categoriesSpanList = document.getElementById("categoriesSpanList");
      categoriesSpanList.innerHTML = `Categories: ${catList}`;
      catListContainerList.innerHTML = `Categories: <li>${catList}</li>`;
      deleteCatDialog.close();
      root.removeChild(deleteCatDialog);
  });
});

showCatBtn.addEventListener("click", () => {
  renderEngine(root)
      .to("dialog")
      .render(
          `
<div id="showCatContainer">
     Categories:
     ${catList}
  </div>
  <button id="okShowButton">OK</button>
  `,
          "id",
          "showCatDialog"
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
  .to("button")
  .render("Create Tile", "id", "createTileBtn");

root.appendChild(tilesMenu);

let createTileBtn = document.getElementById("createTileBtn");
createTileBtn.addEventListener("click", () => {
  renderEngine(root)
      .to("dialog")
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
        `,
          "id",
          "createTileDialog"
      );
  let createTileDialog = document.getElementById("createTileDialog")
  
  let cancelTileBtn = document.getElementById("cancelTileBtn")
  cancelTileBtn.addEventListener('click', () => {
      createTileDialog.close();
      root.removeChild(createTileDialog)
  })

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
          titleUrl: tileUrl,
          tileCategory: tileCategory,
          tileImg: tileImg,
          tileLike: tileLike,
          tileDate: date,
          id: id++,
      };
      renderEngine(root).to("div").render(Card(newTile));
      createTileDialog.close()
      root.removeChild(createTileDialog)
  });
});
