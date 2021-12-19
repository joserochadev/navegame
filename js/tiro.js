
function Tiros(spriteX, spriteY, largura, altura, cor){   
   this.spriteX = spriteX
   this.spriteY = spriteY
   this.largura = largura
   this.altura = altura
   this.cor = cor
   this.visible = true


}

Tiros.prototype = {
    centerX: function(){
        return this.spriteX + (this.largura/2)
    },
    centerY: function(){
        return this.spriteY + (this.altura/2)
    },
    metadeLargura: function(){
        return this.largura / 2
    },
    metadeAltura: function(){
        return this.altura / 2
    },
}