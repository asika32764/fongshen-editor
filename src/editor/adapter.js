/**
 * Part of Fongshen project.
 *
 * @copyright  Copyright (C) 2014 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

;(function($)
{
	"use strict";

	/**
	 * ACE Editor adapter.
	 *
	 * @param options
	 *
	 * @constructor
	 */
	var Class = window.AceAdapter = function(options)
	{
		var defaultOptions = {
			theme: 'monokai',
			lang: 'markdown'
		};

		this.options = $.extend(defaultOptions, options);
	};

	/**
	 * Initialise.
	 *
	 * @param element
	 */
	Class.prototype.initialise = function(element)
	{
		this.element = element;

		this.ace = ace.edit(element.attr('id'));

		this.ace.setTheme("ace/theme/" + this.options.theme);

		this.ace.getSession().setMode("ace/mode/" + this.options.lang);

		this.textarea = this.element.find('.ace_text-input');
	};

	/**
	 * Insert text into editor.
	 *
	 * @param string
	 */
	Class.prototype.insert = function(string)
	{
		this.ace.insert(string);

		this.focus();
	};

	/**
	 * Get selection.
	 *
	 * @returns {*}
	 */
	Class.prototype.getSelection = function()
	{
		return this.ace.getCopyText();
	};

	/**
	 * Get editor value.
	 *
	 * @returns {*}
	 */
	Class.prototype.getValue = function()
	{
		return this.ace.getValue();
	};

	/**
	 * Get selection range.
	 *
	 * @returns {*}
	 */
	Class.prototype.getSelectionRange = function()
	{
		return this.ace.getSelection().getRange();
	};

	/**
	 * Move cursor by.
	 *
	 * @param line
	 * @param offset
	 *
	 * @returns {AceAdapter}
	 */
	Class.prototype.moveCursor = function(line, offset)
	{
		this.ace.getSelection().moveCursorBy(line, offset);

		return this;
	};

	/**
	 * Focus on editor.
	 */
	Class.prototype.focus = function()
	{
		this.textarea.focus();
	};

	/**
	 * Resize editor.
	 */
	Class.prototype.resize = function()
	{
		this.ace.resize();
	};

})(jQuery);
