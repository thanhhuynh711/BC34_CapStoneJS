function Services() {
  this.getListProduct = function () {
    return axios({
      url: "https://6301cf979a1035c7f8073dd8.mockapi.io/api/users",
      method: "GET",
    });
  };

  this.deleteProductApi = function (id) {
    return axios({
      url: `https://6301cf979a1035c7f8073dd8.mockapi.io/api/users/${id}`,
      method: "DELETE",
    });
  };

  this.addProductApi = function (product) {
    return axios({
      url: "https://6301cf979a1035c7f8073dd8.mockapi.io/api/users",
      method: "POST",
      data: product,
    });
  };

  this.getListProductById = function (id) {
    return axios({
      url: `https://6301cf979a1035c7f8073dd8.mockapi.io/api/users/${id}`,
      method: "GET",
    });
  };

  this.updateProductApi = function (product) {
    return axios({
      url: `https://6301cf979a1035c7f8073dd8.mockapi.io/api/users/${product.id}`,
      method: "PUT",
      data: product,
    });
  };
}
