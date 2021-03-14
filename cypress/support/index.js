// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands/to-be-reorganised.js";
//back-end
import "./commands/back-end/register.js";
import "./commands/back-end/login.js";
import "./commands/back-end/addList.js";

//front-end
import "./commands/front-end/listsPageCommands.js";
import "./commands/front-end/newRecipePageCommands.js";



// Alternatively you can use CommonJS syntax:
// require('./commands')
