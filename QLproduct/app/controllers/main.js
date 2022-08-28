var services = new Services();

var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

function fetchData() {
  services
    .getListProduct()
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

  data.forEach(function (product, index) {
    content += `
          <tr>
              <td>${index + 1}</td>
              <td>${product.type}</td>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td>${product.screen}</td>
              <td>${product.backCamera}</td>
              <td>${product.frontCamera}</td>
              <td><img width="50px" src="${product.img}"/></td>
              <td>${product.desc}</td>
              <td>
                      <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editProduct(${
                        product.id
                      })">Edit</button>
                      <button class="mt-1 btn btn-danger" onclick="deleteProduct(${
                        product.id
                      })">Delete</button>
                  </td>
          </tr>
      `;
  });
  getEle("tblDanhSachSP").innerHTML = content;
}

//Delete

function deleteProduct(id) {
  services
    .deleteProductApi(id)
    .then(function (result) {
      fetchData();
    })
    .catch(function (error) {
      console.log(error);
    });
}

getEle("btnThemSP").addEventListener("click", function () {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm sản phẩm";

  var btnAdd = `<button class="btn btn-success" onclick="addProduct()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
});

// Add

function addProduct() {
  var type = getEle("type").value;
  var name = getEle("TenSP").value;
  var price = getEle("GiaSP").value;
  var screen = getEle("manHinh").value;
  var backCamera = getEle("camSau").value;
  var frontCamera = getEle("camTruoc").value;
  var img = getEle("HinhSP").value;
  var desc = getEle("MoTa").value;

  var product = new Product(
    "",
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  var sanPham = layThongTinSP(true);

  if (sanPham) {
    services
      .addProductApi(product)
      .then(function () {
        fetchData();

        document.getElementsByClassName("close")[0].click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

//Edit

function editProduct(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Cập Nhật Nhân Viên";

  var btnUpdate = `<button class="btn btn-success" onclick="updateProduct(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  services
    .getListProductById(id)
    .then(function (result) {
      getEle("TenSP").value = result.data.name;
      getEle("GiaSP").value = result.data.price;
      getEle("manHinh").value = result.data.screen;
      getEle("camSau").value = result.data.backCamera;
      getEle("camTruoc").value = result.data.frontCamera;
      getEle("HinhSP").value = result.data.img;
      getEle("MoTa").value = result.data.desc;
    })
    .catch(function (error) {
      console.log(error);
    });
}

//Update

function updateProduct(id) {
  var type = getEle("type").value;
  var name = getEle("TenSP").value;
  var price = getEle("GiaSP").value;
  var screen = getEle("manHinh").value;
  var backCamera = getEle("camSau").value;
  var frontCamera = getEle("camTruoc").value;
  var img = getEle("HinhSP").value;
  var desc = getEle("MoTa").value;

  var product = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  services
    .updateProductApi(product)
    .then(function () {
      fetchData();

      //Tắt modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// KT rổng

function layThongTinSP(isAdd) {
  var name = getEle("TenSP").value;
  var price = getEle("GiaSP").value;
  var screen = getEle("manHinh").value;
  var backCamera = getEle("camSau").value;
  var frontCamera = getEle("camTruoc").value;
  var img = getEle("HinhSP").value;
  var desc = getEle("MoTa").value;

  var isValid = true;

  //   name
  if (isAdd) {
    isValid &= validation.kiemTraRong(
      name,
      "tbName",
      "(*) vui lòng nhập tên sản phẩm"
    );
  }

  //  price

  isValid &= validation.kiemTraRong(
    price,
    "tbGia",
    "(*) vui lòng nhập giá sản phẩm"
  );

  //   screen

  isValid &= validation.kiemTraRong(
    screen,
    "tbManHinh",
    "(*) vui lòng nhập số in màn hình"
  );

  // backCamera

  isValid &= validation.kiemTraRong(
    backCamera,
    "tbCamSau",
    "(*) vui lòng nhập thông số camera"
  );

  //   frontCamera

  isValid &= validation.kiemTraRong(
    frontCamera,
    "tbCamTruoc",
    "(*) vui lòng nhập thông số camera"
  );

  //   img

  isValid &= validation.kiemTraRong(
    img,
    "tbHinhAnh",
    "(*) vui lòng không để trống"
  );

  // Mô tả

  isValid &=
    validation.kiemTraRong(desc, "tbMoTa", "(*) vui lòng không để trống") &&
    validation.kiemTraDoDaiKiTu(
      desc,
      "tbMoTa",
      "(*) vui lòng nhập mô tả không vượt quá 100 kí tự",
      100
    );

  // Type
  isValid &= validation.kiemTraType(
    "type",
    "tbType",
    "(*) vui lòng chọn hảng điện thoại"
  );

  if (!isValid) return null;

  var product = new Product(
    "",
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    ""
  );

  return product;
}
