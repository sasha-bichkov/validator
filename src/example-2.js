/**
 * Example-2
 * The example of validation with messages
 */

$(function() {
	var messages = [
		{
			el: '.login-2',
			valid: 'Good!',
			invalid: [
				'Login must be required',
				'Login contain chars, digits, "." and "_"',
				'Minimal length is 3 symbols'
			]
		},
		{
			el: '.pass-2',
			valid: 'Good!',
			invalid: [
				'Password must be required',
				'Login contain chars, digits, "." and "_"',
				'Minimal length is 3 symbols'
			]
		},
		{
			el: '.email-2',
			valid: 'Good!',
			invalid: 'Email isn\'t correct!'
		}
	];

	$('#example-2').validator({
		filters: {
			'.login2': 'required | login | min:3',
			'.pass2':  'required | pass  | min:3',
			'.email2': 'required | email'
		},
		messages: messages
	});
});