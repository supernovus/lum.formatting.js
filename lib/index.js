const core = require('@lumjs/core');
const lazy = core.lazy;
const E = core.def.e;

/**
 * Simple formatting functions
 * @module @lumjs/formatting
 */

/**
 * Format JSON (lazy-loaded function)
 * @name module:@lumjs/formatting.JSON
 * @see module:@lumjs/formatting/json
 */
lazy(exports, 'JSON', () => require('./json'), E);

/**
 * Format XML (lazy-loaded function)
 * @name module:@lumjs/formatting.XML
 * @see module:@lumjs/formatting/xml
 */
lazy(exports, 'XML', () => require('./xml'), E);
