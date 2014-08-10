define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var DocCommentHighlightRules = function() {

    this.$rules = {
        "start" : [ {
            token : "comment.doc.tag",
            regex : "@[\\w\\d_]+" // TODO: fix email addresses
        }, {
            token : "comment.doc.tag",
            regex : "\\bTODO\\b"
        }, {
            defaultToken : "comment.doc"
        }]
    };
};

oop.inherits(DocCommentHighlightRules, TextHighlightRules);

DocCommentHighlightRules.getStartRule = function(start) {
    return {
        token : "comment.doc", // doc comment
        regex : "\\/\\*(?=\\*)",
        next  : start
    };
};

DocCommentHighlightRules.getEndRule = function (start) {
    return {
        token : "comment.doc", // closing comment
        regex : "\\*\\/",
        next  : start
    };
};


exports.DocCommentHighlightRules = DocCommentHighlightRules;

});

define("ace/mode/css_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var lang = require("../lib/lang");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var supportType = exports.supportType = "animation-fill-mode|alignment-adjust|alignment-baseline|animation-delay|animation-direction|animation-duration|animation-iteration-count|animation-name|animation-play-state|animation-timing-function|animation|appearance|azimuth|backface-visibility|background-attachment|background-break|background-clip|background-color|background-image|background-origin|background-position|background-repeat|background-size|background|baseline-shift|binding|bleed|bookmark-label|bookmark-level|bookmark-state|bookmark-target|border-bottom|border-bottom-color|border-bottom-left-radius|border-bottom-right-radius|border-bottom-style|border-bottom-width|border-collapse|border-color|border-image|border-image-outset|border-image-repeat|border-image-slice|border-image-source|border-image-width|border-left|border-left-color|border-left-style|border-left-width|border-radius|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-left-radius|border-top-right-radius|border-top-style|border-top-width|border-width|border|bottom|box-align|box-decoration-break|box-direction|box-flex-group|box-flex|box-lines|box-ordinal-group|box-orient|box-pack|box-shadow|box-sizing|break-after|break-before|break-inside|caption-side|clear|clip|color-profile|color|column-count|column-fill|column-gap|column-rule|column-rule-color|column-rule-style|column-rule-width|column-span|column-width|columns|content|counter-increment|counter-reset|crop|cue-after|cue-before|cue|cursor|direction|display|dominant-baseline|drop-initial-after-adjust|drop-initial-after-align|drop-initial-before-adjust|drop-initial-before-align|drop-initial-size|drop-initial-value|elevation|empty-cells|fit|fit-position|float-offset|float|font-family|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|font|grid-columns|grid-rows|hanging-punctuation|height|hyphenate-after|hyphenate-before|hyphenate-character|hyphenate-lines|hyphenate-resource|hyphens|icon|image-orientation|image-rendering|image-resolution|inline-box-align|left|letter-spacing|line-height|line-stacking-ruby|line-stacking-shift|line-stacking-strategy|line-stacking|list-style-image|list-style-position|list-style-type|list-style|margin-bottom|margin-left|margin-right|margin-top|margin|mark-after|mark-before|mark|marks|marquee-direction|marquee-play-count|marquee-speed|marquee-style|max-height|max-width|min-height|min-width|move-to|nav-down|nav-index|nav-left|nav-right|nav-up|opacity|orphans|outline-color|outline-offset|outline-style|outline-width|outline|overflow-style|overflow-x|overflow-y|overflow|padding-bottom|padding-left|padding-right|padding-top|padding|page-break-after|page-break-before|page-break-inside|page-policy|page|pause-after|pause-before|pause|perspective-origin|perspective|phonemes|pitch-range|pitch|play-during|pointer-events|position|presentation-level|punctuation-trim|quotes|rendering-intent|resize|rest-after|rest-before|rest|richness|right|rotation-point|rotation|ruby-align|ruby-overhang|ruby-position|ruby-span|size|speak-header|speak-numeral|speak-punctuation|speak|speech-rate|stress|string-set|table-layout|target-name|target-new|target-position|target|text-align-last|text-align|text-decoration|text-emphasis|text-height|text-indent|text-justify|text-outline|text-shadow|text-transform|text-wrap|top|transform-origin|transform-style|transform|transition-delay|transition-duration|transition-property|transition-timing-function|transition|unicode-bidi|vertical-align|visibility|voice-balance|voice-duration|voice-family|voice-pitch-range|voice-pitch|voice-rate|voice-stress|voice-volume|volume|white-space-collapse|white-space|widows|width|word-break|word-spacing|word-wrap|z-index";
var supportFunction = exports.supportFunction = "rgb|rgba|url|attr|counter|counters";
var supportConstant = exports.supportConstant = "absolute|after-edge|after|all-scroll|all|alphabetic|always|antialiased|armenian|auto|avoid-column|avoid-page|avoid|balance|baseline|before-edge|before|below|bidi-override|block-line-height|block|bold|bolder|border-box|both|bottom|box|break-all|break-word|capitalize|caps-height|caption|center|central|char|circle|cjk-ideographic|clone|close-quote|col-resize|collapse|column|consider-shifts|contain|content-box|cover|crosshair|cubic-bezier|dashed|decimal-leading-zero|decimal|default|disabled|disc|disregard-shifts|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ease-in|ease-in-out|ease-out|ease|ellipsis|end|exclude-ruby|fill|fixed|georgian|glyphs|grid-height|groove|hand|hanging|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|icon|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|ideographic|inactive|include-ruby|inherit|initial|inline-block|inline-box|inline-line-height|inline-table|inline|inset|inside|inter-ideograph|inter-word|invert|italic|justify|katakana-iroha|katakana|keep-all|last|left|lighter|line-edge|line-through|line|linear|list-item|local|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|mathematical|max-height|max-size|medium|menu|message-box|middle|move|n-resize|ne-resize|newspaper|no-change|no-close-quote|no-drop|no-open-quote|no-repeat|none|normal|not-allowed|nowrap|nw-resize|oblique|open-quote|outset|outside|overline|padding-box|page|pointer|pre-line|pre-wrap|pre|preserve-3d|progress|relative|repeat-x|repeat-y|repeat|replaced|reset-size|ridge|right|round|row-resize|rtl|s-resize|scroll|se-resize|separate|slice|small-caps|small-caption|solid|space|square|start|static|status-bar|step-end|step-start|steps|stretch|strict|sub|super|sw-resize|table-caption|table-cell|table-column-group|table-column|table-footer-group|table-header-group|table-row-group|table-row|table|tb-rl|text-after-edge|text-before-edge|text-bottom|text-size|text-top|text|thick|thin|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|use-script|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|z-index|zero";
var supportConstantColor = exports.supportConstantColor = "aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow";
var supportConstantFonts = exports.supportConstantFonts = "arial|century|comic|courier|garamond|georgia|helvetica|impact|lucida|symbol|system|tahoma|times|trebuchet|utopia|verdana|webdings|sans-serif|serif|monospace";

var numRe = exports.numRe = "\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))";
var pseudoElements = exports.pseudoElements = "(\\:+)\\b(after|before|first-letter|first-line|moz-selection|selection)\\b";
var pseudoClasses  = exports.pseudoClasses =  "(:)\\b(active|checked|disabled|empty|enabled|first-child|first-of-type|focus|hover|indeterminate|invalid|last-child|last-of-type|link|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-child|only-of-type|required|root|target|valid|visited)\\b";

var CssHighlightRules = function() {

    var keywordMapper = this.createKeywordMapper({
        "support.function": supportFunction,
        "support.constant": supportConstant,
        "support.type": supportType,
        "support.constant.color": supportConstantColor,
        "support.constant.fonts": supportConstantFonts
    }, "text", true);

    this.$rules = {
        "start" : [{
            token : "comment", // multi line comment
            regex : "\\/\\*",
            push : "comment"
        }, {
            token: "paren.lparen",
            regex: "\\{",
            push:  "ruleset"
        }, {
            token: "string",
            regex: "@.*?{",
            push:  "media"
        }, {
            token: "keyword",
            regex: "#[a-z0-9-_]+"
        }, {
            token: "variable",
            regex: "\\.[a-z0-9-_]+"
        }, {
            token: "string",
            regex: ":[a-z0-9-_]+"
        }, {
            token: "constant",
            regex: "[a-z0-9-_]+"
        }, {
            caseInsensitive: true
        }],

        "media" : [{
            token : "comment", // multi line comment
            regex : "\\/\\*",
            push : "comment"
        }, {
            token: "paren.lparen",
            regex: "\\{",
            push:  "ruleset"
        }, {
            token: "string",
            regex: "\\}",
            next:  "pop"
        }, {
            token: "keyword",
            regex: "#[a-z0-9-_]+"
        }, {
            token: "variable",
            regex: "\\.[a-z0-9-_]+"
        }, {
            token: "string",
            regex: ":[a-z0-9-_]+"
        }, {
            token: "constant",
            regex: "[a-z0-9-_]+"
        }, {
            caseInsensitive: true
        }],

        "comment" : [{
            token : "comment",
            regex : "\\*\\/",
            next : "pop"
        }, {
            defaultToken : "comment"
        }],

        "ruleset" : [
        {
            token : "paren.rparen",
            regex : "\\}",
            next:   "pop"
        }, {
            token : "comment", // multi line comment
            regex : "\\/\\*",
            push : "comment"
        }, {
            token : "string", // single line
            regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
        }, {
            token : "string", // single line
            regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
        }, {
            token : ["constant.numeric", "keyword"],
            regex : "(" + numRe + ")(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vm|vw|%)"
        }, {
            token : "constant.numeric",
            regex : numRe
        }, {
            token : "constant.numeric",  // hex6 color
            regex : "#[a-f0-9]{6}"
        }, {
            token : "constant.numeric", // hex3 color
            regex : "#[a-f0-9]{3}"
        }, {
            token : ["punctuation", "entity.other.attribute-name.pseudo-element.css"],
            regex : pseudoElements
        }, {
            token : ["punctuation", "entity.other.attribute-name.pseudo-class.css"],
            regex : pseudoClasses
        }, {
            token : ["support.function", "string", "support.function"],
            regex : "(url\\()(.*)(\\))"
        }, {
            token : keywordMapper,
            regex : "\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"
        }, {
            caseInsensitive: true
        }]
    };

    this.normalizeRules();
};

oop.inherits(CssHighlightRules, TextHighlightRules);

exports.CssHighlightRules = CssHighlightRules;

});

define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var JavaScriptHighlightRules = function() {
    var keywordMapper = this.createKeywordMapper({
        "variable.language":
            "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|"  + // Constructors
            "Namespace|QName|XML|XMLList|"                                             + // E4X
            "ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|"   +
            "Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|"                    +
            "Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|"   + // Errors
            "SyntaxError|TypeError|URIError|"                                          +
            "decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|" + // Non-constructor functions
            "isNaN|parseFloat|parseInt|"                                               +
            "JSON|Math|"                                                               + // Other
            "this|arguments|prototype|window|document"                                 , // Pseudo
        "keyword":
            "const|yield|import|get|set|" +
            "break|case|catch|continue|default|delete|do|else|finally|for|function|" +
            "if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|" +
            "__parent__|__count__|escape|unescape|with|__proto__|" +
            "class|enum|extends|super|export|implements|private|public|interface|package|protected|static",
        "storage.type":
            "const|let|var|function",
        "constant.language":
            "null|Infinity|NaN|undefined",
        "support.function":
            "alert",
        "constant.language.boolean": "true|false"
    }, "identifier");
    var kwBeforeRe = "case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void";
    var identifierRe = "[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*\\b";

    var escapedRe = "\\\\(?:x[0-9a-fA-F]{2}|" + // hex
        "u[0-9a-fA-F]{4}|" + // unicode
        "[0-2][0-7]{0,2}|" + // oct
        "3[0-6][0-7]?|" + // oct
        "37[0-7]?|" + // oct
        "[4-7][0-7]?|" + //oct
        ".)";

    this.$rules = {
        "no_regex" : [
            {
                token : "comment",
                regex : "\\/\\/",
                next : "line_comment"
            },
            DocCommentHighlightRules.getStartRule("doc-start"),
            {
                token : "comment", // multi line comment
                regex : /\/\*/,
                next : "comment"
            }, {
                token : "string",
                regex : "'(?=.)",
                next  : "qstring"
            }, {
                token : "string",
                regex : '"(?=.)',
                next  : "qqstring"
            }, {
                token : "constant.numeric", // hex
                regex : /0[xX][0-9a-fA-F]+\b/
            }, {
                token : "constant.numeric", // float
                regex : /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
            }, {
                token : [
                    "storage.type", "punctuation.operator", "support.function",
                    "punctuation.operator", "entity.name.function", "text","keyword.operator"
                ],
                regex : "(" + identifierRe + ")(\\.)(prototype)(\\.)(" + identifierRe +")(\\s*)(=)",
                next: "function_arguments"
            }, {
                token : [
                    "storage.type", "punctuation.operator", "entity.name.function", "text",
                    "keyword.operator", "text", "storage.type", "text", "paren.lparen"
                ],
                regex : "(" + identifierRe + ")(\\.)(" + identifierRe +")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : [
                    "entity.name.function", "text", "keyword.operator", "text", "storage.type",
                    "text", "paren.lparen"
                ],
                regex : "(" + identifierRe +")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : [
                    "storage.type", "punctuation.operator", "entity.name.function", "text",
                    "keyword.operator", "text",
                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
                ],
                regex : "(" + identifierRe + ")(\\.)(" + identifierRe +")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : [
                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
                ],
                regex : "(function)(\\s+)(" + identifierRe + ")(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : [
                    "entity.name.function", "text", "punctuation.operator",
                    "text", "storage.type", "text", "paren.lparen"
                ],
                regex : "(" + identifierRe + ")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : [
                    "text", "text", "storage.type", "text", "paren.lparen"
                ],
                regex : "(:)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : "keyword",
                regex : "(?:" + kwBeforeRe + ")\\b",
                next : "start"
            }, {
                token : ["punctuation.operator", "support.function"],
                regex : /(\.)(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/
            }, {
                token : ["punctuation.operator", "support.function.dom"],
                regex : /(\.)(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/
            }, {
                token : ["punctuation.operator", "support.constant"],
                regex : /(\.)(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/
            }, {
                token : ["support.constant"],
                regex : /that\b/
            }, {
                token : ["storage.type", "punctuation.operator", "support.function.firebug"],
                regex : /(console)(\.)(warn|info|log|error|time|trace|timeEnd|assert)\b/
            }, {
                token : keywordMapper,
                regex : identifierRe
            }, {
                token : "keyword.operator",
                regex : /--|\+\+|[!$%&*+\-~]|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|\*=|%=|\+=|\-=|&=|\^=/,
                next  : "start"
            }, {
                token : "punctuation.operator",
                regex : /\?|\:|\,|\;|\./,
                next  : "start"
            }, {
                token : "paren.lparen",
                regex : /[\[({]/,
                next  : "start"
            }, {
                token : "paren.rparen",
                regex : /[\])}]/
            }, {
                token : "keyword.operator",
                regex : /\/=?/,
                next  : "start"
            }, {
                token: "comment",
                regex: /^#!.*$/
            }
        ],
        "start": [
            DocCommentHighlightRules.getStartRule("doc-start"),
            {
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "comment_regex_allowed"
            }, {
                token : "comment",
                regex : "\\/\\/",
                next : "line_comment_regex_allowed"
            }, {
                token: "string.regexp",
                regex: "\\/",
                next: "regex"
            }, {
                token : "text",
                regex : "\\s+|^$",
                next : "start"
            }, {
                token: "empty",
                regex: "",
                next: "no_regex"
            }
        ],
        "regex": [
            {
                token: "regexp.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
            }, {
                token: "string.regexp",
                regex: "/[sxngimy]*",
                next: "no_regex"
            }, {
                token : "invalid",
                regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/
            }, {
                token : "constant.language.escape",
                regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/
            }, {
                token : "constant.language.delimiter",
                regex: /\|/
            }, {
                token: "constant.language.escape",
                regex: /\[\^?/,
                next: "regex_character_class"
            }, {
                token: "empty",
                regex: "$",
                next: "no_regex"
            }, {
                defaultToken: "string.regexp"
            }
        ],
        "regex_character_class": [
            {
                token: "regexp.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
            }, {
                token: "constant.language.escape",
                regex: "]",
                next: "regex"
            }, {
                token: "constant.language.escape",
                regex: "-"
            }, {
                token: "empty",
                regex: "$",
                next: "no_regex"
            }, {
                defaultToken: "string.regexp.charachterclass"
            }
        ],
        "function_arguments": [
            {
                token: "variable.parameter",
                regex: identifierRe
            }, {
                token: "punctuation.operator",
                regex: "[, ]+"
            }, {
                token: "punctuation.operator",
                regex: "$"
            }, {
                token: "empty",
                regex: "",
                next: "no_regex"
            }
        ],
        "comment_regex_allowed" : [
            {token : "comment", regex : "\\*\\/", next : "start"},
            {defaultToken : "comment"}
        ],
        "comment" : [
            {token : "comment", regex : "\\*\\/", next : "no_regex"},
            {defaultToken : "comment"}
        ],
        "line_comment_regex_allowed" : [
            {token : "comment", regex : "$|^", next : "start"},
            {defaultToken : "comment"}
        ],
        "line_comment" : [
            {token : "comment", regex : "$|^", next : "no_regex"},
            {defaultToken : "comment"}
        ],
        "qqstring" : [
            {
                token : "constant.language.escape",
                regex : escapedRe
            }, {
                token : "string",
                regex : "\\\\$",
                next  : "qqstring"
            }, {
                token : "string",
                regex : '"|$',
                next  : "no_regex"
            }, {
                defaultToken: "string"
            }
        ],
        "qstring" : [
            {
                token : "constant.language.escape",
                regex : escapedRe
            }, {
                token : "string",
                regex : "\\\\$",
                next  : "qstring"
            }, {
                token : "string",
                regex : "'|$",
                next  : "no_regex"
            }, {
                defaultToken: "string"
            }
        ]
    };

    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("no_regex") ]);
};

oop.inherits(JavaScriptHighlightRules, TextHighlightRules);

exports.JavaScriptHighlightRules = JavaScriptHighlightRules;
});

define("ace/mode/xml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var XmlHighlightRules = function(normalize) {
    this.$rules = {
        start : [
            {token : "string.cdata.xml", regex : "<\\!\\[CDATA\\[", next : "cdata"},
            {
                token : ["punctuation.xml-decl.xml", "keyword.xml-decl.xml"],
                regex : "(<\\?)(xml)(?=[\\s])", next : "xml_decl", caseInsensitive: true
            },
            {
                token : ["punctuation.instruction.xml", "keyword.instruction.xml"],
                regex : "(<\\?)([-_a-zA-Z0-9]+)", next : "processing_instruction",
            },
            {token : "comment.xml", regex : "<\\!--", next : "comment"},
            {
                token : ["xml-pe.doctype.xml", "xml-pe.doctype.xml"],
                regex : "(<\\!)(DOCTYPE)(?=[\\s])", next : "doctype", caseInsensitive: true
            },
            {include : "tag"},
            {token : "text.end-tag-open.xml", regex: "</"},
            {token : "text.tag-open.xml", regex: "<"},
            {include : "reference"},
            {defaultToken : "text.xml"}
        ],

        xml_decl : [{
            token : "entity.other.attribute-name.decl-attribute-name.xml",
            regex : "(?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+"
        }, {
            token : "keyword.operator.decl-attribute-equals.xml",
            regex : "="
        }, {
            include: "whitespace"
        }, {
            include: "string"
        }, {
            token : "punctuation.xml-decl.xml",
            regex : "\\?>",
            next : "start"
        }],

        processing_instruction : [
            {token : "punctuation.instruction.xml", regex : "\\?>", next : "start"},
            {defaultToken : "instruction.xml"}
        ],

        doctype : [
            {include : "whitespace"},
            {include : "string"},
            {token : "xml-pe.doctype.xml", regex : ">", next : "start"},
            {token : "xml-pe.xml", regex : "[-_a-zA-Z0-9:]+"},
            {token : "punctuation.int-subset", regex : "\\[", push : "int_subset"}
        ],

        int_subset : [{
            token : "text.xml",
            regex : "\\s+"
        }, {
            token: "punctuation.int-subset.xml",
            regex: "]",
            next: "pop"
        }, {
            token : ["punctuation.markup-decl.xml", "keyword.markup-decl.xml"],
            regex : "(<\\!)([-_a-zA-Z0-9]+)",
            push : [{
                token : "text",
                regex : "\\s+"
            },
            {
                token : "punctuation.markup-decl.xml",
                regex : ">",
                next : "pop"
            },
            {include : "string"}]
        }],

        cdata : [
            {token : "string.cdata.xml", regex : "\\]\\]>", next : "start"},
            {token : "text.xml", regex : "\\s+"},
            {token : "text.xml", regex : "(?:[^\\]]|\\](?!\\]>))+"}
        ],

        comment : [
            {token : "comment.xml", regex : "-->", next : "start"},
            {defaultToken : "comment.xml"}
        ],

        reference : [{
            token : "constant.language.escape.reference.xml",
            regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
        }],

        attr_reference : [{
            token : "constant.language.escape.reference.attribute-value.xml",
            regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
        }],

        tag : [{
            token : ["meta.tag.punctuation.tag-open.xml", "meta.tag.punctuation.end-tag-open.xml", "meta.tag.tag-name.xml"],
            regex : "(?:(<)|(</))((?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+)",
            next: [
                {include : "attributes"},
                {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>", next : "start"}
            ]
        }],

        tag_whitespace : [
            {token : "text.tag-whitespace.xml", regex : "\\s+"}
        ],
        whitespace : [
            {token : "text.whitespace.xml", regex : "\\s+"}
        ],
        string: [{
            token : "string.xml",
            regex : "'",
            push : [
                {token : "string.xml", regex: "'", next: "pop"},
                {defaultToken : "string.xml"}
            ]
        }, {
            token : "string.xml",
            regex : '"',
            push : [
                {token : "string.xml", regex: '"', next: "pop"},
                {defaultToken : "string.xml"}
            ]
        }],

        attributes: [{
            token : "entity.other.attribute-name.xml",
            regex : "(?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+"
        }, {
            token : "keyword.operator.attribute-equals.xml",
            regex : "="
        }, {
            include: "tag_whitespace"
        }, {
            include: "attribute_value"
        }],

        attribute_value: [{
            token : "string.attribute-value.xml",
            regex : "'",
            push : [
                {token : "string.attribute-value.xml", regex: "'", next: "pop"},
                {include : "attr_reference"},
                {defaultToken : "string.attribute-value.xml"}
            ]
        }, {
            token : "string.attribute-value.xml",
            regex : '"',
            push : [
                {token : "string.attribute-value.xml", regex: '"', next: "pop"},
                {include : "attr_reference"},
                {defaultToken : "string.attribute-value.xml"}
            ]
        }]
    };

    if (this.constructor === XmlHighlightRules)
        this.normalizeRules();
};


(function() {

    this.embedTagRules = function(HighlightRules, prefix, tag){
        this.$rules.tag.unshift({
            token : ["meta.tag.punctuation.tag-open.xml", "meta.tag." + tag + ".tag-name.xml"],
            regex : "(<)(" + tag + "(?=\\s|>|$))",
            next: [
                {include : "attributes"},
                {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>", next : prefix + "start"}
            ]
        });

        this.$rules[tag + "-end"] = [
            {include : "attributes"},
            {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>",  next: "start",
                onMatch : function(value, currentState, stack) {
                    stack.splice(0);
                    return this.token;
            }}
        ]

        this.embedRules(HighlightRules, prefix, [{
            token: ["meta.tag.punctuation.end-tag-open.xml", "meta.tag." + tag + ".tag-name.xml"],
            regex : "(</)(" + tag + "(?=\\s|>|$))",
            next: tag + "-end"
        }, {
            token: "string.cdata.xml",
            regex : "<\\!\\[CDATA\\["
        }, {
            token: "string.cdata.xml",
            regex : "\\]\\]>"
        }]);
    };

}).call(TextHighlightRules.prototype);

oop.inherits(XmlHighlightRules, TextHighlightRules);

exports.XmlHighlightRules = XmlHighlightRules;
});

define("ace/mode/html_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/css_highlight_rules","ace/mode/javascript_highlight_rules","ace/mode/xml_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var lang = require("../lib/lang");
var CssHighlightRules = require("./css_highlight_rules").CssHighlightRules;
var JavaScriptHighlightRules = require("./javascript_highlight_rules").JavaScriptHighlightRules;
var XmlHighlightRules = require("./xml_highlight_rules").XmlHighlightRules;

var tagMap = lang.createMap({
    a           : 'anchor',
    button 	    : 'form',
    form        : 'form',
    img         : 'image',
    input       : 'form',
    label       : 'form',
    option      : 'form',
    script      : 'script',
    select      : 'form',
    textarea    : 'form',
    style       : 'style',
    table       : 'table',
    tbody       : 'table',
    td          : 'table',
    tfoot       : 'table',
    th          : 'table',
    tr          : 'table'
});

var HtmlHighlightRules = function() {
    XmlHighlightRules.call(this);

    this.addRules({
        attributes: [{
            include : "tag_whitespace"
        }, {
            token : "entity.other.attribute-name.xml",
            regex : "[-_a-zA-Z0-9:]+"
        }, {
            token : "keyword.operator.attribute-equals.xml",
            regex : "=",
            push : [{
                include: "tag_whitespace"
            }, {
                token : "string.unquoted.attribute-value.html",
                regex : "[^<>='\"`\\s]+",
                next : "pop"
            }, {
                token : "empty",
                regex : "",
                next : "pop"
            }]
        }, {
            include : "attribute_value"
        }],
        tag: [{
            token : function(start, tag) {
                var group = tagMap[tag];
                return ["meta.tag.punctuation." + (start == "<" ? "" : "end-") + "tag-open.xml",
                    "meta.tag" + (group ? "." + group : "") + ".tag-name.xml"];
            },
            regex : "(</?)([-_a-zA-Z0-9:]+)",
            next: "tag_stuff"
        }],
        tag_stuff: [
            {include : "attributes"},
            {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>", next : "start"}
        ],
    });

    this.embedTagRules(CssHighlightRules, "css-", "style");
    this.embedTagRules(JavaScriptHighlightRules, "js-", "script");

    if (this.constructor === HtmlHighlightRules)
        this.normalizeRules();
};

oop.inherits(HtmlHighlightRules, XmlHighlightRules);

exports.HtmlHighlightRules = HtmlHighlightRules;
});

define("ace/mode/php_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules","ace/mode/html_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var lang = require("../lib/lang");
var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var HtmlHighlightRules = require("./html_highlight_rules").HtmlHighlightRules;

var PhpLangHighlightRules = function() {
    var docComment = DocCommentHighlightRules;
    var builtinFunctions = lang.arrayToMap(
        ('abs|acos|acosh|addcslashes|addslashes|aggregate|aggregate_info|aggregate_methods|aggregate_methods_by_list|aggregate_methods_by_regexp|' +
        'aggregate_properties|aggregate_properties_by_list|aggregate_properties_by_regexp|aggregation_info|amqpconnection|amqpexchange|amqpqueue|' +
        'apache_child_terminate|apache_get_modules|apache_get_version|apache_getenv|apache_lookup_uri|apache_note|apache_request_headers|' +
        'apache_reset_timeout|apache_response_headers|apache_setenv|apc_add|apc_bin_dump|apc_bin_dumpfile|apc_bin_load|apc_bin_loadfile|' +
        'apc_cache_info|apc_cas|apc_clear_cache|apc_compile_file|apc_dec|apc_define_constants|apc_delete|apc_delete_file|apc_exists|apc_fetch|' +
        'apc_inc|apc_load_constants|apc_sma_info|apc_store|apciterator|apd_breakpoint|apd_callstack|apd_clunk|apd_continue|apd_croak|' +
        'apd_dump_function_table|apd_dump_persistent_resources|apd_dump_regular_resources|apd_echo|apd_get_active_symbols|apd_set_pprof_trace|' +
        'apd_set_session|apd_set_session_trace|apd_set_session_trace_socket|appenditerator|array|array_change_key_case|array_chunk|array_combine|' +
        'array_count_values|array_diff|array_diff_assoc|array_diff_key|array_diff_uassoc|array_diff_ukey|array_fill|array_fill_keys|array_filter|' +
        'array_flip|array_intersect|array_intersect_assoc|array_intersect_key|array_intersect_uassoc|array_intersect_ukey|array_key_exists|' +
        'array_keys|array_map|array_merge|array_merge_recursive|array_multisort|array_pad|array_pop|array_product|array_push|array_rand|' +
        'array_reduce|array_replace|array_replace_recursive|array_reverse|array_search|array_shift|array_slice|array_splice|array_sum|array_udiff|' +
        'array_udiff_assoc|array_udiff_uassoc|array_uintersect|array_uintersect_assoc|array_uintersect_uassoc|array_unique|array_unshift|' +
        'array_values|array_walk|array_walk_recursive|arrayaccess|arrayiterator|arrayobject|arsort|asin|asinh|asort|assert|assert_options|atan|' +
        'atan2|atanh|audioproperties|badfunctioncallexception|badmethodcallexception|base64_decode|base64_encode|base_convert|basename|' +
        'bbcode_add_element|bbcode_add_smiley|bbcode_create|bbcode_destroy|bbcode_parse|bbcode_set_arg_parser|bbcode_set_flags|bcadd|bccomp|bcdiv|' +
        'bcmod|bcmul|bcompiler_load|bcompiler_load_exe|bcompiler_parse_class|bcompiler_read|bcompiler_write_class|bcompiler_write_constant|' +
        'bcompiler_write_exe_footer|bcompiler_write_file|bcompiler_write_footer|bcompiler_write_function|bcompiler_write_functions_from_file|' +
        'bcompiler_write_header|bcompiler_write_included_filename|bcpow|bcpowmod|bcscale|bcsqrt|bcsub|bin2hex|bind_textdomain_codeset|bindec|' +
        'bindtextdomain|bson_decode|bson_encode|bumpValue|bzclose|bzcompress|bzdecompress|bzerrno|bzerror|bzerrstr|bzflush|bzopen|bzread|bzwrite|' +
        'cachingiterator|cairo|cairo_create|cairo_font_face_get_type|cairo_font_face_status|cairo_font_options_create|cairo_font_options_equal|' +
        'cairo_font_options_get_antialias|cairo_font_options_get_hint_metrics|cairo_font_options_get_hint_style|' +
        'cairo_font_options_get_subpixel_order|cairo_font_options_hash|cairo_font_options_merge|cairo_font_options_set_antialias|' +
        'cairo_font_options_set_hint_metrics|cairo_font_options_set_hint_style|cairo_font_options_set_subpixel_order|cairo_font_options_status|' +
        'cairo_format_stride_for_width|cairo_image_surface_create|cairo_image_surface_create_for_data|cairo_image_surface_create_from_png|' +
        'cairo_image_surface_get_data|cairo_image_surface_get_format|cairo_image_surface_get_height|cairo_image_surface_get_stride|' +
        'cairo_image_surface_get_width|cairo_matrix_create_scale|cairo_matrix_create_translate|cairo_matrix_invert|cairo_matrix_multiply|' +
        'cairo_matrix_rotate|cairo_matrix_transform_distance|cairo_matrix_transform_point|cairo_matrix_translate|cairo_pattern_add_color_stop_rgb|' +
        'cairo_pattern_add_color_stop_rgba|cairo_pattern_create_for_surface|cairo_pattern_create_linear|cairo_pattern_create_radial|' +
        'cairo_pattern_create_rgb|cairo_pattern_create_rgba|cairo_pattern_get_color_stop_count|cairo_pattern_get_color_stop_rgba|' +
        'cairo_pattern_get_extend|cairo_pattern_get_filter|cairo_pattern_get_linear_points|cairo_pattern_get_matrix|' +
        'cairo_pattern_get_radial_circles|cairo_pattern_get_rgba|cairo_pattern_get_surface|cairo_pattern_get_type|cairo_pattern_set_extend|' +
        'cairo_pattern_set_filter|cairo_pattern_set_matrix|cairo_pattern_status|cairo_pdf_surface_create|cairo_pdf_surface_set_size|' +
        'cairo_ps_get_levels|cairo_ps_level_to_string|cairo_ps_surface_create|cairo_ps_surface_dsc_begin_page_setup|' +
        'cairo_ps_surface_dsc_begin_setup|cairo_ps_surface_dsc_comment|cairo_ps_surface_get_eps|cairo_ps_surface_restrict_to_level|' +
        'cairo_ps_surface_set_eps|cairo_ps_surface_set_size|cairo_scaled_font_create|cairo_scaled_font_extents|cairo_scaled_font_get_ctm|' +
        'cairo_scaled_font_get_font_face|cairo_scaled_font_get_font_matrix|cairo_scaled_font_get_font_options|cairo_scaled_font_get_scale_matrix|' +
        'cairo_scaled_font_get_type|cairo_scaled_font_glyph_extents|cairo_scaled_font_status|cairo_scaled_font_text_extents|' +
        'cairo_surface_copy_page|cairo_surface_create_similar|cairo_surface_finish|cairo_surface_flush|cairo_surface_get_content|' +
        'cairo_surface_get_device_offset|cairo_surface_get_font_options|cairo_surface_get_type|cairo_surface_mark_dirty|' +
        'cairo_surface_mark_dirty_rectangle|cairo_surface_set_device_offset|cairo_surface_set_fallback_resolution|cairo_surface_show_page|' +
        'cairo_surface_status|cairo_surface_write_to_png|cairo_svg_surface_create|cairo_svg_surface_restrict_to_version|' +
        'cairo_svg_version_to_string|cairoantialias|cairocontent|cairocontext|cairoexception|cairoextend|cairofillrule|cairofilter|cairofontface|' +
        'cairofontoptions|cairofontslant|cairofonttype|cairofontweight|cairoformat|cairogradientpattern|cairohintmetrics|cairohintstyle|' +
        'cairoimagesurface|cairolineargradient|cairolinecap|cairolinejoin|cairomatrix|cairooperator|cairopath|cairopattern|cairopatterntype|' +
        'cairopdfsurface|cairopslevel|cairopssurface|cairoradialgradient|cairoscaledfont|cairosolidpattern|cairostatus|cairosubpixelorder|' +
        'cairosurface|cairosurfacepattern|cairosurfacetype|cairosvgsurface|cairosvgversion|cairotoyfontface|cal_days_in_month|cal_from_jd|cal_info|' +
        'cal_to_jd|calcul_hmac|calculhmac|call_user_func|call_user_func_array|call_user_method|call_user_method_array|callbackfilteriterator|ceil|' +
        'chdb|chdb_create|chdir|checkdate|checkdnsrr|chgrp|chmod|chop|chown|chr|chroot|chunk_split|class_alias|class_exists|class_implements|' +
        'class_parents|classkit_import|classkit_method_add|classkit_method_copy|classkit_method_redefine|classkit_method_remove|' +
        'classkit_method_rename|clearstatcache|clone|closedir|closelog|collator|com|com_addref|com_create_guid|com_event_sink|com_get|' +
        'com_get_active_object|com_invoke|com_isenum|com_load|com_load_typelib|com_message_pump|com_print_typeinfo|com_propget|com_propput|' +
        'com_propset|com_release|com_set|compact|connection_aborted|connection_status|connection_timeout|constant|construct|construct|construct|' +
        'convert_cyr_string|convert_uudecode|convert_uuencode|copy|cos|cosh|count|count_chars|countable|counter_bump|counter_bump_value|' +
        'counter_create|counter_get|counter_get_meta|counter_get_named|counter_get_value|counter_reset|counter_reset_value|crack_check|' +
        'crack_closedict|crack_getlastmessage|crack_opendict|crc32|create_function|crypt|ctype_alnum|ctype_alpha|ctype_cntrl|ctype_digit|' +
        'ctype_graph|ctype_lower|ctype_print|ctype_punct|ctype_space|ctype_upper|ctype_xdigit|cubrid_affected_rows|cubrid_bind|' +
        'cubrid_client_encoding|cubrid_close|cubrid_close_prepare|cubrid_close_request|cubrid_col_get|cubrid_col_size|cubrid_column_names|' +
        'cubrid_column_types|cubrid_commit|cubrid_connect|cubrid_connect_with_url|cubrid_current_oid|cubrid_data_seek|cubrid_db_name|' +
        'cubrid_disconnect|cubrid_drop|cubrid_errno|cubrid_error|cubrid_error_code|cubrid_error_code_facility|cubrid_error_msg|cubrid_execute|' +
        'cubrid_fetch|cubrid_fetch_array|cubrid_fetch_assoc|cubrid_fetch_field|cubrid_fetch_lengths|cubrid_fetch_object|cubrid_fetch_row|' +
        'cubrid_field_flags|cubrid_field_len|cubrid_field_name|cubrid_field_seek|cubrid_field_table|cubrid_field_type|cubrid_free_result|' +
        'cubrid_get|cubrid_get_autocommit|cubrid_get_charset|cubrid_get_class_name|cubrid_get_client_info|cubrid_get_db_parameter|' +
        'cubrid_get_server_info|cubrid_insert_id|cubrid_is_instance|cubrid_list_dbs|cubrid_load_from_glo|cubrid_lob_close|cubrid_lob_export|' +
        'cubrid_lob_get|cubrid_lob_send|cubrid_lob_size|cubrid_lock_read|cubrid_lock_write|cubrid_move_cursor|cubrid_new_glo|cubrid_next_result|' +
        'cubrid_num_cols|cubrid_num_fields|cubrid_num_rows|cubrid_ping|cubrid_prepare|cubrid_put|cubrid_query|cubrid_real_escape_string|' +
        'cubrid_result|cubrid_rollback|cubrid_save_to_glo|cubrid_schema|cubrid_send_glo|cubrid_seq_drop|cubrid_seq_insert|cubrid_seq_put|' +
        'cubrid_set_add|cubrid_set_autocommit|cubrid_set_db_parameter|cubrid_set_drop|cubrid_unbuffered_query|cubrid_version|curl_close|' +
        'curl_copy_handle|curl_errno|curl_error|curl_exec|curl_getinfo|curl_init|curl_multi_add_handle|curl_multi_close|curl_multi_exec|' +
        'curl_multi_getcontent|curl_multi_info_read|curl_multi_init|curl_multi_remove_handle|curl_multi_select|curl_setopt|curl_setopt_array|' +
        'curl_version|current|cyrus_authenticate|cyrus_bind|cyrus_close|cyrus_connect|cyrus_query|cyrus_unbind|date|date_add|date_create|' +
        'date_create_from_format|date_date_set|date_default_timezone_get|date_default_timezone_set|date_diff|date_format|date_get_last_errors|' +
        'date_interval_create_from_date_string|date_interval_format|date_isodate_set|date_modify|date_offset_get|date_parse|date_parse_from_format|' +
        'date_sub|date_sun_info|date_sunrise|date_sunset|date_time_set|date_timestamp_get|date_timestamp_set|date_timezone_get|date_timezone_set|' +
        'dateinterval|dateperiod|datetime|datetimezone|db2_autocommit|db2_bind_param|db2_client_info|db2_close|db2_column_privileges|db2_columns|' +
        'db2_commit|db2_conn_error|db2_conn_errormsg|db2_connect|db2_cursor_type|db2_escape_string|db2_exec|db2_execute|db2_fetch_array|' +
        'db2_fetch_assoc|db2_fetch_both|db2_fetch_object|db2_fetch_row|db2_field_display_size|db2_field_name|db2_field_num|db2_field_precision|' +
        'db2_field_scale|db2_field_type|db2_field_width|db2_foreign_keys|db2_free_result|db2_free_stmt|db2_get_option|db2_last_insert_id|' +
        'db2_lob_read|db2_next_result|db2_num_fields|db2_num_rows|db2_pclose|db2_pconnect|db2_prepare|db2_primary_keys|db2_procedure_columns|' +
        'db2_procedures|db2_result|db2_rollback|db2_server_info|db2_set_option|db2_special_columns|db2_statistics|db2_stmt_error|db2_stmt_errormsg|' +
        'db2_table_privileges|db2_tables|dba_close|dba_delete|dba_exists|dba_fetch|dba_firstkey|dba_handlers|dba_insert|dba_key_split|dba_list|' +
        'dba_nextkey|dba_open|dba_optimize|dba_popen|dba_replace|dba_sync|dbase_add_record|dbase_close|dbase_create|dbase_delete_record|' +
        'dbase_get_header_info|dbase_get_record|dbase_get_record_with_names|dbase_numfields|dbase_numrecords|dbase_open|dbase_pack|' +
        'dbase_replace_record|dbplus_add|dbplus_aql|dbplus_chdir|dbplus_close|dbplus_curr|dbplus_errcode|dbplus_errno|dbplus_find|dbplus_first|' +
        'dbplus_flush|dbplus_freealllocks|dbplus_freelock|dbplus_freerlocks|dbplus_getlock|dbplus_getunique|dbplus_info|dbplus_last|dbplus_lockrel|' +
        'dbplus_next|dbplus_open|dbplus_prev|dbplus_rchperm|dbplus_rcreate|dbplus_rcrtexact|dbplus_rcrtlike|dbplus_resolve|dbplus_restorepos|' +
        'dbplus_rkeys|dbplus_ropen|dbplus_rquery|dbplus_rrename|dbplus_rsecindex|dbplus_runlink|dbplus_rzap|dbplus_savepos|dbplus_setindex|' +
        'dbplus_setindexbynumber|dbplus_sql|dbplus_tcl|dbplus_tremove|dbplus_undo|dbplus_undoprepare|dbplus_unlockrel|dbplus_unselect|' +
        'dbplus_update|dbplus_xlockrel|dbplus_xunlockrel|dbx_close|dbx_compare|dbx_connect|dbx_error|dbx_escape_string|dbx_fetch_row|dbx_query|' +
        'dbx_sort|dcgettext|dcngettext|deaggregate|debug_backtrace|debug_print_backtrace|debug_zval_dump|decbin|dechex|decoct|define|' +
        'define_syslog_variables|defined|deg2rad|delete|dgettext|die|dio_close|dio_fcntl|dio_open|dio_read|dio_seek|dio_stat|dio_tcsetattr|' +
        'dio_truncate|dio_write|dir|directoryiterator|dirname|disk_free_space|disk_total_space|diskfreespace|dl|dngettext|dns_check_record|' +
        'dns_get_mx|dns_get_record|dom_import_simplexml|domainexception|domattr|domattribute_name|domattribute_set_value|domattribute_specified|' +
        'domattribute_value|domcharacterdata|domcomment|domdocument|domdocument_add_root|domdocument_create_attribute|' +
        'domdocument_create_cdata_section|domdocument_create_comment|domdocument_create_element|domdocument_create_element_ns|' +
        'domdocument_create_entity_reference|domdocument_create_processing_instruction|domdocument_create_text_node|domdocument_doctype|' +
        'domdocument_document_element|domdocument_dump_file|domdocument_dump_mem|domdocument_get_element_by_id|domdocument_get_elements_by_tagname|' +
        'domdocument_html_dump_mem|domdocument_xinclude|domdocumentfragment|domdocumenttype|domdocumenttype_entities|' +
        'domdocumenttype_internal_subset|domdocumenttype_name|domdocumenttype_notations|domdocumenttype_public_id|domdocumenttype_system_id|' +
        'domelement|domelement_get_attribute|domelement_get_attribute_node|domelement_get_elements_by_tagname|domelement_has_attribute|' +
        'domelement_remove_attribute|domelement_set_attribute|domelement_set_attribute_node|domelement_tagname|domentity|domentityreference|' +
        'domexception|domimplementation|domnamednodemap|domnode|domnode_add_namespace|domnode_append_child|domnode_append_sibling|' +
        'domnode_attributes|domnode_child_nodes|domnode_clone_node|domnode_dump_node|domnode_first_child|domnode_get_content|' +
        'domnode_has_attributes|domnode_has_child_nodes|domnode_insert_before|domnode_is_blank_node|domnode_last_child|domnode_next_sibling|' +
        'domnode_node_name|domnode_node_type|domnode_node_value|domnode_owner_document|domnode_parent_node|domnode_prefix|domnode_previous_sibling|' +
        'domnode_remove_child|domnode_replace_child|domnode_replace_node|domnode_set_content|domnode_set_name|domnode_set_namespace|' +
        'domnode_unlink_node|domnodelist|domnotation|domprocessinginstruction|domprocessinginstruction_data|domprocessinginstruction_target|' +
        'domtext|domxml_new_doc|domxml_open_file|domxml_open_mem|domxml_version|domxml_xmltree|domxml_xslt_stylesheet|domxml_xslt_stylesheet_doc|' +
        'domxml_xslt_stylesheet_file|domxml_xslt_version|domxpath|domxsltstylesheet_process|domxsltstylesheet_result_dump_file|' +
        'domxsltstylesheet_result_dump_mem|dotnet|dotnet_load|doubleval|each|easter_date|easter_days|echo|empty|emptyiterator|' +
        'enchant_broker_describe|enchant_broker_dict_exists|enchant_broker_free|enchant_broker_free_dict|enchant_broker_get_error|' +
        'enchant_broker_init|enchant_broker_list_dicts|enchant_broker_request_dict|enchant_broker_request_pwl_dict|enchant_broker_set_ordering|' +
        'enchant_dict_add_to_personal|enchant_dict_add_to_session|enchant_dict_check|enchant_dict_describe|enchant_dict_get_error|' +
        'enchant_dict_is_in_session|enchant_dict_quick_check|enchant_dict_store_replacement|enchant_dict_suggest|end|ereg|ereg_replace|eregi|' +
        'eregi_replace|error_get_last|error_log|error_reporting|errorexception|escapeshellarg|escapeshellcmd|eval|event_add|event_base_free|' +
        'event_base_loop|event_base_loopbreak|event_base_loopexit|event_base_new|event_base_priority_init|event_base_set|event_buffer_base_set|' +
        'event_buffer_disable|event_buffer_enable|event_buffer_fd_set|event_buffer_free|event_buffer_new|event_buffer_priority_set|' +
        'event_buffer_read|event_buffer_set_callback|event_buffer_timeout_set|event_buffer_watermark_set|event_buffer_write|event_del|event_free|' +
        'event_new|event_set|exception|exec|exif_imagetype|exif_read_data|exif_tagname|exif_thumbnail|exit|exp|expect_expectl|expect_popen|explode|' +
        'expm1|export|export|extension_loaded|extract|ezmlm_hash|fam_cancel_monitor|fam_close|fam_monitor_collection|fam_monitor_directory|' +
        'fam_monitor_file|fam_next_event|fam_open|fam_pending|fam_resume_monitor|fam_suspend_monitor|fbsql_affected_rows|fbsql_autocommit|' +
        'fbsql_blob_size|fbsql_change_user|fbsql_clob_size|fbsql_close|fbsql_commit|fbsql_connect|fbsql_create_blob|fbsql_create_clob|' +
        'fbsql_create_db|fbsql_data_seek|fbsql_database|fbsql_database_password|fbsql_db_query|fbsql_db_status|fbsql_drop_db|fbsql_errno|' +
        'fbsql_error|fbsql_fetch_array|fbsql_fetch_assoc|fbsql_fetch_field|fbsql_fetch_lengths|fbsql_fetch_object|fbsql_fetch_row|' +
        'fbsql_field_flags|fbsql_field_len|fbsql_field_name|fbsql_field_seek|fbsql_field_table|fbsql_field_type|fbsql_free_result|' +
        'fbsql_get_autostart_info|fbsql_hostname|fbsql_insert_id|fbsql_list_dbs|fbsql_list_fields|fbsql_list_tables|fbsql_next_result|' +
        'fbsql_num_fields|fbsql_num_rows|fbsql_password|fbsql_pconnect|fbsql_query|fbsql_read_blob|fbsql_read_clob|fbsql_result|fbsql_rollback|' +
        'fbsql_rows_fetched|fbsql_select_db|fbsql_set_characterset|fbsql_set_lob_mode|fbsql_set_password|fbsql_set_transaction|fbsql_start_db|' +
        'fbsql_stop_db|fbsql_table_name|fbsql_tablename|fbsql_username|fbsql_warnings|fclose|fdf_add_doc_javascript|fdf_add_template|fdf_close|' +
        'fdf_create|fdf_enum_values|fdf_errno|fdf_error|fdf_get_ap|fdf_get_attachment|fdf_get_encoding|fdf_get_file|fdf_get_flags|fdf_get_opt|' +
        'fdf_get_status|fdf_get_value|fdf_get_version|fdf_header|fdf_next_field_name|fdf_open|fdf_open_string|fdf_remove_item|fdf_save|' +
        'fdf_save_string|fdf_set_ap|fdf_set_encoding|fdf_set_file|fdf_set_flags|fdf_set_javascript_action|fdf_set_on_import_javascript|fdf_set_opt|' +
        'fdf_set_status|fdf_set_submit_form_action|fdf_set_target_frame|fdf_set_value|fdf_set_version|feof|fflush|fgetc|fgetcsv|fgets|fgetss|file|' +
        'file_exists|file_get_contents|file_put_contents|fileatime|filectime|filegroup|fileinode|filemtime|fileowner|fileperms|filepro|' +
        'filepro_fieldcount|filepro_fieldname|filepro_fieldtype|filepro_fieldwidth|filepro_retrieve|filepro_rowcount|filesize|filesystemiterator|' +
        'filetype|filter_has_var|filter_id|filter_input|filter_input_array|filter_list|filter_var|filter_var_array|filteriterator|finfo_buffer|' +
        'finfo_close|finfo_file|finfo_open|finfo_set_flags|floatval|flock|floor|flush|fmod|fnmatch|fopen|forward_static_call|' +
        'forward_static_call_array|fpassthru|fprintf|fputcsv|fputs|fread|frenchtojd|fribidi_log2vis|fscanf|fseek|fsockopen|fstat|ftell|ftok|' +
        'ftp_alloc|ftp_cdup|ftp_chdir|ftp_chmod|ftp_close|ftp_connect|ftp_delete|ftp_exec|ftp_fget|ftp_fput|ftp_get|ftp_get_option|ftp_login|' +
        'ftp_mdtm|ftp_mkdir|ftp_nb_continue|ftp_nb_fget|ftp_nb_fput|ftp_nb_get|ftp_nb_put|ftp_nlist|ftp_pasv|ftp_put|ftp_pwd|ftp_quit|ftp_raw|' +
        'ftp_rawlist|ftp_rename|ftp_rmdir|ftp_set_option|ftp_site|ftp_size|ftp_ssl_connect|ftp_systype|ftruncate|func_get_arg|func_get_args|' +
        'func_num_args|function_exists|fwrite|gc_collect_cycles|gc_disable|gc_enable|gc_enabled|gd_info|gearmanclient|gearmanjob|gearmantask|' +
        'gearmanworker|geoip_continent_code_by_name|geoip_country_code3_by_name|geoip_country_code_by_name|geoip_country_name_by_name|' +
        'geoip_database_info|geoip_db_avail|geoip_db_filename|geoip_db_get_all_info|geoip_id_by_name|geoip_isp_by_name|geoip_org_by_name|' +
        'geoip_record_by_name|geoip_region_by_name|geoip_region_name_by_code|geoip_time_zone_by_country_and_region|getMeta|getNamed|getValue|' +
        'get_browser|get_called_class|get_cfg_var|get_class|get_class_methods|get_class_vars|get_current_user|get_declared_classes|' +
        'get_declared_interfaces|get_defined_constants|get_defined_functions|get_defined_vars|get_extension_funcs|get_headers|' +
        'get_html_translation_table|get_include_path|get_included_files|get_loaded_extensions|get_magic_quotes_gpc|get_magic_quotes_runtime|' +
        'get_meta_tags|get_object_vars|get_parent_class|get_required_files|get_resource_type|getallheaders|getconstant|getconstants|getconstructor|' +
        'getcwd|getdate|getdefaultproperties|getdoccomment|getendline|getenv|getextension|getextensionname|getfilename|gethostbyaddr|gethostbyname|' +
        'gethostbynamel|gethostname|getimagesize|getinterfacenames|getinterfaces|getlastmod|getmethod|getmethods|getmodifiers|getmxrr|getmygid|' +
        'getmyinode|getmypid|getmyuid|getname|getnamespacename|getopt|getparentclass|getproperties|getproperty|getprotobyname|getprotobynumber|' +
        'getrandmax|getrusage|getservbyname|getservbyport|getshortname|getstartline|getstaticproperties|getstaticpropertyvalue|gettext|' +
        'gettimeofday|gettype|glob|globiterator|gmagick|gmagickdraw|gmagickpixel|gmdate|gmmktime|gmp_abs|gmp_add|gmp_and|gmp_clrbit|gmp_cmp|' +
        'gmp_com|gmp_div|gmp_div_q|gmp_div_qr|gmp_div_r|gmp_divexact|gmp_fact|gmp_gcd|gmp_gcdext|gmp_hamdist|gmp_init|gmp_intval|gmp_invert|' +
        'gmp_jacobi|gmp_legendre|gmp_mod|gmp_mul|gmp_neg|gmp_nextprime|gmp_or|gmp_perfect_square|gmp_popcount|gmp_pow|gmp_powm|gmp_prob_prime|' +
        'gmp_random|gmp_scan0|gmp_scan1|gmp_setbit|gmp_sign|gmp_sqrt|gmp_sqrtrem|gmp_strval|gmp_sub|gmp_testbit|gmp_xor|gmstrftime|' +
        'gnupg_adddecryptkey|gnupg_addencryptkey|gnupg_addsignkey|gnupg_cleardecryptkeys|gnupg_clearencryptkeys|gnupg_clearsignkeys|gnupg_decrypt|' +
        'gnupg_decryptverify|gnupg_encrypt|gnupg_encryptsign|gnupg_export|gnupg_geterror|gnupg_getprotocol|gnupg_import|gnupg_init|gnupg_keyinfo|' +
        'gnupg_setarmor|gnupg_seterrormode|gnupg_setsignmode|gnupg_sign|gnupg_verify|gopher_parsedir|grapheme_extract|grapheme_stripos|' +
        'grapheme_stristr|grapheme_strlen|grapheme_strpos|grapheme_strripos|grapheme_strrpos|grapheme_strstr|grapheme_substr|gregoriantojd|' +
        'gupnp_context_get_host_ip|gupnp_context_get_port|gupnp_context_get_subscription_timeout|gupnp_context_host_path|gupnp_context_new|' +
        'gupnp_context_set_subscription_timeout|gupnp_context_timeout_add|gupnp_context_unhost_path|gupnp_control_point_browse_start|' +
        'gupnp_control_point_browse_stop|gupnp_control_point_callback_set|gupnp_control_point_new|gupnp_device_action_callback_set|' +
        'gupnp_device_info_get|gupnp_device_info_get_service|gupnp_root_device_get_available|gupnp_root_device_get_relative_location|' +
        'gupnp_root_device_new|gupnp_root_device_set_available|gupnp_root_device_start|gupnp_root_device_stop|gupnp_service_action_get|' +
        'gupnp_service_action_return|gupnp_service_action_return_error|gupnp_service_action_set|gupnp_service_freeze_notify|gupnp_service_info_get|' +
        'gupnp_service_info_get_introspection|gupnp_service_introspection_get_state_variable|gupnp_service_notify|gupnp_service_proxy_action_get|' +
        'gupnp_service_proxy_action_set|gupnp_service_proxy_add_notify|gupnp_service_proxy_callback_set|gupnp_service_proxy_get_subscribed|' +
        'gupnp_service_proxy_remove_notify|gupnp_service_proxy_set_subscribed|gupnp_service_thaw_notify|gzclose|gzcompress|gzdecode|gzdeflate|' +
        'gzencode|gzeof|gzfile|gzgetc|gzgets|gzgetss|gzinflate|gzopen|gzpassthru|gzputs|gzread|gzrewind|gzseek|gztell|gzuncompress|gzwrite|' +
        'halt_compiler|haruannotation|haruannotation_setborderstyle|haruannotation_sethighlightmode|haruannotation_seticon|' +
        'haruannotation_setopened|harudestination|harudestination_setfit|harudestination_setfitb|harudestination_setfitbh|harudestination_setfitbv|' +
        'harudestination_setfith|harudestination_setfitr|harudestination_setfitv|harudestination_setxyz|harudoc|harudoc_addpage|' +
        'harudoc_addpagelabel|harudoc_construct|harudoc_createoutline|harudoc_getcurrentencoder|harudoc_getcurrentpage|harudoc_getencoder|' +
        'harudoc_getfont|harudoc_getinfoattr|harudoc_getpagelayout|harudoc_getpagemode|harudoc_getstreamsize|harudoc_insertpage|harudoc_loadjpeg|' +
        'harudoc_loadpng|harudoc_loadraw|harudoc_loadttc|harudoc_loadttf|harudoc_loadtype1|harudoc_output|harudoc_readfromstream|' +
        'harudoc_reseterror|harudoc_resetstream|harudoc_save|harudoc_savetostream|harudoc_setcompressionmode|harudoc_setcurrentencoder|' +
        'harudoc_setencryptionmode|harudoc_setinfoattr|harudoc_setinfodateattr|harudoc_setopenaction|harudoc_setpagelayout|harudoc_setpagemode|' +
        'harudoc_setpagesconfiguration|harudoc_setpassword|harudoc_setpermission|harudoc_usecnsencodings|harudoc_usecnsfonts|' +
        'harudoc_usecntencodings|harudoc_usecntfonts|harudoc_usejpencodings|harudoc_usejpfonts|harudoc_usekrencodings|harudoc_usekrfonts|' +
        'haruencoder|haruencoder_getbytetype|haruencoder_gettype|haruencoder_getunicode|haruencoder_getwritingmode|haruexception|harufont|' +
        'harufont_getascent|harufont_getcapheight|harufont_getdescent|harufont_getencodingname|harufont_getfontname|harufont_gettextwidth|' +
        'harufont_getunicodewidth|harufont_getxheight|harufont_measuretext|haruimage|haruimage_getbitspercomponent|haruimage_getcolorspace|' +
        'haruimage_getheight|haruimage_getsize|haruimage_getwidth|haruimage_setcolormask|haruimage_setmaskimage|haruoutline|' +
        'haruoutline_setdestination|haruoutline_setopened|harupage|harupage_arc|harupage_begintext|harupage_circle|harupage_closepath|' +
        'harupage_concat|harupage_createdestination|harupage_createlinkannotation|harupage_createtextannotation|harupage_createurlannotation|' +
        'harupage_curveto|harupage_curveto2|harupage_curveto3|harupage_drawimage|harupage_ellipse|harupage_endpath|harupage_endtext|' +
        'harupage_eofill|harupage_eofillstroke|harupage_fill|harupage_fillstroke|harupage_getcharspace|harupage_getcmykfill|harupage_getcmykstroke|' +
        'harupage_getcurrentfont|harupage_getcurrentfontsize|harupage_getcurrentpos|harupage_getcurrenttextpos|harupage_getdash|' +
        'harupage_getfillingcolorspace|harupage_getflatness|harupage_getgmode|harupage_getgrayfill|harupage_getgraystroke|harupage_getheight|' +
        'harupage_gethorizontalscaling|harupage_getlinecap|harupage_getlinejoin|harupage_getlinewidth|harupage_getmiterlimit|harupage_getrgbfill|' +
        'harupage_getrgbstroke|harupage_getstrokingcolorspace|harupage_gettextleading|harupage_gettextmatrix|harupage_gettextrenderingmode|' +
        'harupage_gettextrise|harupage_gettextwidth|harupage_gettransmatrix|harupage_getwidth|harupage_getwordspace|harupage_lineto|' +
        'harupage_measuretext|harupage_movetextpos|harupage_moveto|harupage_movetonextline|harupage_rectangle|harupage_setcharspace|' +
        'harupage_setcmykfill|harupage_setcmykstroke|harupage_setdash|harupage_setflatness|harupage_setfontandsize|harupage_setgrayfill|' +
        'harupage_setgraystroke|harupage_setheight|harupage_sethorizontalscaling|harupage_setlinecap|harupage_setlinejoin|harupage_setlinewidth|' +
        'harupage_setmiterlimit|harupage_setrgbfill|harupage_setrgbstroke|harupage_setrotate|harupage_setsize|harupage_setslideshow|' +
        'harupage_settextleading|harupage_settextmatrix|harupage_settextrenderingmode|harupage_settextrise|harupage_setwidth|harupage_setwordspace|' +
        'harupage_showtext|harupage_showtextnextline|harupage_stroke|harupage_textout|harupage_textrect|hasconstant|hash|hash_algos|hash_copy|' +
        'hash_file|hash_final|hash_hmac|hash_hmac_file|hash_init|hash_update|hash_update_file|hash_update_stream|hasmethod|hasproperty|header|' +
        'header_register_callback|header_remove|headers_list|headers_sent|hebrev|hebrevc|hex2bin|hexdec|highlight_file|highlight_string|' +
        'html_entity_decode|htmlentities|htmlspecialchars|htmlspecialchars_decode|http_build_cookie|http_build_query|http_build_str|http_build_url|' +
        'http_cache_etag|http_cache_last_modified|http_chunked_decode|http_date|http_deflate|http_get|http_get_request_body|' +
        'http_get_request_body_stream|http_get_request_headers|http_head|http_inflate|http_match_etag|http_match_modified|' +
        'http_match_request_header|http_negotiate_charset|http_negotiate_content_type|http_negotiate_language|http_parse_cookie|http_parse_headers|' +
        'http_parse_message|http_parse_params|http_persistent_handles_clean|http_persistent_handles_count|http_persistent_handles_ident|' +
        'http_post_data|http_post_fields|http_put_data|http_put_file|http_put_stream|http_redirect|http_request|http_request_body_encode|' +
        'http_request_method_exists|http_request_method_name|http_request_method_register|http_request_method_unregister|http_response_code|' +
        'http_send_content_disposition|http_send_content_type|http_send_data|http_send_file|http_send_last_modified|http_send_status|' +
        'http_send_stream|http_support|http_throttle|httpdeflatestream|httpdeflatestream_construct|httpdeflatestream_factory|' +
        'httpdeflatestream_finish|httpdeflatestream_flush|httpdeflatestream_update|httpinflatestream|httpinflatestream_construct|' +
        'httpinflatestream_factory|httpinflatestream_finish|httpinflatestream_flush|httpinflatestream_update|httpmessage|httpmessage_addheaders|' +
        'httpmessage_construct|httpmessage_detach|httpmessage_factory|httpmessage_fromenv|httpmessage_fromstring|httpmessage_getbody|' +
        'httpmessage_getheader|httpmessage_getheaders|httpmessage_gethttpversion|httpmessage_getparentmessage|httpmessage_getrequestmethod|' +
        'httpmessage_getrequesturl|httpmessage_getresponsecode|httpmessage_getresponsestatus|httpmessage_gettype|httpmessage_guesscontenttype|' +
        'httpmessage_prepend|httpmessage_reverse|httpmessage_send|httpmessage_setbody|httpmessage_setheaders|httpmessage_sethttpversion|' +
        'httpmessage_setrequestmethod|httpmessage_setrequesturl|httpmessage_setresponsecode|httpmessage_setresponsestatus|httpmessage_settype|' +
        'httpmessage_tomessagetypeobject|httpmessage_tostring|httpquerystring|httpquerystring_construct|httpquerystring_get|httpquerystring_mod|' +
        'httpquerystring_set|httpquerystring_singleton|httpquerystring_toarray|httpquerystring_tostring|httpquerystring_xlate|httprequest|' +
        'httprequest_addcookies|httprequest_addheaders|httprequest_addpostfields|httprequest_addpostfile|httprequest_addputdata|' +
        'httprequest_addquerydata|httprequest_addrawpostdata|httprequest_addssloptions|httprequest_clearhistory|httprequest_construct|' +
        'httprequest_enablecookies|httprequest_getcontenttype|httprequest_getcookies|httprequest_getheaders|httprequest_gethistory|' +
        'httprequest_getmethod|httprequest_getoptions|httprequest_getpostfields|httprequest_getpostfiles|httprequest_getputdata|' +
        'httprequest_getputfile|httprequest_getquerydata|httprequest_getrawpostdata|httprequest_getrawrequestmessage|' +
        'httprequest_getrawresponsemessage|httprequest_getrequestmessage|httprequest_getresponsebody|httprequest_getresponsecode|' +
        'httprequest_getresponsecookies|httprequest_getresponsedata|httprequest_getresponseheader|httprequest_getresponseinfo|' +
        'httprequest_getresponsemessage|httprequest_getresponsestatus|httprequest_getssloptions|httprequest_geturl|httprequest_resetcookies|' +
        'httprequest_send|httprequest_setcontenttype|httprequest_setcookies|httprequest_setheaders|httprequest_setmethod|httprequest_setoptions|' +
        'httprequest_setpostfields|httprequest_setpostfiles|httprequest_setputdata|httprequest_setputfile|httprequest_setquerydata|' +
        'httprequest_setrawpostdata|httprequest_setssloptions|httprequest_seturl|httprequestpool|httprequestpool_attach|httprequestpool_construct|' +
        'httprequestpool_destruct|httprequestpool_detach|httprequestpool_getattachedrequests|httprequestpool_getfinishedrequests|' +
        'httprequestpool_reset|httprequestpool_send|httprequestpool_socketperform|httprequestpool_socketselect|httpresponse|httpresponse_capture|' +
        'httpresponse_getbuffersize|httpresponse_getcache|httpresponse_getcachecontrol|httpresponse_getcontentdisposition|' +
        'httpresponse_getcontenttype|httpresponse_getdata|httpresponse_getetag|httpresponse_getfile|httpresponse_getgzip|httpresponse_getheader|' +
        'httpresponse_getlastmodified|httpresponse_getrequestbody|httpresponse_getrequestbodystream|httpresponse_getrequestheaders|' +
        'httpresponse_getstream|httpresponse_getthrottledelay|httpresponse_guesscontenttype|httpresponse_redirect|httpresponse_send|' +
        'httpresponse_setbuffersize|httpresponse_setcache|httpresponse_setcachecontrol|httpresponse_setcontentdisposition|' +
        'httpresponse_setcontenttype|httpresponse_setdata|httpresponse_setetag|httpresponse_setfile|httpresponse_setgzip|httpresponse_setheader|' +
        'httpresponse_setlastmodified|httpresponse_setstream|httpresponse_setthrottledelay|httpresponse_status|hw_array2objrec|hw_changeobject|' +
        'hw_children|hw_childrenobj|hw_close|hw_connect|hw_connection_info|hw_cp|hw_deleteobject|hw_docbyanchor|hw_docbyanchorobj|' +
        'hw_document_attributes|hw_document_bodytag|hw_document_content|hw_document_setcontent|hw_document_size|hw_dummy|hw_edittext|hw_error|' +
        'hw_errormsg|hw_free_document|hw_getanchors|hw_getanchorsobj|hw_getandlock|hw_getchildcoll|hw_getchildcollobj|hw_getchilddoccoll|' +
        'hw_getchilddoccollobj|hw_getobject|hw_getobjectbyquery|hw_getobjectbyquerycoll|hw_getobjectbyquerycollobj|hw_getobjectbyqueryobj|' +
        'hw_getparents|hw_getparentsobj|hw_getrellink|hw_getremote|hw_getremotechildren|hw_getsrcbydestobj|hw_gettext|hw_getusername|hw_identify|' +
        'hw_incollections|hw_info|hw_inscoll|hw_insdoc|hw_insertanchors|hw_insertdocument|hw_insertobject|hw_mapid|hw_modifyobject|hw_mv|' +
        'hw_new_document|hw_objrec2array|hw_output_document|hw_pconnect|hw_pipedocument|hw_root|hw_setlinkroot|hw_stat|hw_unlock|hw_who|' +
        'hwapi_attribute|hwapi_attribute_key|hwapi_attribute_langdepvalue|hwapi_attribute_value|hwapi_attribute_values|hwapi_checkin|' +
        'hwapi_checkout|hwapi_children|hwapi_content|hwapi_content_mimetype|hwapi_content_read|hwapi_copy|hwapi_dbstat|hwapi_dcstat|' +
        'hwapi_dstanchors|hwapi_dstofsrcanchor|hwapi_error_count|hwapi_error_reason|hwapi_find|hwapi_ftstat|hwapi_hgcsp|hwapi_hwstat|' +
        'hwapi_identify|hwapi_info|hwapi_insert|hwapi_insertanchor|hwapi_insertcollection|hwapi_insertdocument|hwapi_link|hwapi_lock|hwapi_move|' +
        'hwapi_new_content|hwapi_object|hwapi_object_assign|hwapi_object_attreditable|hwapi_object_count|hwapi_object_insert|hwapi_object_new|' +
        'hwapi_object_remove|hwapi_object_title|hwapi_object_value|hwapi_objectbyanchor|hwapi_parents|hwapi_reason_description|hwapi_reason_type|' +
        'hwapi_remove|hwapi_replace|hwapi_setcommittedversion|hwapi_srcanchors|hwapi_srcsofdst|hwapi_unlock|hwapi_user|hwapi_userlist|hypot|' +
        'ibase_add_user|ibase_affected_rows|ibase_backup|ibase_blob_add|ibase_blob_cancel|ibase_blob_close|ibase_blob_create|ibase_blob_echo|' +
        'ibase_blob_get|ibase_blob_import|ibase_blob_info|ibase_blob_open|ibase_close|ibase_commit|ibase_commit_ret|ibase_connect|ibase_db_info|' +
        'ibase_delete_user|ibase_drop_db|ibase_errcode|ibase_errmsg|ibase_execute|ibase_fetch_assoc|ibase_fetch_object|ibase_fetch_row|' +
        'ibase_field_info|ibase_free_event_handler|ibase_free_query|ibase_free_result|ibase_gen_id|ibase_maintain_db|ibase_modify_user|' +
        'ibase_name_result|ibase_num_fields|ibase_num_params|ibase_param_info|ibase_pconnect|ibase_prepare|ibase_query|ibase_restore|' +
        'ibase_rollback|ibase_rollback_ret|ibase_server_info|ibase_service_attach|ibase_service_detach|ibase_set_event_handler|ibase_timefmt|' +
        'ibase_trans|ibase_wait_event|iconv|iconv_get_encoding|iconv_mime_decode|iconv_mime_decode_headers|iconv_mime_encode|iconv_set_encoding|' +
        'iconv_strlen|iconv_strpos|iconv_strrpos|iconv_substr|id3_get_frame_long_name|id3_get_frame_short_name|id3_get_genre_id|id3_get_genre_list|' +
        'id3_get_genre_name|id3_get_tag|id3_get_version|id3_remove_tag|id3_set_tag|id3v2attachedpictureframe|id3v2frame|id3v2tag|idate|' +
        'idn_to_ascii|idn_to_unicode|idn_to_utf8|ifx_affected_rows|ifx_blobinfile_mode|ifx_byteasvarchar|ifx_close|ifx_connect|ifx_copy_blob|' +
        'ifx_create_blob|ifx_create_char|ifx_do|ifx_error|ifx_errormsg|ifx_fetch_row|ifx_fieldproperties|ifx_fieldtypes|ifx_free_blob|' +
        'ifx_free_char|ifx_free_result|ifx_get_blob|ifx_get_char|ifx_getsqlca|ifx_htmltbl_result|ifx_nullformat|ifx_num_fields|ifx_num_rows|' +
        'ifx_pconnect|ifx_prepare|ifx_query|ifx_textasvarchar|ifx_update_blob|ifx_update_char|ifxus_close_slob|ifxus_create_slob|ifxus_free_slob|' +
        'ifxus_open_slob|ifxus_read_slob|ifxus_seek_slob|ifxus_tell_slob|ifxus_write_slob|ignore_user_abort|iis_add_server|iis_get_dir_security|' +
        'iis_get_script_map|iis_get_server_by_comment|iis_get_server_by_path|iis_get_server_rights|iis_get_service_state|iis_remove_server|' +
        'iis_set_app_settings|iis_set_dir_security|iis_set_script_map|iis_set_server_rights|iis_start_server|iis_start_service|iis_stop_server|' +
        'iis_stop_service|image2wbmp|image_type_to_extension|image_type_to_mime_type|imagealphablending|imageantialias|imagearc|imagechar|' +
        'imagecharup|imagecolorallocate|imagecolorallocatealpha|imagecolorat|imagecolorclosest|imagecolorclosestalpha|imagecolorclosesthwb|' +
        'imagecolordeallocate|imagecolorexact|imagecolorexactalpha|imagecolormatch|imagecolorresolve|imagecolorresolvealpha|imagecolorset|' +
        'imagecolorsforindex|imagecolorstotal|imagecolortransparent|imageconvolution|imagecopy|imagecopymerge|imagecopymergegray|' +
        'imagecopyresampled|imagecopyresized|imagecreate|imagecreatefromgd|imagecreatefromgd2|imagecreatefromgd2part|imagecreatefromgif|' +
        'imagecreatefromjpeg|imagecreatefrompng|imagecreatefromstring|imagecreatefromwbmp|imagecreatefromxbm|imagecreatefromxpm|' +
        'imagecreatetruecolor|imagedashedline|imagedestroy|imageellipse|imagefill|imagefilledarc|imagefilledellipse|imagefilledpolygon|' +
        'imagefilledrectangle|imagefilltoborder|imagefilter|imagefontheight|imagefontwidth|imageftbbox|imagefttext|imagegammacorrect|imagegd|' +
        'imagegd2|imagegif|imagegrabscreen|imagegrabwindow|imageinterlace|imageistruecolor|imagejpeg|imagelayereffect|imageline|imageloadfont|' +
        'imagepalettecopy|imagepng|imagepolygon|imagepsbbox|imagepsencodefont|imagepsextendfont|imagepsfreefont|imagepsloadfont|imagepsslantfont|' +
        'imagepstext|imagerectangle|imagerotate|imagesavealpha|imagesetbrush|imagesetpixel|imagesetstyle|imagesetthickness|imagesettile|' +
        'imagestring|imagestringup|imagesx|imagesy|imagetruecolortopalette|imagettfbbox|imagettftext|imagetypes|imagewbmp|imagexbm|imagick|' +
        'imagick_adaptiveblurimage|imagick_adaptiveresizeimage|imagick_adaptivesharpenimage|imagick_adaptivethresholdimage|imagick_addimage|' +
        'imagick_addnoiseimage|imagick_affinetransformimage|imagick_animateimages|imagick_annotateimage|imagick_appendimages|imagick_averageimages|' +
        'imagick_blackthresholdimage|imagick_blurimage|imagick_borderimage|imagick_charcoalimage|imagick_chopimage|imagick_clear|imagick_clipimage|' +
        'imagick_clippathimage|imagick_clone|imagick_clutimage|imagick_coalesceimages|imagick_colorfloodfillimage|imagick_colorizeimage|' +
        'imagick_combineimages|imagick_commentimage|imagick_compareimagechannels|imagick_compareimagelayers|imagick_compareimages|' +
        'imagick_compositeimage|imagick_construct|imagick_contrastimage|imagick_contraststretchimage|imagick_convolveimage|imagick_cropimage|' +
        'imagick_cropthumbnailimage|imagick_current|imagick_cyclecolormapimage|imagick_decipherimage|imagick_deconstructimages|' +
        'imagick_deleteimageartifact|imagick_despeckleimage|imagick_destroy|imagick_displayimage|imagick_displayimages|imagick_distortimage|' +
        'imagick_drawimage|imagick_edgeimage|imagick_embossimage|imagick_encipherimage|imagick_enhanceimage|imagick_equalizeimage|' +
        'imagick_evaluateimage|imagick_extentimage|imagick_flattenimages|imagick_flipimage|imagick_floodfillpaintimage|imagick_flopimage|' +
        'imagick_frameimage|imagick_fximage|imagick_gammaimage|imagick_gaussianblurimage|imagick_getcolorspace|imagick_getcompression|' +
        'imagick_getcompressionquality|imagick_getcopyright|imagick_getfilename|imagick_getfont|imagick_getformat|imagick_getgravity|' +
        'imagick_gethomeurl|imagick_getimage|imagick_getimagealphachannel|imagick_getimageartifact|imagick_getimagebackgroundcolor|' +
        'imagick_getimageblob|imagick_getimageblueprimary|imagick_getimagebordercolor|imagick_getimagechanneldepth|' +
        'imagick_getimagechanneldistortion|imagick_getimagechanneldistortions|imagick_getimagechannelextrema|imagick_getimagechannelmean|' +
        'imagick_getimagechannelrange|imagick_getimagechannelstatistics|imagick_getimageclipmask|imagick_getimagecolormapcolor|' +
        'imagick_getimagecolors|imagick_getimagecolorspace|imagick_getimagecompose|imagick_getimagecompression|imagick_getimagecompressionquality|' +
        'imagick_getimagedelay|imagick_getimagedepth|imagick_getimagedispose|imagick_getimagedistortion|imagick_getimageextrema|' +
        'imagick_getimagefilename|imagick_getimageformat|imagick_getimagegamma|imagick_getimagegeometry|imagick_getimagegravity|' +
        'imagick_getimagegreenprimary|imagick_getimageheight|imagick_getimagehistogram|imagick_getimageindex|imagick_getimageinterlacescheme|' +
        'imagick_getimageinterpolatemethod|imagick_getimageiterations|imagick_getimagelength|imagick_getimagemagicklicense|imagick_getimagematte|' +
        'imagick_getimagemattecolor|imagick_getimageorientation|imagick_getimagepage|imagick_getimagepixelcolor|imagick_getimageprofile|' +
        'imagick_getimageprofiles|imagick_getimageproperties|imagick_getimageproperty|imagick_getimageredprimary|imagick_getimageregion|' +
        'imagick_getimagerenderingintent|imagick_getimageresolution|imagick_getimagesblob|imagick_getimagescene|imagick_getimagesignature|' +
        'imagick_getimagesize|imagick_getimagetickspersecond|imagick_getimagetotalinkdensity|imagick_getimagetype|imagick_getimageunits|' +
        'imagick_getimagevirtualpixelmethod|imagick_getimagewhitepoint|imagick_getimagewidth|imagick_getinterlacescheme|imagick_getiteratorindex|' +
        'imagick_getnumberimages|imagick_getoption|imagick_getpackagename|imagick_getpage|imagick_getpixeliterator|imagick_getpixelregioniterator|' +
        'imagick_getpointsize|imagick_getquantumdepth|imagick_getquantumrange|imagick_getreleasedate|imagick_getresource|imagick_getresourcelimit|' +
        'imagick_getsamplingfactors|imagick_getsize|imagick_getsizeoffset|imagick_getversion|imagick_hasnextimage|imagick_haspreviousimage|' +
        'imagick_identifyimage|imagick_implodeimage|imagick_labelimage|imagick_levelimage|imagick_linearstretchimage|imagick_liquidrescaleimage|' +
        'imagick_magnifyimage|imagick_mapimage|imagick_mattefloodfillimage|imagick_medianfilterimage|imagick_mergeimagelayers|imagick_minifyimage|' +
        'imagick_modulateimage|imagick_montageimage|imagick_morphimages|imagick_mosaicimages|imagick_motionblurimage|imagick_negateimage|' +
        'imagick_newimage|imagick_newpseudoimage|imagick_nextimage|imagick_normalizeimage|imagick_oilpaintimage|imagick_opaquepaintimage|' +
        'imagick_optimizeimagelayers|imagick_orderedposterizeimage|imagick_paintfloodfillimage|imagick_paintopaqueimage|' +
        'imagick_painttransparentimage|imagick_pingimage|imagick_pingimageblob|imagick_pingimagefile|imagick_polaroidimage|imagick_posterizeimage|' +
        'imagick_previewimages|imagick_previousimage|imagick_profileimage|imagick_quantizeimage|imagick_quantizeimages|imagick_queryfontmetrics|' +
        'imagick_queryfonts|imagick_queryformats|imagick_radialblurimage|imagick_raiseimage|imagick_randomthresholdimage|imagick_readimage|' +
        'imagick_readimageblob|imagick_readimagefile|imagick_recolorimage|imagick_reducenoiseimage|imagick_removeimage|imagick_removeimageprofile|' +
        'imagick_render|imagick_resampleimage|imagick_resetimagepage|imagick_resizeimage|imagick_rollimage|imagick_rotateimage|' +
        'imagick_roundcorners|imagick_sampleimage|imagick_scaleimage|imagick_separateimagechannel|imagick_sepiatoneimage|' +
        'imagick_setbackgroundcolor|imagick_setcolorspace|imagick_setcompression|imagick_setcompressionquality|imagick_setfilename|' +
        'imagick_setfirstiterator|imagick_setfont|imagick_setformat|imagick_setgravity|imagick_setimage|imagick_setimagealphachannel|' +
        'imagick_setimageartifact|imagick_setimagebackgroundcolor|imagick_setimagebias|imagick_setimageblueprimary|imagick_setimagebordercolor|' +
        'imagick_setimagechanneldepth|imagick_setimageclipmask|imagick_setimagecolormapcolor|imagick_setimagecolorspace|imagick_setimagecompose|' +
        'imagick_setimagecompression|imagick_setimagecompressionquality|imagick_setimagedelay|imagick_setimagedepth|imagick_setimagedispose|' +
        'imagick_setimageextent|imagick_setimagefilename|imagick_setimageformat|imagick_setimagegamma|imagick_setimagegravity|' +
        'imagick_setimagegreenprimary|imagick_setimageindex|imagick_setimageinterlacescheme|imagick_setimageinterpolatemethod|' +
        'imagick_setimageiterations|imagick_setimagematte|imagick_setimagemattecolor|imagick_setimageopacity|imagick_setimageorientation|' +
        'imagick_setimagepage|imagick_setimageprofile|imagick_setimageproperty|imagick_setimageredprimary|imagick_setimagerenderingintent|' +
        'imagick_setimageresolution|imagick_setimagescene|imagick_setimagetickspersecond|imagick_setimagetype|imagick_setimageunits|' +
        'imagick_setimagevirtualpixelmethod|imagick_setimagewhitepoint|imagick_setinterlacescheme|imagick_setiteratorindex|imagick_setlastiterator|' +
        'imagick_setoption|imagick_setpage|imagick_setpointsize|imagick_setresolution|imagick_setresourcelimit|imagick_setsamplingfactors|' +
        'imagick_setsize|imagick_setsizeoffset|imagick_settype|imagick_shadeimage|imagick_shadowimage|imagick_sharpenimage|imagick_shaveimage|' +
        'imagick_shearimage|imagick_sigmoidalcontrastimage|imagick_sketchimage|imagick_solarizeimage|imagick_spliceimage|imagick_spreadimage|' +
        'imagick_steganoimage|imagick_stereoimage|imagick_stripimage|imagick_swirlimage|imagick_textureimage|imagick_thresholdimage|' +
        'imagick_thumbnailimage|imagick_tintimage|imagick_transformimage|imagick_transparentpaintimage|imagick_transposeimage|' +
        'imagick_transverseimage|imagick_trimimage|imagick_uniqueimagecolors|imagick_unsharpmaskimage|imagick_valid|imagick_vignetteimage|' +
        'imagick_waveimage|imagick_whitethresholdimage|imagick_writeimage|imagick_writeimagefile|imagick_writeimages|imagick_writeimagesfile|' +
        'imagickdraw|imagickdraw_affine|imagickdraw_annotation|imagickdraw_arc|imagickdraw_bezier|imagickdraw_circle|imagickdraw_clear|' +
        'imagickdraw_clone|imagickdraw_color|imagickdraw_comment|imagickdraw_composite|imagickdraw_construct|imagickdraw_destroy|' +
        'imagickdraw_ellipse|imagickdraw_getclippath|imagickdraw_getcliprule|imagickdraw_getclipunits|imagickdraw_getfillcolor|' +
        'imagickdraw_getfillopacity|imagickdraw_getfillrule|imagickdraw_getfont|imagickdraw_getfontfamily|imagickdraw_getfontsize|' +
        'imagickdraw_getfontstyle|imagickdraw_getfontweight|imagickdraw_getgravity|imagickdraw_getstrokeantialias|imagickdraw_getstrokecolor|' +
        'imagickdraw_getstrokedasharray|imagickdraw_getstrokedashoffset|imagickdraw_getstrokelinecap|imagickdraw_getstrokelinejoin|' +
        'imagickdraw_getstrokemiterlimit|imagickdraw_getstrokeopacity|imagickdraw_getstrokewidth|imagickdraw_gettextalignment|' +
        'imagickdraw_gettextantialias|imagickdraw_gettextdecoration|imagickdraw_gettextencoding|imagickdraw_gettextundercolor|' +
        'imagickdraw_getvectorgraphics|imagickdraw_line|imagickdraw_matte|imagickdraw_pathclose|imagickdraw_pathcurvetoabsolute|' +
        'imagickdraw_pathcurvetoquadraticbezierabsolute|imagickdraw_pathcurvetoquadraticbezierrelative|' +
        'imagickdraw_pathcurvetoquadraticbeziersmoothabsolute|imagickdraw_pathcurvetoquadraticbeziersmoothrelative|imagickdraw_pathcurvetorelative|' +
        'imagickdraw_pathcurvetosmoothabsolute|imagickdraw_pathcurvetosmoothrelative|imagickdraw_pathellipticarcabsolute|' +
        'imagickdraw_pathellipticarcrelative|imagickdraw_pathfinish|imagickdraw_pathlinetoabsolute|imagickdraw_pathlinetohorizontalabsolute|' +
        'imagickdraw_pathlinetohorizontalrelative|imagickdraw_pathlinetorelative|imagickdraw_pathlinetoverticalabsolute|' +
        'imagickdraw_pathlinetoverticalrelative|imagickdraw_pathmovetoabsolute|imagickdraw_pathmovetorelative|imagickdraw_pathstart|' +
        'imagickdraw_point|imagickdraw_polygon|imagickdraw_polyline|imagickdraw_pop|imagickdraw_popclippath|imagickdraw_popdefs|' +
        'imagickdraw_poppattern|imagickdraw_push|imagickdraw_pushclippath|imagickdraw_pushdefs|imagickdraw_pushpattern|imagickdraw_rectangle|' +
        'imagickdraw_render|imagickdraw_rotate|imagickdraw_roundrectangle|imagickdraw_scale|imagickdraw_setclippath|imagickdraw_setcliprule|' +
        'imagickdraw_setclipunits|imagickdraw_setfillalpha|imagickdraw_setfillcolor|imagickdraw_setfillopacity|imagickdraw_setfillpatternurl|' +
        'imagickdraw_setfillrule|imagickdraw_setfont|imagickdraw_setfontfamily|imagickdraw_setfontsize|imagickdraw_setfontstretch|' +
        'imagickdraw_setfontstyle|imagickdraw_setfontweight|imagickdraw_setgravity|imagickdraw_setstrokealpha|imagickdraw_setstrokeantialias|' +
        'imagickdraw_setstrokecolor|imagickdraw_setstrokedasharray|imagickdraw_setstrokedashoffset|imagickdraw_setstrokelinecap|' +
        'imagickdraw_setstrokelinejoin|imagickdraw_setstrokemiterlimit|imagickdraw_setstrokeopacity|imagickdraw_setstrokepatternurl|' +
        'imagickdraw_setstrokewidth|imagickdraw_settextalignment|imagickdraw_settextantialias|imagickdraw_settextdecoration|' +
        'imagickdraw_settextencoding|imagickdraw_settextundercolor|imagickdraw_setvectorgraphics|imagickdraw_setviewbox|imagickdraw_skewx|' +
        'imagickdraw_skewy|imagickdraw_translate|imagickpixel|imagickpixel_clear|imagickpixel_construct|imagickpixel_destroy|imagickpixel_getcolor|' +
        'imagickpixel_getcolorasstring|imagickpixel_getcolorcount|imagickpixel_getcolorvalue|imagickpixel_gethsl|imagickpixel_issimilar|' +
        'imagickpixel_setcolor|imagickpixel_setcolorvalue|imagickpixel_sethsl|imagickpixeliterator|imagickpixeliterator_clear|' +
        'imagickpixeliterator_construct|imagickpixeliterator_destroy|imagickpixeliterator_getcurrentiteratorrow|' +
        'imagickpixeliterator_getiteratorrow|imagickpixeliterator_getnextiteratorrow|imagickpixeliterator_getpreviousiteratorrow|' +
        'imagickpixeliterator_newpixeliterator|imagickpixeliterator_newpixelregioniterator|imagickpixeliterator_resetiterator|' +
        'imagickpixeliterator_setiteratorfirstrow|imagickpixeliterator_setiteratorlastrow|imagickpixeliterator_setiteratorrow|' +
        'imagickpixeliterator_synciterator|imap_8bit|imap_alerts|imap_append|imap_base64|imap_binary|imap_body|imap_bodystruct|imap_check|' +
        'imap_clearflag_full|imap_close|imap_create|imap_createmailbox|imap_delete|imap_deletemailbox|imap_errors|imap_expunge|imap_fetch_overview|' +
        'imap_fetchbody|imap_fetchheader|imap_fetchmime|imap_fetchstructure|imap_fetchtext|imap_gc|imap_get_quota|imap_get_quotaroot|imap_getacl|' +
        'imap_getmailboxes|imap_getsubscribed|imap_header|imap_headerinfo|imap_headers|imap_last_error|imap_list|imap_listmailbox|imap_listscan|' +
        'imap_listsubscribed|imap_lsub|imap_mail|imap_mail_compose|imap_mail_copy|imap_mail_move|imap_mailboxmsginfo|imap_mime_header_decode|' +
        'imap_msgno|imap_num_msg|imap_num_recent|imap_open|imap_ping|imap_qprint|imap_rename|imap_renamemailbox|imap_reopen|' +
        'imap_rfc822_parse_adrlist|imap_rfc822_parse_headers|imap_rfc822_write_address|imap_savebody|imap_scan|imap_scanmailbox|imap_search|' +
        'imap_set_quota|imap_setacl|imap_setflag_full|imap_sort|imap_status|imap_subscribe|imap_thread|imap_timeout|imap_uid|imap_undelete|' +
        'imap_unsubscribe|imap_utf7_decode|imap_utf7_encode|imap_utf8|implementsinterface|implode|import_request_variables|in_array|include|' +
        'include_once|inclued_get_data|inet_ntop|inet_pton|infiniteiterator|ingres_autocommit|ingres_autocommit_state|ingres_charset|ingres_close|' +
        'ingres_commit|ingres_connect|ingres_cursor|ingres_errno|ingres_error|ingres_errsqlstate|ingres_escape_string|ingres_execute|' +
        'ingres_fetch_array|ingres_fetch_assoc|ingres_fetch_object|ingres_fetch_proc_return|ingres_fetch_row|ingres_field_length|ingres_field_name|' +
        'ingres_field_nullable|ingres_field_precision|ingres_field_scale|ingres_field_type|ingres_free_result|ingres_next_error|ingres_num_fields|' +
        'ingres_num_rows|ingres_pconnect|ingres_prepare|ingres_query|ingres_result_seek|ingres_rollback|ingres_set_environment|' +
        'ingres_unbuffered_query|ini_alter|ini_get|ini_get_all|ini_restore|ini_set|innamespace|inotify_add_watch|inotify_init|inotify_queue_len|' +
        'inotify_read|inotify_rm_watch|interface_exists|intl_error_name|intl_get_error_code|intl_get_error_message|intl_is_failure|' +
        'intldateformatter|intval|invalidargumentexception|invoke|invokeargs|ip2long|iptcembed|iptcparse|is_a|is_array|is_bool|is_callable|is_dir|' +
        'is_double|is_executable|is_file|is_finite|is_float|is_infinite|is_int|is_integer|is_link|is_long|is_nan|is_null|is_numeric|is_object|' +
        'is_readable|is_real|is_resource|is_scalar|is_soap_fault|is_string|is_subclass_of|is_uploaded_file|is_writable|is_writeable|isabstract|' +
        'iscloneable|isdisabled|isfinal|isinstance|isinstantiable|isinterface|isinternal|isiterateable|isset|issubclassof|isuserdefined|iterator|' +
        'iterator_apply|iterator_count|iterator_to_array|iteratoraggregate|iteratoriterator|java_last_exception_clear|java_last_exception_get|' +
        'jddayofweek|jdmonthname|jdtofrench|jdtogregorian|jdtojewish|jdtojulian|jdtounix|jewishtojd|join|jpeg2wbmp|json_decode|json_encode|' +
        'json_last_error|jsonserializable|judy|judy_type|judy_version|juliantojd|kadm5_chpass_principal|kadm5_create_principal|' +
        'kadm5_delete_principal|kadm5_destroy|kadm5_flush|kadm5_get_policies|kadm5_get_principal|kadm5_get_principals|kadm5_init_with_password|' +
        'kadm5_modify_principal|key|krsort|ksort|lcfirst|lcg_value|lchgrp|lchown|ldap_8859_to_t61|ldap_add|ldap_bind|ldap_close|ldap_compare|' +
        'ldap_connect|ldap_count_entries|ldap_delete|ldap_dn2ufn|ldap_err2str|ldap_errno|ldap_error|ldap_explode_dn|ldap_first_attribute|' +
        'ldap_first_entry|ldap_first_reference|ldap_free_result|ldap_get_attributes|ldap_get_dn|ldap_get_entries|ldap_get_option|ldap_get_values|' +
        'ldap_get_values_len|ldap_list|ldap_mod_add|ldap_mod_del|ldap_mod_replace|ldap_modify|ldap_next_attribute|ldap_next_entry|' +
        'ldap_next_reference|ldap_parse_reference|ldap_parse_result|ldap_read|ldap_rename|ldap_sasl_bind|ldap_search|ldap_set_option|' +
        'ldap_set_rebind_proc|ldap_sort|ldap_start_tls|ldap_t61_to_8859|ldap_unbind|lengthexception|levenshtein|libxml_clear_errors|' +
        'libxml_disable_entity_loader|libxml_get_errors|libxml_get_last_error|libxml_set_streams_context|libxml_use_internal_errors|libxmlerror|' +
        'limititerator|link|linkinfo|list|locale|localeconv|localtime|log|log10|log1p|logicexception|long2ip|lstat|ltrim|lzf_compress|' +
        'lzf_decompress|lzf_optimized_for|m_checkstatus|m_completeauthorizations|m_connect|m_connectionerror|m_deletetrans|m_destroyconn|' +
        'm_destroyengine|m_getcell|m_getcellbynum|m_getcommadelimited|m_getheader|m_initconn|m_initengine|m_iscommadelimited|m_maxconntimeout|' +
        'm_monitor|m_numcolumns|m_numrows|m_parsecommadelimited|m_responsekeys|m_responseparam|m_returnstatus|m_setblocking|m_setdropfile|m_setip|' +
        'm_setssl|m_setssl_cafile|m_setssl_files|m_settimeout|m_sslcert_gen_hash|m_transactionssent|m_transinqueue|m_transkeyval|m_transnew|' +
        'm_transsend|m_uwait|m_validateidentifier|m_verifyconnection|m_verifysslcert|magic_quotes_runtime|mail|' +
        'mailparse_determine_best_xfer_encoding|mailparse_msg_create|mailparse_msg_extract_part|mailparse_msg_extract_part_file|' +
        'mailparse_msg_extract_whole_part_file|mailparse_msg_free|mailparse_msg_get_part|mailparse_msg_get_part_data|mailparse_msg_get_structure|' +
        'mailparse_msg_parse|mailparse_msg_parse_file|mailparse_rfc822_parse_addresses|mailparse_stream_encode|mailparse_uudecode_all|main|max|' +
        'maxdb_affected_rows|maxdb_autocommit|maxdb_bind_param|maxdb_bind_result|maxdb_change_user|maxdb_character_set_name|maxdb_client_encoding|' +
        'maxdb_close|maxdb_close_long_data|maxdb_commit|maxdb_connect|maxdb_connect_errno|maxdb_connect_error|maxdb_data_seek|maxdb_debug|' +
        'maxdb_disable_reads_from_master|maxdb_disable_rpl_parse|maxdb_dump_debug_info|maxdb_embedded_connect|maxdb_enable_reads_from_master|' +
        'maxdb_enable_rpl_parse|maxdb_errno|maxdb_error|maxdb_escape_string|maxdb_execute|maxdb_fetch|maxdb_fetch_array|maxdb_fetch_assoc|' +
        'maxdb_fetch_field|maxdb_fetch_field_direct|maxdb_fetch_fields|maxdb_fetch_lengths|maxdb_fetch_object|maxdb_fetch_row|maxdb_field_count|' +
        'maxdb_field_seek|maxdb_field_tell|maxdb_free_result|maxdb_get_client_info|maxdb_get_client_version|maxdb_get_host_info|maxdb_get_metadata|' +
        'maxdb_get_proto_info|maxdb_get_server_info|maxdb_get_server_version|maxdb_info|maxdb_init|maxdb_insert_id|maxdb_kill|maxdb_master_query|' +
        'maxdb_more_results|maxdb_multi_query|maxdb_next_result|maxdb_num_fields|maxdb_num_rows|maxdb_options|maxdb_param_count|maxdb_ping|' +
        'maxdb_prepare|maxdb_query|maxdb_real_connect|maxdb_real_escape_string|maxdb_real_query|maxdb_report|maxdb_rollback|' +
        'maxdb_rpl_parse_enabled|maxdb_rpl_probe|maxdb_rpl_query_type|maxdb_select_db|maxdb_send_long_data|maxdb_send_query|maxdb_server_end|' +
        'maxdb_server_init|maxdb_set_opt|maxdb_sqlstate|maxdb_ssl_set|maxdb_stat|maxdb_stmt_affected_rows|maxdb_stmt_bind_param|' +
        'maxdb_stmt_bind_result|maxdb_stmt_close|maxdb_stmt_close_long_data|maxdb_stmt_data_seek|maxdb_stmt_errno|maxdb_stmt_error|' +
        'maxdb_stmt_execute|maxdb_stmt_fetch|maxdb_stmt_free_result|maxdb_stmt_init|maxdb_stmt_num_rows|maxdb_stmt_param_count|maxdb_stmt_prepare|' +
        'maxdb_stmt_reset|maxdb_stmt_result_metadata|maxdb_stmt_send_long_data|maxdb_stmt_sqlstate|maxdb_stmt_store_result|maxdb_store_result|' +
        'maxdb_thread_id|maxdb_thread_safe|maxdb_use_result|maxdb_warning_count|mb_check_encoding|mb_convert_case|mb_convert_encoding|' +
        'mb_convert_kana|mb_convert_variables|mb_decode_mimeheader|mb_decode_numericentity|mb_detect_encoding|mb_detect_order|mb_encode_mimeheader|' +
        'mb_encode_numericentity|mb_encoding_aliases|mb_ereg|mb_ereg_match|mb_ereg_replace|mb_ereg_search|mb_ereg_search_getpos|' +
        'mb_ereg_search_getregs|mb_ereg_search_init|mb_ereg_search_pos|mb_ereg_search_regs|mb_ereg_search_setpos|mb_eregi|mb_eregi_replace|' +
        'mb_get_info|mb_http_input|mb_http_output|mb_internal_encoding|mb_language|mb_list_encodings|mb_output_handler|mb_parse_str|' +
        'mb_preferred_mime_name|mb_regex_encoding|mb_regex_set_options|mb_send_mail|mb_split|mb_strcut|mb_strimwidth|mb_stripos|mb_stristr|' +
        'mb_strlen|mb_strpos|mb_strrchr|mb_strrichr|mb_strripos|mb_strrpos|mb_strstr|mb_strtolower|mb_strtoupper|mb_strwidth|' +
        'mb_substitute_character|mb_substr|mb_substr_count|mcrypt_cbc|mcrypt_cfb|mcrypt_create_iv|mcrypt_decrypt|mcrypt_ecb|' +
        'mcrypt_enc_get_algorithms_name|mcrypt_enc_get_block_size|mcrypt_enc_get_iv_size|mcrypt_enc_get_key_size|mcrypt_enc_get_modes_name|' +
        'mcrypt_enc_get_supported_key_sizes|mcrypt_enc_is_block_algorithm|mcrypt_enc_is_block_algorithm_mode|mcrypt_enc_is_block_mode|' +
        'mcrypt_enc_self_test|mcrypt_encrypt|mcrypt_generic|mcrypt_generic_deinit|mcrypt_generic_end|mcrypt_generic_init|mcrypt_get_block_size|' +
        'mcrypt_get_cipher_name|mcrypt_get_iv_size|mcrypt_get_key_size|mcrypt_list_algorithms|mcrypt_list_modes|mcrypt_module_close|' +
        'mcrypt_module_get_algo_block_size|mcrypt_module_get_algo_key_size|mcrypt_module_get_supported_key_sizes|mcrypt_module_is_block_algorithm|' +
        'mcrypt_module_is_block_algorithm_mode|mcrypt_module_is_block_mode|mcrypt_module_open|mcrypt_module_self_test|mcrypt_ofb|md5|md5_file|' +
        'mdecrypt_generic|memcache|memcache_debug|memcached|memory_get_peak_usage|memory_get_usage|messageformatter|metaphone|method_exists|mhash|' +
        'mhash_count|mhash_get_block_size|mhash_get_hash_name|mhash_keygen_s2k|microtime|mime_content_type|min|ming_keypress|' +
        'ming_setcubicthreshold|ming_setscale|ming_setswfcompression|ming_useconstants|ming_useswfversion|mkdir|mktime|money_format|mongo|' +
        'mongobindata|mongocode|mongocollection|mongoconnectionexception|mongocursor|mongocursorexception|mongocursortimeoutexception|mongodate|' +
        'mongodb|mongodbref|mongoexception|mongogridfs|mongogridfscursor|mongogridfsexception|mongogridfsfile|mongoid|mongoint32|mongoint64|' +
        'mongomaxkey|mongominkey|mongoregex|mongotimestamp|move_uploaded_file|mpegfile|mqseries_back|mqseries_begin|mqseries_close|mqseries_cmit|' +
        'mqseries_conn|mqseries_connx|mqseries_disc|mqseries_get|mqseries_inq|mqseries_open|mqseries_put|mqseries_put1|mqseries_set|' +
        'mqseries_strerror|msession_connect|msession_count|msession_create|msession_destroy|msession_disconnect|msession_find|msession_get|' +
        'msession_get_array|msession_get_data|msession_inc|msession_list|msession_listvar|msession_lock|msession_plugin|msession_randstr|' +
        'msession_set|msession_set_array|msession_set_data|msession_timeout|msession_uniq|msession_unlock|msg_get_queue|msg_queue_exists|' +
        'msg_receive|msg_remove_queue|msg_send|msg_set_queue|msg_stat_queue|msql|msql_affected_rows|msql_close|msql_connect|msql_create_db|' +
        'msql_createdb|msql_data_seek|msql_db_query|msql_dbname|msql_drop_db|msql_error|msql_fetch_array|msql_fetch_field|msql_fetch_object|' +
        'msql_fetch_row|msql_field_flags|msql_field_len|msql_field_name|msql_field_seek|msql_field_table|msql_field_type|msql_fieldflags|' +
        'msql_fieldlen|msql_fieldname|msql_fieldtable|msql_fieldtype|msql_free_result|msql_list_dbs|msql_list_fields|msql_list_tables|' +
        'msql_num_fields|msql_num_rows|msql_numfields|msql_numrows|msql_pconnect|msql_query|msql_regcase|msql_result|msql_select_db|msql_tablename|' +
        'mssql_bind|mssql_close|mssql_connect|mssql_data_seek|mssql_execute|mssql_fetch_array|mssql_fetch_assoc|mssql_fetch_batch|' +
        'mssql_fetch_field|mssql_fetch_object|mssql_fetch_row|mssql_field_length|mssql_field_name|mssql_field_seek|mssql_field_type|' +
        'mssql_free_result|mssql_free_statement|mssql_get_last_message|mssql_guid_string|mssql_init|mssql_min_error_severity|' +
        'mssql_min_message_severity|mssql_next_result|mssql_num_fields|mssql_num_rows|mssql_pconnect|mssql_query|mssql_result|mssql_rows_affected|' +
        'mssql_select_db|mt_getrandmax|mt_rand|mt_srand|multipleiterator|mysql_affected_rows|mysql_client_encoding|mysql_close|mysql_connect|' +
        'mysql_create_db|mysql_data_seek|mysql_db_name|mysql_db_query|mysql_drop_db|mysql_errno|mysql_error|mysql_escape_string|mysql_fetch_array|' +
        'mysql_fetch_assoc|mysql_fetch_field|mysql_fetch_lengths|mysql_fetch_object|mysql_fetch_row|mysql_field_flags|mysql_field_len|' +
        'mysql_field_name|mysql_field_seek|mysql_field_table|mysql_field_type|mysql_free_result|mysql_get_client_info|mysql_get_host_info|' +
        'mysql_get_proto_info|mysql_get_server_info|mysql_info|mysql_insert_id|mysql_list_dbs|mysql_list_fields|mysql_list_processes|' +
        'mysql_list_tables|mysql_num_fields|mysql_num_rows|mysql_pconnect|mysql_ping|mysql_query|mysql_real_escape_string|mysql_result|' +
        'mysql_select_db|mysql_set_charset|mysql_stat|mysql_tablename|mysql_thread_id|mysql_unbuffered_query|mysqli|mysqli_bind_param|' +
        'mysqli_bind_result|mysqli_client_encoding|mysqli_connect|mysqli_disable_reads_from_master|mysqli_disable_rpl_parse|mysqli_driver|' +
        'mysqli_enable_reads_from_master|mysqli_enable_rpl_parse|mysqli_escape_string|mysqli_execute|mysqli_fetch|mysqli_get_metadata|' +
        'mysqli_master_query|mysqli_param_count|mysqli_report|mysqli_result|mysqli_rpl_parse_enabled|mysqli_rpl_probe|mysqli_rpl_query_type|' +
        'mysqli_send_long_data|mysqli_send_query|mysqli_set_opt|mysqli_slave_query|mysqli_stmt|mysqli_warning|mysqlnd_ms_get_stats|' +
        'mysqlnd_ms_query_is_select|mysqlnd_ms_set_user_pick_server|mysqlnd_qc_change_handler|mysqlnd_qc_clear_cache|mysqlnd_qc_get_cache_info|' +
        'mysqlnd_qc_get_core_stats|mysqlnd_qc_get_handler|mysqlnd_qc_get_query_trace_log|mysqlnd_qc_set_user_handlers|natcasesort|natsort|' +
        'ncurses_addch|ncurses_addchnstr|ncurses_addchstr|ncurses_addnstr|ncurses_addstr|ncurses_assume_default_colors|ncurses_attroff|' +
        'ncurses_attron|ncurses_attrset|ncurses_baudrate|ncurses_beep|ncurses_bkgd|ncurses_bkgdset|ncurses_border|ncurses_bottom_panel|' +
        'ncurses_can_change_color|ncurses_cbreak|ncurses_clear|ncurses_clrtobot|ncurses_clrtoeol|ncurses_color_content|ncurses_color_set|' +
        'ncurses_curs_set|ncurses_def_prog_mode|ncurses_def_shell_mode|ncurses_define_key|ncurses_del_panel|ncurses_delay_output|ncurses_delch|' +
        'ncurses_deleteln|ncurses_delwin|ncurses_doupdate|ncurses_echo|ncurses_echochar|ncurses_end|ncurses_erase|ncurses_erasechar|ncurses_filter|' +
        'ncurses_flash|ncurses_flushinp|ncurses_getch|ncurses_getmaxyx|ncurses_getmouse|ncurses_getyx|ncurses_halfdelay|ncurses_has_colors|' +
        'ncurses_has_ic|ncurses_has_il|ncurses_has_key|ncurses_hide_panel|ncurses_hline|ncurses_inch|ncurses_init|ncurses_init_color|' +
        'ncurses_init_pair|ncurses_insch|ncurses_insdelln|ncurses_insertln|ncurses_insstr|ncurses_instr|ncurses_isendwin|ncurses_keyok|' +
        'ncurses_keypad|ncurses_killchar|ncurses_longname|ncurses_meta|ncurses_mouse_trafo|ncurses_mouseinterval|ncurses_mousemask|ncurses_move|' +
        'ncurses_move_panel|ncurses_mvaddch|ncurses_mvaddchnstr|ncurses_mvaddchstr|ncurses_mvaddnstr|ncurses_mvaddstr|ncurses_mvcur|' +
        'ncurses_mvdelch|ncurses_mvgetch|ncurses_mvhline|ncurses_mvinch|ncurses_mvvline|ncurses_mvwaddstr|ncurses_napms|ncurses_new_panel|' +
        'ncurses_newpad|ncurses_newwin|ncurses_nl|ncurses_nocbreak|ncurses_noecho|ncurses_nonl|ncurses_noqiflush|ncurses_noraw|' +
        'ncurses_pair_content|ncurses_panel_above|ncurses_panel_below|ncurses_panel_window|ncurses_pnoutrefresh|ncurses_prefresh|ncurses_putp|' +
        'ncurses_qiflush|ncurses_raw|ncurses_refresh|ncurses_replace_panel|ncurses_reset_prog_mode|ncurses_reset_shell_mode|ncurses_resetty|' +
        'ncurses_savetty|ncurses_scr_dump|ncurses_scr_init|ncurses_scr_restore|ncurses_scr_set|ncurses_scrl|ncurses_show_panel|ncurses_slk_attr|' +
        'ncurses_slk_attroff|ncurses_slk_attron|ncurses_slk_attrset|ncurses_slk_clear|ncurses_slk_color|ncurses_slk_init|ncurses_slk_noutrefresh|' +
        'ncurses_slk_refresh|ncurses_slk_restore|ncurses_slk_set|ncurses_slk_touch|ncurses_standend|ncurses_standout|ncurses_start_color|' +
        'ncurses_termattrs|ncurses_termname|ncurses_timeout|ncurses_top_panel|ncurses_typeahead|ncurses_ungetch|ncurses_ungetmouse|' +
        'ncurses_update_panels|ncurses_use_default_colors|ncurses_use_env|ncurses_use_extended_names|ncurses_vidattr|ncurses_vline|ncurses_waddch|' +
        'ncurses_waddstr|ncurses_wattroff|ncurses_wattron|ncurses_wattrset|ncurses_wborder|ncurses_wclear|ncurses_wcolor_set|ncurses_werase|' +
        'ncurses_wgetch|ncurses_whline|ncurses_wmouse_trafo|ncurses_wmove|ncurses_wnoutrefresh|ncurses_wrefresh|ncurses_wstandend|' +
        'ncurses_wstandout|ncurses_wvline|newinstance|newinstanceargs|newt_bell|newt_button|newt_button_bar|newt_centered_window|newt_checkbox|' +
        'newt_checkbox_get_value|newt_checkbox_set_flags|newt_checkbox_set_value|newt_checkbox_tree|newt_checkbox_tree_add_item|' +
        'newt_checkbox_tree_find_item|newt_checkbox_tree_get_current|newt_checkbox_tree_get_entry_value|newt_checkbox_tree_get_multi_selection|' +
        'newt_checkbox_tree_get_selection|newt_checkbox_tree_multi|newt_checkbox_tree_set_current|newt_checkbox_tree_set_entry|' +
        'newt_checkbox_tree_set_entry_value|newt_checkbox_tree_set_width|newt_clear_key_buffer|newt_cls|newt_compact_button|' +
        'newt_component_add_callback|newt_component_takes_focus|newt_create_grid|newt_cursor_off|newt_cursor_on|newt_delay|newt_draw_form|' +
        'newt_draw_root_text|newt_entry|newt_entry_get_value|newt_entry_set|newt_entry_set_filter|newt_entry_set_flags|newt_finished|newt_form|' +
        'newt_form_add_component|newt_form_add_components|newt_form_add_hot_key|newt_form_destroy|newt_form_get_current|newt_form_run|' +
        'newt_form_set_background|newt_form_set_height|newt_form_set_size|newt_form_set_timer|newt_form_set_width|newt_form_watch_fd|' +
        'newt_get_screen_size|newt_grid_add_components_to_form|newt_grid_basic_window|newt_grid_free|newt_grid_get_size|newt_grid_h_close_stacked|' +
        'newt_grid_h_stacked|newt_grid_place|newt_grid_set_field|newt_grid_simple_window|newt_grid_v_close_stacked|newt_grid_v_stacked|' +
        'newt_grid_wrapped_window|newt_grid_wrapped_window_at|newt_init|newt_label|newt_label_set_text|newt_listbox|newt_listbox_append_entry|' +
        'newt_listbox_clear|newt_listbox_clear_selection|newt_listbox_delete_entry|newt_listbox_get_current|newt_listbox_get_selection|' +
        'newt_listbox_insert_entry|newt_listbox_item_count|newt_listbox_select_item|newt_listbox_set_current|newt_listbox_set_current_by_key|' +
        'newt_listbox_set_data|newt_listbox_set_entry|newt_listbox_set_width|newt_listitem|newt_listitem_get_data|newt_listitem_set|' +
        'newt_open_window|newt_pop_help_line|newt_pop_window|newt_push_help_line|newt_radio_get_current|newt_radiobutton|newt_redraw_help_line|' +
        'newt_reflow_text|newt_refresh|newt_resize_screen|newt_resume|newt_run_form|newt_scale|newt_scale_set|newt_scrollbar_set|' +
        'newt_set_help_callback|newt_set_suspend_callback|newt_suspend|newt_textbox|newt_textbox_get_num_lines|newt_textbox_reflowed|' +
        'newt_textbox_set_height|newt_textbox_set_text|newt_vertical_scrollbar|newt_wait_for_key|newt_win_choice|newt_win_entries|newt_win_menu|' +
        'newt_win_message|newt_win_messagev|newt_win_ternary|next|ngettext|nl2br|nl_langinfo|norewinditerator|normalizer|notes_body|notes_copy_db|' +
        'notes_create_db|notes_create_note|notes_drop_db|notes_find_note|notes_header_info|notes_list_msgs|notes_mark_read|notes_mark_unread|' +
        'notes_nav_create|notes_search|notes_unread|notes_version|nsapi_request_headers|nsapi_response_headers|nsapi_virtual|nthmac|number_format|' +
        'numberformatter|oauth|oauth_get_sbs|oauth_urlencode|oauthexception|oauthprovider|ob_clean|ob_deflatehandler|ob_end_clean|ob_end_flush|' +
        'ob_etaghandler|ob_flush|ob_get_clean|ob_get_contents|ob_get_flush|ob_get_length|ob_get_level|ob_get_status|ob_gzhandler|ob_iconv_handler|' +
        'ob_implicit_flush|ob_inflatehandler|ob_list_handlers|ob_start|ob_tidyhandler|oci_bind_array_by_name|oci_bind_by_name|oci_cancel|' +
        'oci_client_version|oci_close|oci_collection_append|oci_collection_assign|oci_collection_element_assign|oci_collection_element_get|' +
        'oci_collection_free|oci_collection_max|oci_collection_size|oci_collection_trim|oci_commit|oci_connect|oci_define_by_name|oci_error|' +
        'oci_execute|oci_fetch|oci_fetch_all|oci_fetch_array|oci_fetch_assoc|oci_fetch_object|oci_fetch_row|oci_field_is_null|oci_field_name|' +
        'oci_field_precision|oci_field_scale|oci_field_size|oci_field_type|oci_field_type_raw|oci_free_statement|oci_internal_debug|oci_lob_append|' +
        'oci_lob_close|oci_lob_copy|oci_lob_eof|oci_lob_erase|oci_lob_export|oci_lob_flush|oci_lob_free|oci_lob_getbuffering|oci_lob_import|' +
        'oci_lob_is_equal|oci_lob_load|oci_lob_read|oci_lob_rewind|oci_lob_save|oci_lob_savefile|oci_lob_seek|oci_lob_setbuffering|oci_lob_size|' +
        'oci_lob_tell|oci_lob_truncate|oci_lob_write|oci_lob_writetemporary|oci_lob_writetofile|oci_new_collection|oci_new_connect|oci_new_cursor|' +
        'oci_new_descriptor|oci_num_fields|oci_num_rows|oci_parse|oci_password_change|oci_pconnect|oci_result|oci_rollback|oci_server_version|' +
        'oci_set_action|oci_set_client_identifier|oci_set_client_info|oci_set_edition|oci_set_module_name|oci_set_prefetch|oci_statement_type|' +
        'ocibindbyname|ocicancel|ocicloselob|ocicollappend|ocicollassign|ocicollassignelem|ocicollgetelem|ocicollmax|ocicollsize|ocicolltrim|' +
        'ocicolumnisnull|ocicolumnname|ocicolumnprecision|ocicolumnscale|ocicolumnsize|ocicolumntype|ocicolumntyperaw|ocicommit|ocidefinebyname|' +
        'ocierror|ociexecute|ocifetch|ocifetchinto|ocifetchstatement|ocifreecollection|ocifreecursor|ocifreedesc|ocifreestatement|ociinternaldebug|' +
        'ociloadlob|ocilogoff|ocilogon|ocinewcollection|ocinewcursor|ocinewdescriptor|ocinlogon|ocinumcols|ociparse|ociplogon|ociresult|' +
        'ocirollback|ocirowcount|ocisavelob|ocisavelobfile|ociserverversion|ocisetprefetch|ocistatementtype|ociwritelobtofile|ociwritetemporarylob|' +
        'octdec|odbc_autocommit|odbc_binmode|odbc_close|odbc_close_all|odbc_columnprivileges|odbc_columns|odbc_commit|odbc_connect|odbc_cursor|' +
        'odbc_data_source|odbc_do|odbc_error|odbc_errormsg|odbc_exec|odbc_execute|odbc_fetch_array|odbc_fetch_into|odbc_fetch_object|' +
        'odbc_fetch_row|odbc_field_len|odbc_field_name|odbc_field_num|odbc_field_precision|odbc_field_scale|odbc_field_type|odbc_foreignkeys|' +
        'odbc_free_result|odbc_gettypeinfo|odbc_longreadlen|odbc_next_result|odbc_num_fields|odbc_num_rows|odbc_pconnect|odbc_prepare|' +
        'odbc_primarykeys|odbc_procedurecolumns|odbc_procedures|odbc_result|odbc_result_all|odbc_rollback|odbc_setoption|odbc_specialcolumns|' +
        'odbc_statistics|odbc_tableprivileges|odbc_tables|openal_buffer_create|openal_buffer_data|openal_buffer_destroy|openal_buffer_get|' +
        'openal_buffer_loadwav|openal_context_create|openal_context_current|openal_context_destroy|openal_context_process|openal_context_suspend|' +
        'openal_device_close|openal_device_open|openal_listener_get|openal_listener_set|openal_source_create|openal_source_destroy|' +
        'openal_source_get|openal_source_pause|openal_source_play|openal_source_rewind|openal_source_set|openal_source_stop|openal_stream|opendir|' +
        'openlog|openssl_cipher_iv_length|openssl_csr_export|openssl_csr_export_to_file|openssl_csr_get_public_key|openssl_csr_get_subject|' +
        'openssl_csr_new|openssl_csr_sign|openssl_decrypt|openssl_dh_compute_key|openssl_digest|openssl_encrypt|openssl_error_string|' +
        'openssl_free_key|openssl_get_cipher_methods|openssl_get_md_methods|openssl_get_privatekey|openssl_get_publickey|openssl_open|' +
        'openssl_pkcs12_export|openssl_pkcs12_export_to_file|openssl_pkcs12_read|openssl_pkcs7_decrypt|openssl_pkcs7_encrypt|openssl_pkcs7_sign|' +
        'openssl_pkcs7_verify|openssl_pkey_export|openssl_pkey_export_to_file|openssl_pkey_free|openssl_pkey_get_details|openssl_pkey_get_private|' +
        'openssl_pkey_get_public|openssl_pkey_new|openssl_private_decrypt|openssl_private_encrypt|openssl_public_decrypt|openssl_public_encrypt|' +
        'openssl_random_pseudo_bytes|openssl_seal|openssl_sign|openssl_verify|openssl_x509_check_private_key|openssl_x509_checkpurpose|' +
        'openssl_x509_export|openssl_x509_export_to_file|openssl_x509_free|openssl_x509_parse|openssl_x509_read|ord|outeriterator|' +
        'outofboundsexception|outofrangeexception|output_add_rewrite_var|output_reset_rewrite_vars|overflowexception|overload|override_function|' +
        'ovrimos_close|ovrimos_commit|ovrimos_connect|ovrimos_cursor|ovrimos_exec|ovrimos_execute|ovrimos_fetch_into|ovrimos_fetch_row|' +
        'ovrimos_field_len|ovrimos_field_name|ovrimos_field_num|ovrimos_field_type|ovrimos_free_result|ovrimos_longreadlen|ovrimos_num_fields|' +
        'ovrimos_num_rows|ovrimos_prepare|ovrimos_result|ovrimos_result_all|ovrimos_rollback|pack|parentiterator|parse_ini_file|parse_ini_string|' +
        'parse_str|parse_url|parsekit_compile_file|parsekit_compile_string|parsekit_func_arginfo|passthru|pathinfo|pclose|pcntl_alarm|pcntl_exec|' +
        'pcntl_fork|pcntl_getpriority|pcntl_setpriority|pcntl_signal|pcntl_signal_dispatch|pcntl_sigprocmask|pcntl_sigtimedwait|pcntl_sigwaitinfo|' +
        'pcntl_wait|pcntl_waitpid|pcntl_wexitstatus|pcntl_wifexited|pcntl_wifsignaled|pcntl_wifstopped|pcntl_wstopsig|pcntl_wtermsig|' +
        'pdf_activate_item|pdf_add_annotation|pdf_add_bookmark|pdf_add_launchlink|pdf_add_locallink|pdf_add_nameddest|pdf_add_note|pdf_add_outline|' +
        'pdf_add_pdflink|pdf_add_table_cell|pdf_add_textflow|pdf_add_thumbnail|pdf_add_weblink|pdf_arc|pdf_arcn|pdf_attach_file|pdf_begin_document|' +
        'pdf_begin_font|pdf_begin_glyph|pdf_begin_item|pdf_begin_layer|pdf_begin_page|pdf_begin_page_ext|pdf_begin_pattern|pdf_begin_template|' +
        'pdf_begin_template_ext|pdf_circle|pdf_clip|pdf_close|pdf_close_image|pdf_close_pdi|pdf_close_pdi_page|pdf_closepath|' +
        'pdf_closepath_fill_stroke|pdf_closepath_stroke|pdf_concat|pdf_continue_text|pdf_create_3dview|pdf_create_action|pdf_create_annotation|' +
        'pdf_create_bookmark|pdf_create_field|pdf_create_fieldgroup|pdf_create_gstate|pdf_create_pvf|pdf_create_textflow|pdf_curveto|' +
        'pdf_define_layer|pdf_delete|pdf_delete_pvf|pdf_delete_table|pdf_delete_textflow|pdf_encoding_set_char|pdf_end_document|pdf_end_font|' +
        'pdf_end_glyph|pdf_end_item|pdf_end_layer|pdf_end_page|pdf_end_page_ext|pdf_end_pattern|pdf_end_template|pdf_endpath|pdf_fill|' +
        'pdf_fill_imageblock|pdf_fill_pdfblock|pdf_fill_stroke|pdf_fill_textblock|pdf_findfont|pdf_fit_image|pdf_fit_pdi_page|pdf_fit_table|' +
        'pdf_fit_textflow|pdf_fit_textline|pdf_get_apiname|pdf_get_buffer|pdf_get_errmsg|pdf_get_errnum|pdf_get_font|pdf_get_fontname|' +
        'pdf_get_fontsize|pdf_get_image_height|pdf_get_image_width|pdf_get_majorversion|pdf_get_minorversion|pdf_get_parameter|' +
        'pdf_get_pdi_parameter|pdf_get_pdi_value|pdf_get_value|pdf_info_font|pdf_info_matchbox|pdf_info_table|pdf_info_textflow|pdf_info_textline|' +
        'pdf_initgraphics|pdf_lineto|pdf_load_3ddata|pdf_load_font|pdf_load_iccprofile|pdf_load_image|pdf_makespotcolor|pdf_moveto|pdf_new|' +
        'pdf_open_ccitt|pdf_open_file|pdf_open_gif|pdf_open_image|pdf_open_image_file|pdf_open_jpeg|pdf_open_memory_image|pdf_open_pdi|' +
        'pdf_open_pdi_document|pdf_open_pdi_page|pdf_open_tiff|pdf_pcos_get_number|pdf_pcos_get_stream|pdf_pcos_get_string|pdf_place_image|' +
        'pdf_place_pdi_page|pdf_process_pdi|pdf_rect|pdf_restore|pdf_resume_page|pdf_rotate|pdf_save|pdf_scale|pdf_set_border_color|' +
        'pdf_set_border_dash|pdf_set_border_style|pdf_set_char_spacing|pdf_set_duration|pdf_set_gstate|pdf_set_horiz_scaling|pdf_set_info|' +
        'pdf_set_info_author|pdf_set_info_creator|pdf_set_info_keywords|pdf_set_info_subject|pdf_set_info_title|pdf_set_layer_dependency|' +
        'pdf_set_leading|pdf_set_parameter|pdf_set_text_matrix|pdf_set_text_pos|pdf_set_text_rendering|pdf_set_text_rise|pdf_set_value|' +
        'pdf_set_word_spacing|pdf_setcolor|pdf_setdash|pdf_setdashpattern|pdf_setflat|pdf_setfont|pdf_setgray|pdf_setgray_fill|pdf_setgray_stroke|' +
        'pdf_setlinecap|pdf_setlinejoin|pdf_setlinewidth|pdf_setmatrix|pdf_setmiterlimit|pdf_setpolydash|pdf_setrgbcolor|pdf_setrgbcolor_fill|' +
        'pdf_setrgbcolor_stroke|pdf_shading|pdf_shading_pattern|pdf_shfill|pdf_show|pdf_show_boxed|pdf_show_xy|pdf_skew|pdf_stringwidth|pdf_stroke|' +
        'pdf_suspend_page|pdf_translate|pdf_utf16_to_utf8|pdf_utf32_to_utf16|pdf_utf8_to_utf16|pdo|pdo_cubrid_schema|pdo_pgsqllobcreate|' +
        'pdo_pgsqllobopen|pdo_pgsqllobunlink|pdo_sqlitecreateaggregate|pdo_sqlitecreatefunction|pdoexception|pdostatement|pfsockopen|' +
        'pg_affected_rows|pg_cancel_query|pg_client_encoding|pg_close|pg_connect|pg_connection_busy|pg_connection_reset|pg_connection_status|' +
        'pg_convert|pg_copy_from|pg_copy_to|pg_dbname|pg_delete|pg_end_copy|pg_escape_bytea|pg_escape_string|pg_execute|pg_fetch_all|' +
        'pg_fetch_all_columns|pg_fetch_array|pg_fetch_assoc|pg_fetch_object|pg_fetch_result|pg_fetch_row|pg_field_is_null|pg_field_name|' +
        'pg_field_num|pg_field_prtlen|pg_field_size|pg_field_table|pg_field_type|pg_field_type_oid|pg_free_result|pg_get_notify|pg_get_pid|' +
        'pg_get_result|pg_host|pg_insert|pg_last_error|pg_last_notice|pg_last_oid|pg_lo_close|pg_lo_create|pg_lo_export|pg_lo_import|pg_lo_open|' +
        'pg_lo_read|pg_lo_read_all|pg_lo_seek|pg_lo_tell|pg_lo_unlink|pg_lo_write|pg_meta_data|pg_num_fields|pg_num_rows|pg_options|' +
        'pg_parameter_status|pg_pconnect|pg_ping|pg_port|pg_prepare|pg_put_line|pg_query|pg_query_params|pg_result_error|pg_result_error_field|' +
        'pg_result_seek|pg_result_status|pg_select|pg_send_execute|pg_send_prepare|pg_send_query|pg_send_query_params|pg_set_client_encoding|' +
        'pg_set_error_verbosity|pg_trace|pg_transaction_status|pg_tty|pg_unescape_bytea|pg_untrace|pg_update|pg_version|php_check_syntax|' +
        'php_ini_loaded_file|php_ini_scanned_files|php_logo_guid|php_sapi_name|php_strip_whitespace|php_uname|phpcredits|phpinfo|phpversion|pi|' +
        'png2wbmp|popen|pos|posix_access|posix_ctermid|posix_errno|posix_get_last_error|posix_getcwd|posix_getegid|posix_geteuid|posix_getgid|' +
        'posix_getgrgid|posix_getgrnam|posix_getgroups|posix_getlogin|posix_getpgid|posix_getpgrp|posix_getpid|posix_getppid|posix_getpwnam|' +
        'posix_getpwuid|posix_getrlimit|posix_getsid|posix_getuid|posix_initgroups|posix_isatty|posix_kill|posix_mkfifo|posix_mknod|posix_setegid|' +
        'posix_seteuid|posix_setgid|posix_setpgid|posix_setsid|posix_setuid|posix_strerror|posix_times|posix_ttyname|posix_uname|pow|preg_filter|' +
        'preg_grep|preg_last_error|preg_match|preg_match_all|preg_quote|preg_replace|preg_replace_callback|preg_split|prev|print|print_r|' +
        'printer_abort|printer_close|printer_create_brush|printer_create_dc|printer_create_font|printer_create_pen|printer_delete_brush|' +
        'printer_delete_dc|printer_delete_font|printer_delete_pen|printer_draw_bmp|printer_draw_chord|printer_draw_elipse|printer_draw_line|' +
        'printer_draw_pie|printer_draw_rectangle|printer_draw_roundrect|printer_draw_text|printer_end_doc|printer_end_page|printer_get_option|' +
        'printer_list|printer_logical_fontheight|printer_open|printer_select_brush|printer_select_font|printer_select_pen|printer_set_option|' +
        'printer_start_doc|printer_start_page|printer_write|printf|proc_close|proc_get_status|proc_nice|proc_open|proc_terminate|property_exists|' +
        'ps_add_bookmark|ps_add_launchlink|ps_add_locallink|ps_add_note|ps_add_pdflink|ps_add_weblink|ps_arc|ps_arcn|ps_begin_page|' +
        'ps_begin_pattern|ps_begin_template|ps_circle|ps_clip|ps_close|ps_close_image|ps_closepath|ps_closepath_stroke|ps_continue_text|ps_curveto|' +
        'ps_delete|ps_end_page|ps_end_pattern|ps_end_template|ps_fill|ps_fill_stroke|ps_findfont|ps_get_buffer|ps_get_parameter|ps_get_value|' +
        'ps_hyphenate|ps_include_file|ps_lineto|ps_makespotcolor|ps_moveto|ps_new|ps_open_file|ps_open_image|ps_open_image_file|' +
        'ps_open_memory_image|ps_place_image|ps_rect|ps_restore|ps_rotate|ps_save|ps_scale|ps_set_border_color|ps_set_border_dash|' +
        'ps_set_border_style|ps_set_info|ps_set_parameter|ps_set_text_pos|ps_set_value|ps_setcolor|ps_setdash|ps_setflat|ps_setfont|ps_setgray|' +
        'ps_setlinecap|ps_setlinejoin|ps_setlinewidth|ps_setmiterlimit|ps_setoverprintmode|ps_setpolydash|ps_shading|ps_shading_pattern|ps_shfill|' +
        'ps_show|ps_show2|ps_show_boxed|ps_show_xy|ps_show_xy2|ps_string_geometry|ps_stringwidth|ps_stroke|ps_symbol|ps_symbol_name|' +
        'ps_symbol_width|ps_translate|pspell_add_to_personal|pspell_add_to_session|pspell_check|pspell_clear_session|pspell_config_create|' +
        'pspell_config_data_dir|pspell_config_dict_dir|pspell_config_ignore|pspell_config_mode|pspell_config_personal|pspell_config_repl|' +
        'pspell_config_runtogether|pspell_config_save_repl|pspell_new|pspell_new_config|pspell_new_personal|pspell_save_wordlist|' +
        'pspell_store_replacement|pspell_suggest|putenv|px_close|px_create_fp|px_date2string|px_delete|px_delete_record|px_get_field|px_get_info|' +
        'px_get_parameter|px_get_record|px_get_schema|px_get_value|px_insert_record|px_new|px_numfields|px_numrecords|px_open_fp|px_put_record|' +
        'px_retrieve_record|px_set_blob_file|px_set_parameter|px_set_tablename|px_set_targetencoding|px_set_value|px_timestamp2string|' +
        'px_update_record|qdom_error|qdom_tree|quoted_printable_decode|quoted_printable_encode|quotemeta|rad2deg|radius_acct_open|' +
        'radius_add_server|radius_auth_open|radius_close|radius_config|radius_create_request|radius_cvt_addr|radius_cvt_int|radius_cvt_string|' +
        'radius_demangle|radius_demangle_mppe_key|radius_get_attr|radius_get_vendor_attr|radius_put_addr|radius_put_attr|radius_put_int|' +
        'radius_put_string|radius_put_vendor_addr|radius_put_vendor_attr|radius_put_vendor_int|radius_put_vendor_string|' +
        'radius_request_authenticator|radius_send_request|radius_server_secret|radius_strerror|rand|range|rangeexception|rar_wrapper_cache_stats|' +
        'rararchive|rarentry|rarexception|rawurldecode|rawurlencode|read_exif_data|readdir|readfile|readgzfile|readline|readline_add_history|' +
        'readline_callback_handler_install|readline_callback_handler_remove|readline_callback_read_char|readline_clear_history|' +
        'readline_completion_function|readline_info|readline_list_history|readline_on_new_line|readline_read_history|readline_redisplay|' +
        'readline_write_history|readlink|realpath|realpath_cache_get|realpath_cache_size|recode|recode_file|recode_string|recursivearrayiterator|' +
        'recursivecachingiterator|recursivecallbackfilteriterator|recursivedirectoryiterator|recursivefilteriterator|recursiveiterator|' +
        'recursiveiteratoriterator|recursiveregexiterator|recursivetreeiterator|reflection|reflectionclass|reflectionexception|reflectionextension|' +
        'reflectionfunction|reflectionfunctionabstract|reflectionmethod|reflectionobject|reflectionparameter|reflectionproperty|reflector|' +
        'regexiterator|register_shutdown_function|register_tick_function|rename|rename_function|require|require_once|reset|resetValue|' +
        'resourcebundle|restore_error_handler|restore_exception_handler|restore_include_path|return|rewind|rewinddir|rmdir|round|rpm_close|' +
        'rpm_get_tag|rpm_is_valid|rpm_open|rpm_version|rrd_create|rrd_error|rrd_fetch|rrd_first|rrd_graph|rrd_info|rrd_last|rrd_lastupdate|' +
        'rrd_restore|rrd_tune|rrd_update|rrd_xport|rrdcreator|rrdgraph|rrdupdater|rsort|rtrim|runkit_class_adopt|runkit_class_emancipate|' +
        'runkit_constant_add|runkit_constant_redefine|runkit_constant_remove|runkit_function_add|runkit_function_copy|runkit_function_redefine|' +
        'runkit_function_remove|runkit_function_rename|runkit_import|runkit_lint|runkit_lint_file|runkit_method_add|runkit_method_copy|' +
        'runkit_method_redefine|runkit_method_remove|runkit_method_rename|runkit_return_value_used|runkit_sandbox_output_handler|' +
        'runkit_superglobals|runtimeexception|samconnection_commit|samconnection_connect|samconnection_constructor|samconnection_disconnect|' +
        'samconnection_errno|samconnection_error|samconnection_isconnected|samconnection_peek|samconnection_peekall|samconnection_receive|' +
        'samconnection_remove|samconnection_rollback|samconnection_send|samconnection_setDebug|samconnection_subscribe|samconnection_unsubscribe|' +
        'sammessage_body|sammessage_constructor|sammessage_header|sca_createdataobject|sca_getservice|sca_localproxy_createdataobject|' +
        'sca_soapproxy_createdataobject|scandir|sdo_das_changesummary_beginlogging|sdo_das_changesummary_endlogging|' +
        'sdo_das_changesummary_getchangeddataobjects|sdo_das_changesummary_getchangetype|sdo_das_changesummary_getoldcontainer|' +
        'sdo_das_changesummary_getoldvalues|sdo_das_changesummary_islogging|sdo_das_datafactory_addpropertytotype|sdo_das_datafactory_addtype|' +
        'sdo_das_datafactory_getdatafactory|sdo_das_dataobject_getchangesummary|sdo_das_relational_applychanges|sdo_das_relational_construct|' +
        'sdo_das_relational_createrootdataobject|sdo_das_relational_executepreparedquery|sdo_das_relational_executequery|' +
        'sdo_das_setting_getlistindex|sdo_das_setting_getpropertyindex|sdo_das_setting_getpropertyname|sdo_das_setting_getvalue|' +
        'sdo_das_setting_isset|sdo_das_xml_addtypes|sdo_das_xml_create|sdo_das_xml_createdataobject|sdo_das_xml_createdocument|' +
        'sdo_das_xml_document_getrootdataobject|sdo_das_xml_document_getrootelementname|sdo_das_xml_document_getrootelementuri|' +
        'sdo_das_xml_document_setencoding|sdo_das_xml_document_setxmldeclaration|sdo_das_xml_document_setxmlversion|sdo_das_xml_loadfile|' +
        'sdo_das_xml_loadstring|sdo_das_xml_savefile|sdo_das_xml_savestring|sdo_datafactory_create|sdo_dataobject_clear|' +
        'sdo_dataobject_createdataobject|sdo_dataobject_getcontainer|sdo_dataobject_getsequence|sdo_dataobject_gettypename|' +
        'sdo_dataobject_gettypenamespaceuri|sdo_exception_getcause|sdo_list_insert|sdo_model_property_getcontainingtype|' +
        'sdo_model_property_getdefault|sdo_model_property_getname|sdo_model_property_gettype|sdo_model_property_iscontainment|' +
        'sdo_model_property_ismany|sdo_model_reflectiondataobject_construct|sdo_model_reflectiondataobject_export|' +
        'sdo_model_reflectiondataobject_getcontainmentproperty|sdo_model_reflectiondataobject_getinstanceproperties|' +
        'sdo_model_reflectiondataobject_gettype|sdo_model_type_getbasetype|sdo_model_type_getname|sdo_model_type_getnamespaceuri|' +
        'sdo_model_type_getproperties|sdo_model_type_getproperty|sdo_model_type_isabstracttype|sdo_model_type_isdatatype|sdo_model_type_isinstance|' +
        'sdo_model_type_isopentype|sdo_model_type_issequencedtype|sdo_sequence_getproperty|sdo_sequence_insert|sdo_sequence_move|seekableiterator|' +
        'sem_acquire|sem_get|sem_release|sem_remove|serializable|serialize|session_cache_expire|session_cache_limiter|session_commit|' +
        'session_decode|session_destroy|session_encode|session_get_cookie_params|session_id|session_is_registered|session_module_name|session_name|' +
        'session_pgsql_add_error|session_pgsql_get_error|session_pgsql_get_field|session_pgsql_reset|session_pgsql_set_field|session_pgsql_status|' +
        'session_regenerate_id|session_register|session_save_path|session_set_cookie_params|session_set_save_handler|session_start|' +
        'session_unregister|session_unset|session_write_close|setCounterClass|set_error_handler|set_exception_handler|set_file_buffer|' +
        'set_include_path|set_magic_quotes_runtime|set_socket_blocking|set_time_limit|setcookie|setlocale|setproctitle|setrawcookie|' +
        'setstaticpropertyvalue|setthreadtitle|settype|sha1|sha1_file|shell_exec|shm_attach|shm_detach|shm_get_var|shm_has_var|shm_put_var|' +
        'shm_remove|shm_remove_var|shmop_close|shmop_delete|shmop_open|shmop_read|shmop_size|shmop_write|show_source|shuffle|signeurlpaiement|' +
        'similar_text|simplexml_import_dom|simplexml_load_file|simplexml_load_string|simplexmlelement|simplexmliterator|sin|sinh|sizeof|sleep|snmp|' +
        'snmp2_get|snmp2_getnext|snmp2_real_walk|snmp2_set|snmp2_walk|snmp3_get|snmp3_getnext|snmp3_real_walk|snmp3_set|snmp3_walk|' +
        'snmp_get_quick_print|snmp_get_valueretrieval|snmp_read_mib|snmp_set_enum_print|snmp_set_oid_numeric_print|snmp_set_oid_output_format|' +
        'snmp_set_quick_print|snmp_set_valueretrieval|snmpget|snmpgetnext|snmprealwalk|snmpset|snmpwalk|snmpwalkoid|soapclient|soapfault|' +
        'soapheader|soapparam|soapserver|soapvar|socket_accept|socket_bind|socket_clear_error|socket_close|socket_connect|socket_create|' +
        'socket_create_listen|socket_create_pair|socket_get_option|socket_get_status|socket_getpeername|socket_getsockname|socket_last_error|' +
        'socket_listen|socket_read|socket_recv|socket_recvfrom|socket_select|socket_send|socket_sendto|socket_set_block|socket_set_blocking|' +
        'socket_set_nonblock|socket_set_option|socket_set_timeout|socket_shutdown|socket_strerror|socket_write|solr_get_version|solrclient|' +
        'solrclientexception|solrdocument|solrdocumentfield|solrexception|solrgenericresponse|solrillegalargumentexception|' +
        'solrillegaloperationexception|solrinputdocument|solrmodifiableparams|solrobject|solrparams|solrpingresponse|solrquery|solrqueryresponse|' +
        'solrresponse|solrupdateresponse|solrutils|sort|soundex|sphinxclient|spl_autoload|spl_autoload_call|spl_autoload_extensions|' +
        'spl_autoload_functions|spl_autoload_register|spl_autoload_unregister|spl_classes|spl_object_hash|splbool|spldoublylinkedlist|splenum|' +
        'splfileinfo|splfileobject|splfixedarray|splfloat|splheap|splint|split|spliti|splmaxheap|splminheap|splobjectstorage|splobserver|' +
        'splpriorityqueue|splqueue|splstack|splstring|splsubject|spltempfileobject|spoofchecker|sprintf|sql_regcase|sqlite3|sqlite3result|' +
        'sqlite3stmt|sqlite_array_query|sqlite_busy_timeout|sqlite_changes|sqlite_close|sqlite_column|sqlite_create_aggregate|' +
        'sqlite_create_function|sqlite_current|sqlite_error_string|sqlite_escape_string|sqlite_exec|sqlite_factory|sqlite_fetch_all|' +
        'sqlite_fetch_array|sqlite_fetch_column_types|sqlite_fetch_object|sqlite_fetch_single|sqlite_fetch_string|sqlite_field_name|' +
        'sqlite_has_more|sqlite_has_prev|sqlite_key|sqlite_last_error|sqlite_last_insert_rowid|sqlite_libencoding|sqlite_libversion|sqlite_next|' +
        'sqlite_num_fields|sqlite_num_rows|sqlite_open|sqlite_popen|sqlite_prev|sqlite_query|sqlite_rewind|sqlite_seek|sqlite_single_query|' +
        'sqlite_udf_decode_binary|sqlite_udf_encode_binary|sqlite_unbuffered_query|sqlite_valid|sqrt|srand|sscanf|ssdeep_fuzzy_compare|' +
        'ssdeep_fuzzy_hash|ssdeep_fuzzy_hash_filename|ssh2_auth_hostbased_file|ssh2_auth_none|ssh2_auth_password|ssh2_auth_pubkey_file|' +
        'ssh2_connect|ssh2_exec|ssh2_fetch_stream|ssh2_fingerprint|ssh2_methods_negotiated|ssh2_publickey_add|ssh2_publickey_init|' +
        'ssh2_publickey_list|ssh2_publickey_remove|ssh2_scp_recv|ssh2_scp_send|ssh2_sftp|ssh2_sftp_lstat|ssh2_sftp_mkdir|ssh2_sftp_readlink|' +
        'ssh2_sftp_realpath|ssh2_sftp_rename|ssh2_sftp_rmdir|ssh2_sftp_stat|ssh2_sftp_symlink|ssh2_sftp_unlink|ssh2_shell|ssh2_tunnel|stat|' +
        'stats_absolute_deviation|stats_cdf_beta|stats_cdf_binomial|stats_cdf_cauchy|stats_cdf_chisquare|stats_cdf_exponential|stats_cdf_f|' +
        'stats_cdf_gamma|stats_cdf_laplace|stats_cdf_logistic|stats_cdf_negative_binomial|stats_cdf_noncentral_chisquare|stats_cdf_noncentral_f|' +
        'stats_cdf_poisson|stats_cdf_t|stats_cdf_uniform|stats_cdf_weibull|stats_covariance|stats_den_uniform|stats_dens_beta|stats_dens_cauchy|' +
        'stats_dens_chisquare|stats_dens_exponential|stats_dens_f|stats_dens_gamma|stats_dens_laplace|stats_dens_logistic|' +
        'stats_dens_negative_binomial|stats_dens_normal|stats_dens_pmf_binomial|stats_dens_pmf_hypergeometric|stats_dens_pmf_poisson|stats_dens_t|' +
        'stats_dens_weibull|stats_harmonic_mean|stats_kurtosis|stats_rand_gen_beta|stats_rand_gen_chisquare|stats_rand_gen_exponential|' +
        'stats_rand_gen_f|stats_rand_gen_funiform|stats_rand_gen_gamma|stats_rand_gen_ibinomial|stats_rand_gen_ibinomial_negative|' +
        'stats_rand_gen_int|stats_rand_gen_ipoisson|stats_rand_gen_iuniform|stats_rand_gen_noncenral_chisquare|stats_rand_gen_noncentral_f|' +
        'stats_rand_gen_noncentral_t|stats_rand_gen_normal|stats_rand_gen_t|stats_rand_get_seeds|stats_rand_phrase_to_seeds|stats_rand_ranf|' +
        'stats_rand_setall|stats_skew|stats_standard_deviation|stats_stat_binomial_coef|stats_stat_correlation|stats_stat_gennch|' +
        'stats_stat_independent_t|stats_stat_innerproduct|stats_stat_noncentral_t|stats_stat_paired_t|stats_stat_percentile|stats_stat_powersum|' +
        'stats_variance|stomp|stomp_connect_error|stomp_version|stompexception|stompframe|str_getcsv|str_ireplace|str_pad|str_repeat|str_replace|' +
        'str_rot13|str_shuffle|str_split|str_word_count|strcasecmp|strchr|strcmp|strcoll|strcspn|stream_bucket_append|stream_bucket_make_writeable|' +
        'stream_bucket_new|stream_bucket_prepend|stream_context_create|stream_context_get_default|stream_context_get_options|' +
        'stream_context_get_params|stream_context_set_default|stream_context_set_option|stream_context_set_params|stream_copy_to_stream|' +
        'stream_encoding|stream_filter_append|stream_filter_prepend|stream_filter_register|stream_filter_remove|stream_get_contents|' +
        'stream_get_filters|stream_get_line|stream_get_meta_data|stream_get_transports|stream_get_wrappers|stream_is_local|' +
        'stream_notification_callback|stream_register_wrapper|stream_resolve_include_path|stream_select|stream_set_blocking|stream_set_read_buffer|' +
        'stream_set_timeout|stream_set_write_buffer|stream_socket_accept|stream_socket_client|stream_socket_enable_crypto|stream_socket_get_name|' +
        'stream_socket_pair|stream_socket_recvfrom|stream_socket_sendto|stream_socket_server|stream_socket_shutdown|stream_supports_lock|' +
        'stream_wrapper_register|stream_wrapper_restore|stream_wrapper_unregister|streamwrapper|strftime|strip_tags|stripcslashes|stripos|' +
        'stripslashes|stristr|strlen|strnatcasecmp|strnatcmp|strncasecmp|strncmp|strpbrk|strpos|strptime|strrchr|strrev|strripos|strrpos|strspn|' +
        'strstr|strtok|strtolower|strtotime|strtoupper|strtr|strval|substr|substr_compare|substr_count|substr_replace|svm|svmmodel|svn_add|' +
        'svn_auth_get_parameter|svn_auth_set_parameter|svn_blame|svn_cat|svn_checkout|svn_cleanup|svn_client_version|svn_commit|svn_delete|' +
        'svn_diff|svn_export|svn_fs_abort_txn|svn_fs_apply_text|svn_fs_begin_txn2|svn_fs_change_node_prop|svn_fs_check_path|' +
        'svn_fs_contents_changed|svn_fs_copy|svn_fs_delete|svn_fs_dir_entries|svn_fs_file_contents|svn_fs_file_length|svn_fs_is_dir|svn_fs_is_file|' +
        'svn_fs_make_dir|svn_fs_make_file|svn_fs_node_created_rev|svn_fs_node_prop|svn_fs_props_changed|svn_fs_revision_prop|svn_fs_revision_root|' +
        'svn_fs_txn_root|svn_fs_youngest_rev|svn_import|svn_log|svn_ls|svn_mkdir|svn_repos_create|svn_repos_fs|svn_repos_fs_begin_txn_for_commit|' +
        'svn_repos_fs_commit_txn|svn_repos_hotcopy|svn_repos_open|svn_repos_recover|svn_revert|svn_status|svn_update|swf_actiongeturl|' +
        'swf_actiongotoframe|swf_actiongotolabel|swf_actionnextframe|swf_actionplay|swf_actionprevframe|swf_actionsettarget|swf_actionstop|' +
        'swf_actiontogglequality|swf_actionwaitforframe|swf_addbuttonrecord|swf_addcolor|swf_closefile|swf_definebitmap|swf_definefont|' +
        'swf_defineline|swf_definepoly|swf_definerect|swf_definetext|swf_endbutton|swf_enddoaction|swf_endshape|swf_endsymbol|swf_fontsize|' +
        'swf_fontslant|swf_fonttracking|swf_getbitmapinfo|swf_getfontinfo|swf_getframe|swf_labelframe|swf_lookat|swf_modifyobject|swf_mulcolor|' +
        'swf_nextid|swf_oncondition|swf_openfile|swf_ortho|swf_ortho2|swf_perspective|swf_placeobject|swf_polarview|swf_popmatrix|swf_posround|' +
        'swf_pushmatrix|swf_removeobject|swf_rotate|swf_scale|swf_setfont|swf_setframe|swf_shapearc|swf_shapecurveto|swf_shapecurveto3|' +
        'swf_shapefillbitmapclip|swf_shapefillbitmaptile|swf_shapefilloff|swf_shapefillsolid|swf_shapelinesolid|swf_shapelineto|swf_shapemoveto|' +
        'swf_showframe|swf_startbutton|swf_startdoaction|swf_startshape|swf_startsymbol|swf_textwidth|swf_translate|swf_viewport|swfaction|' +
        'swfbitmap|swfbutton|swfdisplayitem|swffill|swffont|swffontchar|swfgradient|swfmorph|swfmovie|swfprebuiltclip|swfshape|swfsound|' +
        'swfsoundinstance|swfsprite|swftext|swftextfield|swfvideostream|swish_construct|swish_getmetalist|swish_getpropertylist|swish_prepare|' +
        'swish_query|swishresult_getmetalist|swishresult_stem|swishresults_getparsedwords|swishresults_getremovedstopwords|swishresults_nextresult|' +
        'swishresults_seekresult|swishsearch_execute|swishsearch_resetlimit|swishsearch_setlimit|swishsearch_setphrasedelimiter|' +
        'swishsearch_setsort|swishsearch_setstructure|sybase_affected_rows|sybase_close|sybase_connect|sybase_data_seek|' +
        'sybase_deadlock_retry_count|sybase_fetch_array|sybase_fetch_assoc|sybase_fetch_field|sybase_fetch_object|sybase_fetch_row|' +
        'sybase_field_seek|sybase_free_result|sybase_get_last_message|sybase_min_client_severity|sybase_min_error_severity|' +
        'sybase_min_message_severity|sybase_min_server_severity|sybase_num_fields|sybase_num_rows|sybase_pconnect|sybase_query|sybase_result|' +
        'sybase_select_db|sybase_set_message_handler|sybase_unbuffered_query|symlink|sys_get_temp_dir|sys_getloadavg|syslog|system|tag|tan|tanh|' +
        'tcpwrap_check|tempnam|textdomain|tidy|tidy_access_count|tidy_config_count|tidy_diagnose|tidy_error_count|tidy_get_error_buffer|' +
        'tidy_get_output|tidy_load_config|tidy_reset_config|tidy_save_config|tidy_set_encoding|tidy_setopt|tidy_warning_count|tidynode|time|' +
        'time_nanosleep|time_sleep_until|timezone_abbreviations_list|timezone_identifiers_list|timezone_location_get|timezone_name_from_abbr|' +
        'timezone_name_get|timezone_offset_get|timezone_open|timezone_transitions_get|timezone_version_get|tmpfile|token_get_all|token_name|' +
        'tokyotyrant|tokyotyrantquery|tokyotyranttable|tostring|tostring|touch|transliterator|traversable|trigger_error|trim|uasort|ucfirst|' +
        'ucwords|udm_add_search_limit|udm_alloc_agent|udm_alloc_agent_array|udm_api_version|udm_cat_list|udm_cat_path|udm_check_charset|' +
        'udm_check_stored|udm_clear_search_limits|udm_close_stored|udm_crc32|udm_errno|udm_error|udm_find|udm_free_agent|udm_free_ispell_data|' +
        'udm_free_res|udm_get_doc_count|udm_get_res_field|udm_get_res_param|udm_hash32|udm_load_ispell_data|udm_open_stored|udm_set_agent_param|' +
        'uksort|umask|underflowexception|unexpectedvalueexception|uniqid|unixtojd|unlink|unpack|unregister_tick_function|unserialize|unset|' +
        'urldecode|urlencode|use_soap_error_handler|user_error|usleep|usort|utf8_decode|utf8_encode|v8js|v8jsexception|var_dump|var_export|variant|' +
        'variant_abs|variant_add|variant_and|variant_cast|variant_cat|variant_cmp|variant_date_from_timestamp|variant_date_to_timestamp|' +
        'variant_div|variant_eqv|variant_fix|variant_get_type|variant_idiv|variant_imp|variant_int|variant_mod|variant_mul|variant_neg|variant_not|' +
        'variant_or|variant_pow|variant_round|variant_set|variant_set_type|variant_sub|variant_xor|version_compare|vfprintf|virtual|' +
        'vpopmail_add_alias_domain|vpopmail_add_alias_domain_ex|vpopmail_add_domain|vpopmail_add_domain_ex|vpopmail_add_user|vpopmail_alias_add|' +
        'vpopmail_alias_del|vpopmail_alias_del_domain|vpopmail_alias_get|vpopmail_alias_get_all|vpopmail_auth_user|vpopmail_del_domain|' +
        'vpopmail_del_domain_ex|vpopmail_del_user|vpopmail_error|vpopmail_passwd|vpopmail_set_user_quota|vprintf|vsprintf|w32api_deftype|' +
        'w32api_init_dtype|w32api_invoke_function|w32api_register_function|w32api_set_call_method|wddx_add_vars|wddx_deserialize|wddx_packet_end|' +
        'wddx_packet_start|wddx_serialize_value|wddx_serialize_vars|win32_continue_service|win32_create_service|win32_delete_service|' +
        'win32_get_last_control_message|win32_pause_service|win32_ps_list_procs|win32_ps_stat_mem|win32_ps_stat_proc|win32_query_service_status|' +
        'win32_set_service_status|win32_start_service|win32_start_service_ctrl_dispatcher|win32_stop_service|wincache_fcache_fileinfo|' +
        'wincache_fcache_meminfo|wincache_lock|wincache_ocache_fileinfo|wincache_ocache_meminfo|wincache_refresh_if_changed|' +
        'wincache_rplist_fileinfo|wincache_rplist_meminfo|wincache_scache_info|wincache_scache_meminfo|wincache_ucache_add|wincache_ucache_cas|' +
        'wincache_ucache_clear|wincache_ucache_dec|wincache_ucache_delete|wincache_ucache_exists|wincache_ucache_get|wincache_ucache_inc|' +
        'wincache_ucache_info|wincache_ucache_meminfo|wincache_ucache_set|wincache_unlock|wordwrap|xattr_get|xattr_list|xattr_remove|xattr_set|' +
        'xattr_supported|xdiff_file_bdiff|xdiff_file_bdiff_size|xdiff_file_bpatch|xdiff_file_diff|xdiff_file_diff_binary|xdiff_file_merge3|' +
        'xdiff_file_patch|xdiff_file_patch_binary|xdiff_file_rabdiff|xdiff_string_bdiff|xdiff_string_bdiff_size|xdiff_string_bpatch|' +
        'xdiff_string_diff|xdiff_string_diff_binary|xdiff_string_merge3|xdiff_string_patch|xdiff_string_patch_binary|xdiff_string_rabdiff|' +
        'xhprof_disable|xhprof_enable|xhprof_sample_disable|xhprof_sample_enable|xml_error_string|xml_get_current_byte_index|' +
        'xml_get_current_column_number|xml_get_current_line_number|xml_get_error_code|xml_parse|xml_parse_into_struct|xml_parser_create|' +
        'xml_parser_create_ns|xml_parser_free|xml_parser_get_option|xml_parser_set_option|xml_set_character_data_handler|xml_set_default_handler|' +
        'xml_set_element_handler|xml_set_end_namespace_decl_handler|xml_set_external_entity_ref_handler|xml_set_notation_decl_handler|' +
        'xml_set_object|xml_set_processing_instruction_handler|xml_set_start_namespace_decl_handler|xml_set_unparsed_entity_decl_handler|xmlreader|' +
        'xmlrpc_decode|xmlrpc_decode_request|xmlrpc_encode|xmlrpc_encode_request|xmlrpc_get_type|xmlrpc_is_fault|xmlrpc_parse_method_descriptions|' +
        'xmlrpc_server_add_introspection_data|xmlrpc_server_call_method|xmlrpc_server_create|xmlrpc_server_destroy|' +
        'xmlrpc_server_register_introspection_callback|xmlrpc_server_register_method|xmlrpc_set_type|xmlwriter_end_attribute|xmlwriter_end_cdata|' +
        'xmlwriter_end_comment|xmlwriter_end_document|xmlwriter_end_dtd|xmlwriter_end_dtd_attlist|xmlwriter_end_dtd_element|' +
        'xmlwriter_end_dtd_entity|xmlwriter_end_element|xmlwriter_end_pi|xmlwriter_flush|xmlwriter_full_end_element|xmlwriter_open_memory|' +
        'xmlwriter_open_uri|xmlwriter_output_memory|xmlwriter_set_indent|xmlwriter_set_indent_string|xmlwriter_start_attribute|' +
        'xmlwriter_start_attribute_ns|xmlwriter_start_cdata|xmlwriter_start_comment|xmlwriter_start_document|xmlwriter_start_dtd|' +
        'xmlwriter_start_dtd_attlist|xmlwriter_start_dtd_element|xmlwriter_start_dtd_entity|xmlwriter_start_element|xmlwriter_start_element_ns|' +
        'xmlwriter_start_pi|xmlwriter_text|xmlwriter_write_attribute|xmlwriter_write_attribute_ns|xmlwriter_write_cdata|xmlwriter_write_comment|' +
        'xmlwriter_write_dtd|xmlwriter_write_dtd_attlist|xmlwriter_write_dtd_element|xmlwriter_write_dtd_entity|xmlwriter_write_element|' +
        'xmlwriter_write_element_ns|xmlwriter_write_pi|xmlwriter_write_raw|xpath_eval|xpath_eval_expression|xpath_new_context|xpath_register_ns|' +
        'xpath_register_ns_auto|xptr_eval|xptr_new_context|xslt_backend_info|xslt_backend_name|xslt_backend_version|xslt_create|xslt_errno|' +
        'xslt_error|xslt_free|xslt_getopt|xslt_process|xslt_set_base|xslt_set_encoding|xslt_set_error_handler|xslt_set_log|xslt_set_object|' +
        'xslt_set_sax_handler|xslt_set_sax_handlers|xslt_set_scheme_handler|xslt_set_scheme_handlers|xslt_setopt|xsltprocessor|yaml_emit|' +
        'yaml_emit_file|yaml_parse|yaml_parse_file|yaml_parse_url|yaz_addinfo|yaz_ccl_conf|yaz_ccl_parse|yaz_close|yaz_connect|yaz_database|' +
        'yaz_element|yaz_errno|yaz_error|yaz_es|yaz_es_result|yaz_get_option|yaz_hits|yaz_itemorder|yaz_present|yaz_range|yaz_record|yaz_scan|' +
        'yaz_scan_result|yaz_schema|yaz_search|yaz_set_option|yaz_sort|yaz_syntax|yaz_wait|yp_all|yp_cat|yp_err_string|yp_errno|yp_first|' +
        'yp_get_default_domain|yp_master|yp_match|yp_next|yp_order|zend_logo_guid|zend_thread_id|zend_version|zip_close|zip_entry_close|' +
        'zip_entry_compressedsize|zip_entry_compressionmethod|zip_entry_filesize|zip_entry_name|zip_entry_open|zip_entry_read|zip_open|zip_read|' +
        'ziparchive|ziparchive_addemptydir|ziparchive_addfile|ziparchive_addfromstring|ziparchive_close|ziparchive_deleteindex|' +
        'ziparchive_deletename|ziparchive_extractto|ziparchive_getarchivecomment|ziparchive_getcommentindex|ziparchive_getcommentname|' +
        'ziparchive_getfromindex|ziparchive_getfromname|ziparchive_getnameindex|ziparchive_getstatusstring|ziparchive_getstream|' +
        'ziparchive_locatename|ziparchive_open|ziparchive_renameindex|ziparchive_renamename|ziparchive_setCommentName|ziparchive_setarchivecomment|' +
        'ziparchive_setcommentindex|ziparchive_statindex|ziparchive_statname|ziparchive_unchangeall|ziparchive_unchangearchive|' +
        'ziparchive_unchangeindex|ziparchive_unchangename|zlib_get_coding_type').split('|')
    );
    var keywords = lang.arrayToMap(
        ('abstract|and|array|as|break|case|catch|class|clone|const|continue|declare|default|do|else|elseif|enddeclare|endfor|endforeach|endif|' +
        'endswitch|endwhile|extends|final|for|foreach|function|global|goto|if|implements|interface|instanceof|namespace|new|or|private|protected|' +
        'public|static|switch|throw|try|use|var|while|xor').split('|')
    );
    var languageConstructs = lang.arrayToMap(
        ('die|echo|empty|exit|eval|include|include_once|isset|list|require|require_once|return|print|unset').split('|')
    );

    var builtinConstants = lang.arrayToMap(
        ('true|false|null|__CLASS__|__DIR__|__FILE__|__LINE__|__METHOD__|__FUNCTION__|__NAMESPACE__').split('|')
    );

    var builtinVariables = lang.arrayToMap(
        ('$GLOBALS|$_SERVER|$_GET|$_POST|$_FILES|$_REQUEST|$_SESSION|$_ENV|$_COOKIE|$php_errormsg|$HTTP_RAW_POST_DATA|' +
        '$http_response_header|$argc|$argv').split('|')
    );
    var builtinFunctionsDeprecated = lang.arrayToMap(
        ('key_exists|cairo_matrix_create_scale|cairo_matrix_create_translate|call_user_method|call_user_method_array|com_addref|com_get|' +
        'com_invoke|com_isenum|com_load|com_release|com_set|connection_timeout|cubrid_load_from_glo|cubrid_new_glo|cubrid_save_to_glo|' +
        'cubrid_send_glo|define_syslog_variables|dl|ereg|ereg_replace|eregi|eregi_replace|hw_documentattributes|hw_documentbodytag|' +
        'hw_documentsize|hw_outputdocument|imagedashedline|maxdb_bind_param|maxdb_bind_result|maxdb_client_encoding|maxdb_close_long_data|' +
        'maxdb_execute|maxdb_fetch|maxdb_get_metadata|maxdb_param_count|maxdb_send_long_data|mcrypt_ecb|mcrypt_generic_end|mime_content_type|' +
        'mysql_createdb|mysql_dbname|mysql_db_query|mysql_drop_db|mysql_dropdb|mysql_escape_string|mysql_fieldflags|mysql_fieldflags|' +
        'mysql_fieldname|mysql_fieldtable|mysql_fieldtype|mysql_freeresult|mysql_listdbs|mysql_list_fields|mysql_listfields|mysql_list_tables|' +
        'mysql_listtables|mysql_numfields|mysql_numrows|mysql_selectdb|mysql_tablename|mysqli_bind_param|mysqli_bind_result|' +
        'mysqli_disable_reads_from_master|mysqli_disable_rpl_parse|mysqli_enable_reads_from_master|mysqli_enable_rpl_parse|mysqli_execute|' +
        'mysqli_fetch|mysqli_get_metadata|mysqli_master_query|mysqli_param_count|mysqli_rpl_parse_enabled|mysqli_rpl_probe|mysqli_rpl_query_type|' +
        'mysqli_send_long_data|mysqli_send_query|mysqli_slave_query|ocibindbyname|ocicancel|ocicloselob|ocicollappend|ocicollassign|' +
        'ocicollassignelem|ocicollgetelem|ocicollmax|ocicollsize|ocicolltrim|ocicolumnisnull|ocicolumnname|ocicolumnprecision|ocicolumnscale|' +
        'ocicolumnsize|ocicolumntype|ocicolumntyperaw|ocicommit|ocidefinebyname|ocierror|ociexecute|ocifetch|ocifetchinto|ocifetchstatement|' +
        'ocifreecollection|ocifreecursor|ocifreedesc|ocifreestatement|ociinternaldebug|ociloadlob|ocilogoff|ocilogon|ocinewcollection|' +
        'ocinewcursor|ocinewdescriptor|ocinlogon|ocinumcols|ociparse|ociplogon|ociresult|ocirollback|ocirowcount|ocisavelob|ocisavelobfile|' +
        'ociserverversion|ocisetprefetch|ocistatementtype|ociwritelobtofile|ociwritetemporarylob|PDF_add_annotation|PDF_add_bookmark|' +
        'PDF_add_launchlink|PDF_add_locallink|PDF_add_note|PDF_add_outline|PDF_add_pdflink|PDF_add_weblink|PDF_attach_file|PDF_begin_page|' +
        'PDF_begin_template|PDF_close_pdi|PDF_close|PDF_findfont|PDF_get_font|PDF_get_fontname|PDF_get_fontsize|PDF_get_image_height|' +
        'PDF_get_image_width|PDF_get_majorversion|PDF_get_minorversion|PDF_get_pdi_parameter|PDF_get_pdi_value|PDF_open_ccitt|PDF_open_file|' +
        'PDF_open_gif|PDF_open_image_file|PDF_open_image|PDF_open_jpeg|PDF_open_pdi|PDF_open_tiff|PDF_place_image|PDF_place_pdi_page|' +
        'PDF_set_border_color|PDF_set_border_dash|PDF_set_border_style|PDF_set_char_spacing|PDF_set_duration|PDF_set_horiz_scaling|' +
        'PDF_set_info_author|PDF_set_info_creator|PDF_set_info_keywords|PDF_set_info_subject|PDF_set_info_title|PDF_set_leading|' +
        'PDF_set_text_matrix|PDF_set_text_rendering|PDF_set_text_rise|PDF_set_word_spacing|PDF_setgray_fill|PDF_setgray_stroke|PDF_setgray|' +
        'PDF_setpolydash|PDF_setrgbcolor_fill|PDF_setrgbcolor_stroke|PDF_setrgbcolor|PDF_show_boxed|php_check_syntax|px_set_tablename|' +
        'px_set_targetencoding|runkit_sandbox_output_handler|session_is_registered|session_register|session_unregister' +
        'set_magic_quotes_runtime|magic_quotes_runtime|set_socket_blocking|socket_set_blocking|set_socket_timeout|socket_set_timeout|split|spliti|' +
        'sql_regcase').split('|')
    );

    var keywordsDeprecated = lang.arrayToMap(
        ('cfunction|old_function').split('|')
    );

    var futureReserved = lang.arrayToMap([]);

    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : /(?:#|\/\/)(?:[^?]|\?[^>])*/
            },
            docComment.getStartRule("doc-start"),
            {
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "comment"
            }, {
                token : "string.regexp",
                regex : "[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/][gimy]*\\s*(?=[).,;]|$)"
            }, {
                token : "string", // " string start
                regex : '"',
                next : "qqstring"
            }, {
                token : "string", // ' string start
                regex : "'",
                next : "qstring"
            }, {
                token : "constant.numeric", // hex
                regex : "0[xX][0-9a-fA-F]+\\b"
            }, {
                token : "constant.numeric", // float
                regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
                token : "constant.language", // constants
                regex : "\\b(?:DEFAULT_INCLUDE_PATH|E_(?:ALL|CO(?:MPILE_(?:ERROR|WARNING)|RE_(?:ERROR|WARNING))|" +
                        "ERROR|NOTICE|PARSE|STRICT|USER_(?:ERROR|NOTICE|WARNING)|WARNING)|P(?:EAR_(?:EXTENSION_DIR|INSTALL_DIR)|" +
                        "HP_(?:BINDIR|CONFIG_FILE_(?:PATH|SCAN_DIR)|DATADIR|E(?:OL|XTENSION_DIR)|INT_(?:MAX|SIZE)|" +
                        "L(?:IBDIR|OCALSTATEDIR)|O(?:S|UTPUT_HANDLER_(?:CONT|END|START))|PREFIX|S(?:API|HLIB_SUFFIX|YSCONFDIR)|" +
                        "VERSION))|__COMPILER_HALT_OFFSET__)\\b"
            }, {
                token : ["keyword", "text", "support.class"],
                regex : "\\b(new)(\\s+)(\\w+)"
            }, {
                token : ["support.class", "keyword.operator"],
                regex : "\\b(\\w+)(::)"
            }, {
                token : "constant.language", // constants
                regex : "\\b(?:A(?:B(?:DAY_(?:1|2|3|4|5|6|7)|MON_(?:1(?:0|1|2|)|2|3|4|5|6|7|8|9))|LT_DIGITS|M_STR|" +
                        "SSERT_(?:ACTIVE|BAIL|CALLBACK|QUIET_EVAL|WARNING))|C(?:ASE_(?:LOWER|UPPER)|HAR_MAX|" +
                        "O(?:DESET|NNECTION_(?:ABORTED|NORMAL|TIMEOUT)|UNT_(?:NORMAL|RECURSIVE))|" +
                        "R(?:EDITS_(?:ALL|DOCS|FULLPAGE|G(?:ENERAL|ROUP)|MODULES|QA|SAPI)|NCYSTR|" +
                        "YPT_(?:BLOWFISH|EXT_DES|MD5|S(?:ALT_LENGTH|TD_DES)))|URRENCY_SYMBOL)|D(?:AY_(?:1|2|3|4|5|6|7)|" +
                        "ECIMAL_POINT|IRECTORY_SEPARATOR|_(?:FMT|T_FMT))|E(?:NT_(?:COMPAT|NOQUOTES|QUOTES)|RA(?:_(?:D_(?:FMT|T_FMT)|" +
                        "T_FMT|YEAR)|)|XTR_(?:IF_EXISTS|OVERWRITE|PREFIX_(?:ALL|I(?:F_EXISTS|NVALID)|SAME)|SKIP))|FRAC_DIGITS|GROUPING|" +
                        "HTML_(?:ENTITIES|SPECIALCHARS)|IN(?:FO_(?:ALL|C(?:ONFIGURATION|REDITS)|ENVIRONMENT|GENERAL|LICENSE|MODULES|VARIABLES)|" +
                        "I_(?:ALL|PERDIR|SYSTEM|USER)|T_(?:CURR_SYMBOL|FRAC_DIGITS))|L(?:C_(?:ALL|C(?:OLLATE|TYPE)|M(?:ESSAGES|ONETARY)|NUMERIC|TIME)|" +
                        "O(?:CK_(?:EX|NB|SH|UN)|G_(?:A(?:LERT|UTH(?:PRIV|))|C(?:ONS|R(?:IT|ON))|D(?:AEMON|EBUG)|E(?:MERG|RR)|INFO|KERN|" +
                        "L(?:OCAL(?:0|1|2|3|4|5|6|7)|PR)|MAIL|N(?:DELAY|EWS|O(?:TICE|WAIT))|ODELAY|P(?:ERROR|ID)|SYSLOG|U(?:SER|UCP)|WARNING)))|" +
                        "M(?:ON_(?:1(?:0|1|2|)|2|3|4|5|6|7|8|9|DECIMAL_POINT|GROUPING|THOUSANDS_SEP)|_(?:1_PI|2_(?:PI|SQRTPI)|E|L(?:N(?:10|2)|" +
                        "OG(?:10E|2E))|PI(?:_(?:2|4)|)|SQRT(?:1_2|2)))|N(?:EGATIVE_SIGN|O(?:EXPR|STR)|_(?:CS_PRECEDES|S(?:EP_BY_SPACE|IGN_POSN)))|" +
                        "P(?:ATH(?:INFO_(?:BASENAME|DIRNAME|EXTENSION)|_SEPARATOR)|M_STR|OSITIVE_SIGN|_(?:CS_PRECEDES|S(?:EP_BY_SPACE|IGN_POSN)))|" +
                        "RADIXCHAR|S(?:EEK_(?:CUR|END|SET)|ORT_(?:ASC|DESC|NUMERIC|REGULAR|STRING)|TR_PAD_(?:BOTH|LEFT|RIGHT))|" +
                        "T(?:HOUS(?:ANDS_SEP|EP)|_FMT(?:_AMPM|))|YES(?:EXPR|STR)|STD(?:IN|OUT|ERR))\\b"
            }, {
                token : function(value) {
                    if (keywords.hasOwnProperty(value))
                        return "keyword";
                    else if (builtinConstants.hasOwnProperty(value))
                        return "constant.language";
                    else if (builtinVariables.hasOwnProperty(value))
                        return "variable.language";
                    else if (futureReserved.hasOwnProperty(value))
                        return "invalid.illegal";
                    else if (builtinFunctions.hasOwnProperty(value))
                        return "support.function";
                    else if (value == "debugger")
                        return "invalid.deprecated";
                    else
                        if(value.match(/^(\$[a-zA-Z_\x7f-\uffff][a-zA-Z0-9_\x7f-\uffff]*|self|parent)$/))
                            return "variable";
                        return "identifier";
                },
                regex : /[a-zA-Z_$\x7f-\uffff][a-zA-Z0-9_\x7f-\uffff]*/
            }, {
                onMatch : function(value, currentSate, state) {
                    value = value.substr(3);
                    if (value[0] == "'" || value[0] == '"')
                        value = value.slice(1, -1);
                    state.unshift(this.next, value);
                    return "markup.list";
                },
                regex : /<<<(?:\w+|'\w+'|"\w+")$/,
                next: "heredoc"
            }, {
                token : "keyword.operator",
                regex : "::|!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|!=|!==|<=|>=|=>|<<=|>>=|>>>=|<>|<|>|=|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"
            }, {
                token : "paren.lparen",
                regex : "[[({]"
            }, {
                token : "paren.rparen",
                regex : "[\\])}]"
            }, {
                token : "text",
                regex : "\\s+"
            }
        ],
        "heredoc" : [
            {
                onMatch : function(value, currentSate, stack) {
                    if (stack[1] != value)
                        return "string";
                    stack.shift();
                    stack.shift();
                    return "markup.list"
                },
                regex : "^\\w+(?=;?$)",
                next: "start"
            }, {
                token: "string",
                regex : ".*"
            }
        ],
        "comment" : [
            {
                token : "comment", // closing comment
                regex : ".*?\\*\\/",
                next : "start"
            }, {
                token : "comment", // comment spanning whole line
                regex : ".+"
            }
        ],
        "qqstring" : [
            {
                token : "constant.language.escape",
                regex : '\\\\(?:[nrtvef\\\\"$]|[0-7]{1,3}|x[0-9A-Fa-f]{1,2})'
            }, {
                token : "constant.language.escape",
                regex : /\$[\w]+(?:\[[\w\]+]|=>\w+)?/
            }, {
                token : "constant.language.escape",
                regex : /\$\{[^"\}]+\}?/           // this is wrong but ok for now
            },
            {token : "string", regex : '"', next : "start"},
            {defaultToken : "string"}
        ],
        "qstring" : [
            {token : "constant.language.escape", regex : /\\['\\]/},
            {token : "string", regex : "'", next : "start"},
            {defaultToken : "string"}
        ]
    };

    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);
};

oop.inherits(PhpLangHighlightRules, TextHighlightRules);


var PhpHighlightRules = function() {
    HtmlHighlightRules.call(this);

    var startRules = [
        {
            token : "support.php_tag", // php open tag
            regex : "<\\?(?:php|=)?",
            push  : "php-start"
        }
    ];

    var endRules = [
        {
            token : "support.php_tag", // php close tag
            regex : "\\?>",
            next  : "pop"
        }
    ];

    for (var key in this.$rules)
        this.$rules[key].unshift.apply(this.$rules[key], startRules);

    this.embedRules(PhpLangHighlightRules, "php-", endRules, ["start"]);

    this.normalizeRules();
};

oop.inherits(PhpHighlightRules, HtmlHighlightRules);

exports.PhpHighlightRules = PhpHighlightRules;
exports.PhpLangHighlightRules = PhpLangHighlightRules;
});

define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"], function(require, exports, module) {
"use strict";

var Range = require("../range").Range;

var MatchingBraceOutdent = function() {};

(function() {

    this.checkOutdent = function(line, input) {
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\}/.test(input);
    };

    this.autoOutdent = function(doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\})/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({row: row, column: column});

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
    };

    this.$getIndent = function(line) {
        return line.match(/^\s*/)[0];
    };

}).call(MatchingBraceOutdent.prototype);

exports.MatchingBraceOutdent = MatchingBraceOutdent;
});

define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var Behaviour = require("../behaviour").Behaviour;
var TokenIterator = require("../../token_iterator").TokenIterator;
var lang = require("../../lib/lang");

var SAFE_INSERT_IN_TOKENS =
    ["text", "paren.rparen", "punctuation.operator"];
var SAFE_INSERT_BEFORE_TOKENS =
    ["text", "paren.rparen", "punctuation.operator", "comment"];

var context;
var contextCache = {}
var initContext = function(editor) {
    var id = -1;
    if (editor.multiSelect) {
        id = editor.selection.id;
        if (contextCache.rangeCount != editor.multiSelect.rangeCount)
            contextCache = {rangeCount: editor.multiSelect.rangeCount};
    }
    if (contextCache[id])
        return context = contextCache[id];
    context = contextCache[id] = {
        autoInsertedBrackets: 0,
        autoInsertedRow: -1,
        autoInsertedLineEnd: "",
        maybeInsertedBrackets: 0,
        maybeInsertedRow: -1,
        maybeInsertedLineStart: "",
        maybeInsertedLineEnd: ""
    };
};

var CstyleBehaviour = function() {
    this.add("braces", "insertion", function(state, action, editor, session, text) {
        var cursor = editor.getCursorPosition();
        var line = session.doc.getLine(cursor.row);
        if (text == '{') {
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && selected !== "{" && editor.getWrapBehavioursEnabled()) {
                return {
                    text: '{' + selected + '}',
                    selection: false
                };
            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
                if (/[\]\}\)]/.test(line[cursor.column]) || editor.inMultiSelectMode) {
                    CstyleBehaviour.recordAutoInsert(editor, session, "}");
                    return {
                        text: '{}',
                        selection: [1, 1]
                    };
                } else {
                    CstyleBehaviour.recordMaybeInsert(editor, session, "{");
                    return {
                        text: '{',
                        selection: [1, 1]
                    };
                }
            }
        } else if (text == '}') {
            initContext(editor);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == '}') {
                var matching = session.$findOpeningBracket('}', {column: cursor.column + 1, row: cursor.row});
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) {
                    CstyleBehaviour.popAutoInsertedClosing();
                    return {
                        text: '',
                        selection: [1, 1]
                    };
                }
            }
        } else if (text == "\n" || text == "\r\n") {
            initContext(editor);
            var closing = "";
            if (CstyleBehaviour.isMaybeInsertedClosing(cursor, line)) {
                closing = lang.stringRepeat("}", context.maybeInsertedBrackets);
                CstyleBehaviour.clearMaybeInsertedClosing();
            }
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar === '}') {
                var openBracePos = session.findMatchingBracket({row: cursor.row, column: cursor.column+1}, '}');
                if (!openBracePos)
                     return null;
                var next_indent = this.$getIndent(session.getLine(openBracePos.row));
            } else if (closing) {
                var next_indent = this.$getIndent(line);
            } else {
                CstyleBehaviour.clearMaybeInsertedClosing();
                return;
            }
            var indent = next_indent + session.getTabString();

            return {
                text: '\n' + indent + '\n' + next_indent + closing,
                selection: [1, indent.length, 1, indent.length]
            };
        } else {
            CstyleBehaviour.clearMaybeInsertedClosing();
        }
    });

    this.add("braces", "deletion", function(state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '{') {
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.end.column, range.end.column + 1);
            if (rightChar == '}') {
                range.end.column++;
                return range;
            } else {
                context.maybeInsertedBrackets--;
            }
        }
    });

    this.add("parens", "insertion", function(state, action, editor, session, text) {
        if (text == '(') {
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && editor.getWrapBehavioursEnabled()) {
                return {
                    text: '(' + selected + ')',
                    selection: false
                };
            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
                CstyleBehaviour.recordAutoInsert(editor, session, ")");
                return {
                    text: '()',
                    selection: [1, 1]
                };
            }
        } else if (text == ')') {
            initContext(editor);
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == ')') {
                var matching = session.$findOpeningBracket(')', {column: cursor.column + 1, row: cursor.row});
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) {
                    CstyleBehaviour.popAutoInsertedClosing();
                    return {
                        text: '',
                        selection: [1, 1]
                    };
                }
            }
        }
    });

    this.add("parens", "deletion", function(state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '(') {
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == ')') {
                range.end.column++;
                return range;
            }
        }
    });

    this.add("brackets", "insertion", function(state, action, editor, session, text) {
        if (text == '[') {
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && editor.getWrapBehavioursEnabled()) {
                return {
                    text: '[' + selected + ']',
                    selection: false
                };
            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
                CstyleBehaviour.recordAutoInsert(editor, session, "]");
                return {
                    text: '[]',
                    selection: [1, 1]
                };
            }
        } else if (text == ']') {
            initContext(editor);
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == ']') {
                var matching = session.$findOpeningBracket(']', {column: cursor.column + 1, row: cursor.row});
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) {
                    CstyleBehaviour.popAutoInsertedClosing();
                    return {
                        text: '',
                        selection: [1, 1]
                    };
                }
            }
        }
    });

    this.add("brackets", "deletion", function(state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '[') {
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == ']') {
                range.end.column++;
                return range;
            }
        }
    });

    this.add("string_dquotes", "insertion", function(state, action, editor, session, text) {
        if (text == '"' || text == "'") {
            initContext(editor);
            var quote = text;
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && selected !== "'" && selected != '"' && editor.getWrapBehavioursEnabled()) {
                return {
                    text: quote + selected + quote,
                    selection: false
                };
            } else {
                var cursor = editor.getCursorPosition();
                var line = session.doc.getLine(cursor.row);
                var leftChar = line.substring(cursor.column-1, cursor.column);
                if (leftChar == '\\') {
                    return null;
                }
                var tokens = session.getTokens(selection.start.row);
                var col = 0, token;
                var quotepos = -1; // Track whether we're inside an open quote.

                for (var x = 0; x < tokens.length; x++) {
                    token = tokens[x];
                    if (token.type == "string") {
                      quotepos = -1;
                    } else if (quotepos < 0) {
                      quotepos = token.value.indexOf(quote);
                    }
                    if ((token.value.length + col) > selection.start.column) {
                        break;
                    }
                    col += tokens[x].value.length;
                }
                if (!token || (quotepos < 0 && token.type !== "comment" && (token.type !== "string" || ((selection.start.column !== token.value.length+col-1) && token.value.lastIndexOf(quote) === token.value.length-1)))) {
                    if (!CstyleBehaviour.isSaneInsertion(editor, session))
                        return;
                    return {
                        text: quote + quote,
                        selection: [1,1]
                    };
                } else if (token && token.type === "string") {
                    var rightChar = line.substring(cursor.column, cursor.column + 1);
                    if (rightChar == quote) {
                        return {
                            text: '',
                            selection: [1, 1]
                        };
                    }
                }
            }
        }
    });

    this.add("string_dquotes", "deletion", function(state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && (selected == '"' || selected == "'")) {
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == selected) {
                range.end.column++;
                return range;
            }
        }
    });

};

    
CstyleBehaviour.isSaneInsertion = function(editor, session) {
    var cursor = editor.getCursorPosition();
    var iterator = new TokenIterator(session, cursor.row, cursor.column);
    if (!this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS)) {
        var iterator2 = new TokenIterator(session, cursor.row, cursor.column + 1);
        if (!this.$matchTokenType(iterator2.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS))
            return false;
    }
    iterator.stepForward();
    return iterator.getCurrentTokenRow() !== cursor.row ||
        this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_BEFORE_TOKENS);
};

CstyleBehaviour.$matchTokenType = function(token, types) {
    return types.indexOf(token.type || token) > -1;
};

CstyleBehaviour.recordAutoInsert = function(editor, session, bracket) {
    var cursor = editor.getCursorPosition();
    var line = session.doc.getLine(cursor.row);
    if (!this.isAutoInsertedClosing(cursor, line, context.autoInsertedLineEnd[0]))
        context.autoInsertedBrackets = 0;
    context.autoInsertedRow = cursor.row;
    context.autoInsertedLineEnd = bracket + line.substr(cursor.column);
    context.autoInsertedBrackets++;
};

CstyleBehaviour.recordMaybeInsert = function(editor, session, bracket) {
    var cursor = editor.getCursorPosition();
    var line = session.doc.getLine(cursor.row);
    if (!this.isMaybeInsertedClosing(cursor, line))
        context.maybeInsertedBrackets = 0;
    context.maybeInsertedRow = cursor.row;
    context.maybeInsertedLineStart = line.substr(0, cursor.column) + bracket;
    context.maybeInsertedLineEnd = line.substr(cursor.column);
    context.maybeInsertedBrackets++;
};

CstyleBehaviour.isAutoInsertedClosing = function(cursor, line, bracket) {
    return context.autoInsertedBrackets > 0 &&
        cursor.row === context.autoInsertedRow &&
        bracket === context.autoInsertedLineEnd[0] &&
        line.substr(cursor.column) === context.autoInsertedLineEnd;
};

CstyleBehaviour.isMaybeInsertedClosing = function(cursor, line) {
    return context.maybeInsertedBrackets > 0 &&
        cursor.row === context.maybeInsertedRow &&
        line.substr(cursor.column) === context.maybeInsertedLineEnd &&
        line.substr(0, cursor.column) == context.maybeInsertedLineStart;
};

CstyleBehaviour.popAutoInsertedClosing = function() {
    context.autoInsertedLineEnd = context.autoInsertedLineEnd.substr(1);
    context.autoInsertedBrackets--;
};

CstyleBehaviour.clearMaybeInsertedClosing = function() {
    if (context) {
        context.maybeInsertedBrackets = 0;
        context.maybeInsertedRow = -1;
    }
};



oop.inherits(CstyleBehaviour, Behaviour);

exports.CstyleBehaviour = CstyleBehaviour;
});

define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }
            
            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };

}).call(FoldMode.prototype);

});

define("ace/mode/php",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/php_highlight_rules","ace/mode/php_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/worker/worker_client","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle","ace/unicode"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var PhpHighlightRules = require("./php_highlight_rules").PhpHighlightRules;
var PhpLangHighlightRules = require("./php_highlight_rules").PhpLangHighlightRules;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var Range = require("../range").Range;
var WorkerClient = require("../worker/worker_client").WorkerClient;
var CstyleBehaviour = require("./behaviour/cstyle").CstyleBehaviour;
var CStyleFoldMode = require("./folding/cstyle").FoldMode;
var unicode = require("../unicode");

var Mode = function(opts) {
    this.inlinePhp = opts && opts.inline;
    var HighlightRules = this.inlinePhp ? PhpLangHighlightRules : PhpHighlightRules;
    this.HighlightRules = HighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CstyleBehaviour();
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {

    this.tokenRe = new RegExp("^["
        + unicode.packages.L
        + unicode.packages.Mn + unicode.packages.Mc
        + unicode.packages.Nd
        + unicode.packages.Pc + "\_]+", "g"
    );
    
    this.nonTokenRe = new RegExp("^(?:[^"
        + unicode.packages.L
        + unicode.packages.Mn + unicode.packages.Mc
        + unicode.packages.Nd
        + unicode.packages.Pc + "\_]|\s])+", "g"
    );

       
    this.lineCommentStart = ["//", "#"];
    this.blockComment = {start: "/*", end: "*/"};

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        var endState = tokenizedLine.state;


        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "php-start") {
            var match = line.match(/^.*[\{\(\[\:]\s*$/);
            if (match) {
                indent += tab;
            }
        } else if (state == "php-doc-start") {
            if (endState != "php-doc-start") {
                return "";
            }
            var match = line.match(/^\s*(\/?)\*/);
            if (match) {
                if (match[1]) {
                    indent += " ";
                }
                indent += "* ";
            }
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };

    this.createWorker = function(session) {
        var worker = new WorkerClient(["ace"], "ace/mode/php_worker", "PhpWorker");
        worker.attachToDocument(session.getDocument());
        
        if (this.inlinePhp)
            worker.call("setOptions", [{inline: true}]);

        worker.on("error", function(e) {
            session.setAnnotations(e.data);
        });

        worker.on("ok", function() {
            session.clearAnnotations();
        });

        return worker;
    };

    this.$id = "ace/mode/php";
}).call(Mode.prototype);

exports.Mode = Mode;
});
