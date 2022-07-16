const play = (function(){

  const player = {name:'player'};
  const computer = {name: 'computer'};
  const gameboard = [['','',''], ['', '', ''],['','','']];

  //cache the DOM
  const marks = document.querySelectorAll('.marks img');
  const blocks = document.querySelectorAll('.block');

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
    playerTurn(block);
    computerPlay();
    render();
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
      let newArr = gameboard[0].concat(gameboard[1], gameboard[2]);
      if(newArr.some(function(element){
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
    }
  }
  function render(){
    let newArr = gameboard[0].concat(gameboard[1], gameboard[2]);
    for(let i = 0; i < blocks.length; i++){
      blocks[i].textContent = newArr[i];
    }
  }
  return{
    init: init,
  }
})()

play.init()