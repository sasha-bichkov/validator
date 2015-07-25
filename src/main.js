var showStatus = function(status) {
  var $el = $('.ajax-status');
  var stat = status === 'success';
  var text =  stat ? 'Success' : 'Error';
  var ajaxStatus = stat ? 'ajax-status__success' : 'ajax-status__error';

  $el.addClass(ajaxStatus).html(text);
  setTimeout(function() {
    $el.removeClass(ajaxStatus);
  }, 2000);
};

var showSuccessIcon = function(el) {
  var $el = $(el);
  if ($el.hasClass('error-mark')) $el.removeClass('error-mark'); 
  $el.addClass('success-mark').show();
};

var showErrorIcon = function(el) {
  var $el = $(el);
  if ($el.hasClass('success-mark')) $el.removeClass('success-mark'); 
  $el.addClass('error-mark').show();
};