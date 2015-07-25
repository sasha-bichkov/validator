/**
 * Example-12
 * The example of using callbacks function
 *
 */

$(function() {
  var ajax = {
    success: function() {
      console.log('SUCCESS');
    },
    error: function() {
      console.log('ERROR');
    }
  };

  $('#test-12').validator({
    callbacks: {
      passAdvise: function(val) {
        var complexity;
        var chars = /[a-zA-Z]+/;
        var digits = /[0-9]+/;
        var special = /[!@#$%^&\*\+\.]+/g;

        if (val.match(chars) || val.match(digits)) complexity = 'Eazy'
        if (val.match(chars) && val.match(digits)) complexity = 'Medium'
        if (val.match(chars) && val.match(digits) && val.match(special)) complexity = 'Hard'

        alert(complexity);
        if (complexity === 'Eazy' || complexity === 'Medium') return false; //Stop validate
        return true; //continue validate
      }
    },
    filters: {
      '.pass-hard': 'callback:passAdvise | required'
    },
    ajax: ajax
  });
});