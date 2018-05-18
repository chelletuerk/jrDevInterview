let zip = null
let markets = []

const renderMarketName = (market) => {
  console.log(market.error  )
  const arr = market.marketname.split(' ')
  market.distance = arr[0]
  market.name = arr.slice(1).join(' ')
  $('.display').append(`<li id=${market.id} class="market">${market.name}</li>`)
}

const marketOnClick = () => {
  $('.market').on('click', (e) => {
    const id = e.target.id
    const index = markets.findIndex((obj) => obj.id === id)
    const market = markets[index]
    $('.popup').html(`<div>${market.name} is ${market.distance} miles from ${zip}</div>`)
    $('.popup').css("height", "300px")
  })
}

const closeModal = () => {
  $('.modal-btn').css("display", "block")
  console.log('fjdksal')
}

// $('.modal-close').click(() => {
//   console.log('fjdksal')
// })

const onSubmit = () => {
  markets = []
  zip = $('.zip').val()
  $('.display').html('')
  $.ajax({
    type: 'GET',
    url: `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${zip}`,
    success: function(res) {
      markets.push(...res.results)
      if (markets[0].id === 'Error') {
        alert('Please Enter a Valid Zip Code')
        $('.zip').val('')
        return
      }
      markets.forEach(function(market) {
        renderMarketName(market)
      })
      marketOnClick()
    }
  })
}
