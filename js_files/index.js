import { itemsForSale } from './itemsForSale.js';

document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById("cart-container");
  const productsContainer = document.getElementById("products-container");
  const productCards = document.getElementById("grid-section");
  const headerDropDown = document.getElementById("Categories");
  const sidebarDropDown = document.getElementById("sidebar-dropDown");
  const cartBtn = document.getElementById("cart-btn");
  const clearCartBtn = document.getElementById("clear-cart-btn");
  const totalNumberOfItems = document.getElementById("total-items");
  const cartSubTotal = document.getElementById("subtotal");
  const cartTaxes = document.getElementById("taxes");
  const cartTotal = document.getElementById("total");
  const showHideCartSpan = document.getElementById("show-and-hide");
  const newItemAlert = document.getElementById("cart-new");
  let isCartShowing = false;



  const openBar = () => {
    document.getElementById("sideBar").style.width = "200px";
    document.getElementById("header").style.zIndex = "0";
    document.getElementById("sideBar").style.padding = "2rem 2rem";
  };

  const closeBar = () => {
    document.getElementById("sideBar").style.width = "0";
    document.getElementById("header").style.zIndex = "1";
    document.getElementById("sideBar").style.padding = "0";
  };

  const {homeProducts} = itemsForSale;
  const showItems = (arr = homeProducts) => {
    productCards.innerHTML = arr.map(({ id, image, percentageOff, description, newprice, oldprice }) => `
      <div>
        <article>
          <p class="off">-${percentageOff}</p>
          <img src="${image}" alt=""/>
        </article>
        <p>${description}</p>
        <article class="price">
          <p><button class="pricebtn" data-id="${id}">${newprice}</button></p>
          <p class="old-price">${oldprice}</p>
        </article>
      </div>
    `).join("");
    productCards.classList.add("animate");
    bindAddToCartEvents();
  };

  class ShoppingCart {
    constructor() {
      this.items = [];
      this.taxRate = 10;
    }

    parseCurrency(price) {
      return parseFloat(price.replace(/[^\d.-]/g, ''));
    }

    addItem(id) {
      const product = homeProducts.find(item => item.id === id);
      if (product) {
        const { name, newprice } = product;
        const price = this.parseCurrency(newprice);
        this.items.push({ ...product, price });

        const existingProduct = document.getElementById(`product${id}`);
        if (existingProduct) {
          const countSpan = existingProduct.querySelector('.product-count');
          const currentCount = parseInt(countSpan.textContent) || 1;
          countSpan.textContent = `${currentCount + 1}x `;
        } else {
          productsContainer.innerHTML += `
            <div id="product${id}" class="product">
              <p>
                <span class="product-count">1x </span>${name}
              </p>
              <p>${newprice}</p>
            </div>
          `;
        }
      }
    }

    getCounts() {
      return this.items.length;
    }

    clearCart() {
      if (!this.items.length) {
        Swal.fire({
          title: 'Empty Cart!',
          text: 'Your Cart is already Empty',
          icon: 'info',
          confirmButtonText: 'Ok'
        });
        return;
      }

      const isCartCleared = confirm(
        "Are you sure you want to clear all items from your shopping cart?"
      );

      if (isCartCleared) {
        this.items = [];
        productsContainer.innerHTML = "";
        totalNumberOfItems.textContent = 0;
        cartSubTotal.textContent = `$0.00`;
        cartTaxes.textContent = `$0.00`;
        cartTotal.textContent = `$0.00`;
        newItemAlert.style.display = "none";
      }
    }


    calculateTaxes(amount) {
      return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
    }

    calculateTotal() {
      const subTotal = this.items.reduce((total, item) => total + item.price, 0);
      const tax = this.calculateTaxes(subTotal);
      const total = subTotal + tax;
      cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
      cartTaxes.textContent = `$${tax.toFixed(2)}`;
      cartTotal.textContent = `$${total.toFixed(2)}`;
      return total;
    }
  }

  const cart = new ShoppingCart();

  const bindAddToCartEvents = () => {
    const addToCartBtns = document.querySelectorAll(".pricebtn");
    addToCartBtns.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const productId = Number(event.target.getAttribute("data-id"));
        cart.addItem(productId);
        newItemAlert.style.display = "flex";
        newItemAlert.style.alignItems = "center";
        newItemAlert.style.justifyContent = "center";
        newItemAlert.style.position = "absolute";
        newItemAlert.style.top = "-10px";
        newItemAlert.style.right = "-10px";
        totalNumberOfItems.textContent = cart.getCounts();
        cart.calculateTotal();
      });
    });
  };

  cartBtn.addEventListener("click", () => {
    isCartShowing = !isCartShowing;
    showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
    cartContainer.style.display = isCartShowing ? "block" : "none";
  });

  clearCartBtn.addEventListener("click", () => cart.clearCart());

  showItems();

  headerDropDown.addEventListener("change", (e) => {
    productCards.innerHTML = "";
    productCards.classList.add("animate");
    switch (e.target.value) {
      case "men":
        showItems(homeProducts.filter(item => item.Isfor === "men"));
        break;
      case "women":
        showItems(homeProducts.filter(item => item.Isfor === "women"));
        break;
      default:
        showItems(homeProducts);
        break;
    }
  });

  sidebarDropDown.addEventListener("change", (e) => {
    productCards.innerHTML = "";
    productCards.classList.add("animate");
    switch (e.target.value) {
      case "men":
        showItems(homeProducts.filter(item => item.Isfor === "men"));
        break;
      case "women":
        showItems(homeProducts.filter(item => item.Isfor === "women"));
        break;
      default:
        showItems(homeProducts);
        break;
    }
  });

  const hide = () => {
    cartContainer.style.display = "none";
  }


  window.openBar = openBar;
  window.closeBar = closeBar;
  window.hide = hide;
});
