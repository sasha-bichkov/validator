/**
 * Example-9
 * The example of validation with using 'before' and 'after' options
 */

$(function() {
  var ajax = {
    success: function() {
      alert('Success');
    },
    error: function() {
      alert('Error');
    }
  };

  $('#example-9').validator({
    autoClear: false,
    before: function() {
      alert('Before filter!');
    },
    after: function() {
      alert('After filter!');
    },
    filters: {
      '.pass9': 'required'
    },
    ajax: ajax
  });
});
