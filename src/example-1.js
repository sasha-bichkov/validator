/**
 * Example-1
 * The example of simple validation
 */

$(function() {
  $('#example-1').validator({
    filters: {
      '.login': 'required | login | min:3',
      '.pass':  'required | pass  | min:3',
      '.email': 'required | email'
    }
  });
});