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
    <div class="col-md-3 ${users.type}">
    <div class="home-product">
      <div class="home-product__img">
        <img
          id="prImg"
          class="img-prd"
          src="${users.img}"
          alt=""
        />
      </div>
      <div class="home-product__body">
        <h1 id="prName" class="home-product__name">${users.name}</h1>
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
          <div class="d-flex align-items-center">
          <span>$</span>
          <h3 id="prGia" class="home-product__price">${users.price}</h3>
          </div>
          <button type="button" class="btn home-product__btn" data-toggle="modal" data-target="#myModal"  onclick="addProduct()">Add</button>
        </div>
      </div>
      <div class="home-product__favorite"><span>${users.type}</span></div>
    </div>
  </div>
    `;
  });

  getEle("home-product-user").innerHTML = content;
}

function myFunction() {
  var x = document.getElementById("mySelect").value;

  service
    .getListUser()
    .then(function (result) {
      var newArray = result.data.filter(function (obj) {
        if (x == "Apple") {
          return obj.type == "Apple";
        } else if (x == "SamSung") {
          return obj.type == "SamSung";
        } else {
          return result.data;
        }
      });
      renderHTML(newArray);
    })
    .catch(function (error) {
      console.log(error);
    });
}
