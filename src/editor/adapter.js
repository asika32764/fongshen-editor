/**
 * Part of Fongshen project.
 *
 * @copyright  Copyright (C) 2014 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

;(function($)
{
	"use strict";

	var Class = window.AceAdapter = function(options)
	{
		var defaultOptions = {
			theme: 'monokai',
			lang: 'markdown'
		};

		this.options = $.extend(defaultOptions, options);
	};

	Class.prototype.initialise = function(element)
	{
		this.element = element;

		this.ace = ace.edit(element.attr('id'));

		this.ace.setTheme("ace/theme/" + this.options.theme);

		this.ace.getSession().setMode("ace/mode/". this.options.lang);

		this.textarea = this.element.find('.ace_text-input');
	};

	Class.prototype.insert = function(string)
	{
		this.ace.insert(string);

		this.focus();
	};

	Class.prototype.getSelection = function()
	{
		var selection = this.ace.getSelection();

		if (selection.isEmpty())
		{
			return null;
		}

		return selection;
	};

	Class.prototype.getValue = function()
	{
		return this.ace.getValue();
	};

	Class.prototype.getRange = function()
	{
		return this.ace.getSelection().getRange();
	};

	Class.prototype.getCopyText = function()
	{
		return this.ace.getCopyText();
	};

	Class.prototype.moveCursor = function(line, offset)
	{
		this.ace.getSelection().moveCursorBy(line, offset);

		return this;
	};

	Class.prototype.focus = function()
	{
		this.textarea.focus();
	};

	Class.prototype.resize = function()
	{
		this.ace.resize();
	};

})(jQuery);
