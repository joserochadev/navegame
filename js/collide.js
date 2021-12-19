function collide(s1, s2){
    var hit = false

    var vetX = s1.centerX() - s2.centerX()
    var vetY = s1.centerY() - s2.centerY()

    var sumMetadeLargura = s1.metadeLargura() + s2.metadeLargura()
    var sumMetadeAltura = s1.metadeAltura() + s2.metadeAltura()

    if(Math.abs(vetX) < sumMetadeLargura && Math.abs(vetY) < sumMetadeAltura){
        hit = true
    }

    return hit
}