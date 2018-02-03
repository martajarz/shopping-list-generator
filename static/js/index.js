require('../sass/main.scss')

// validation based on http://kursjs.pl/kurs/formularze/formularze-walidacja.php
const formValidation = (function() {
    const showFieldValidation = function(input, inputIsValid, selector, msg) {
        document.getElementById(selector).innerHTML = msg;
        if (!inputIsValid) {
            input.parentNode.classList.remove(options.classValid);
            input.parentNode.classList.add(options.classError);
        } else {
            input.parentNode.classList.remove(options.classError);
            input.parentNode.classList.add(options.classValid);
        }
    };

    const testInputEmail = function(input) {
        const mailReg = new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$','gi');

        const msgInvalidAddress = 'Please enter the correct address';
        const msgUsedAddress = 'The address is already in the database';
        const msgCorrect = ' ';

        const addressTest = mailReg.test(input.value)

        function getData() {
            return $.ajax({
                url : $SCRIPT_ROOT + '/check_username',
                data: {
                    q: input.value
                },
                type: 'GET'
            });
        }

        if (!addressTest) {
            showFieldValidation(input, false, 'msgEmail', msgInvalidAddress);
            return false;
        }

        function handleData(data) {
            if (JSON.stringify(data) !== '[]') {
                showFieldValidation(input, false, 'msgEmail', msgUsedAddress);
                return false;
            } else {
                showFieldValidation(input, true, 'msgEmail', msgCorrect);
                return true;
            }
        }       
        
        getData().done(handleData);       
    };

    const testInputPassword = function(input) {
        const inputPassword = options.form.querySelector('#registerInputPassword');
        
        const msgInvalidPassoword = 'Please enter the correct password';
        const msgCorrect = ' ';

        if (inputPassword.value.length < 8) {
            showFieldValidation(input, false, 'msgPassword', msgInvalidPassoword);
            return false;
        } else {
            showFieldValidation(input, true, 'msgPassword', msgCorrect);
            return true;
        }
    };

    const testConfirmPassword = function(input) {
        const inputPassword = options.form.querySelector('#registerInputPassword');
        const confirmPassword = options.form.querySelector('#registerConfirmPassword');

        const msgInvalidPassoword = 'Please enter the correct password';

        if (inputPassword.value.length < 8 || confirmPassword.value == '' || inputPassword.value !== confirmPassword.value) {
            showFieldValidation(input, false, 'msgConfirm', msgInvalidPassoword);
            return false;
        } else {
            showFieldValidation(input, true, 'msgConfirm', '');
            return true;
        }
    }

    const testLoginEmail = function(input) {
        const msgInvalidAddress = 'Please enter the correct address';
        const msgCorrect = ' ';

        function getData() {
            return $.ajax({
                url : $SCRIPT_ROOT + '/check_username',
                data: {
                    q: input.value
                },
                type: 'GET'
            });
        }

        function handleData(data) {
            if (JSON.stringify(data) == '[]') {
                showFieldValidation(input, false, 'msgEmail', msgInvalidAddress);
                return false;
            } else {
                showFieldValidation(input, true, 'msgEmail', msgCorrect);
                return true;
            }
        }       
        
        getData().done(handleData);       
    };

    const testNewList = function(input) {
        const msgUsedName = 'List with that name already exist';
        const msgInvalidName = 'Please input name';
        const msgCorrect = ' ';

        if (addNewList.value == '') {
            showFieldValidation(input, false, 'msgListName', msgInvalidName);
            return false;
        }

        function getData() {
            return $.ajax({
                url : $SCRIPT_ROOT + '/check_listname',
                data: {
                    q: input.value
                },
                type: 'GET'
            });
        }
        
        function handleData(data) {
            if (JSON.stringify(data) !== '[]') {
                showFieldValidation(input, false, 'msgListName', msgUsedName);
                return false;
            } else {
                showFieldValidation(input, true, 'msgListName', msgCorrect);
                return true;
            }
        }
                
        getData().done(handleData);  
    };

    const testNewRecipe = function(input) {
        const msgUsedName = 'Recipe with that name already exist';
        const msgInvalidName = 'Please input name';
        const msgCorrect = ' ';

        if (addNewRecipe.value == '') {
            showFieldValidation(input, false, 'msgRecipeName', msgInvalidName);
            return false;
        }

        function getData() {
            return $.ajax({
                url : $SCRIPT_ROOT + '/check_recipe_name',
                data: {
                    q: input.value
                },
                type: 'GET'
            });
        }
        
        function handleData(data) {
            console.log(JSON.stringify(data));
            if (JSON.stringify(data) !== '[[],[]]') {
                showFieldValidation(input, false, 'msgRecipeName', msgUsedName);
                return false;
            } else {
                showFieldValidation(input, true, 'msgRecipeName', msgCorrect);
                return true;
            }
        }
                
        getData().done(handleData);  
    };

    const prepareElements = function() {
        const elements = options.form.querySelectorAll(':scope [required]');

        [].forEach.call(elements, function(element) {
            if (element.nodeName.toUpperCase() == 'INPUT') {
                const type = element.type.toUpperCase();
                const elementId = element.id;

                if (type == 'EMAIL') {
                    element.addEventListener('keyup', function() {testInputEmail(element)});
                    element.addEventListener('blur', function() {testInputEmail(element)});
                }
                if (type == 'PASSWORD' && elementId == 'registerInputPassword') {
                    element.addEventListener('keyup', function() {testInputPassword(element)});
                    element.addEventListener('blur', function() {testInputPassword(element)});
                }
                if (type == 'PASSWORD' && elementId == 'registerConfirmPassword') {
                    element.addEventListener('keyup', function() {testConfirmPassword(element)});
                    element.addEventListener('blur', function() {testConfirmPassword(element)});
                }
                if (type == 'EMAIL' && elementId == 'loginEmail') {
                    element.addEventListener('keyup', function() {testLoginEmail(element)});
                    element.addEventListener('blur', function() {testLoginEmail(element)});
                }
                if (type == 'TEXT' && elementId == 'addNewList') {
                    element.addEventListener('keyup', function() {testNewList(element)});
                    element.addEventListener('blur', function() {testNewList(element)});
                }
                if (type == 'TEXT' && elementId == 'addNewRecipe') {
                    element.addEventListener('keyup', function() {testNewRecipe(element)});
                    element.addEventListener('blur', function() {testNewRecipe(element)});
                }
            }
        });
    };

    const formSubmit = function() {
        options.form.addEventListener('submit', function(e) {
            e.preventDefault();
    
            let readyToSubmit = true;
            let checkSubmitEmail = true;
            let checkSubmitPassword = true;
            let checkLoginEmail = true;
            let checkSubmitConfirm = true;
            let checkSubmitText = true;
    
            const elements = options.form.querySelectorAll(':scope [required]');
            
            function checkError(element) {
                if (element.parentNode.classList.contains('error')) {
                    return false;
                } else if (element.value == "") {
                    return false;
                } else {
                    return true;
                }
            }
            [].forEach.call(elements, function(element) {
                if (element.nodeName.toUpperCase() == 'INPUT') {
                    const type = element.type.toUpperCase();

                    if (type == 'EMAIL') {
                        checkSubmitEmail = checkError(element);                            
                    }
                    if (type == 'PASSWORD') {
                        checkSubmitPassword = checkError(element);                            
                    }
                    if (type == 'PASSWORD') {
                        checkSubmitConfirm = checkError(element);                            
                    }
                    if (type == 'EMAIL') {
                        checkLoginEmail = checkError(element);                            
                    }
                    if (type == 'TEXT') {
                        checkSubmitText = checkError(element);                            
                    }
                }
                if (!checkSubmitEmail || !checkSubmitPassword || !checkSubmitConfirm || !checkSubmitText) {
                    readyToSubmit = false;
                }
            });
    
            if (readyToSubmit) {
                this.submit();
            } else {
                return false;
            }
        });
    };

    const init = function(_options) {
        options = {
            form : _options.form || null,
            classError : _options.classError || 'error',
            classValid : _options.classValid || 'valid'
        }
        if (options.form == null || options.form == undefined || options.form.length == 0) {
            return false;
        }

        options.form.setAttribute('novalidate', 'novalidate');

        prepareElements();
        formSubmit();
    }

    return {
        init: init
    }


})();

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.form');
    formValidation.init({form : form});

    // typeahead for searching ingredients
    $('#searchIngredient .typeahead').typeahead({
        highlight: true,
        minLength: 1
    },
    {
        name: 'ingredients',
        source: searchIngredient,
        display: 'ingredient',
        templates: {
            suggestion: Handlebars.compile('<div><strong>{{ingredient}}</strong>, {{category}}</div>')
        }
    });

    // typeahead for searching ingredients
    $('#searchRecipe .typeahead').typeahead({
        highlight: true,
        minLength: 1
    },
    {
        name: 'recipes',
        source: searchRecipe,
        display: 'name',
        templates: {
            suggestion: Handlebars.compile('<div><strong>{{name}}</strong>, {{category}}</div>')
        }
    });

    // add choosen ingredient name to DOM 
    $('#searchRecipe .typeahead').bind("typeahead:select", getRecipe);

    function searchIngredient(query, syncResults, asyncResults) {
        var parameters = {
            q: query
        };
        $.getJSON($SCRIPT_ROOT + '/search_ingredient', parameters)
        .done(function(data, textStatus, jqXHR) {
            // call typeahead's callback with search results (i.e., places)
            asyncResults(data);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            // call typeahead's callback with no results
            asyncResults([]);
        });
    }

    function searchRecipe(query, syncResults, asyncResults) {
        var parameters = {
            q: query
        };
        $.getJSON($SCRIPT_ROOT + '/search_recipe', parameters)
        .done(function(data, textStatus, jqXHR) {
            // call typeahead's callback with search results (i.e., places)
            asyncResults(data);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            // call typeahead's callback with no results
            asyncResults([]);
        });
    }
});

const viewList = document.querySelector('#viewList'); 

function getList() {    
    function getData(input) {
        return $.ajax({
            url: $SCRIPT_ROOT + '/get_list',
            data: {
                q: input
            },
            type: 'GET'
        });
    }

    function handleData(data) {
        document.getElementById("outputTable").innerHTML = "";
        const button = '<div class="form-check"><input class="form-check-input" type="checkbox" value=""></div>'

        var newTable = '<table class="table">';
        for(i = 0; i < data.length; i++) {
            newTable += '<tr><td>' + button +'</td>';
            newTable += '<td>' + data[i].ingredient + '</td>';
            newTable += '<td>' + data[i].measure + '</td>';
            newTable += '<td>' + data[i].unit + '</td></tr>';
        }
        newTable += '</table>';

        document.getElementById("outputTable").innerHTML = newTable;  
    }

    getData(this.value).done(handleData);
}

if (viewList) {
    viewList.addEventListener('change', getList)
}


function getRecipe() {

    var newHeader = '<div><h5>' + this.value + '</h5></div>';

    function getData(input) {
        return $.ajax({
            url: $SCRIPT_ROOT + '/get_recipe',
            data: {
                q: input
            },
            type: 'GET'
        });
    }

    function handleData(data) {
        document.getElementById("outputHeader").innerHTML = "";
        document.getElementById("outputRecipe").innerHTML = "";

        
        newHeader  += '<div class="recipe">Category: ' + data[0][0].category + '</div>';
        newHeader  += '<div class="recipe"><a target="_blank" href="' + data[0][0].url + '">' + data[0][0].url + '</a></div>';
        newHeader  += '<div class="recipe"><img class="recipe-image" src="' + data[0][0].image + '"></div>';

        var newTable = '<table class="table recipe-table">';
        newTable += ''
        for(i = 0; i < data[1].length; i++) {
            newTable += '<tr><td>' + data[1][i].ingredient + '</td>';
            newTable += '<td>' + data[1][i].measure + '</td>';
            newTable += '<td>' + data[1][i].unit + '</td></tr>';
        }
        newTable += '</table>';

        document.getElementById("outputHeader").innerHTML = newHeader;
        document.getElementById("outputRecipe").innerHTML = newTable;  
    }

    getData(this.value).done(handleData);
}







