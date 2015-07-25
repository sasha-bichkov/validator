/**
 * Other form input
 */

$(function() {
  var messages = [
    {
      el: '.file-message',
      valid: 'Good!',
      invalid: 'It\'s not an image!'
    },
    {
      el: '.color-message',
      valid: 'Good!',
      invalid: 'Bad color value!'
    },
    {
      el: '.date-message',
      valid: 'Good!',
      invalid: 'Bad date value'
    },
    {
      el: '.time-message',
      valid: 'Good!',
      invalid: 'Bad time value'
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

  $('#other-form-input').validator({
    autoClear: false,
    filters: {
      '.file':  'required | image',
      '.color': 'required | color',
      '.date':  'required | date',
      '.time':  'required | time'
    },
    ajax: ajax,
    messages: messages
  });
});