/**
 * Example-12
 * If you want to change validator options on the fly you need use it.
 *
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

  var setter = function() {
    var type = $('.radiomethod:checked').val().toLowerCase();

    return {
      ajax: (type === 'ajax') ? ajax : null
    }
  }

  $('#example-12').validator({
    filters: {
      '.login12': 'required'
    },
    setter: setter
  });
});
