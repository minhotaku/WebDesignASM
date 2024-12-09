window.onscroll = () => {
  if (window.scrollY > 80) {
    document.querySelector(".header .header-2").classList.add("active");
  } else {
    document.querySelector(".header .header-2").classList.remove("active");
  }
};

let loginForm = document.querySelector(".login-form-container");
document.querySelector("#login-btn").onclick = () => {
  loginForm.classList.toggle("active");
};

document.querySelector("#close-login-btn").onclick = () => {
  loginForm.classList.remove("active");
};
let registerForm = document.querySelector(".register-form-container");

document.querySelector("#create-account").onclick = () => {
  loginForm.classList.remove("active");
  registerForm.classList.toggle("active");
};

document.querySelector("#close-register-btn").onclick = () => {
  registerForm.classList.remove("active");
};

document.querySelector("#sign-in").onclick = () => {
  registerForm.classList.remove("active");
  loginForm.classList.toggle("active");
};

let navigationLeft = document.querySelector(".navigation");

document.querySelector("#navigation-btn").onclick = () => {
  navigationLeft.classList.toggle("active");
  document.body.classList.toggle("disable");
};

document.querySelector("#close-navigation").onclick = () => {
  navigationLeft.classList.remove("active");
  document.body.classList.remove("disable");
};

var swiper = new Swiper(".popular-slider", {
  spaceBetween: 5,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

const addToCartButtons = document.querySelectorAll(".add-btn");

addToCartButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    // Xác định sản phẩm liên quan đến nút được nhấn
    const productItem = event.target.closest(".product-item");
    const title = productItem.querySelector(".book-title").textContent.trim();

    // Lấy giỏ hàng từ localStorage (nếu có)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const existingProduct = cart.find(item => item.title === title);

    if (existingProduct) {
      // Nếu sản phẩm đã tồn tại, tăng quantity
      existingProduct.quantity += 1;
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới với quantity là 1
      const author = productItem.querySelector(".author span").textContent.trim();
      const price = productItem.querySelector(".price").textContent.trim();
      const imgSrc = productItem.querySelector(".product-img img").src;

      const product = {
        title,
        author,
        price,
        imgSrc,
        quantity: 1
      };

      cart.push(product);
    }

    // Lưu giỏ hàng trở lại localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`Added "${title}" to the cart!`);
  });
});


