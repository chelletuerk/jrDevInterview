$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=80301',
    success: function(res) {
      console.log(res)
      res.results.forEach(function(res) {
        renderMarketName(res)
      })
    }
  })
})


const renderMarketName = (res) => {
  return $('.display').append('<li>' + res  .marketname + '</li>')
}
