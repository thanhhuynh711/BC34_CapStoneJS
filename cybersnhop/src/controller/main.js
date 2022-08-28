var service = new Service();

function getEle(id) {
  return document.getElementById(id);
}

function fetchData() {
  service
    .getListUser()
    .then(function (result) {
      renderHTML(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

fetchData();

function renderHTML(data) {
  var content = "";
  data.forEach(function (users) {
    content += `
    <div class="col-md-3">
    <div class="home-product">
      <div class="home-product__img">
        <img
          src="${users.img}"
          alt=""
        />
      </div>
      <div class="home-product__body">
        <h1 class="home-product__name">${users.name}</h1>
        <h4 class="home-product__screen">screen: ${users.screen} in</h4>
        <h4 class="home-product__backCamera">
          cam sau: ${users.backCamera}
        </h4>
        <h4 class="home-product__frontCamera">
          cam trước: ${users.frontCamera} MP
        </h4>
        <h4 class="home-product__desc">
          ${users.desc}
        </h4>
        <div class="home-product__buy">
          <h3 class="home-product__price">$${users.price}</h3>
          <button class="home-product__btn">Add</button>
        </div>
      </div>
    </div>
  </div>
    `;
  });

  getEle("home-product-user").innerHTML = content;
}
