/**
 * Example-6
 * The example of validation with
 * our filter which we add using 'callbacks' option
 */

$(function() {
  messages = [
    {
      el: '.number-1',
      valid: 'Good!',
      invalid: 'Number must be more than 10'
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

  /**
   * There are our callbacks function
   */
  var callbacks = {
    MoreThan10: function(val, $el) {
      //$el is an input
      return val > 10;
    }
  };

  $('#example-6').validator({
    autoClear: false,
    filters: {
    /**
     * You can use anything callback
     * callback:first | callback:second | callback:third | etc...
     */
      '.number': 'callback:MoreThan10',
    },
    ajax: ajax,
    messages: messages,
    callbacks: callbacks
  });
});
