//DEPRECATED!!

var playField = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

var playerOne = true;

function buttonClick(e, x, y){
    console.log(e);
    console.log(x,y);
    

    if(playerOne)
    {
        e.target.textContent = "X";
        playField[x][y] = 1;
        
        playerOne = false;
    }
    else
    {
        e.target.textContent = "O";
        playField[x][y] = 2;

        playerOne = true;
    }
    e.target.disabled = true;
    validateWinner();
}

function resetApp(){
    window.location.reload();
}

function validateWinner(){

    for(var i = 0; i < playField.length; i++)
    {
        var hasWon = false;
        var b = document.getElementsByClassName("gamebtn");

        //determine if column or row has won
        if(playField[i][0] != 0 && playField[i][0] == playField[i][1] && playField[i][0] == playField[i][2])
        {
            for(var i = 0; i < b.length; i++)
            {
                b[i].disabled = true;
                hasWon = true;
            }
        }

        //determine if column or row has won
        if(playField[0][i] != 0 && playField[0][i] == playField[1][i] && playField[0][i] == playField[2][i])
        {
            for(var i = 0; i < b.length; i++)
            {
                b[i].disabled = true;
                hasWon = true;
            }
        }

        //determine if the diagonal[0][0] to [2][2] has won
        if(playField[0][0] != 0 && playField[1][1] == playField[0][0] && playField[2][2] == playField[0][0])
        {
            for(var i = 0; i < b.length; i++)
            {
                b[i].disabled = true;
                hasWon = true;
            }
        }

        //determine the diagonal[0][2] to [2][0] has won
        if(playField[0][2] != 0 && playField[1][1] == playField[0][2] && playField[2][0] == playField[0][2])
        {
            for(var i = 0; i < b.length; i++)
            {
                b[i].disabled = true;
                hasWon = true;
            }
        }
    }
    if(hasWon){
        alert("Congratulations, you´ve WON!");
    }
}

