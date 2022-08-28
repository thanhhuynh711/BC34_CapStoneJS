function Service() {
  this.getListUser = function () {
    return axios({
      url: "https://6301cf979a1035c7f8073dd8.mockapi.io/api/users",
      method: "GET",
    });
  };
}
