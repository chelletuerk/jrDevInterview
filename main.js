let zip = null
let markets = []
let details = []

$(document).ready(function(){
  disableSubmit()
})

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
    $('.popup').css("height", "50%")
    $('.popup').css("box-shadow", "9px 10px 24px 1px #404040")
    $('.popup').prepend(`<button type="button" class="modal-btn" style="width:30px; display:inline-block;" onclick="closeModal()" name="close">X</button>`)
    $('.modal-btn').css("height", "20px")
  })
}

const closeModal = () => {
  $('.popup').css("height", "0")
  $('.modal-btn, .clicked-market').remove()
}

const onSubmit = () => {
  $('.modal-btn').click()
  markets = []
  zip = $('.zip').val()
  $('.zip').val('')
  $('.display').html('')
  $.ajax({
    type: 'GET',
    url: `https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${zip}`,
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

$('input').keydown(function(e) {
  if (e.keyCode == 13) {
    $('.modal-btn').click()
    disableSubmit()
    $('.submit').click()
  }
})

const disableSubmit = () => {
  $('.submit').attr('disabled',true)
  $('.zip').keyup(function(){
      if($(this).val().length !=0)
          $('.submit').attr('disabled', false)
      else
          $('.submit').attr('disabled',true)
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
