/**
 * @license
 * Copyright (c) 2015 Sasha Bichkov <aleksandar.bichkov@gmail.com>
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * UMD pattern which defines a jQuery plugin that works 
 * with AMD and browser globals
 * https://github.com/umdjs/umd/blob/master/jqueryPlugin.js
 */
;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  }
}(function ($) {
  'use strict';

  var PLUGIN_NAME = 'validator';

  var defaults = {
    autoClear: true
  };

  var callbacks;

  var filters = {
    callback: function(opt, val, $el) {
      return callbacks[opt](val, $el);
    },

    chars: function(val) {
      return /\w*/.test(val);
    },

    color: function(val) {
      return /^(?:.{7}|.{4})?$/.test(val) && /^(#[A-Fa-f\d]+)?$/.test(val);
    },

    /**
     * I took the regular expression from here, 
     * but I changed it since $(input[type="date"]).val() 
     * returns the date in "yyyy-mm-dd" format.
     * http://www.regular-expressions.info/dates.html
     */
    date: function(val) {
      return /^(19|20)\d\d[-\s\/\.](0[1-9]|1[012])[-\s\/\.](0[1-9]|[12][0-9]|3[01])$/.test(val);
    },

    digits: function(val) {
      return /^(\d+)?$/.test(val);
    },

    /**
     * Jeffrey E.F. Friedl
     * Mastering Regular Expressions, 3rd Edition
     */
    eraseTags: function(val) {
      return val.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, '');
    },

    equal: function(opt, val) {
      return $(opt).val() === val;
    },

    /**
     * About all file extensions you can read here:
     * http://fileinfo.com/filetypes/common
     */
    image: function(val) {
      return /[^\s]+(\.(jpe?g|png|gif|bmp))$/.test(val);
    },

    login: function(val) {
      return /^([A-Za-z\d_\.]+)?$/.test(val);
    },

    max: function(opt, val) {
      return opt >= val.length
    },

    email: function(val) {
      return /(\b[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}\b)?/i.test(val);
    },

    min: function(opt, val) {
      return opt <= val.length || val.length === 0;
    },

    onlyRu: function(val) { 
      return /^([а-яА-ЯёЁйЙ\s]+)?$/.test(val);
    },

    onlyEng: function(val) {
      return /^([a-zA-Z\s]+)?$/.test(val);
    },

    phone: function(val) {
      return /^(\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d)?$/.test(val);
    },

    phoneOrMail: function(val) {
      return (/^(\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d)?$/.test(val)) ||
             (/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})?$/i.test(val));
    },

    required: function(val) {
      return !!val;
    },

    time: function(val) {
      return /^((((2[0-3]|[01]?\d):([0-5]\d))|(24:00)))?$/.test(val);
    },

    url: function(val) {
      return /^((?:(https?|ftp):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?)?$/.test(val);
    },

    /**
     * https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet
     * http://htmlpurifier.org/live/smoketests/xssAttacks.php
     */
    xss: function(val) {
      var htmlEscapes = {
        '&' : '&apm;',
        '<' : '&lt;',
        '>' : '&gt;',
        '"' : '&quot;',
        "'" : '&#x27;'
      };

      return val.replace(/[&<>"']/g, function(match) {
        return htmlEscapes[match];
      });
    }
  };

  var Validator = function (container, options) {
    if (options) {
      this.options = $.extend({}, defaults, options);
    }

    callbacks = $.extend({}, callbacks, this.options.callbacks);
    this.container = container;
    this._defaults = defaults;
    this.init();
  };

  Validator.prototype.init = function() {
    if ($.isEmptyObject(this.options)) {
      // this._validate();
    } else {
      this._getElementsAndFilters();
      this._getRules();
      this._checkRules();
      this._setEvents();
      this._setFormSubmit();
    }
  };

  Validator.prototype._getElementsAndFilters = function() {
    var rules = this.rules = [];
    var selectors = this.selectors = [];
    var filters = this.options.filters;

    for (var selector in filters) {
      if (selector && typeof selector === 'string') {
        selectors.push(selector);
      } else {
        throw new TypeError('Element name is empty or not a string!');
      }

      var rule = filters[selector];
      if (rule && typeof selector === 'string') {
        rules.push(rule);
      } else {
        throw new TypeError('Filter is empty or not a string!');
      }
    }
  };

  Validator.prototype._getRules = function() {
    var context = this;
    var rules = this.rules;

    $.each(rules, function(i, value) {
      rules[i] = context._proccessRules(rules[i]);
    });
  };

  /**
   * This is a function for proccessing filters
   * Input: 'onlyEng|required|max:20'
   * Output: ['onlyEng', 'required', {filter:'max', val:'20'}]
   * @param {(object|string)} 
   * @returns ...
   */
  Validator.prototype._proccessRules = function(rule) {
    var rules = rule.replace(/\s+/g, '').split('|');

    $.each(rules, function(j, value) {
      if (value.match(/:/)) {
        var dataRule = value.split(':');
        rules.splice(
          j, 1,
          {
            filter: dataRule[0],
            val: dataRule[1]
          }
        );
      }
    });

    return rules;
  };

  /**
   * Find user filters in filters array
   */
  Validator.prototype._checkRules = function() {
    $.each(this.rules, function(i, value) {
      var j = value.length;
      var data, filter;

      while ( j-- ) {
        data = value[j];
        filter = typeof data === 'object' ? data.filter : data;
        if (!(filter in filters)) {
          throw new Error('The filter "' + filter + '" not found');
        }
      }
    });
  };

  /**
   * Set events on all(!) input elements without
   * checkbox and radio button 
   */
  Validator.prototype._setEvents = function() {
    var events = this.options.events;
    var messages = this.options.messages;
    var check = this.check.bind(this);
    var selectors = this.selectors;
    var rules = this.rules;

    if (events) {
      $.each(events, function(event, status) {
        if (status) {
          $.each(selectors, function(i, el) {
            var $el = $(el);
            var type = $el.attr('type');
            if ( type !== 'checkbox' && type !== 'radio' ) {
              $el.on(event, function() {
                var message = messages ? messages[i] : null;
                check(el, rules[i], message, i);
              });
            }
          });
        }
      });
    }
  };

  Validator.prototype._setFormSubmit = function() {
    var self = this;

    $(this.container).on('submit', function(e) {
      var setter = self.options.setter;
      if (setter) self.options = $.extend(self.options, setter());

      var opt = self.options;
      var ajax = opt.ajax;
      var after = opt.after;
      var before = opt.before;
      var messages = opt.messages;
      var autoClear = opt.autoClear;
      var check = self.check.bind(self);
      var selectors = self.selectors;
      var resetStatus = self._resetStatus.bind(self);
      var rules = self.rules;
      var afterArg;

      if (before) before();

      var data, url;
      var errors = 0;

      $.each(selectors, function(i, el) {
        var message = messages ? messages[i] : null;
        var result = check(el, rules[i], message, i);
        if (typeof result === 'boolean' && !result) {
          errors++;
        } else { 
          afterArg = result; 
        }
      });

      if (errors) return false;

      if (ajax) {
        e.preventDefault();

        data = $(this).serialize();
        url  = $(this).attr('action');

        $.ajax({
          type: 'post',
          url: url,
          data: data,
          success: function() { ajax.success(); },
          error:   function() { ajax.error(); },
          complete: function() { if (after) after(afterArg); }
        });
      } else {
        return true;
      }

      if (autoClear) {
        $(this).find('input').each(function(i, input) {
          var $input = $(input);
          resetStatus($input);
          $input.val('');
        });

        if (messages) {
          messages.forEach(function(message) {
            $(message.el).empty();
          });
        }
      }
    });
  };

  /**
   * Remove styles from input element
   * @param {jQuery} $el - this is an $(input) element
   */
  Validator.prototype._resetStatus = function($el) {
    if ($el.hasClass('invalid')) $el.removeClass('invalid');
    if ($el.hasClass('valid')) $el.removeClass('valid');
  };

  Validator.prototype.check = function(el, rules, message, ij) {
    var $el = $(el);
    var j = rules.length;
    var matching = false;
    var $msg, type, rule, value, regExp, data;
    var status, errIndex;
    var currentRule;

    this._resetStatus($el);
    value = $el.val();

    /**
     * Check checkbox and radio buttons
     */
    type = $el.attr('type');

    if (type === 'radio' || type === 'checkbox') {
      var checked = false;

      $.each($el, function(i, el) {
        if (el.checked) {
          checked = true;
          $el = $(el);
        }
      });

      if (!checked) value = '';
    }

    while ( j-- ) {
      rule = rules[j];

      if (typeof rule === 'object') {
        regExp = filters[rule.filter];
        matching = regExp(rule.val, value, $el);
        currentRule = rule.filter;
      } else {
        regExp = filters[rule];
        matching = regExp(value);
        currentRule = rule;
      }

      errIndex = j;
      if (!matching) break;
    }

    $msg = this._getMessageContainer(ij);
    status = matching ? 'valid' : 'invalid';

    data = {
      el: $el,
      container: $msg,
      message: message,
      status: status,
      errIndex: errIndex,
      errRule: currentRule
    };

    this._printMessage(data);
    return matching;
  };

  Validator.prototype._getMessageContainer = function(i) {
    var messages = this.options.messages;
    return messages ? $(messages[i].el) : null;
  };

  Validator.prototype._printMessage = function(options) {
    var opt = options;
    var $el = opt.el;
    var $msg = opt.container;
    var status = opt.status;
    var message = opt.message;
    var errRule = opt.errRule;
    var errIndex = opt.errIndex;
    var validation = status === 'invalid' ? 'valid' : 'invalid';
    var msgstat = message ? message[status] : '';
    var text;

    if (typeof msgstat === 'object') {
      var obj = $.grep(msgstat, function(filterMessage) {
        return filterMessage['filter'] === errRule;
      });
      text = obj[0].text;
    } else if (typeof msgstat === 'function') {
      msgstat();
    } else {
      text = msgstat;
    }

    $el.addClass(status);

    if ($msg) {
      $msg.removeClass(validation)
          .addClass(status)
          .html(text);
    }
  };

  $.fn[PLUGIN_NAME] = function (options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + PLUGIN_NAME)) {
        $.data(this, 'plugin_' + PLUGIN_NAME,
        new Validator(this, options));
      }
    });
  }
}));
