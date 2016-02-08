/**
 * Example-10
 * There is we are using checkboxes and radio buttons.
 */

$(function() {
  $('#example-10').validator({
    autoClear: false,

    filters: {
      '#select-value':   'required',
      '.checkboxbutton': 'required',
      '.radiobutton':    'required'
    },

    messages: [
      {
        el: '.select-message',
        valid: 'Good!',
        invalid: 'Choose select value'
      },
      {
        el: '.checkboxes-message',
        valid: 'Good!',
        invalid: 'Choose checkbox'
      },
      {
        el: '.radious-message',
        valid: 'Good!',
        invalid: 'Choose radio'
      }
    ],

    ajax: {
      success: function() {
        showStatus('success');
      },
      error: function() {
        showStatus('error');
      }
    }
  });
});
