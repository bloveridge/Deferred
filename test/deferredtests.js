var vows = require("vows"),
	assert = require("assert"),
	Deferred = require("deferred");

vows.describe('Deferred Object').addBatch({
	"when calling deferred as a function": {
		topic : Deferred(),
		'we get a deferred object': function(topic){
			assert.ok(typeof topic === "object" 
				&& typeof topic.resolve === "function");
		},
		'the deferred object has all the appropriate methods' : function(topic){
			assert.ok(typeof topic.reject === "function");
			assert.ok(typeof topic.resolveWith === "function");
			assert.ok(typeof topic.rejectWith === "function");
			assert.ok(typeof topic.promise === "function");
			assert.ok(typeof topic.isResolved === "function");
		},
		'the deferred object can take call backs' : function( topic ){
			assert.ok(topic.done(function(){
				assert.ok(true);
			}));
			assert.ok(topic.resolve());
		},
		'the deferred object will execute callbacks even after being resolved' : function( topic ){
			assert.ok(topic.isResolved());
			topic.done(function(){
				assert.ok(true);
			});
		}
	},
	"when calling deferred as a constructor": {
		topic : new Deferred(),
		'we get a deferred object': function(topic){
			assert.ok(typeof topic === "object" 
				&& typeof topic.resolve === "function");
		},
		'the deferred object has all the appropriate methods' : function(topic){
			assert.ok(typeof topic.reject === "function");
			assert.ok(typeof topic.resolveWith === "function");
			assert.ok(typeof topic.rejectWith === "function");
			assert.ok(typeof topic.promise === "function");
			assert.ok(typeof topic.isResolved === "function");
		},
		'the deferred object can take call backs' : function( topic ){
			assert.ok(topic.done(function(){
				assert.ok(true);
			}));
			assert.ok(topic.resolve());
		},
		'the deferred object will execute callbacks even after being resolved' : function( topic ){
			assert.ok(topic.isResolved());
			topic.done(function(){
				assert.ok(true);
			});
		}
	},
	"when using the when method to group deferreds" : {
		topic : function(){
			var x = [
				Deferred(),
				Deferred(),
				Deferred(),
				new Deferred()
			];
			var y = Deferred.when.apply(Deferred(), x);
			y.x = x;
			return y;
		},
		'the promise of when cannot be resolved or rejected directly' : function ( topic ) {
			assert.ok(!topic.resolve);
			assert.ok(!topic.reject);
		},
		'the promise can have callbacks added to it' : function ( topic ) {
			assert.ok(topic.done(function( val ){
				assert.ok(val);
			}));
		},
		'the resolution of the deferred objects triggers the resolution of the when' : function ( topic ) {
			topic.x.forEach(function(d){
				d.resolve(true);
			});
		},
		'the promise can still make callbacks even after being resolved' : function( topic ){
			topic.done(function(val){
				assert.ok(val);
			});
		}
	}
 }).export(module);