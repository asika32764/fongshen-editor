# Fongshen Editor

A highly customizable code-inserting editor.

## About

Fongshen is a code inserting editor, It can integrate and wrap many other text editors and provides multiple buttons sets.
Fongshen is based on well known [MarkItUp](http://markitup.jaysalvat.com/home/) editor but almost rewrite 80% codes.

The name: "Fongshen" in Chinese means the [god of wind](http://en.wikipedia.org/wiki/Fei_Lian).

Fongshen's brother is [ACE X Markdown Editor](https://github.com/asikart/ace-markdown-editor) in Joomla CMS.

## Screen Shot

![p-2014-08-11-1](https://cloud.githubusercontent.com/assets/1639206/3878091/18c71ace-216c-11e4-8b4c-fc67277aa5ff.jpg)

## Getting Started

### Using ACE

``` html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="src/skins/simple/style.css" />
        <link rel="stylesheet" href="src/type/markdown/style.css" />

        <script src="vendor/jquery/jquery.js"></script>
        <script src="vendor/ace/src-min/ace.js"></script>
        <script src="src/editor/ace-adapter.js"></script>
        <script src="src/fongshen.js"></script>
        <script src="src/type/markdown.js"></script>

        <script>
            jQuery(document).ready(function($)
            {
                var editor = $('#my-editor');

                var options = {
                    id: 'foo',
                    namespace: 'bar',
                    previewAjaxPath: '../parser/markdown.php',
                    previewContainer: '#preview-container',
                    buttons: FongshenMarkdownButtons
                };

                var aceOptions = {
                    lang: 'markdown',
                    wrap: true
                };

                var Fongshen = editor.fongshen(new AceAdapter(aceOptions), options);
            });
        </script>
    </head>
    <body>
        <!-- Editor -->
        <div id="my-editor" class="" style="height: 500px;"></div>

        <!-- Preview -->
        <div id="preview-container"></div>
    </body>
</html>
```

This will create the simple editor:

![p-2014-08-11-2](https://cloud.githubusercontent.com/assets/1639206/3878401/f7a120a8-216e-11e4-8569-33080282551a.jpg)

### Using CodeMirror

``` javascript
var editor = $('#my-editor');

var options = {
    id: 'foo',
    namespace: 'bar',
    previewAjaxPath: '../parser/markdown.php',
    previewContainer: '#preview-container',
    resize: false
    buttons: FongshenMarkdownButtons
};

var cmOptions = {
    mode: 'markdown',
    theme: 'elegant',
    lineNumbers: true
};

var Fongshen = editor.fongshen(new CodemirrorAdapter(cmOptions), options);
```

### Dependency Injection

You can create your own editor object and inject it into adapter.

``` javascript
var ace = ace.edit('#my-editor');
var session = ace.getSession();

ace.setTheme("ace/theme/monokai");
session.setMode("ace/mode/markdown");
session.setUseWrapMode(true);

var Fongshen = editor.fongshen(new AceAdapter(ace), options);
```

Other tutorial please see [Examples](examples).

## TODO

### Add more button set

- Wiki
- BBCode
- reStructuredText

Please comment me if you need other languages.

### Add more themes

### More documentations, more anything~~~


