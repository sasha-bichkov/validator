/**
 * Example-4
 * In this example validation work with messages, ajax and events
 */

$(function() {
    var messages = [
    {
      el: '.login-4',
      valid: 'Good!',
      invalid: [
        {
          filter: 'required',
          text: 'Login must be required'
        },
        {
          filter: 'login',
          text: 'Login contains chars, digits, "." and "_"'
          
        },
        {
          filter: 'min',
          text: 'Minimal length is 3 symbols'
        }
      ]
    },
    {
      el: '.pass-4',
      valid: 'Good!',
      invalid: [
        {
          filter: 'required',
          text: 'Password must be required'
        },
        {
          filter: 'min',
          text: 'Minimal length is 3 symbols'
        }
      ]
    },
    {
      el: '.email-4',
      valid: 'Good!',
      invalid: 'Email isn\'t correct!'
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

  var events = { 'keyup': true }; //you can add more events

  $('#example-4').validator({
    autoClear: false,
    filters: {
      '.login4': 'required | login | min:3',
      '.pass4':  'required | min:3',
      '.email4': 'required | email'
    },
    ajax: ajax,
    events: events,
    messages: messages
  });
});
