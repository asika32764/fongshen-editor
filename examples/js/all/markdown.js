/**
 * Part of Fongshen project.
 *
 * @copyright  Copyright (C) 2008 - 2014 Asikart.com. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

var FongshenMarkdown = function()
{
	var type = 'markdown';

	var editor = $('#fongshen-editor-' + type);

	var options = {
		id: type + '-editor',
		namespace: type,
		previewAjaxPath: '../parser/markdown.php',
		previewContainer: '.' + type + '-wrap .preview-container'
		// buttons: FongshenMarkdownButtons
	};

	var aceOptions = {
		lang: 'markdown',
		wrap: true
	};

	var Fongshen = editor.fongshen(new AceAdapter(aceOptions), options);

	// Buttons
	Fongshen.registerButton($('#button-h1'), {
		name:'Heading 1',
		key:"1",
		openWith:'# ',
		placeHolder:'Title'
	});

	Fongshen.registerButton($('#button-h2'), {
		name:'Heading 2',
		key:"2",
		openWith:'## ',
		placeHolder:'Title'
	});

	Fongshen.registerButton($('#button-h3'), {
		name:'Heading 3',
		key:"3",
		openWith:'### ',
		placeHolder:'Title'
	});

	Fongshen.registerButton($('#button-h4'), {
		name:'Heading 4',
		key:"4",
		openWith:'#### ',
		placeHolder:'Title'
	});

	Fongshen.registerButton($('#button-h5'), {
		name:'Heading 5',
		key:"5",
		openWith:'##### ',
		placeHolder:'Title'
	});

	Fongshen.registerButton($('#button-h6'), {
		name:'Heading 6',
		key:"6",
		openWith:'###### ',
		placeHolder:'Title'
	});

	Fongshen.registerButton($('#button-strong'), {
			name:'Bold',
			key:"B",
			openWith:'**',
			closeWith:'**'}
	);

	Fongshen.registerButton($('#button-italic'), {
		name:'Italic',
		key:"I",
		openWith:'_',
		closeWith:'_'
	});

	Fongshen.registerButton($('#button-ul'), {
		name:'Bulleted List',
		openWith:'* ' ,
		multiline: true
	});

	Fongshen.registerButton($('#button-ol'), {
		name:'Numeric List',
		openWith: function(fongshen)
		{
			return fongshen.line + '. ';
		},
		multiline: true
	});

	Fongshen.registerButton($('#button-img'), {
		name:'Picture',
		key:"P",
		replaceWith: function(fongshen)
		{
			var value = '![' + fongshen.ask('Alternative text') + '](' + fongshen.ask('Url', 'http://');

			var title = fongshen.ask('Title');

			if (title !== '')
			{
				value += ' "' + title + '"';
			}

			value += ')';

			return value;
		}
	});

	Fongshen.registerButton($('#button-link'), {
		name:'Link',
		key:"L",
		openWith:'[',
		closeWith: function(fongshen)
		{
			return '](' + fongshen.ask('Url', 'http://') + ')';
		},
		placeHolder:'Click here to link...'
	});

	Fongshen.registerButton($('#button-quote'), {
		name:'Quotes',
		openWith:'> ',
		multiline: true
	});

	Fongshen.registerButton($('#button-codeblock'), {
		name:'Code Block / Code',
		openWith: function(fongshen)
		{
			return '``` ' + fongshen.ask('Language') + '\n';
		},
		closeWith:'\n```',
		afterInsert: function(fongshen)
		{
			fongshen.getEditor().moveCursor(-1, 0);
		}
	});

	Fongshen.registerButton($('#button-code'), {
		name:'Code Inline',
		openWith:'`',
		closeWith:'`',
		multiline: true,
		className: "code-inline"
	});

	Fongshen.registerButton($('#button-preview'), {
		name:'Preview',
		call:'createPreview',
		className:"preview"
	});

	return editor;
};
