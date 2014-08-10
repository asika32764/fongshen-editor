/**
 * Part of Fongshen project.
 *
 * @copyright  Copyright (C) 2014 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

;(function($)
{
	"use strict";

	var Class = window.AceAdapter = function()
	{

	};

	Class.prototype.initialise = function(element)
	{
		this.element = element;

		this.ace = ace.edit(element.attr('id'));

		this.ace.setTheme("ace/theme/monokai");

		this.ace.getSession().setMode("ace/mode/markdown");

		this.textarea = this.element.find('.ace_text-input');
	};

	Class.prototype.insert = function(string)
	{
		this.ace.insert(string);

		this.textarea.focus();
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

})(jQuery);
