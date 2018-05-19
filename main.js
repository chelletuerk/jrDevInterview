let zip = null
let markets = []
let details = []

const renderMarketName = (market) => {
  const arr = market.marketname.split(' ')
  market.distance = arr[0]
  market.name = arr.slice(1).join(' ')
  $('.display').append(`<li id=${market.id} class="market animated fadeInUpBig">${market.name}</li>`)
}

const marketOnClick = () => {
  $('.market').on('click', (e) => {
    const id = e.target.id
    const index = markets.findIndex((obj) => obj.id === id)
    const market = markets[index]
    getIdData(id)
    $('.popup').html(`<div class="clicked-market">${market.name}<br/><span class="zip-distance">(${market.distance} miles from ${zip})</span></div>`)
    $('.popup').css("height", "400px")
    $('.popup').append(`<button type="button" class="modal-btn" onclick="closeModal()" name="close">X</button>`)
    $('.modal-btn').css("height", "20px")
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

const getIdData = (id) => {
  $.ajax({
    type: 'GET',
    url: `https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${id}`,
    success: function(res) {
      $('.clicked-market').append(
       `<li class="details"><span>${res.marketdetails.Address}</span></li>
        <li class="details"><a class="google" href="${res.marketdetails.GoogleLink}" target="_blank">Click for Google Map</a></li>
        <li class="details products"><span>${res.marketdetails.Products}</span></li>
        <li class="details schedule"><span>${res.marketdetails.Schedule}<span></li>`)
    }
  })
}
