function nave(img, ctx){
    this.img = img 
    // this.tiro = imgTiro
    this.spriteX = 0
    this.spriteY = 0
    this.largura = 36
    this.altura = 48
    this.X = (canvas.width /2)-(this.largura/2)
    this.Y = canvas.height - this.altura
    this.mvRight = this.mvLeft = this.mvUp = this.mvDown = this.shoot = this.spaceIsDown =  false
    this.speed = 4
    this.count = 0
    this.ctx = ctx
    this.tiroY = this.Y - this.altura 

}

nave.prototype = {
    desenha: function(){
        this.ctx.drawImage(
            this.img,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.X, this.Y,
            this.largura, this.altura
        )

       
    },

    atualiza: function(){
        

    },

    moveNave: function(){
        if(this.mvLeft){
            this.X -= this.speed
            this.spriteY = this.altura * 1
            
        }else if(this.mvRight){
            this.X += this.speed
            this.spriteY = this.altura * 2

        }else if(this.mvUp){
            this.Y -= this.speed
            this.spriteY = this.altura *0

        }else if(this.mvDown){
            this.Y += this.speed
            this.spriteY = this.altura *0

        }else{
            this.spriteY = this.altura *0

        }
    

        

        
    },

    animaNave: function(){
        if(this.mvLeft || this.mvRight || this.mvUp || this.mvDown){
            this.count++
            if(this.count >= 10){
                this.count = 0
            }

            this.spriteX = Math.floor(this.count / 5)*this.largura
        }else{
            this.count++
            if(this.count >= 10){
                this.count = 0
            }

            this.spriteX = Math.floor(this.count / 5)*this.largura
            
        }
    },



    // ##########################################################
    centerX: function(){
        return this.X + (this.largura/2)
    },
    centerY: function(){
        return this.Y + (this.altura/2)
    },
    metadeLargura: function(){
        return this.largura / 2
    },
    metadeAltura: function(){
        return this.altura / 2
    },
    // ##########################################################




} 