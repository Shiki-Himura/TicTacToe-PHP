// TODO - implement "let computer choose a move by randomly choosing a move from a list of moves"

var field = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

var moveArray = [
    {i:0, j:0},
    {i:0, j:1},
    {i:0, j:2},
    {i:1, j:0},
    {i:1, j:1},
    {i:1, j:2},
    {i:2, j:0},
    {i:2, j:1},
    {i:2, j:2}
];

var weight = [];
var values = [];
var difficulty;
var response = "";
//var stateWeight = [];
//var stateset = new Set();
//var uniquestates = [];
//var tempstring = "";
//sendData();

function GetRandomMove(moveList)
{
    var min = 0;
    var max = moveList.length - 1;
    var move = moveList[getRandomNumber(min, max)];
    return move;
}

function InitializeMoveList(weight)
{
    var a = 0;
    var moveList = [];
    
    for(var i = 0; i < weight.length; i++)
    {
        for(var j = weight[i]; j > 0; j--)
        {
            moveList.push(moveArray[a]);
        }
        a++;
    }
    console.log(moveList);
    return moveList;
}

function GetMove(field)
{
    const xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onload = function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            response = this.responseText;
            weight = response.split("");
        }
    }
    xmlhttp.open("GET", "computermove.php?field="+field, false);
    xmlhttp.send();
}

function checkUnique(array)
{
    for (var i = 0; i < array.length; i++)
    {
        for (var j = 0; j < array.length; j++)
        {
            if (i != j)
            {
                if (array[i] == array[j])
                {
                    console.log("duplicate");
                }
            }
            console.log("im here");
        }
    }
    console.log("unique");
}

function setDifficulty(diff)
{
    difficulty = diff;
}

function getButtons()
{
    var easy_btn = document.getElementById("visiblebutton1");
    var hard_btn = document.getElementById("visiblebutton2");

    easy_btn.style.visibility = "hidden";
    hard_btn.style.visibility = "hidden";

    var game = document.getElementsByClassName("game");
    for(var i = 0; i < game.length; i++)
    {
        game[i].style.visibility = "visible";
    }    
}

function buttonClick(e, x, y)
{
    var player_one = true;
    e.target.textContent = "X";
    e.target.disabled = true;
    field[x][y] = 1;
    player_one = false;
    
    GetMove(field);
    InitializeMoveList(weight);

    bestMove(field);
    render(field);
    validate(field);
    winnerAlert(field);
}

function getBoardState()
{
    const xmlhttp = new XMLHttpRequest();    

    xmlhttp.onload = function()
    {
        values.push(this.responseText);
    }
    
    xmlhttp.open("GET", "retrieve.php", true);
    xmlhttp.send();
}

function sendData()
{
    stateset.forEach(function(val)
    {
        const xmlhttp = new XMLHttpRequest();
    
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                console.log(this.responseText);
            }
        }
        var value = val;
        xmlhttp.open("GET", "upload.php?set="+value, false);
        xmlhttp.send();
    })
}

function sendArrayElement(array1)
{
    for (let i = 0; i < array1.length; i++) 
    {
        sendData(array1[i]);
    }
}

function getStateweight(array)
{
    for(var i = 0; i < array.length; i++)
    {
        stateWeight.push(array[i].replaceAll(/0/g, "5").replaceAll(/1/g, "0").replaceAll(/2/g, "0"));
    }
}

function bestMove(tmp_field)
{
    var rnd = getRandomNumber(0,100);
    var bestScore = +Infinity
    var move = {  };

    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 3; j++)
        {
            if(tmp_field[i][j] == 0)
            {
                tmp_field[i][j] = 2;                

                var score = miniMax(tmp_field, true);                
                if(score < bestScore)
                {
                    bestScore = score;
                    move = { i,j }
                }
                tmp_field[i][j] = 0;
            }
        }
    }

    if(rnd < difficulty)
    {
        var rndMove = getRandomIndex(tmp_field);
        tmp_field[rndMove.i][rndMove.j] = 2;
    }
    else
    {
        tmp_field[move.i][move.j] = 2;
    }
}

function miniMax(tmp_field, player)
{
    var bestScore;
    var game_over = validate(tmp_field);
    
    if(game_over != 2)
    {
        if(player == true && game_over != 0)
            return -10
        else if(game_over != 0)
            return 10
        else
            return 0
    }

    if(player == true)
    {
        bestScore = -Infinity;
        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 3; j++)
            {
                if(tmp_field[i][j] == 0)
                {
                    tmp_field[i][j] = 1;
                    //stateset.add(concatField(tmp_field).toString());
                    
                    var score = miniMax(tmp_field, false);                    
                    if(score > bestScore)
                    {
                        bestScore = score;
                    }
                    tmp_field[i][j] = 0;
                }
                
            }
        }
        return bestScore;
    }
    else
    {
        bestScore = +Infinity
        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 3; j++)
            {
                if(tmp_field[i][j] == 0)
                {                    
                    tmp_field[i][j] = 2;

                    var score = miniMax(tmp_field, true);
                    if(score < bestScore)
                    {
                        bestScore = score;
                    }
                    tmp_field[i][j] = 0;
                }
            }
        }

        return bestScore;
    }
}

function getPossibleMoves(field)
{
    var possible = [];

    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 3; j++)
        {
            if(field[i][j] == 0)
            {
               possible.push({i,j});
            }
        }
    }
    return possible;
}

function getRandomNumber(min, max)
{
    return Math.floor(Math.random() * (max-min)) + min;
}

function render(tmp_field)
{
    var newArr = concatField(tmp_field);

    var b = document.getElementsByClassName("gamebtn");
    for(var i = 0; i < newArr.length; i++)
    {
        if(newArr[i] != 0 && newArr[i] == 2)
        {
            b[i].textContent = "O";
            b[i].disabled = true;
        }
    }
}

function concatField(tmp_field)
{
    var newArr = [];

    for(var i = 0; i < tmp_field.length; i++)
    {
        newArr = newArr.concat(tmp_field[i]);
    }
    return newArr;
}

function validate(tmp_field)
{
    for(var i = 0; i < 3; i++)
    {
        if(tmp_field[i][0] != 0 && equals3(tmp_field[i][0], tmp_field[i][1], tmp_field[i][2])
        || tmp_field[0][i] != 0 && equals3(tmp_field[0][i], tmp_field[1][i], tmp_field[2][i]))
        {
            return 1;
        }
    }

    if(tmp_field[0][0] != 0 && equals3(tmp_field[0][0], tmp_field[1][1], tmp_field[2][2])
    || tmp_field[0][2] != 0 && equals3(tmp_field[0][2], tmp_field[1][1], tmp_field[2][0]))
    {
        return 1;
    }
    
    var empty_field = false;

    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 3; j++)
        {
            if(tmp_field[i][j] == 0)
            {
                empty_field = true;
            }
        }
    }

    if(empty_field == false)
    {
        return 0;
    }
    else
    {
        return 2;
    }
}

function equals3(one, two, three)
{
    return one == two && one == three;
}

function reloadPage()
{
    window.location.reload();
}

function winnerAlert(field)
{
    if(validate(field) == 1)
    {
        alert("You´ve Won!");
    }
}

function getRandomIndex(field)
{
    var array = getPossibleMoves(field);

    min = 0;
    max = array.length - 1;

    return array[getRandomNumber(min, max)];
}



