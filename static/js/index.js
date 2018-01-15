require('../sass/main.scss')

// $SCRIPT_ROOT = {{ request.script_root|tojson|safe }}

// $('.carousel').carousel({
//     interval: 5000
// })

// based on http://kursjs.pl/kurs/formularze/formularze-walidacja.php
const formValidation = (function() {
    const showFieldValidation = function(input, inputIsValid) {
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
        var parameters = {
            u: input.value
        };
        let status = false;

        $.getJSON($SCRIPT_ROOT + '/check_username', parameters, function() {
            status = true;
        });

        console.log(status);
    

        if (!mailReg.test(input.value)) {
            showFieldValidation(input, false);
            return false;
        } else {
            showFieldValidation(input, true);
            return true;
        }
    };

    const testInputPassword = function(input) {
        const inputPassword = options.form.querySelector('#registerInputPassword');
        
        if (inputPassword.value.length < 8) {
            showFieldValidation(input, false);
            return false;
        } else {
            showFieldValidation(input, true);
            return true;
        }
    };

    const testConfirmPassword = function(input) {
        const inputPassword = options.form.querySelector('#registerInputPassword');
        const confirmPassword = options.form.querySelector('#registerConfirmPassword');
        
        if (inputPassword.value.length < 8 || confirmPassword.value == '' || inputPassword.value !== confirmPassword.value) {
            showFieldValidation(input, false);
            return false;
        } else {
            showFieldValidation(input, true);
            return true;
        }
    }

    const prepareElements = function() {
        const elements = options.form.querySelectorAll(':scope [required]');
        // const passwordId = options.form.querySelector('#registerInputPassword');

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
            console.warn('formValidation: Źle przekazany formularz');
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
    formValidation.init({form : form})

    $("#searchIngredient").typeahead({
        highlight: false,
        minLength: 1
    },
    {
        display: function(suggestion) { return null; },
        limit: 10,
        source: searchIngredient,
        templates: {
            name: 'searchIngredient',
            displayKey: 'ingredient',
            suggestion: Handlebars.compile(
                "<div><strong>" +
                "{{ingredient}}</strong>, {{category}}" +
                "</div>"
            )
        }
    });
    //    $("#searchIngredient").on("typeahead:selected", function(eventObject, suggestion, name) {

        
    // });
});


function searchIngredient(query, syncResults, asyncResults)
{
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

        // log error to browser's console
        console.log(errorThrown.toString());

        // call typeahead's callback with no results
        asyncResults([]);
    });
}