let lightboxOpened = false;

Init();

function Init() {
    const btnClose = document.querySelector(".fixed");
    btnClose.addEventListener("click", CloseLightBox);

    const btnPrevious = document.querySelector(".controls-left");
    btnPrevious.addEventListener("click", DisplayPreviousMedia);

    const btnNext = document.querySelector(".controls-right");
    btnNext.addEventListener("click", DisplayNextMedia);

    // event listener sur touche navigation lightbox
    window.addEventListener("keydown", function (event) {
        if (lightboxOpened) {
            if (event.code === "ArrowLeft") {
                // Handle "left"
                DisplayPreviousMedia();
            } else if (event.code === "ArrowRight") {
                // Handle "right"
                DisplayNextMedia();
            } else if (event.code == "Escape") {
                CloseLightBox();
            }
        }
    });
}

/**
 * event listener fermeture  lightbox
 */
function CloseLightBox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", true);

    const main = document.getElementById("main");
    main.setAttribute("aria-hidden", false);

    lightboxOpened = false;
}

function DisplayPreviousMedia() {
    // on filtre les photos du photographe
    const photoDuPhotographe = photosFromJSON.media.filter(media => media.photographerId == getPhotographerId());

    // on décremente l'index de la photo de la lightbox
    DecrementSelectedMedia(photoDuPhotographe);

    // on affiche le nouveau media
    DisplayMedia(photoDuPhotographe[selectedMedia].image, selectedPhotographer, photoDuPhotographe[selectedMedia].video, photoDuPhotographe[selectedMedia].title);

}

function DisplayNextMedia() {
    // on filtre les photos du photographe
    const photoDuPhotographe = photosFromJSON.media.filter(media => media.photographerId == getPhotographerId());

    // on incrémente l'index de la photo de la lightbox
    IncrementSelectedMedia(photoDuPhotographe);

    // on affiche le nouveau media
    DisplayMedia(photoDuPhotographe[selectedMedia].image, selectedPhotographer, photoDuPhotographe[selectedMedia].video, photoDuPhotographe[selectedMedia].title);
}

/**
 *  incrémente l'index de la photo de la lightbox
 */
function IncrementSelectedMedia(photoDuPhotographe) {
    if (selectedMedia == photoDuPhotographe.length - 1) {
        // on repart du premier élément de la liste
        selectedMedia = 0;
    } else {
        // on incrémente l'index
        selectedMedia++;
    }
}

/**
 *  décrémente l'index de la photo de la lightbox
 */
function DecrementSelectedMedia(photoDuPhotographe) {
    if (selectedMedia == 0) {
        // on repart du premier élément de la liste
        selectedMedia = photoDuPhotographe.length - 1;
    } else {
        // on incrémente l'index
        selectedMedia--;
    }
}