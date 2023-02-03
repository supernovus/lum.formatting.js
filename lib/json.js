/**
 * A function and jQuery wrapper for formatting JSON text in a friendly way.
 * @exports module:@lumjs/formatting/json
 */

// Based on http://ketanjetty.com/coldfusion/javascript/format-json/
function formatJSON (val)
{ 
  var retval = '';
  var str = val;
  var pos = 0;
  var strLen = str.length;
  var indentStr = '  ';
  var newLine = "\n";
  var curchar = '';

  for (var i=0; i<strLen; i++)
  { 
    curchar = str.substring(i, i+1);

    if (curchar == '}' || curchar == ']')
    { 
      retval = retval + newLine;
      pos = pos - 1;

      for (var j=0; j<pos; j++)
      { 
        retval = retval + indentStr;
      }
    }

    retval = retval + curchar;

    if (curchar == '{' || curchar == '[' || curchar == ',')
    { 
      retval = retval + newLine;

      if (curchar == '{' || curchar == '[')
      { 
        pos = pos + 1;
      }

      for (var k=0; k<pos; k++)
      { 
        retval = retval + indentStr;
      }
    }
  }

  return retval;

} // format()

module.exports = formatJSON;
