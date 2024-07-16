const COLLECTIONS_DUMP = COLLECTIONS.slice(); // Create a copy of original collections

const filterCategoriesEl = document.querySelector(".filter_categories");
let currentCategory = "all";

function createCategories() {
    const categorySwitcher = {
        all: "All",
        sport: "Sport",
        collectibles: "Collectibles",
        art: "Art",
        photography: "Photography",
        music: "Music",
    };

    Object.keys(categorySwitcher).forEach((category) => {
        let categoryHTML = `<li class="${category === "all" ? "active" : ""}" onclick="filterCategories(this)" data-category="${category}">${categorySwitcher[category]}</li>`;
        filterCategoriesEl.insertAdjacentHTML("beforeend", categoryHTML);
    });
}

function filterCategories(categoryEl) {
    const lastActiveEl = document.querySelector("li.active");
    lastActiveEl.classList.remove("active");
    categoryEl.classList.add("active");
    currentCategory = categoryEl.dataset.category;
    listCollections();
}

function listCollections() {
    const collectionEl = document.querySelector(".collections");
    collectionEl.innerHTML = "";
    const filteredCollections = (currentCategory === "all") ? COLLECTIONS_DUMP : COLLECTIONS_DUMP.filter((collection) => collection.category === currentCategory);

    filteredCollections.forEach((collection) => {
        let collectionsItemHtml = `<div class="collections_item">
            <a class="collection_container" href="${collection.link}">
                <img class="collection_img" src="${collection.img}" />
                <div class="collection_info">
                    <strong class="collection_title">${collection.name}</strong>
                    <br/>
                    <span>${collection.author}</span>
                </div>
                <div class="collection_price">
                    <strong>${collection.price} ETH</strong>
                    <img src="./images/ethereum-logo.png" width="24" height="24" />
                </div>
                <button>Show Detail</button>
            </a>
        </div>`;
        collectionEl.insertAdjacentHTML("beforeend", collectionsItemHtml);
    });
}

function searchCollections(searchKey) {
    const filteredCollections = COLLECTIONS_DUMP.filter((c) => c.name.toLowerCase().includes(searchKey.toLowerCase()));
    listCollections(filteredCollections);
}

listCollections();
createCategories();
