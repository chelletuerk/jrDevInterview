$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=80301',
    success: function(res) {
      res.results.forEach(function(res) {
        renderMarketName(res)
      })
      // onClick(res.target)
    }
  })
})


const renderMarketName = (res) => {
  $('.display').append('<li class="market">' + res.marketname + '</li>')
  // const marketId = res.id
  // console.log(marketId)
  onClick(res)
}

const onClick = (res) => {
  $('.display').on('click', '.market', (e) => {
    marketId = res.id
    marketMiles = res.marketname.split(' ').shift()
    marketName = res.marketname
      .split(' ')
      .splice(1, res.marketname.length)
      .join(' ')
  })
}
