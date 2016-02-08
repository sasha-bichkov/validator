/**
 * Example-11
 * The example of using callbacks option
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

  var callbacks = {
    passAdvise: function(val, $el) {
      var complexity;
      var chars = /[a-zA-Z]+/;
      var digits = /[0-9]+/;
      var special = /[@#%\!\$\^\&\(\)\[\]\{\}\*\+\.]+/;

      if (chars.test(val) || digits.test(val) || special.test(val)) complexity = 'Eazy'
      if (chars.test(val) && digits.test(val)) complexity = 'Medium'
      if (chars.test(val) && digits.test(val) && special.test(val)) complexity = 'Hard'

      alert(complexity);
      if (complexity === 'Eazy' || complexity === 'Medium') return false; //Stop validate
      return true; //continue validate
    }
  };

  $('#example-11').validator({
    autoClear: false,
    filters: {
      '.pass-hard': 'callback:passAdvise | required'
    },
    ajax: ajax,
    callbacks: callbacks
  });
});
