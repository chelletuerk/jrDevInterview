$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=80301',
    success: function(res) {
      console.log(res)
      res.results.forEach(function(e) {
        $('.display').append('<li>' + e.marketname + '</li>')
        // e.marketname.append()
      })
    }
  })
})

function render() {
  $('.display').append()
}
