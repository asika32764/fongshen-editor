/**
 * Part of Fongshen project.
 *
 * @copyright  Copyright (C) 2014 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

var FongshenOptions;

var FongshenMarkdownOptions = FongshenOptions = {
	onShiftEnter: {keepDefault:false, openWith:'\\n\\n'},
	buttons: [
		{name:'Heading 1', key:"1", openWith:'# ', placeHolder:'Title'},
		{name:'Heading 2', key:"2", openWith:'## ', placeHolder:'Title'},
		{name:'Heading 3', key:"3", openWith:'### ', placeHolder:'Title' },
		{name:'Heading 4', key:"4", openWith:'#### ', placeHolder:'Title' },
		{name:'Heading 5', key:"5", openWith:'##### ', placeHolder:'Title' },
		{name:'Heading 6', key:"6", openWith:'###### ', placeHolder:'Title' },
		{separator:'---------------' },
		{name:'Bold', key:"B", openWith:'**', closeWith:'**'},
		{name:'Italic', key:"I", openWith:'_', closeWith:'_'},
		{separator:'---------------' },
		{name:'Bulleted List', openWith:'* ' , multiline: true},
		{name:'Numeric List', openWith: function(markItUp) {
			return markItUp.line+'. ';
		}, multiline: true},
		{separator:'---------------' },
		{name:'Picture', key:"P", replaceWith: function(fongshen){return MarkdownCallback.pictureReplace(fongshen)}},
		{name:'Link', key:"L", openWith:'[', closeWith: function(fongshen){return MarkdownCallback.linkClose(fongshen)}, placeHolder:'Click here to link...' },
		{separator:'---------------'},
		{name: 'drop', dropMenus:[
			{name:'Quotes', openWith:'> ', multiline: true},
			{name:'Code Block / Code', openWith: function(fongshen){return MarkdownCallback.codeBlockOpen(fongshen)}, closeWith:'\n```', afterInsert: function(fongshen) { return MarkdownCallback.afterCodeblock(fongshen) } },
			{name:'Code Inline', openWith:'`', closeWith:'`', multiline: true, className: "code-inline"}
		]},
		{separator:'---------------'},
		{name:'Preview', call:'preview', className:"preview"}
	]
};

var MarkdownCallback = {
	linkClose: function(fongshen)
	{
		return '](' + fongshen.ask('Url', 'http://') + ')';
	},

	pictureReplace: function(fongshen)
	{
		var value = '![' + fongshen.ask('Alternative text') + '](' + fongshen.ask('Url', 'http://');

		var title = fongshen.ask('Title');

		if (title !== '')
		{
			value += ' "' + title + '"';
		}

		value += ')';

		return value;
	},

	codeBlockOpen: function(fongshen)
	{
		return '``` ' + fongshen.ask('Language') + '\n';
	},

	afterCodeblock: function(fongshen)
	{
		fongshen.getEditor().moveCursor(-1, 0);
	}
};
