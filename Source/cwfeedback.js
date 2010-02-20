/*
---
description: CwFeedback

authors:
  - Mario Fischer (http://www.chipwreck.de/blog/)

license:
  - MIT-style license

requires:
  core/1.2.3: '*'

provides:
  - CwCVoting
  
version:
  0.5
...
*/

CwFeedback = new Class({

	Implements: [Options,Events],

	options: {
		url: 'ajax.php', // ajax url - set to false to use no ajax
		ajaxMethod: 'get', // use get or post for the request?
		ajaxParam: 'vote', // name of parameter for the request (..url.php?vote=..)
		
		multipleVotes: true, // is it allowed to vote multiple times?
		possibleValues: {min: 1, max: 5}, // possible values
		
		onSelectInitially: function(el, value) { this.fireEvent('select', el); }, // element is selected at the beginning, overwrite if necessary

		onRequestStarted: $empty, // element was selected
		onSelect: $empty, // element was selected
		onUnselect: $empty, // previously selected element is now unselected
		onVotingDone: $empty, // has voted, no more votes possible
		
		onFail: $empty, // failure while request
	},

	initialize: function(element, value, options)
	{
		if (!$(element)) { return; }
		
		this.element = element;
		this.hasVoted = false;
		this.setOptions(options);
		
		// value present? select it
		if (value && this.valueIsReasonable(value)) {
			this.value = value;
			this.fireEvent('selectInitially', [$(this.element+'_'+value), value]);
		}
		
		// build request
		if (this.options.url) {
			this.buildRequest();	
		}
	},
	
	buildRequest: function()
	{
		this.request = new Request.JSON({
			url: this.options.url,
			method: this.options.ajaxMethod,
			
			onRequest: function() { this.fireEvent('requestStarted') }.bind(this),
			onComplete: function() { },
			onSuccess: function(response) { 
				if (this.value && this.value != this.newvalue) {
					this.unselectValue(this.value);
				}		
				this.selectValue(this.newvalue, response);

			}.bind(this),
			onCancel: function() { },
			onFailure: function(xhr) { this.fireEvent('fail', xhr.responseText); }.bind(this),
			onException: function(headerName, value) { this.fireEvent('fail', headerName+value); }.bind(this)
		});
	},

	selectValue: function(newvalue, response)
	{
		this.value = newvalue;
		this.fireEvent('select', [$(this.element+'_'+newvalue), newvalue, response]);
		this.hasVoted = true;
		if (!this.options.multipleVotes) {
			this.disableVoting();
		}
	},
	
	unselectValue: function(oldvalue)
	{
		this.fireEvent('unselect', [$(this.element+'_'+oldvalue), oldvalue]);
	},
	
	disableVoting: function()
	{
		this.fireEvent('votingDone', [$(this.element+'_'+this.value), this.value, $$('#'+this.element+' .[id!='+this.element+'_'+this.value+']')]);
	},
	
	valueIsReasonable: function(value)
	{
		if (!value) return false;
		return true;
	},
	
	doVote: function(newvalue, params)
	{
		if (!this.options.multipleVotes && this.hasVoted) {
			return true;
		}
	
		// value resonable?
		if (!this.valueIsReasonable(newvalue)) {
			return;
		}		
		
		// propagate to ajax
		if (this.request) {
			this.newvalue = newvalue;
			
			this.request.send(this.options.ajaxParam+"="+newvalue);
			if (params) {
			}
		}
		else {
			if (this.value && this.value != newvalue) {
				this.unselectValue(this.value);
			}		
			this.selectValue(newvalue);	
		}
	},
		/*
				var fxr = new Fx.Tween($('uservoting'), {duration: 500, property: 'opacity'});
				var fxs = new Fx.Tween($('uservotingdone'), {duration: 500, property: 'opacity'});

				fxr.start(0).chain(function() {
					 $('uservoting').dispose();
					 this.callChain();
				}).chain(function() {
					fxs.start(1);
					this.callChain();
				}).chain(function() {
					(function() {
						$('uservotingnum').highlight('#999');
						var users = $('uservotingnum').get('text').toInt();
						users++;
						if (users == 1) {
							$('uservotingnum').set('text', users + " user thinks");
						} else {
							$('uservotingnum').set('text', users + " users think");
						}
					}).delay(500);
				});

				var item = $('ifriend');
				if (!item) return;
				var fxr = new Fx.Tween(item, {duration: 500, property: 'opacity'});
	
				fxr.start(0).chain(function() {
					if (responseText == "1") {
						item.removeClass('inofriend');
						item.addClass('ifriend');
						item.set('text', 'You are a fan (Click to change)');
					}
					else {
						item.removeClass('ifriend');
						item.addClass('inofriend');
						item.set('text', 'Become a fan');
					}
					this.callChain();
				}).chain(function() {
					fxr.start(1);
					this.callChain();
				}).delay(500);
		*/

});