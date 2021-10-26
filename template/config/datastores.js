module.exports.datastores = {


  {{#if isdatastore}}
  default: {
    adapter: 'sails-{{datastore}}',
    url: '{{datastore}}://{{username}}:{{password}}@{{datastorehost}}:{{datastoreport}}/{{datastoretable}}',
  },
  {{/if}}


};
