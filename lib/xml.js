/**
 * A function and jQuery wrapper for formatting XML text in a friendly way.
 * @exports module:@lumjs/formatting/xml
 */

// Based on a script from:
// http://stackoverflow.com/questions/376373/pretty-printing-xml-with-javascript
function formatXML (xml) 
{
  var reg = /(>)(<)(\/*)/g;
  var wsexp = / *(.*) +\n/g;
  var contexp = /(<.+>)(.+\n)/g;
  xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
  var pad = 0;
  var formatted = '';
  var lines = xml.split('\n');
  var indent = 0;
  var lastType = 'other';
  // 4 types of tags - single, closing, opening, other (text, doctype, comment)
  // - 4*4 = 16 transitions 
  var transitions = 
  {
    'single->single'    : 0,
    'single->closing'   : -1,
    'single->opening'   : 0,
    'single->other'     : 0,
    'closing->single'   : 0,
    'closing->closing'  : -1,
    'closing->opening'  : 0,
    'closing->other'    : 0,
    'opening->single'   : 1,
    'opening->closing'  : 0, 
    'opening->opening'  : 1,
    'opening->other'    : 1,
    'other->single'     : 0,
    'other->closing'    : -1,
    'other->opening'    : 0,
    'other->other'      : 0
  };

  for (var i=0; i < lines.length; i++) 
  {
    var ln = lines[i];
    // Is this line a single tag? e.g. <br />
    var single = Boolean(ln.match(/<.+\/>/));
    // Is this a closing tag? e.g. </a>
    var closing = Boolean(ln.match(/<\/.+>/));
    // Is this even a tag?
    var opening = Boolean(ln.match(/<[^!].*>/)); 
    var type = single ? 'single' : closing ? 'closing' 
        : opening ? 'opening' : 'other';
    var fromTo = lastType + '->' + type;
    lastType = type;
    var padding = '';

    indent += transitions[fromTo];
    for (var j = 0; j < indent; j++) 
    {
      padding += '  ';
    }
    if (fromTo == 'opening->closing')
      formatted = formatted.substr(0, formatted.length - 1) + ln + '\n';
    else
      formatted += padding + ln + '\n';
  }

  return formatted;
}

module.exports = formatXML;
