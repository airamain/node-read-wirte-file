function armarJuntada (amigos,lugar){
    var seJuntamo = false;
    if(amigos.lenght > 0){
        for (i = 0; i<amigos.lenght; i++){
            if(llamar(amigos[i],lugar) == true){
                var cervezas = amigos[i].seToma;
                comprar(cervezas * 2);
                seToma = true;
            }
        }
    }
    return seJuntamo;
}