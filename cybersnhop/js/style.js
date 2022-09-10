// Delete
var removeCart = document.getElementsByClassName("btn-danger");
for (var i = 0; i < removeCart.length; i++) {
  var button = removeCart[i];
  button.addEventListener("click", function (event) {
    var button_remove = event.target;
    button_remove.parentElement.parentElement.remove();
    updatecart();
  });
  updatecart();
}

// update cart
function updatecart() {
  var cartItem = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItem.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceItem = cartRow.getElementsByClassName("cart-price ")[0];
    var quantityItem = cartRow.getElementsByClassName("cart-quantity-input")[0];
    var price = parseFloat(priceItem.innerText);
    var quantity = quantityItem.value;
    total = total + price * quantity;
  }

  document.getElementsByClassName("cart-total-price")[0].innerText =
    total + "$";
  document.querySelector(".header__cart-price span").innerHTML = total;
}

// thay đổi số lượng sản phẩm
var quantityInput = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantityInput.length; i++) {
  var input = quantityInput[i];
  input.addEventListener("change", function (event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart();
  });
}

// Thêm vào giỏ
function addProduct() {
  var addCart = document.getElementsByClassName("home-product__btn");
  for (var i = 0; i < addCart.length; i++) {
    // var add = addCart[i];
    var button = event.target;
    var product = button.parentElement.parentElement;
    var img = product.parentElement.getElementsByClassName("img-prd")[0].src;
    var title =
      product.getElementsByClassName("home-product__name")[0].innerText;
    var price = product.getElementsByClassName("home-product__price")[0]
      .innerText;
    var quantity = product.getElementsByClassName("quantity-input")[0].value;
    addItemToCart(title, price, img, quantity);
    updatecart();
    return;
  }
}

//

function addItemToCart(title, price, img, quantity) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cart_title = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cart_title.length; i++) {
    if (cart_title[i].innerText == title) {
      alert("Sản phẩm đã có trong giỏ hàng");
      return;
    }
  }

  var cartRowContents = `
  <div class="cart-item cart-column">
      <img class="cart-item-image" src="${img}" width="100" height="100">
      <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="${quantity}">
      <button style="margin-left: auto;" class="btn btn-danger" type="button">Xóa</button>
  </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", function (event) {
      var button_remove = event.target;
      button_remove.parentElement.parentElement.remove();
      updatecart();
    });
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", function (event) {
      var input = event.target;
      if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
      }
      updatecart();
    });
  updatecart();
}

// Thanh toán
function thanhToanSP() {
  var element = document.querySelector("#cartItem");
  element.innerHTML = "";
  alert("Thanh toán thành công");
  updatecart();
}
