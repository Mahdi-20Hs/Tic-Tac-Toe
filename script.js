const ticTacToe = (function(){

  const player = {name:'player', score:0};
  const computer = {name: 'computer', score:0};
  const gameboard = [['','',''], ['', '', ''],['','','']];

  //cache the DOM
  const marks = document.querySelectorAll('.marks img');
  const gameboardBlocks = document.querySelectorAll('.block');
  const playerScore = document.querySelector('.player-result span');
  const computerScore = document.querySelector('.computer-result span');
  const resultContainer = document.querySelector('.result-container');
  const roundResult = document.querySelector('.round-result');
  const roundResultHeader = document.querySelector('.round-result h1 span');
  const nextRoundBtn = document.querySelector('.next-round');
  

  function init(){
    bindEvents()
  }

  function bindEvents(){
    marks.forEach((mark) => {
      mark.addEventListener('click', selectMark.bind(this, mark))
    });
    gameboardBlocks.forEach((block) => {
      block.addEventListener('click', play.bind(this, block))
    })
    nextRoundBtn.addEventListener('click', nextRound.bind(this))
  }

  function selectMark(mark){
    if(Array.from(gameboardBlocks).every(function(block){
      return block.textContent === '';
    })){
      if(mark.alt === 'x'){
        player.mark = 'x';
        computer.mark = 'o';
      }else{
        player.mark = 'o';
        computer.mark = 'x';
      }
      styleMark(mark);
    }
  }

  function styleMark(mark){
    marks.forEach((mark) => {
      mark.setAttribute('id', '');
    })
    if(mark.alt === 'o'){
      mark.setAttribute('id', 'o-clicked');
    }
    if(mark.alt === 'x'){
      mark.setAttribute('id' ,'x-clicked');
    }
  }

  function play(block){
    if(playerTurn(block) === true){
      render();
      if(declareWinner(findTheWinner()) === true){
        return
      }
      computerTurn();
      render();
      declareWinner(findTheWinner())
    }

  }

  function playerTurn(block){
    if(block.textContent === ''){
      let index = Array.from(gameboardBlocks).indexOf(block);
      if(index < 3){
        gameboard[0][index] = player.mark;
      }else if(index > 2 && index < 6){
        gameboard[1][index - 3] = player.mark;
      }else{
        gameboard[2][index - 6] = player.mark
      }
      return true
    }
  }

  function computerTurn(){
    let index = Math.floor(Math.random() * 3);
    if(gameboard[index].some(function(element){
      return element === '';
    })){
      for(let i = 0; i < gameboard[index].length; i++){
        if(gameboard[index][i] === ''){
          gameboard[index][i] = computer.mark;
          break;
        }
      }
    }else{
      let gameboardArr = createGameBoardArr();
      if(gameboardArr.some(function(element){
        return element === ''
      })){
        computerTurn();
      } 
    }
  }

  function render(gameboardArr = createGameBoardArr()){
    for(let i = 0; i < gameboardBlocks.length; i++){
      gameboardBlocks[i].textContent = gameboardArr[i];
      styleBlock(gameboardBlocks[i]);
    }
  }

  function styleBlock(block){
    if(block.textContent === 'x'){
      block.style.color = '#00FFDD';
      block.style.textShadow = '0px 0px 30px #3765e2';
    }else if(block.textContent === 'o'){
      block.style.color = '#FF0000';
      block.style.textShadow = '0px 0px 30px #df0707';
    }
  }

  function findTheWinner(){
    for(let i = 0 ; i < gameboard.length; i++){
      
      if(gameboard[i][1] === gameboard[i][0] && gameboard[i][1] === gameboard[i][2]){
        return gameboard[i][0];
        
      }else if(gameboard[1][i] === gameboard[0][i] && gameboard[1][i] === gameboard[2][i]){
        return gameboard[1][i];
      }
    }
    if(gameboard[1][1] === gameboard[0][0] && gameboard[1][1] === gameboard[2][2]){
      return gameboard[0][0];

    }else if(gameboard[1][1] === gameboard[0][2] && gameboard[1][1] === gameboard[2][0]){
      return gameboard[0][2];

    }else if(gameboard[0].concat(gameboard[1], gameboard[2]).every(function(element){
      return element !== '';
    })){
      return 'tie';
    }
      
  }

  function declareWinner(winnerMark){
    if(winnerMark === player.mark){
      player.score++;
      playerScore.textContent = player.score;
      renderResultContainer('You win!!!')
      return true;

    }else if(winnerMark === computer.mark){
      computer.score++;
      computerScore.textContent = computer.score;
      renderResultContainer('Computer wins!!')

    }else if(winnerMark === 'tie'){
      renderResultContainer("It's a tie!!")
    }
    return false;
  }

  function renderResultContainer(result){
    resultContainer.setAttribute('style', 'visibility:visible');
    roundResult.setAttribute('style', 'transform:scale(1)');
    roundResultHeader.textContent = result;
  }

  function hideResultContainer(){
    resultContainer.setAttribute('style', 'visibility:hidden');
    roundResult.setAttribute('style', 'transform:scale(0)');
  }

  function nextRound(){
    for(let i = 0; i < gameboard.length; i++){
      gameboard[i].fill('');
    }
    render();
    hideResultContainer();
  }

  function createGameBoardArr(){
    let gameboardArr = gameboard[0].concat(gameboard[1], gameboard[2]);
    return gameboardArr;
  }

  return{
    init: init,
  }
})()

ticTacToe.init()