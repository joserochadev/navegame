function fundo(imagem, contexto, velocidade){
    this.img = imagem
    this.spriteX = 0
    this.spriteY = 0
    this.largura = 500
    this.altura = 1000
    this.X = 0
    this.Y = 0
    this.ctx = contexto
    this.speed = velocidade
    this.posicaoEmenda = 0
}

fundo.prototype = {
    desenha: function(){
        var posicaoY = this.posicaoEmenda - this.altura;
        this.ctx.drawImage(
            this.img,
            this.spriteX,this.spriteY,
            this.largura, this.altura,
            this.X, posicaoY ,
            this.largura, this.altura
        )
        posicaoY = this.posicaoEmenda;
        this.ctx.drawImage(
            this.img,
            this.spriteX,this.spriteY,
            this.largura, this.altura,
            this.X, posicaoY  ,
            this.largura, this.altura
        )
    },

    atualiza: function(){
        // Atualizar a posição de emenda
    this.posicaoEmenda += this.speed;
        // Emenda passou da posição
    if (this.posicaoEmenda > this.altura)
        this.posicaoEmenda = 0;
    }
}