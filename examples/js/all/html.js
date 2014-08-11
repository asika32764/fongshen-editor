/**
 * Part of Fongshen project.
 *
 * @copyright  Copyright (C) 2008 - 2014 Asikart.com. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

var FongshenHtml = function()
{
	var type = 'html';

	var editor = $('#fongshen-editor-' + type);

	var options = {
		id: type + '-editor',
		namespace: type,
		previewAjaxPath: null,
		previewContainer: '.' + type + '-wrap .preview-container',
		previewHandler: function(string)
		{
			$(this.previewContainer).html(string);
		}
		// buttons: FongshenMarkdownButtons
	};

	var aceOptions = {
		lang: type,
		wrap: true
	};

	var Fongshen = editor.fongshen(new AceAdapter(aceOptions), options);

	var HtmlButtons = {
		strong: {name:'Bold', key:'B', openWith:'<strong>', closeWith:'</strong>' },
		italic: {name:'Italic', key:'I', openWith:'<em>', closeWith:'</em>'  },
		stroke: {name:'Stroke through', key:'S', openWith:'<del>', closeWith:'</del>' },
		sp1: {separator:'---------------' },
		ul: {name:'Bulleted List', openWith:'    <li>', closeWith:'</li>', multiline:true, openBlockWith:'<ul>\n', closeBlockWith:'\n</ul>'},
		ol: {name:'Numeric List', openWith:'    <li>', closeWith:'</li>', multiline:true, openBlockWith:'<ol>\n', closeBlockWith:'\n</ol>'},
		sp2: {separator:'---------------' },
		img: {name:'Picture', key:'P', replaceWith: function(fongshen)
		{
			return '<img src="' + fongshen.ask('Url', 'http://') + '" alt="' + fongshen.ask('Alternative text') + '" />' ;
		}},
		link: {name:'Link', key:'L', openWith: function(fongshen)
		{
			return '<a href="' + fongshen.ask('Url', 'http://') + '" title="' + fongshen.ask('Title') + '">';
		}, closeWith:'</a>', placeHolder:'Your text to link...' },
		sp3: {separator:'---------------' },
		preview: {name:'Preview', className:'preview',  call:'createPreview'}
	};

	$.each(HtmlButtons, function(name)
	{
		Fongshen.registerButton($('#' + type + '-button-' + name), this);
	});

	return editor;
};
