/**
 * Example-3
 * The example of validation with ajax and messages, but
 * valid and invalid is a function, not a string.
 */

$(function() {
  var messages = [
    {
      /**
       * If input value is valid you can add preloader and send 
       * data to the server that check this value on uniq in data base. 
       * To do it you must write ajax function here.
       */
      valid: function() {
        showSuccessIcon('.login-3');
      },
      invalid: function() {
        /**
         * You can also print an error message here
         */
        showErrorIcon('.login-3');
      }
    },
    {
      valid: function() {
        showSuccessIcon('.pass-3');
      },
      invalid: function() {
        showErrorIcon('.pass-3');
      }
    },
    {
      valid: function() {
        showSuccessIcon('.email-3');
      },
      invalid: function() {
        showErrorIcon('.email-3');
      }
    }
  ];

  var ajax = {
    success: function() {
      showStatus('success');
    },
    error: function() {
      showStatus('error');
    }
  };

  $('#example-3').validator({
    autoClear: false,
    filters: {
      '.login3': 'required | login | min:3',
      '.pass3':  'required | min:3',
      '.email3': 'required | email'
    },
    ajax: ajax,
    messages: messages
  });
});
