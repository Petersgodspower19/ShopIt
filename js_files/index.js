import { itemsForSale } from './itemsForSale.js';



document.addEventListener('DOMContentLoaded', (event) => {
  let productCards = document.getElementById("grid-section");
  const headerDropDown = document.getElementById("Categories");
  const sidebarDropDown = document.getElementById("sidebar-dropDown");

  const openBar = () => {
    document.getElementById("sideBar").style.width = "200px";
    document.getElementById("sideBar").style.padding = "2rem 2rem";
  };

  const closeBar = () => {
    document.getElementById("sideBar").style.width = "0";
    document.getElementById("sideBar").style.padding = "0";
  };

  let priceBtns = document.querySelectorAll(".pricebtn");
  priceBtns.forEach((button) => {
    button.addEventListener("click", function() {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have to log in first",
        footer: '<a href="log-in.html">LOG IN OR SIGN UP!</a>'
      });
    });
  });

  const priceFunction = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You have to log in first",
      footer: '<a href="log-in.html">LOG IN OR SIGN UP!</a>'
    });
  };

  const { homeProducts } = itemsForSale;

  const itemCards = (arr = homeProducts) => {
    productCards.innerHTML = arr.map(({ image, percentageOff, description, newprice, oldprice, Isfor }) => {
      return `<div>
        <article>
          <p class="off">-${percentageOff}</p>
          <img src="${image}" alt=""/>
        </article>
        <p>${description}</p>
        <article class="price">
          <p><button onclick="priceFunction()" class="pricebtn">${newprice}</button></p>
          <p class="old-price">${oldprice}</p>
        </article>
      </div>`;
    }).join("");
    productCards.classList.add("animate");
  };

  headerDropDown.addEventListener("change", (e) => {
    productCards.innerHTML = "";
    productCards.classList.add("animate");
    switch (e.target.value) {
      case "men":
        itemCards(homeProducts.filter(item => item.Isfor === "men"));
        break;
      case "women":
        itemCards(homeProducts.filter(item => item.Isfor === "women"));
        break;
      default:
        itemCards(homeProducts);
        break;
    }
  });
  sidebarDropDown.addEventListener("change", (e) => {
    productCards.innerHTML = "";
    productCards.classList.add("animate");
    switch (e.target.value) {
      case "men":
        itemCards(homeProducts.filter(item => item.Isfor === "men"));
        break;
      case "women":
        itemCards(homeProducts.filter(item => item.Isfor === "women"));
        break;
      default:
        itemCards(homeProducts);
        break;
    }
  });


  const contactUs = () => {
    Swal.fire({
    icon: "error",
    title: "Our Contact",
    text: 'You can contact us either by calling +77456673778',
    footer: '<a href="contact.html">For more details check our our contact page</a>'
  });
}
    
  

  let formBtn = document.getElementById("form-btn");
  let emailValue = document.getElementById("email");
  let errorMessage = document.getElementById("errors");

  formBtn.addEventListener("click", function(event) {
    event.preventDefault();
    checkErrors(emailValue, errorMessage);
  });

  const checkErrors = (input, errors) => {
    if (input.value.trim() === "" || input.value.length < 7) {
      errors.style.display = "block";
      input.classList.add("error");
    } else {
      errors.style.display = "none";
      input.classList.remove("error");

      Swal.fire({
        title: 'Success!',
        text: 'You have successfully subscribed',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    }
  };

  window.openBar = openBar;
  window.closeBar = closeBar;
  window.priceFunction = priceFunction;
  window.contactUs = contactUs;
  window.sidebarDropDown = sidebarDropDown;
});
