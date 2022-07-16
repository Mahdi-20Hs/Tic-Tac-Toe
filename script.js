const play = (function(){

  const player = {name:'player', score:0};
  const computer = {name: 'computer', score:0};
  const gameboard = [['','',''], ['', '', ''],['','','']];

  //cache the DOM
  const marks = document.querySelectorAll('.marks img');
  const blocks = document.querySelectorAll('.block');
  const playerResult = document.querySelector('.player-result span');
  const computerResult = document.querySelector('.computer-result span');
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
    blocks.forEach((block) => {
      block.addEventListener('click', play.bind(this, block))
    })
    nextRoundBtn.addEventListener('click', nextRound.bind(this))
  }
  function selectMark(mark){
    if(Array.from(blocks).every(function(block){
      return block.textContent === '';
    })){
      if(mark.alt === 'x'){
        player.mark = 'x';
        computer.mark = 'o';
        changeMarkBtnStyle(mark);
      }else{
        player.mark = 'o';
        computer.mark = 'x';
        changeMarkBtnStyle(mark);
      }
    }
  }
  function changeMarkBtnStyle(mark){
    marks.forEach((mark) => {
      mark.setAttribute('style', 'border:none');
    })
    mark.setAttribute('style', 'border: 2px solid black')
  }
  function play(block){
    if(playerTurn(block) === true){
      computerPlay();
      render();
    }
    declareWinner(findResult());
    
  }
  function declareWinner(winnerMark){
    if(winnerMark === player.mark){
      player.score++;
      playerResult.textContent = player.score;
      renderResult('You win!!!')
    }else if(winnerMark === computer.mark){
      computer.score++;
      computerResult.textContent = computer.score;
      renderResult('Computer wins!!')
    }else if(winnerMark === 'tie'){
      renderResult("It's a tie!!")
    }
    

  }
  function renderResult(result){
    resultContainer.setAttribute('style', 'visibility:visible');
    roundResult.setAttribute('style', 'transform:scale(1)');
    roundResultHeader.textContent = result;
  }
  function hideResult(){
    resultContainer.setAttribute('style', 'visibility:hidden');
    roundResult.setAttribute('style', 'transform:scale(0)');
  }
  function nextRound(){
    for(let i = 0; i < gameboard.length; i++){
      gameboard[i].fill('');
    }
    render();
    hideResult()
  }
  function createGameBoardArr(){
    let gameboardArr = gameboard[0].concat(gameboard[1], gameboard[2]);
    return gameboardArr;
  }
  function findResult(){
    for(let i = 0 ; i < gameboard.length; i++){
      
      if(gameboard[i][1] === gameboard[i][0] && gameboard[i][1] === gameboard[i][2]){
        return gameboard[i][0];
        break;
        
      }else if(gameboard[1][i] === gameboard[0][i] && gameboard[1][i] === gameboard[2][i]){
        return gameboard[1][i];
        break;
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
  function computerPlay(){
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
        computerPlay();
      }
      
    }
  }
  function playerTurn(block){
    if(block.textContent === ''){
      let index = Array.from(blocks).indexOf(block);
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
  function render(gameboardArr = gameboard[0].concat(gameboard[1], gameboard[2])){
    for(let i = 0; i < blocks.length; i++){
      blocks[i].textContent = gameboardArr[i];
    }
  }
  return{
    init: init,
  }
})()

play.init()