var gameHistory = [];
var action = 'ch';
var winner = '';
var state = {};
var currentStep = 0;
for (let index = 0; index < 9; index++) {
    state[`c-${index}`] = null;
}
gameHistory.push(state);
$('.cell').not('r ch').click(function (e) {
    console.log('test')
    if (gameHistory.length > (currentStep + 1)) {
        gameHistory.length = (currentStep + 1);
    }
    currentStep++
    $(this).addClass(action)
    state = {};
    for (let index = 0; index < 9; index++) {
        state[`c-${index}`] = checkClass('#' + `c-${index}`)
    }
    gameHistory.push(state);

    checkWinner();


    //меняем ход
    (action == 'ch') ? action = 'r': action = 'ch';
    checkBtnStatus();

    if (currentStep == 9) {
        $('.won-title').removeClass('hidden')
        $('.won-message').text("It's a draw!")
    }
})
$('.restart-btn').click(function (e) {
    $('.won-title').addClass('hidden');
    actionNumber = 0;
    winner = '';
    gameHistory = [];
    state = {};
    for (let index = 0; index < 9; index++) {
        state[`c-${index}`] = null;
    }
    gameHistory.push(state);
    action = 'ch';
    for (let index = 0; index < 9; index++) {
        $('#' + `c-${index}`).removeClass('win horizontal vertical diagonal-left diagonal-right ch r')
    }
})

$('.undo-btn').click(function (e) {
    if (gameHistory.length > 1) {
        currentStep--;
        var newState = gameHistory[currentStep];
        for (const key in newState) {
            $('#' + `${key}`).removeClass('win horizontal vertical diagonal-left diagonal-right ch r');
            $('#' + `${key}`).addClass(newState[key]);
        }
        checkBtnStatus();
    }

});

$('.redo-btn').click(function (e) {
    if (gameHistory.length > currentStep + 1) {
        currentStep++;
        var newState = gameHistory[currentStep];
        for (const key in newState) {
            $('#' + `${key}`).removeClass('win horizontal vertical diagonal-left diagonal-right ch r');
            $('#' + `${key}`).addClass(newState[key]);
        }
        checkBtnStatus();
    }
});

function checkBtnStatus() {
    if (currentStep > 0) {
        $('.undo-btn').attr('disabled', false)
    } else {
        $('.undo-btn').attr('disabled', true)
    }

    if (currentStep + 1 < gameHistory.length) {
        $('.redo-btn').attr('disabled', false)
    } else {
        $('.redo-btn').attr('disabled', true)
    }
}

function checkWinner() {
    var items = ['ch', 'r'];
    for (let index = 0; index < items.length; index++) {
        const action = items[index];
        if (state['c-0'] == action && state['c-1'] == action && state['c-2'] == action) {
            //горизонтальная линия
            $('#c-0, #c-1, #c-2').addClass('horizontal win');
            chechWinnerStatus(action);
        } else if (state['c-3'] == action && state['c-4'] == action && state['c-5'] == action) {
            $('#c-3, #c-4, #c-5').addClass('horizontal win');
            chechWinnerStatus(action);
            //горизонтальная линия
        } else if (state['c-6'] == action && state['c-7'] == action && state['c-8'] == action) {
            $('#c-6, #c-7, #c-8').addClass('horizontal win');
            chechWinnerStatus(action);
            //горизонтальная линия
        } else if (state['c-0'] == action && state['c-3'] == action && state['c-6'] == action) {
            //вертикальная линия
            $('#c-0, #c-3, #c-6').addClass('vertical win');
            chechWinnerStatus(action);
        } else if (state['c-2'] == action && state['c-5'] == action && state['c-8'] == action) {
            //вертикальная линия
            $('#c-2, #c-5, #c-8').addClass('vertical win');
            chechWinnerStatus(action);
        } else if (state['c-1'] == action && state['c-4'] == action && state['c-7'] == action) {
            //вертикальная линия
            $('#c-1, #c-4, #c-7').addClass('vertical win');
            chechWinnerStatus(action);
        } else if (state['c-0'] == action && state['c-4'] == action && state['c-8'] == action) {
            //дигональ
            $('#c-0, #c-4, #c-8').addClass('diagonal-right win');
            chechWinnerStatus(action);
        } else if (state['c-2'] == action && state['c-4'] == action && state['c-6'] == action) {
            $('#c-2, #c-4, #c-6').addClass('diagonal-left win');
            chechWinnerStatus(action);
        }
    }
    if (winner != '') {
        $('.won-title').removeClass('hidden')
        if (winner == 'ch') {
            $('.won-message').text('Crosses won!')
        } else if (winner == 'r') {
            $('.won-message').text('Toes won!')
        } else {
            $('.won-message').text("It's a draw!")
        }
    }
}

function checkClass(selector) {
    if ($(selector).hasClass('r')) {
        return 'r'
    } else if ($(selector).hasClass('ch')) {
        return 'ch'
    } else {
        return null
    }
}

function chechWinnerStatus(action) {
    if (winner == '') {
        winner = action;
    } else if ((winner == 'ch' && action == 'r')) {
        winner = 'both'
    }
}