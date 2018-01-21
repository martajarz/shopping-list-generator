require('../sass/main.scss')

function checkInDatabase(url, input,) {
    return $.ajax({
        url: $SCRIPT_ROOT + url,
        data: {
            q: input.value
        },
        type: 'GET'
    });
}

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
        const usernamePromised = checkInDatabase('/check_username', input);

        if (!addressTest) {
            showFieldValidation(input, false, 'msgEmail', msgInvalidAddress);
            return false;
        } else {
            usernamePromised.done(function(data){
                if (JSON.stringify(data) !== '[]') {
                    showFieldValidation(input, false, 'msgEmail', msgUsedAddress);
                } else {
                    showFieldValidation(input, true, 'msgEmail', msgCorrect);
                }
            });
        }
        if (input.parentNode.querySelector('.error')) {
            return false;
        } else {
            return true;
        }
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

        if (inputPassword.value.length < 8 || confirmPassword.value == '' || inputPassword.value !== confirmPassword.value) {
            showFieldValidation(input, false, 'msgConfirm', '');
            return false;
        } else {
            showFieldValidation(input, true, 'msgConfirm', '');
            return true;
        }
    }

    const testNewList = function(input) {
        const msgUsedName = 'List with that name already exist';
        const msgCorrect = ' ';

        const listnamePromised = checkInDatabase('/check_listname', input);
        
        listnamePromised.done(function(data){
            if (JSON.stringify(data) !== '[]') {
                console.log("jest");
                showFieldValidation(input, false, 'msgListName', msgUsedName);
                return false;
            } else {
                console.log("nie ma");
                showFieldValidation(input, true, 'msgListName', msgCorrect);
                return true;
            }
        });
        if (input.parentNode.querySelector('.error')) {
            return false;
        } else {
            return true;
        }
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
                if (type == 'TEXT' && elementId == 'addNewList') {
                    element.addEventListener('keyup', function() {testNewList(element)});
                    element.addEventListener('blur', function() {testNewList(element)});
                }
            }
        });
    };

    const formSubmit = function() {
        options.form.addEventListener('submit', function(e) {
            e.preventDefault();
    
            let validated = true;
    
            const elements = options.form.querySelectorAll(':scope [required]');
    
            [].forEach.call(elements, function(element) {
                if (element.nodeName.toUpperCase() == 'INPUT') {
                    const type = element.type.toUpperCase();
                    if (type == 'EMAIL') {
                        if (!testInputEmail(element)) validated = false;
                    }
                    if (type == 'PASSWORD') {
                        if (!testInputPassword(element)) validated = false;
                    }
                    if (type == 'TEXT') {
                        if (!testNewList(element)) validated = false;
                    }
                }
            });
    
            if (validated) {
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

    // add choosen ingredient name to DOM
    $('#searchIngredient .typeahead').bind("typeahead:select", function(ev, suggestion) {
        document.querySelector('#choosenIngredient').value = suggestion.ingredient;
        document.querySelector('#choosenIngredient2').value = suggestion.ingredient;
    });

    function searchIngredient(query, syncResults, asyncResults) {
        // get places matching query (asynchronously)
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
});

const viewList = document.querySelector('#viewList'); 

function getList() {
    console.log('blabla');
}
if (viewList) {
    viewList.addEventListener('change', getList)
}