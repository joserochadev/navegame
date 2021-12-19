
    var canvas = document.querySelector('canvas')
    var ctx = canvas.getContext('2d')
    
    // ************* CARREGANDO AS IMAGENS DO FUNDO ***************
    var espaco = new Image()
    espaco.src = '../img/fundo-espaco.png'
    
    var estrelas = new Image()
    estrelas.src = '../img/fundo-estrelas.png'
    
    var nuvens = new Image()
    nuvens.src = '../img/fundo-nuvens.png'
    
    var fundoEspaco = new fundo(espaco, ctx, 3)
    var fundoEstrelas = new fundo(estrelas, ctx, 7)
    var fundoNuvens = new fundo(nuvens, ctx, 10)
    // ***********************************************
    // ****************** CARRENGADO AS IMAGENS DA NAVE **************************
    var imgNave = new Image()
    imgNave.src = '../img/nave-spritesheet.png'
    var nave = new nave(imgNave, ctx )

    // ****************** CARREGANDO IMAGENS DOS OVNIS
    var imgOvni = new Image()
    imgOvni.src = '../img/ovni.png'

    
    // ***************  CARRENGANDO IMAGEM DA EXPLOSAO **********
    var explosao = new Image()
    explosao.src = '../img/explosao.png'
    
    // arrays usados pra fazer os disparos
    var sprites = []
    var missels = []
    
    // variaveis para criaçao dos aliens
    var aliens = []
    var mvAliens = []
    
    var alienFrequency = 100
    var alienTimer = 0
    // array de mensagens
    var mensagens = []

    // variavel de pontos
    var hits = 0

    // variaveis pra criaçao dos sons
    var fire = 0
    var explosion = 1
    
    // ***************** CARREGANDO MENSAGENS *****************
    var mensageStart = new mensage(canvas.height/2, "PRESS ENTER", "#f00")
    mensagens.push(mensageStart)

    var mensagePause = new mensage(canvas.height/2, "PAUSED", "#f00")
    mensagePause.visible = false
    mensagens.push(mensagePause)

    var gameOverMensage = new mensage(canvas.height/2, "", "#f00")
    gameOverMensage.visible = false
    mensagens.push(gameOverMensage)

    // var mensageIntro = new mensage(10, "Destrua os alienigenas, não deixe nenhum passar e não encoste neles. SALVE O UNIVERSO!", "#f00")
    // mensagens.push(mensageIntro)
    

    // ************* PLACAR ************
    var scoreMensage = new mensage(10,"","#6df183")
    atualizaPlacar()
    mensagens.push(scoreMensage)


    // ************** fazendo os estados do jogo *************
    var loading = 0, playing = 1, paused = 2, over = 3
    var gameState = loading
    // **********************************************
    // ************** RECEBENDO OS COMANDOS DO TECLADO *****************
    window.addEventListener('keydown', function(e){
        switch(e.keyCode){
            case 37: 
                nave.mvRight = false
                nave.mvLeft = true
                nave.mvUp = false
                nave.mvDown = false
                break
            case 38:
                nave.mvRight = false
                nave.mvLeft = false
                nave.mvUp = true
                nave.mvDown = false
                break
            case 39:
                nave.mvRight = true
                nave.mvLeft = false
                nave.mvUp = false
                nave.mvDown = false
                break
            case 40:
                nave.mvRight = false
                nave.mvLeft = false
                nave.mvUp = false
                nave.mvDown = true
                break
            case 32:
                if(!nave.spaceIsDown){
                    nave.shoot = true
                    nave.spaceIsDown = true
    
                }
                break
        }
    })
    
    window.addEventListener('keyup', function(e){
        switch(e.keyCode){
            case 37:
                nave.mvLeft = false
                break
            case 38:
                nave.mvUp = false
                break
            case 39:
                nave.mvRight = false
                break
            case 40:
                nave.mvDown = false
                break
            case 32:
            if(nave.spaceIsDown){
                nave.shoot = false
                nave.spaceIsDown = false
            }
            break
            case 13:
                if(gameState !== playing){
                    gameState = playing
                    mensageStart.visible = false
                    mensagePause.visible = false
                    // mensageIntro.visible = false
                }else{
                    gameState = paused
                    mensagePause.visible = true

                }
        }
    })
    // *********************************************
    
    
    function atualiza(){
        fundoEspaco.atualiza()
        fundoEstrelas.atualiza()
        fundoNuvens.atualiza()
    
        nave.moveNave()
    // ************** PRA NAVE NAO SAIR DA CANVAS ************
        nave.X = Math.max(0, Math.min(canvas.width - nave.largura, nave.X))
        nave.Y = Math.max(0, Math.min(canvas.height - nave.altura, nave.Y))
    // **********************************************
     
    // condiçao pra atirar
    if(nave.shoot){
        atira()
        console.log('atirou')
        nave.shoot = false
    }

    // atualiza aposiçao do tiro
    for(var i in missels){
        var missele = missels[i]
        missele.spriteY += missele.vy

        // remove o tiro quando ele sai da canvas
        if(missele.spriteY < -missele.altura){
            removeObj(missele, missels)
            removeObj(missele, sprites)
            console.log('removeu')
            i--
        }
    }

        // atualiza alienTimer
        alienTimer++

        if(alienTimer === alienFrequency){
            makeAlien()
            alienTimer = 0

            if(alienFrequency > 30){
                alienFrequency--
            }
        }

        // atualiza a posiçao do ovni
        for(var i in mvAliens){
            var mvEt = mvAliens[i]
            if(mvEt.state !== mvEt.exploded){
                mvEt.Y += mvEt.vy
            }
                if(mvEt.state === mvEt.crazy){
                    // se o o aliem bater em alguma estremidade da tela ele volta
                    if(mvEt.X > canvas.width - mvEt.largura || mvEt.X < 0 ){
                        mvEt.vx *= -1
                    }
                    mvEt.X += mvEt.vx
                }
                // se algum alien passar vai dar gameover
                if(mvEt.Y > canvas.height){
                    gameState = over
                }
                // algum alien bateu na nave
                if(collide(mvEt, nave)){
                    destroyAlien(mvEt)
                    gameState = over
                }

                // distroi um alien
                for(var j in missels){
                    var missele = missels[j]
                    if(collide(missele, mvEt) && mvEt.state !== mvEt.exploded){
                        destroyAlien(mvEt)
                        playSound(explosion)
                        hits++
                        atualizaPlacar()

                        removeObj(missele, missels)
                        removeObj(missele, sprites)
                        j--
                        i--
                    }
                }
        }
        

        
    }

    // criando os disparos
     function atira(){
        var missel = new Tiros(nave.centerX()-3, nave.Y-15, 6, 15, '#06b8ff')
        missel.vy = -8
        sprites.push(missel)
        missels.push(missel)
        playSound(fire)
     }
    
    //  atualiza o score
    function atualizaPlacar(){
        scoreMensage.text = "HITS:"+ hits
    }

    //  criando aliens
    function makeAlien(){
        var randomPosX = (Math.floor(Math.random()*8))*64
        console.log(randomPosX)
        var alien = new Ovni( 0, 0, 64, 32, randomPosX, -32)
        alien.vy = 1

        // otimizaçao do alien. colocando algumas condiloes pros aliens ficarem mais dificeis 
        // aqui e uma condicional q da 30% de chabce de sair um alien q faz zig zag
        if(Math.floor(Math.random()*11)>7){
            alien.state = alien.crazy
            alien.vx = 2
        }

        // aqui e 50% de sair um alien mais rapido q os outros
        if(Math.floor(Math.random()*11)>5){
            alien.vy = 2
        }


        aliens.push(alien)
        mvAliens.push(alien)
    }

    function explod(alien){
        ctx.drawImage(
            explosao,
            0, 0, 70, 70, canvas.width/2, canvas.height/2, 70,70
        )
    }


    function destroyAlien(alien){
        alien.state = alien.exploded
        alien.explod(ctx)

        // explod(alien)
        setTimeout(function(){
            removeObj(alien, aliens)
            removeObj(alien, mvAliens)
            
        },1000)
    }

     // remove ojetos de Arrays. basicamente ta removendo os tiros
     function removeObj(objeto, array){
        var i = array.indexOf(objeto)
        if(i !== -1){
            array.splice(i,1)
        }
    }
  
    // funçao de gameOver
    function gameOver(){
        gameOverMensage.visible = true
        gameOverMensage.text = "GAME OVER"
        setTimeout(() => {
            location.reload()
        }, 3000);
    }

    // funçao de criaçao de sons
    function playSound(soundType){
        var sound = document.createElement("audio")
        if(soundType === explosion){
            sound.src = "../sound/explosao.mp3"
        }else{
            sound.src = "../sound/tiro.mp3"
        }

        sound.addEventListener("canplaythrough", function(){
            sound.play()
        })
    }


    function desenha(){
        ctx.clearRect(0,0, canvas.width, canvas.height)
        fundoEspaco.desenha()
        fundoEstrelas.desenha()
        fundoNuvens.desenha()
    
        nave.animaNave()
        nave.desenha()

        // aqui to desenhando os tiros na tela apartir do Array de sprites q e onde ta guardado
        for(var i in sprites){
            var spr = sprites[i]
            if(spr.visible){
                ctx.fillStyle = spr.cor 
                ctx.fillRect(spr.spriteX, spr.spriteY, spr.largura, spr.altura)
                
            }
        }


        // desenhado os ovnis na tela
        for(var i in aliens){
            var et = aliens[i]
            if(et.visible){
                ctx.drawImage(
                    et.img,
                    et.spriteX, et.spriteY,
                    et.largura, et.altura,
                    et.X, et.Y,
                    et.largura, et.altura
                )
            }
        }

        // desenhando as mensagens na tela
        for(var i in mensagens){
            var mensage = mensagens[i]
            if(mensage.visible){
                ctx.font = mensage.font
                ctx.fillStyle = mensage.cor
                ctx.textBaseline = mensage.baseline
                mensage.X = (canvas.width - ctx.measureText(mensage.text).width)/2
                ctx.fillText(mensage.text, mensage.X, mensage.Y)
            }
        }
    
       
    }  
    
    function loop(){ 
        switch(gameState){
            case loading:
                console.log('loading...')
                break
            case playing:
                atualiza()
                break
            case over:
                gameOver()
                break
        }
        desenha()
    
        requestAnimationFrame(loop)
    }
    
    loop()
