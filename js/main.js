//Get the deck
let deckId = ''

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        deckId = data.deck_id
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
if(!localStorage.getItem('player1Wins' || !localStorage.getItem('player2Wins'))){
        localStorage.setItem('player1Wins', 0)
        localStorage.setItem('player2Wins', 0)
}
document.getElementById('player1Wins').textContent = `Player 1 Total Wins: ${localStorage.getItem('player1Wins')}`
document.getElementById('player2Wins').textContent = `Player 2 Total Wins: ${localStorage.getItem('player2Wins')}`



document.querySelector('button').addEventListener('click', getFetch)
document.getElementById('clr').addEventListener('click', clearLocalStorage)

async function getFetch(){
  try{
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await res.json()
    let val1 = Number(cardValue(data.cards[0].value))
    let val2 = Number(cardValue(data.cards[1].value))
    document.querySelector('#player1').src = data.cards[0].image
    document.querySelector('#player2').src = data.cards[1].image
    if(val1 > val2){
      document.querySelector('h3').innerText = 'Player 1 WON!'
      let player1Wins = Number(localStorage.getItem('player1Wins'))
      player1Wins+=1
      localStorage.setItem('player1Wins', player1Wins)
      document.getElementById('player1Wins').textContent = `Player 1 Total Wins: ${localStorage.getItem('player1Wins')}`
    }else if(val1 < val2){
      document.querySelector('h3').innerText = 'Player 2 WON!'
      let player2Wins = Number(localStorage.getItem('player2Wins'))
      player2Wins+=1
      localStorage.setItem('player2Wins', player2Wins)
      document.getElementById('player2Wins').textContent = `Player 2 Total Wins: ${localStorage.getItem('player2Wins')}`
    }else{
      setTimeout(getFetch, 5000)
      document.querySelector('h3').innerText = 'WAR!...'
    }
    if(data.remaining == 0){
      try{
      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
      if(!res.ok){
        throw new Error(`HTTP error: ${response.status}`)
      }
      }catch(err){
        console.log(`error ${err}`)
      }

    }
  }catch(err){
    console.log(`error ${err}`)
  }
}  

function cardValue(val){
  if(val === "ACE"){
    return 14
  }else if (val === "KING"){
    return 13
  }else if(val === "QUEEN"){
    return 12
  }else if(val === "JACK"){
    return 11
  }else{
    return val
  }
}

function clearLocalStorage(){
  localStorage.setItem('player1Wins', 0)
  localStorage.setItem('player2Wins', 0)
  document.getElementById('player1Wins').textContent = `Player 1 Total Wins: ${localStorage.getItem('player1Wins')}`
  document.getElementById('player2Wins').textContent = `Player 2 Total Wins: ${localStorage.getItem('player2Wins')}`
}