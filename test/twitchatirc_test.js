/*global describe,it*/
'use strict';
var assert = require('assert'),
  twitchatirc = require('../lib/twitchatirc.js');

describe('twitchatirc node module.', function() {
  it('must be awesome', function() {
    assert( twitchatirc.awesome(), 'awesome');
  });
});
