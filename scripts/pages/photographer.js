let photographerName = "";
let photosFromJSON = "";
/**
 * Récupération de l'id du photographe depuis l'url
 */
function getPhotographerId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')

    return id;
}

/**
 * Récupération des données du photographe depuis le fichier JSON
 */
async function getPhotographerInfos(idPhotographer) {
    const photographers = await getJSON();

    const dataPhotographer = photographers.photographers.filter(photographers => photographers.id == idPhotographer);

    photographerName = dataPhotographer[0].name;

    return dataPhotographer[0];
}

/** 
 * Affichage des données du photographe
*/
async function displayInfos(photographer) {
    const photographerHeader = document.querySelector(".photograph-header");

    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getPhotographerDataDOM();
    photographerHeader.appendChild(userCardDOM);

    // dans la modale
    const photographerNameElt = document.getElementById("photographer-name");
    photographerNameElt.textContent = photographer.name;
};

/**
 * Récupération des photos du photographe depuis le fichier JSON
 */
async function getPhotographerPhotos(id) {
    if (photosFromJSON == "") {
        const photographers = await getJSON();
        photosFromJSON = photographers;
        return photographers.media.filter(media => media.photographerId == id);
    } else {
        return photosFromJSON.media.filter(media => media.photographerId == id);
    }
}

/** 
 * Affichage des photos du photographe
*/
function displayPhotos(photos) {
    const listPhotos = document.querySelector(".photos-list");
    listPhotos.innerHTML = '';

    let cptr = 0;
    photos.forEach((photo) => {
        const photosModel = mediaFactory(photo, photographerName, cptr);
        const photosDOM = photosModel.getPhotosDOM();
        listPhotos.appendChild(photosDOM);
        cptr++;
    });
};

/** 
 * Affichage des prix du photographe
*/
function displayPrice(price) {
    const priceHtml = document.getElementById("price");
    priceHtml.textContent = price + "€ / jour";
};

/** 
 * Affichage des likes du photographe
*/
function displayLikesTotal(likesTotal) {
    const likesTotalHtml = document.getElementById("likesTotal");
    likesTotalHtml.textContent = likesTotal;
};

/** 
 * Calcul des likes du photographe
*/
async function calculNbLikes(photos) {
    let totLikes = 0;
    for (let index = 0; index < photos.length; index++) {
        totLikes += photos[index].likes;
    }
    return totLikes;
};

/**
 * réordonne les médias
 */
async function OrderMedias() {
    const tri = document.getElementById("tri").value;
    switch (tri) {
        case "date":
            const photosOrderedByDate = await OrderByDate();
            displayPhotos(photosOrderedByDate);
            break;
        case "titre":
            const photosOrderByTitle = await OrderByTitle();
            displayPhotos(photosOrderByTitle);
            break;
        case "popularite":
            const photosOrderByLikes = await OrderByLikes();
            displayPhotos(photosOrderByLikes);
            break;
        default:
            break;
    }
}

/**
 * réordonne les médias par titre
 */
async function OrderByTitle() {
    const photographers = await getJSON();

    const photos = photographers.media.filter(media => media.photographerId == getPhotographerId());
    const photoOrdered = photos.sort((a, b) => {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    });
    return photoOrdered;
}

/**
 * réordonne les médias par date
 */
async function OrderByDate() {
    const photographers = await getJSON();

    const photos = photographers.media.filter(media => media.photographerId == getPhotographerId());
    const photoOrdered = photos.sort(function (a, b) {
        return a.date - b.date;
    });
    return photoOrdered;
}

/**
 * réordonne les médias par likes
 */
async function OrderByLikes() {
    const photographers = await getJSON();

    const photos = photographers.media.filter(media => media.photographerId == getPhotographerId());
    const photoOrdered = photos.sort(function (a, b) {
        return b.likes - a.likes;
    });
    return photoOrdered;
}

/**
 * recupère les données du fichier JSON
 */
async function getJSON() {
    const reponse = await fetch("data/photographers.json");
    const photographers = await reponse.json();
    return photographers;
}

/**
 * Récupère les données du photographe
 */
async function init() {

    EventOrderMedias();
    EventCloseModale();

    const id = getPhotographerId();

    const data = await getPhotographerInfos(id);
    //console.log(getPhotographerInfos(id));
    displayInfos(data);

    const photos = await getPhotographerPhotos(id);
    //console.log(getPhotographerPhotos(id));
    displayPhotos(photos);


    displayPrice(data.price);
    //console.log(calculNbLikes(photos));
    displayLikesTotal(await calculNbLikes(photos));
};

init();

/**
 * event listener fermeture modale contact
 */
function EventCloseModale() {
    const modalClose = document.getElementById("modale-close");
    modalClose.addEventListener("click", closeModal);
}

/**
 * event listener fermeture modale contact
 */
function EventOrderMedias() {
    const modalClose = document.querySelector(".select");
    modalClose.addEventListener("change", OrderMedias);
}