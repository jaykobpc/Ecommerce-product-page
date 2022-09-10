"use strict";

const carouselImageBox = document.getElementById("carouselImageBox");
const ImgListItem = document.querySelectorAll(".containerct__imglist__item");
const prevBtn = document.querySelector(".containerct__carousel__leftbtn");
const nextBtn = document.querySelector(".containerct__carousel__rightbtn");
const dataSrc = document.querySelectorAll("[data-src]");
const cartIncrement = document.getElementById("cartIncrement");
const cartDecrement = document.getElementById("cartDecrement");
const addToCart = document.getElementById("addToCart");
const textCounter = document.getElementById("textCounter");
const cartBtn = document.getElementById("cartBtn");
const cartList = document.getElementById("cartList");
const badgeCounter = document.getElementById("badgeCounter");

const cartListView = document.querySelector(".cartlist__listview");
const cartListBanner = document.querySelector(".cartlist__banner");
const cartTitleBox = document.querySelector(".cartlist__titlebox");
const cartBtnCheckout = document.querySelector(".cartlist__btncheckout");
const cartBtnDelete = document.querySelector(".cartlist__card__btndelete");

const mobileNav = document.getElementById("mobilenav");
const navbtn = document.getElementById("navbtn");
const mobilenavClose = document.getElementById("mobilenavClose");

let html = "";
let currentSelectedImage = 0;
let totalImages = null;
let productCounter = 1;
let productCart = [];

ImgListItem.forEach((el, index) => {
  el.addEventListener("click", () => {
    if (el.hasAttribute("data-src")) {
      let thumbImg = el.getAttribute("data-src");
      carouselImageBox.setAttribute("src", thumbImg);
      currentSelectedImage = index;
    }
  });
});

function renderCart(product) {
  html += `
    <div class="cartlist__card">
      <img src="${product.img}" alt="Thumbnail" draggable="false" class="cartlist__card__img">
      <div class="cartlist__card__textview">
          <p class="cartlist__card__textview__title">${product.title}</p>
          <p class="cartlist__card__textview__label">$${product.price} x ${product.quantity} <span>$${Number.parseFloat(product.price * product.quantity).toFixed(2)}</span></p>
      </div>
      <button class="cartlist__card__btndelete" onclick="deleteProduct()">
          <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
      </button>
      </div>
    `;

  cartListView.insertAdjacentHTML("afterbegin", html);
}

function deleteProduct() {
  //remove item
  if (productCart.length) {
    productCart = [];
  }
  //
  cartListBanner.style.display = "block";
  cartListView.classList.add("hidden");
  cartTitleBox.classList.add("hidden");
  cartBtnCheckout.classList.add("hidden");
  //
  badgeCounter.textContent = productCart.length;
  badgeCounter.classList.add("hidden");
  cartListView.innerHTML = '';
}

function cartFn() {
  //remove empty cart banner
  cartListBanner.style.display = "none";
  cartListView.classList.remove("hidden");
  cartTitleBox.classList.remove("hidden");
  cartBtnCheckout.classList.remove("hidden");
  //products object
  let cartItems = {
    quantity: productCounter,
    img: "./images/image-product-1.jpg",
    title: "Fall Limited Edition Sneakers",
    price: 125.0,
  };
  //add to cart
  if (productCart.length >= 1) return;
  productCart.push(cartItems);
  //render to cart
  productCart.forEach((item) => {
    renderCart(item);
  });
}

nextBtn.addEventListener("click", () => {
  if (currentSelectedImage === 3) return;
  currentSelectedImage += 1;
  let img = dataSrc[currentSelectedImage].getAttribute("data-src");
  carouselImageBox.setAttribute("src", img);
});

prevBtn.addEventListener("click", () => {
  if (currentSelectedImage === 0) return;
  currentSelectedImage -= 1;
  let img = dataSrc[currentSelectedImage].getAttribute("data-src");
  carouselImageBox.setAttribute("src", img);
});

cartBtn.addEventListener("click", () => {
  cartList.classList.contains("hidden")
    ? cartList.classList.remove("hidden")
    : cartList.classList.add("hidden");
});

cartIncrement.addEventListener("click", () => {
  if (productCounter >= 12) return;
  productCounter += 1;
  textCounter.textContent = productCounter;
});

cartDecrement.addEventListener("click", () => {
  if (productCounter <= 1) return;
  productCounter -= 1;
  textCounter.textContent = productCounter;
});

addToCart.addEventListener("click", () => {
  cartFn();
  badgeCounter.textContent = productCart.length;
  if (badgeCounter.classList.contains("hidden"))
    badgeCounter.classList.remove("hidden");
});

navbtn.addEventListener('click', () => {
    mobileNav.classList.add('nav__open');
});

mobilenavClose.addEventListener('click', () => {
    mobileNav.classList.remove('nav__open');
})

document.addEventListener(
  "mouseup",
  (evt) => {
    evt.stopImmediatePropagation();
    evt.stopPropagation();
    if (!cartList.classList.contains("hidden"))
      cartList.classList.add("hidden");
  },
  false
);

document.addEventListener("DOMContentLoaded", () => {
  cartListBanner.classList.remove("hidden");
});

cartList.addEventListener('click', (evt) => {
    evt.stopImmediatePropagation();
    evt.stopPropagation();
})