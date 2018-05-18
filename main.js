let zip = null
let markets = []

const renderMarketName = (market) => {
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
    $('.popup').html(`<div class="clicked-market">${market.name} is ${market.distance} miles from ${zip}</div>`)
    $('.popup').css("height", "300px")
    $('.popup').append(`<button type="button" class="modal-btn" onclick="closeModal()" name="close">Close</button>`)
    $('.modal-btn').css("height", "50px")
  })
}

const closeModal = () => {
  $('.popup').css("height", "0")
  $('.modal-btn, .clicked-market').remove()
}

const onSubmit = () => {
  markets = []
  zip = $('.zip').val()
  $('.zip').val('')
  $('.display').html('')
  $.ajax({
    type: 'GET',
    url: 'https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=80301',
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
