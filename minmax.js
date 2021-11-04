// TODO - let weight change take effect after someone has won

var field = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

var moveArray = [
    {ID:0, i:0, j:0},
    {ID:1, i:0, j:1},
    {ID:2, i:0, j:2},
    {ID:3, i:1, j:0},
    {ID:4, i:1, j:1},
    {ID:5, i:1, j:2},
    {ID:6, i:2, j:0},
    {ID:7, i:2, j:1},
    {ID:8, i:2, j:2}
];

var temp = 0;
var newWeightPosition = temp;
var newWeight = [];
var cpuReaction = [];
var tempArr = [];
var dataArray = [];
var allWeights = [];

var chosenMoves = [];
var moveList = [];

var weight = [];
var state = [];
var cpuWeight = [];

var values = [];
var difficulty;

var response = "";
var CPUresponse = [];

var stateWeight = [];
var updatedWeight = [];

var winner = 0;
var counter = 0;
//var stateset = new Set();
//var uniquestates = [];
//var tempstring = "";

function GetRandomMove(moveList)
{
    var min = 0;
    var max = moveList.length - 1;
    var move = moveList[getRandomNumber(min, max)];
    return move;
}

function InitializeMoveList(weight)
{
    moveList = [];
    var a = 0;
    
    for(var i = 0; i < weight.length; i++)
    {
        for(var j = weight[i]; j > 0; j--)
        {
            moveList.push(moveArray[a]);
        }
        a++;
    }
    return moveList;
}

function GetWeight(field)
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

function GetCPUWeight(field)
{
    const xmlhttp1 = new XMLHttpRequest();
    
    xmlhttp1.onload = function()
    {
        if (xmlhttp1.readyState==4 && xmlhttp1.status==200)
        {
            CPUresponse = this.responseText;
            cpuWeight.push(CPUresponse.split(""));            
        }
    }
    xmlhttp1.open("GET", "computermove.php?field="+field, false);
    xmlhttp1.send();
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
    e.target.textContent = "X";
    e.target.disabled = true;
    field[x][y] = 1;
    
    GetWeight(concatField(field));
    InitializeMoveList(weight);
    MakeMove(field);
    
    dataArray.push({
        State : state[state.length-1],
        Move : chosenMoves[chosenMoves.length-1],
        Weight : weight
    });
    tempArr = dataArray[dataArray.length-1].Move["ID"];
    temp = dataArray[dataArray.length-1].Weight[tempArr];
    
    winnerAlert(validate(weight));
    newWeight.push((dataArray[dataArray.length-1].Weight));
    if(winner == 1 || winner == 2 || winner == 3)
    {
        SetNewWeight();
    }
    render(field);
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
        xmlhttp.open("GET", "upload.php?field="+value, false);
        xmlhttp.send();
    })
}

function UpdateData(state, weight)
{
    const xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            console.log(this.responseText);
        }
    }
    xmlhttp.open("GET", "updatedb.php?state="+state+"&weight="+weight, false);
    xmlhttp.send();
}

function sendArrayElement(array1)
{
    for (let i = 0; i < array1.length; i++) 
    {
        sendData(array1[i]);
    }
}

function SetNewWeight()
{
    for(var i = 0; i < state.length; i++)
    {
        var stateOut = state[i];
        var weightOut = newWeight[i];
        var reaction = cpuReaction[i];

        if(winner == 1)
        {
            var myNum = (parseInt(weightOut[parseInt(reaction)]));
            weightOut[parseInt(reaction)] = myNum - 1;
        }
        else if(winner == 2)
        {
            var myNum = (parseInt(weightOut[parseInt(reaction)]));
            weightOut[parseInt(reaction)] = myNum + 1;
        }
        UpdateData(stateOut, weightOut);
    }
}

function MakeMove(field)
{
    var rndMove = GetRandomMove(moveList);
    if(validate(field) == 2)
    {
        field[rndMove.i][rndMove.j] = 2;
        chosenMoves.push(rndMove);
        GetCPUWeight(field);
    }
    
}

/*function bestMove(tmp_field)
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
        //var rndMove = getRandomIndex(tmp_field);
        var rndMove = GetRandomMove(moveList);
        tmp_field[rndMove.i][rndMove.j] = 2;
        chosenMoves.push(rndMove);
        console.log("random");
    }
    else
    {
        tmp_field[move.i][move.j] = 2;
        chosenMoves.push([move.i][move.j]);
        console.log("fixed best move");
    }
}*/

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
        if(tmp_field[i][0] != 0 && equals3(tmp_field[i][0], tmp_field[i][1], tmp_field[i][2]))
        {
            winner = tmp_field[i][0];
            return 1;
        }
        else if(tmp_field[0][i] != 0 && equals3(tmp_field[0][i], tmp_field[1][i], tmp_field[2][i]))
        {
            winner = tmp_field[0][i];
            return 1;
        }
    }

    if(tmp_field[0][0] != 0 && equals3(tmp_field[0][0], tmp_field[1][1], tmp_field[2][2])
    || tmp_field[0][2] != 0 && equals3(tmp_field[0][2], tmp_field[1][1], tmp_field[2][0]))
    {
        winner = tmp_field[1][1];
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
        winner = 3;
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

function winnerAlert()
{
    if(validate(field) == 1 && winner == 1)
    {
        allWeights.push(weight);
        cpuReaction.push(dataArray[dataArray.length-1].Move["ID"]);
        state.push(concatField(field));

        alert("Player 1 has Won!");
        DisableButtons();
        GetWeight(field);
    }
    else if(validate(field) == 1 && winner == 2)
    {
        allWeights.push(weight);
        cpuReaction.push(dataArray[dataArray.length-1].Move["ID"]);
        state.push(concatField(field));

        alert("Player 2 has Won!");
        DisableButtons();
        GetWeight(field);
    }
    else if(validate(field) == 0 && winner == 3)
    {
        allWeights.push(weight);
        cpuReaction.push(dataArray[dataArray.length-1].Move["ID"]);
        state.push(concatField(field));

        alert("Tie!");
        DisableButtons();
        GetWeight(field);
    }
    else
    {
        allWeights.push(weight);
        cpuReaction.push(dataArray[dataArray.length-1].Move["ID"]);
        state.push(concatField(field));
    }
    
    
}

function DisableButtons()
{
    var btn = document.getElementsByClassName("gamebtn");
    for (let index = 0; index < btn.length; index++)
    {
        const i = btn[index];
        i.disabled = true;
    }
}

function getRandomIndex(field)
{
    var array = getPossibleMoves(field);

    min = 0;
    max = array.length - 1;

    return array[getRandomNumber(min, max)];
}



