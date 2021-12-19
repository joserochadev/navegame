
function Ovni( spriteX, spriteY, largura, altura, X, Y){  
    this.img =  imgOvni
    this.spriteX = spriteX
    this.spriteY = spriteY
    this.largura = largura
    this.altura = altura
    this.X = X
    this.Y = Y
    this.visible = true

    this.normal = 1
    this.crazy = 2
    this.exploded = 3
    this.state = this.normal

    this.count = 0
 
 
}

Ovni.prototype = {
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
    explod: function( ctx ){
        var ctx =ctx
        

        ctx.drawImage(
            this.img = explosao,
            this.spriteX, this.spriteY,
            this.largura=70, this.altura = 70,
            this.X, this.Y,
            this.largura=70, this.altura = 70,

        )
        this.animaExplod()


    },
    animaExplod: function(){
        if(this.state == this.exploded){
            this.count = 5

            this.spriteX = Math.floor(this.count / 5)*this.largura
            
        }
    }

}