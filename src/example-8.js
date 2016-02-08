/**
 * Example-8
 * The example of validation with 'eraseTag' filter
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

  $('#example-8').validator({
    autoClear: false,
    filters: {
      '#text2': 'eraseTags | required'
    },
    /**
     * Text was processed by filter 'eraseTags'
     * We courageously put it into html
     */
    after: function(text) {
      $('.textarea-message2').html(text);
    },
    ajax: ajax
  });
});
