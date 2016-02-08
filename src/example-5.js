/**
 * Example-5
 * In this example we can see how to work with "equal" filter
 */

$(function() {
  messages = [
    {
      el: '.pass-51',
      valid: 'Good!',
      invalid: [
        {
          filter: 'required',
          text: 'Password must be required'
        },
        {
          filter: 'equal',
          text: 'Passwords don\'t equal'
        }
      ]
    },
    {
      el: '.pass-52',
      valid: 'Good!',
      invalid: [
        {
          filter: 'required',
          text: 'Password must be required'
        },
        {
          filter: 'equal',
          text: 'Passwords don\'t equal'
        }
      ]
    }
  ];

  $('#example-5').validator({
    filters: {
      '.pass51': 'required | equal:.pass52',
      '.pass52': 'required | equal:.pass51'
    },
    messages: messages
  });
});
