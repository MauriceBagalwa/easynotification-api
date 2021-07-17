const agent = require('./agent')
const customer = require('./customer')
const function_ctr = require('./function')
const group = require('./group')
// const mumber = require('./mumber')
const subscription = require('./subscription')
const submit = require('./submit')
module.exports = {
  customer,
  function_ctr,
  agent,
  subscription,
  submit
}