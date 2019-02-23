console.log("Code by Vashudev Dhama");

var player1 = prompt("Code written by Vashudev Dhama\nEnter Player 1 name: ");
var player1Color = 'rgb(255, 0, 0)';

var player2 = prompt("Enter Player 2 name: ");
var player2Color = 'rgb(0, 0, 255)';

alert(player1+": You will be Blue\n"+player2+": Your will be Red\nLet's start!");

var game_on = true; //tells either game is on or not.
var table=$('table tr'); //capture all the rows of the table.

//to change the color to 'color', of button having position(rowIndex,colIndex).
function changeColor(rowIndex, colIndex, color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);//select button from cell with colIndex within the row with rowIndex to change it's css property.
}

//return color of selected button from cell with colIndex within the row with rowIndex.
function returnColor(rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

//to check the lowest grey button.
function checkBotton(colIndex){//check for bottom most gray button of a row in picked column with colIndex .
    var colorReport=returnColor(5,colIndex); //since there are total 6 rows and hence bottom most row possess index 5.
    for (var row = 5; row >= 0; row--) { //since total 6 rows so start checking from bottom most to top one.
        colorReport=returnColor(row,colIndex);//store the color.
        if(colorReport==='rgb(128, 128, 128)'){//check if stored color is gray.
            return row;//if it's grey then return the row number.
        }
    }
}

//check that given four color whether they are equal or not.
function colorMatchChecker(one, two, three, four){
    return(one === two && one ===three && one===four && one!=='rgb(128, 128, 128)' && one!==undefined); //also they shouldn't be equal to gray(since all are gray in beggining) and also shouldn't be undefined.
}

//check for horizontal match row wise.
function winCheckHorizontal(){
    for(var row =0; row<6; row++){//total 6 rows to check.
        for(var col=0; col<5; col++){//column no. can reach to just 4 to get four consecutive equal colors in a row.
            if(colorMatchChecker(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))){
                //reportWin(row,col);
                return true;
            }
            else{continue;}
        }
    }
}

//similarly check for vertical match column wise.
function winCheckVertical(){
    for(var col = 0; col<8; col++){//total 8 columns to check.
        for(var row=0;row<3; row++){//row no. can reach to just 2 to get four consecutive equal colors in a column.
            if(colorMatchChecker(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))){
                return true;
            }
            else{continue;}
        }
    }
}

//now check for diagonal match.
function winCheckDiagonal(){
    for(var col=0;col<6;col++){
        for(var row=0;row<7;row++){
            if(colorMatchChecker(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))){
                return true;
            } 
            else if(colorMatchChecker(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2),returnColor(row-3,col+3))){
                return true;
            }
            else{ continue;}
        }
    }
}

//Starting with first player:
var currentPlayer=1;
var currentPlayerName=player1;
var currentColor=player1Color;

$('h3').text(player1+" it's your turn, pick a column to drop in!");

$('.board button').on('click',function(){
    var col = $(this).closest('td').index();
    var bottomAvailable=checkBotton(col); 
    changeColor(bottomAvailable,col,currentColor);

    //check if there is a win or tie:
    if(winCheckDiagonal() || winCheckHorizontal() || winCheckVertical()){
        $('h1').text(currentPlayerName+", You have won!");
        $('h3').fadeOut('fast');
        $('h2').fadeOut('fast');
        $('.board button').attr("disabled",true);
    }

    currentPlayer=currentPlayer * -1;
    if(currentPlayer===1){
        currentPlayerName=player1;
        $('h3').text(currentPlayerName+" it's your turn.");
        currentColor=player1Color;
    }
    else{
        currentPlayerName=player2;
        $('h3').text(currentPlayerName+" it's your turn");
        currentColor=player2Color;
    }
})