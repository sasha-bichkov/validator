/**
 * Example-2
 * The example of validation with messages
 */

$(function() {
  var messages = [
    {
      el: '.login-2',
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
      el: '.pass-2',
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
      el: '.email-2',
      valid: 'Good!',
      invalid: 'Email isn\'t correct!'
    }
  ];

  $('#example-2').validator({
    filters: {
      '.login2': 'required | login | min:3',
      '.pass2':  'required | min:3',
      '.email2': 'required | email'
    },
    messages: messages
  });
});
