# Validator
I like validation in Laravel framework. I thought it would be nice if I could use validation like the 
one in Laravel framework on the frontend-side.

## Usage
    $('#form1').validation({
      autoClear: true|false,
      filters: {
        '.input': 'filter-1 | filter-2:condition' 
      },
      ajax: ajax,
      after: after,
      before: before,
      events: events,
      setter: setter,
      messages: messages,
      callbacks: callbacks
    });

Validator get `url` value from <form> tag automatically.
Validator add `.valid` and `.invalid` class on inputs when form submit.

### _autoClear_ ###
Users will send form to the server many times because by default the option has set as `true`.
All inputs will clear after user click on "Send" button.

### _ajax_ ###
See examples for more details

    var ajax = {
      success: function() {
        //do something...
      },
      error = function() {
        //do something...
      }
    };

### _after_ and _before_ ###
_Before_ is a function which call before validation.
_After_ is a function which call after validation.

    Before() | Ajax success() or error() | After()

### _events_ ###
You can set any events on your form.
  
    var events = {
      'keyup': true,
      'blur': true
      ...
    };

### _setter_ ###
If you want to change validator options on the fly you need use it.

    var ajax = {
      error: function() {}, 
      success: function() {}
    }

    var setter = function() {
      var type = $('#example').val();

      return {
        //you can on/off ajax option and any other too
        ajax: (type === 'redirect') ? null : ajax
      }
    }


### _setter_ ###
If you want to change validator options on the fly you need use it.

    var ajax = {
      error: function() {}, 
      success: function() {}
    }

    var setter = function() {
      var type = $('#example').val();

      return {
        //you can on/off ajax option and any other too
        ajax: (type === 'redirect') ? null : ajax
      }
    }


### _messages_ ###
See examples for more details

  var messages = [
    {
      el: '.input',
      valid: (string|function),
      invalid: (string|function|array)
    }
  ];

## Access filters by default
See examples for more details

* callback
* chars
* color
* date
* digits
* eraseTags
* equal
* image
* login
* max
* email
* min
* onlyRu
* onlyEng
* phone
* phoneOrMail
* required
* time
* url
* xss

## The MIT License (MIT)
Copyright (c) 2015, Sasha Bichkov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
