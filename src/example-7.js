/**
 * Example-7
 * The example of validation with
 * xss protection. We save html-tags but they don't execute when
 * we put them into html
 */

$(function() {
  var ajax = {
    success: function() {
      showStatus('success');
    },
    error: function() {
      showStatus('error');
    }
  };

  var events = { 'keyup': true };

  $('#example-7').validator({
    autoClear: false,
    filters: {
      '#text': 'xss | required'
    },
    /**
     * Text was processed by filter 'xss'
     */
    after: function(text) {
      $('.textarea-message').html(text);
    },
    ajax: ajax,
    events: events
  });
});
