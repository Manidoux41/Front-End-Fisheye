let selectedMedia = 0;
let selectedPhotographer = "";

/** pattern factory */
function mediaFactory(data, name, cptr) {
    const { photographerId, title, image, video, likes, id } = data;

    // liste photos constructor
    function getPhotosDOM() {
        const article = document.createElement('article');
        let img = document.createElement('img');
        img.setAttribute('alt', name);
        img.setAttribute('tabindex', '0');

        if (image === undefined) {
            img.setAttribute('role', "navigation");
            let picture = `assets/photos/${name}/${video}`;
            img = document.createElement('video');
            img.setAttribute("src", picture);
            img.setAttribute('alt', name + " " + title);
            img.addEventListener("click", function () {
                ClickOnMedia(title, name, image, video, cptr);
            });

        } else {
            img.setAttribute('role', "navigation");
            let picture = `assets/photos/${name}/${image}`;
            img.setAttribute("src", picture);
            img.setAttribute('alt', name + " " + title);
            img.addEventListener("click", function () {
                ClickOnMedia(title, name, image, video, cptr);
            });
            img.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    ClickOnMedia(title, name, image, video, cptr);
                }
            });
        }

        const div = document.createElement('div');
        div.className = "red line marginV";

        const p = document.createElement('p');
        p.textContent = title;

        const div2 = document.createElement('div');
        div2.className = "line";

        const p2 = document.createElement('p');
        p2.textContent = likes;

        const linkLikes = document.createElement('a');
        linkLikes.setAttribute("role", "button");
        linkLikes.setAttribute("aria-label", "like");
        linkLikes.setAttribute("tabindex", "0");
        linkLikes.className = "red fa-solid fa-heart";

        linkLikes.addEventListener("click", function () {
            ClickLike(id);
        });
        linkLikes.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                ClickLike(id);
            }           
        });

        article.appendChild(img);
        article.appendChild(div);
        div.appendChild(p);
        div.appendChild(div2);
        div2.appendChild(p2);
        div2.appendChild(linkLikes);

        return (article);
    }

    return { getPhotosDOM }
}

/**
 * click ↑ nb de likes
 */

/* function ClickLike(idPhoto) {
    // On récupère le cookie des ID des photos déjà likées
    let cookieIds = GetCookie("ids");

    if (cookieIds == "") {
        // Si le cookie est vide, on écrit le premier ID liké dedans et on l'incrémente
        document.cookie = "ids=" + idPhoto;
        DisplayLikesChanges(idPhoto, 1);
    } else {
        // Sinon, on vérifie si l'ID a déjà été liké
        let tableauIds = cookieIds.split(",");
        if (tableauIds.includes(idPhoto.toString())) {
            // Si l'ID a déjà été liké, on le supprime du cookie et on le décrémente
            tableauIds = tableauIds.filter(item => item !== idPhoto.toString());
            document.cookie = "ids=" + tableauIds.join(",");
            DisplayLikesChanges(idPhoto, -1);
        } else {
            // Sinon, on l'ajoute au cookie et on l'incrémente
            document.cookie = "ids=" + cookieIds + "," + idPhoto;
            DisplayLikesChanges(idPhoto, 1);
        }
    }
} */



/**
 * MAJ affichage media et likes
 */
/* async function DisplayLikesChanges(idPhoto) {
    const id = getPhotographerId();
    const photos = await getPhotographerPhotos(id);

    // on fait les changements dans le json
    for (let index = 0; index < photos.length; index++) {
        if (photos[index].id == idPhoto) {
            photos[index].likes++;
        }

    }
    displayPhotos(photos);
    displayLikesTotal(await calculNbLikes(photos));
} */

function ClickLike(idPhoto) {
    // On récupère le cookie des ID des photos déjà likées
    let cookieIds = GetCookie("ids");

    if (cookieIds == "") {
        // Si le cookie est vide, on écrit le premier ID liké dedans et on l'incrémente
        document.cookie = "ids=" + idPhoto;
        DisplayLikesChanges(idPhoto, 1);
    } else {
        // Sinon, on vérifie si l'ID a déjà été liké
        let tableauIds = cookieIds.split(",");
        if (tableauIds.includes(idPhoto.toString())) {
            // Si l'ID a déjà été liké, on le supprime du cookie et on le décrémente
            tableauIds = tableauIds.filter(item => item !== idPhoto.toString());
            document.cookie = "ids=" + tableauIds.join(",");
            DisplayLikesChanges(idPhoto, -1);
        } else {
            // Sinon, on l'ajoute au cookie et on l'incrémente
            document.cookie = "ids=" + cookieIds + "," + idPhoto;
            DisplayLikesChanges(idPhoto, 1);
        }
    }
}

/**
 * MAJ affichage média et likes
 */
async function DisplayLikesChanges(idPhoto, increment) {
    // Ici, vous pouvez mettre à jour les likes dans votre système, par exemple, en interagissant avec une base de données, un stockage ou un JSON.

    // Supposons que vous ayez une fonction pour obtenir les photos du photographe.
    const photographerId = getPhotographerId();
    const photos = await getPhotographerPhotos(photographerId);

    for (let index = 0; index < photos.length; index++) {
        if (photos[index].id == idPhoto) {
            photos[index].likes += increment;
        }
        
    }

    // Ensuite, vous pouvez mettre à jour l'affichage des photos et le total des likes.
    displayPhotos(photos);
    displayLikesTotal(await calculNbLikes(photos));
}


/**
 * 
 * @param nomDuCookie 
 * @returns cookie 
 */
function GetCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * click affichage photo dans caroussel
 */
function ClickOnMedia(title, name, image, video, cptr) {
    DisplayLightBox();

    DisplayMedia(image, name, video, title);

    selectedMedia = cptr;
    selectedPhotographer = name;
}

function DisplayMedia(image, name, video, title) {
    const mediaContainer = document.getElementById("lightbox-media");
    mediaContainer.innerHTML = "";
    const mediaTitle = document.getElementById("lightbox-photo-title");
    if (image === undefined) {
        let picture = `assets/photos/${name}/${video}`;
        const media = document.createElement('video');
        media.setAttribute("src", picture);
        media.controls = true;
        mediaContainer.appendChild(media);
    } else {
        let picture = `assets/photos/${name}/${image}`;
        const media = document.createElement('img');
        media.setAttribute("src", picture);
        media.setAttribute('alt', title);
        mediaContainer.appendChild(media);
    }
    mediaTitle.textContent = title;
}

/**
 * display light box
 */
function DisplayLightBox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "block";
    lightbox.setAttribute("aria-hidden", false);
    lightboxOpened = true;

    const main = document.getElementById("main");
    main.setAttribute("aria-hidden", true);
}


