
$(document).ready(function(){
    //TODO: draw a grid
    const con = new Connect4('#connect4');

    con.onPlayerMove = function(){
        $('#player').text(con.player);
    }

    $('#restart').click(function(){
        con.restart();
    })
})