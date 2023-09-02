function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    console.log(data);
    const picture = `assets/photographers/${portrait}`;

    /**
     * Generates the DOM element for a user card.
     *
     * @return {HTMLDivElement} The created DOM element.
     */
    function getUserCardDOM() {
        const div = document.createElement("div");
    div.classList.add("photographer__container");
    const link = document.createElement("a");
    link.classList.add("photographer__link");
    link.href = `photographer.html?id=${id}`;
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.classList.add("photographer_card_profilepicture");
    const h2 = document.createElement("h2");
    const h4 = document.createElement("h4");
    const h5 = document.createElement("h5");
    const h6 = document.createElement("h6");
    h2.textContent = name;
    h4.textContent = city + ", " + country;
    h5.textContent = tagline;
    h5.classList.add("photographer_tagline");
    h6.textContent = price + " € / jour";
    article.appendChild(img);
    // article.appendChild(h2);
    article.appendChild(h4);
    article.appendChild(h5);
    article.appendChild(h6);
    link.appendChild(img);
    link.appendChild(h2);
    div.appendChild(link);
    div.appendChild(article);
    return div;
    }

    
    /**
     * Generates the DOM element for the photographer data.
     *
     * @return {Element} The DOM element containing the photographer data.
     */
    function getPhotographerDataDOM() {
      const header = document.createElement('div');

      const container = document.createElement('div');
      const h1 = document.createElement('h1');
      h1.textContent = name;
      const h2 = document.createElement('h2');
      h2.textContent = city + ", " + country;
      h2.className = "red";
      const p2 = document.createElement('p');
      p2.textContent = tagline;

      const btn = document.createElement('button');
      btn.setAttribute("class", "contact_button");
      btn.setAttribute("type", "button");
      btn.setAttribute("onclick", "displayModal()");
      btn.textContent = "Contactez-moi";

      const img = document.createElement('img');
      img.setAttribute("src", picture);
      img.setAttribute('alt', name);

      container.appendChild(h1);
      container.appendChild(h2);
      container.appendChild(p2);
      header.appendChild(container);
      header.appendChild(btn);
      header.appendChild(img);

      return (header);
  }




    return { name, picture, getUserCardDOM, getPhotographerDataDOM }
}

