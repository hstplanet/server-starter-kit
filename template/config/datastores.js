module.exports.datastores = {


  {{#if isdatastore}}
  default: {
    
    adapter: 'sails-{{datastore}}',
    url: '{{datastore}}://{{username}}:{{password}}@localhost:{{datastoreport}}/gateway_server',
    
  },
  {{/if}}


};
