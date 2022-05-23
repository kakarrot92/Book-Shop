fetch("./books.json") //path to the file with json data
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // Get the main tag in HTML
    let main = document.getElementById("people");

    // Create H1 element
    let mainHeading = document.createElement("h1");
    mainHeading.className = "main-heading";
    mainHeading.innerText = "Welcome to amazing book shop!";
    main.append(mainHeading);

    

    // create container
    let container = document.createElement("div");
    container.className = "container";
    main.append(container);

    let formContainer = document.createElement("div");
    formContainer.className = "form-container";
    container.append(formContainer);

    // Div book catalog
    let bookCatalog = document.createElement("div");
    bookCatalog.className = "book-catalog";
    formContainer.append(bookCatalog);

    // h2 element
    let subheading = document.createElement("h2");
    subheading.className = "subheading";
    subheading.innerText = "Book Catalog";
    formContainer.append(subheading);

    let df = new DocumentFragment();

    df.appendChild(bookCatalog);

    formContainer.appendChild(df);

    //Book order list/cart
    let bookOrder = document.createElement("div");
    bookOrder.className = "book-order";
    container.append(bookOrder);

    let bookOrderHeading = document.createElement("h2");
    bookOrderHeading.className = "book-order-heading";
    bookOrderHeading.innerText = "Book Order";
    bookOrder.append(bookOrderHeading);

    let orderContent = document.createElement("div");
    orderContent.className = "order-content";
    bookOrder.append(orderContent);

    json.forEach((book) => {
      // div catalog content
      let catalogContent = document.createElement("div");
      catalogContent.className = "catalog-content";
      bookCatalog.append(catalogContent);

      // div book img
      let bookImg = document.createElement("div");
      bookImg.className = "book-img";
      catalogContent.append(bookImg);

      // img
      let image = document.createElement("img");
      image.setAttribute("src", `${book.imageLink}`);
      bookImg.append(image);

      // div book content
      let bookContent = document.createElement("div");
      bookContent.className = "book-content";
      catalogContent.append(bookContent);

      // div book text
      let bookText = document.createElement("div");
      bookText.className = "book-text";
      bookContent.append(bookText);

      // h2 element inside book text
      let title = document.createElement("h2");
      title.className = "title";
      title.innerText = `${book.author}`;
      bookText.append(title);

      // h4 element inside book text
      let bookName = document.createElement("h4");
      bookName.className = "book-name";
      bookName.innerText = `${book.title}`;
      bookText.append(bookName);

      // p element inside book text
      let price = document.createElement("p");
      price.className = "book-price";
      price.innerText = `$${book.price}`;
      bookText.append(price);

      // Buttons div
      let buttons = document.createElement("div");
      buttons.className = "buttons";
      bookContent.append(buttons);

      // a tag
      let showMore = document.createElement("a");
      showMore.className = "show-more";
      showMore.setAttribute("href", "#");
      showMore.innerText = "Show more";
      buttons.append(showMore);

      // button
      let addBtn = document.createElement("button");
      addBtn.className = "addBtn";
      addBtn.setAttribute("type", "button");
      addBtn.innerText = "Add to bag";
      buttons.append(addBtn);

      let description = document.createElement('p');
      description.className = 'description';
      description.innerText = `${book.description}`;
      showMore.append(description);
      description.style.display = 'none';

      
    });

    let modal = document.createElement('div');
    modal.className = 'modal';
    main.append(modal);

    let popUpModal = document.createElement('div');
    popUpModal.className = 'popUp';
    modal.append(popUpModal);
    

    let showMores = document.querySelectorAll('.show-more');
    for(showMore of showMores) {
      showMore.addEventListener('click', function () {
        let content = this.closest(".catalog-content");
        let author = content.querySelector(".title").innerText;
        let title = content.querySelector(".book-name").innerText;
        let description = content.querySelector('.description').innerText;
        let image = content.querySelector(".book-img").innerHTML;
  
        popUpModal.innerHTML += `
          <div class = "popUp-container">
            <div class= "popup-img">
              ${image}
            </div>
            <div class= "popup-text">
             
              <h2>${title}</h2>
              <p>${description}</p>
              
            </div>
            <span onclick="modalRemove(this)" class="close"><img src="./icons/xmark-solid.svg" alt=""></span>
          </div>
        `;
        document.querySelector('main').style.filter = 'blur(5px)';
        // overlay.style.display = 'block';
        
        document.querySelector('body').insertAdjacentElement('beforeend', popUpModal);
        popUpModal.style.display = 'block';
        
      })
     
    }

    let overlay = document.createElement('div');
    overlay.className = 'overlay';
    modal.append(overlay);

    

    let total = document.createElement("div");
    total.className = "total";
    bookOrder.append(total);

    let completeBtn = document.createElement('a');
    completeBtn.className = 'complete-btn';
    completeBtn.innerText = 'Purchase';
    bookOrder.append(completeBtn);

    let formPage = document.querySelector('.complete-btn');
    formPage.addEventListener('click', function() {
    formPage.setAttribute('href', './form.html');
})



    let orders = document.querySelector(".order-content");

    let btns = document.querySelectorAll(".buttons .addBtn");
    for (btn of btns) {
      btn.addEventListener("click", function () {
        let content = this.closest(".catalog-content");
        let author = content.querySelector(".title").innerText;
        let title = content.querySelector(".book-name").innerText;
        let price = content.querySelector(".book-price").innerText;
        let image = content.querySelector(".book-img").innerHTML;

        orders.innerHTML += `
      <div class = "order-container">
        <div class= "order-img">
          ${image}
        </div>
        <div class= "order-text">
          <h3>${author}</h3>
          <h2>${title}</h2>
          <p><span>${price}</span></p>
        </div>
        <span onclick="removeFromCart(this)" class="close"><img src="./icons/xmark-solid.svg" alt=""></span>
      </div>
      `;

        price = price.substring(1);
        price = parseInt(price);
        allTotal += price;

        document.querySelector(
          ".total"
        ).innerHTML = `Total: $<span>${allTotal}</span> <br><br>`;

      });
      
    }
  });

let allTotal = 0;

function removeFromCart(element) {
  let content = element.closest(".order-container");
  let price = content.querySelector("p span").innerText;
  
  price = price.substring(1);
  price = parseInt(price);
  allTotal = parseInt(allTotal);
  allTotal -= price;
  document.querySelector(".total").innerText = `Total: $${allTotal}`;
  content.remove();
}



function modalRemove (e) {
  let content = e.closest(".popUp-container");
  let close = document.querySelector('.popUp');
  close.style.display = 'none';
  document.querySelector('body').insertAdjacentElement('afterend', close);
  document.querySelector('main').style.filter = 'blur(0)';
 
  content.remove();
}

