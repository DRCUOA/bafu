// custom helper to render arrays with single or multiple arrays (work-around 2 min object issues on standard each helper)
//dev debug logging
const debug = require('debug');
const devCustomHelpers = debug('devLog:CustomHelpers');

const Handlebars = require('handlebars');

function register() {
  Handlebars.registerHelper('custom-each', function (context, options) {
    devCustomHelpers('array START:', context, ' :array END');
    let result = "";
    let item = context.value || context;
    for (let i = 0, j = item.length; i < j; i++) {
      result = result + options.fn(item[i]);
    }
    return result;
  });
};

module.exports = {
  register: register
};