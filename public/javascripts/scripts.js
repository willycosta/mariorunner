let score = 0;
var bestScore = [];

function PlayGame(){
    const playScreen = document.querySelector(".gameScreen");
    const introScreen = document.querySelector(".intro");
    const restartScreen = document.querySelector(".lose-screen")
    const mario = document.querySelector(".mario");
    const pipe = document.querySelector(".pipe");
    const clouds = document.querySelector(".clouds");
    introScreen.classList.add("desligaTela");
    playScreen.classList.remove("desligaTela");


    //ADICIONA CLASS JUMP AO HTML FAZENDO O MARIO PULAR
    const jump = () =>{
        mario.classList.add("jump");
    
        //ADICIONA O SOM DO PULO AO JOGO.
        let effectJump = new Audio('./public/assets/jump.mp3');
        effectJump.addEventListener('canplaythrough', () =>{
            effectJump.play()
        })
    
        //FUNÇÃO PARA REMOVER A CLASS "jump" do .mario
        setTimeout(() => {
            mario.classList.remove("jump");   
        }, 500);
    }
    
    
    /* DETECTA TECLA PRESSIONADA, SE FOR ESPACO OU ARROW UP EXECUTA
    A FUNÇÃO JUMP, FAZENDO O MARIO PULAR. */
    document.body.onkeydown = function(key) {
        if (key.keyCode == 32 || key.keyCode == 38){
            jump();
        }  
    }
    
    //REGRAS DO JOGO
    const loopGame = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");
        const cloudsPosition = +window.getComputedStyle(clouds).right.replace("px", "");
        
        //REGRAS PARA FIM DO JOGO.
        if(pipePosition <= 70 && pipePosition > 0 && marioPosition < 50){
            restartScreen.style.display = "flex"
            score = 0;
            document.getElementById("scoreValue").innerHTML = score
            pipe.style.left = `${pipePosition}px`;
            let maiorValor = Math.max.apply(null, bestScore);
            document.getElementById("bestScoreValue").innerHTML = maiorValor
            mario.style.bottom = `${marioPosition}px`
            mario.src = '/public/assets/game-over.png'
            mario.style.width = "52px";
            mario.style.marginLeft = "15px";
            clouds.style.animation = "none";
            clouds.style.right = `${cloudsPosition}px`; 

            //PLAAY DEATH SONG
            let effectDeath = new Audio('./public/assets/lose.mp3');
            effectDeath.addEventListener('canplaythrough', () =>{
            effectDeath.play()
            })
            clearInterval(loopGame);

        }
    
        //REGRA DO SCORE
        if(pipePosition >= 0 && pipePosition <= 8){
            score++;;
            document.getElementById("scoreValue").innerHTML = score
        }
        if(score > 1){
            bestScore.push(score);
        }
    }, 10)

}


function restart(){
    let maiorValor = Math.max.apply(null, bestScore);
    document.getElementById("bestScoreValue").innerHTML = maiorValor
    const restartScreen = document.querySelector(".lose-screen")
    const mario = document.querySelector(".mario");
    const pipe = document.querySelector(".pipe");
    const clouds = document.querySelector(".clouds");
    restartScreen.style.display = "none"
    pipe.style.left = "500px"
    pipe.style.animation = "pipe-animation 1s infinite linear";
    pipe.style.left = ""
    mario.src = '/public/assets/mario2.gif'
    mario.style.bottom = "0"
    mario.style.width = "80px" 
    mario.style.marginLeft = "0px"
    clouds.style.right = `-450px`; 
    clouds.style.animation = "clouds-animation 30s infinite linear";
    PlayGame();
}