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
  - CwFeedback
  
version:
  0.8
...
*/

CwFeedback = new Class({

	Implements: [Options,Events],

	options: {
		url: 'ajax.php', // ajax url - set to false if you don't use ajax
		ajaxMethod: 'get', // use get or post for the request?
		ajaxParam: 'vote', // name of parameter for the request (..url.php?vote=..)
		
		possibleValues: [1, 2, 3], // possible values
		initialValue: false, // optional, to select an element initially		
		multipleVotes: true, // is it allowed to change the selection?
		
		onSelectInitially: function(el, value) { this.fireEvent('select', [el, value]); }, // element is already selected at the beginning, overwrite if necessary

		// onRequestStarted: function(), // ajax request has started
		// onFail: function(errortext), // failure while request
		
		// onSelect: function(el, value, response), // element was selected
		// onUnselect: function(el, value), // previously selected element is now unselected
		// onFeedbackDone: function(el, value, others), // user has voted and no more votes possible
	},

	initialize: function(element, options)
	{
		if (!$(element)) { return; }
		
		this.element = element;
		this.hasVoted = false;
		this.setOptions(options);
		
		// value present? select it
		if (this.options.initialValue && this.valueIsReasonable(this.options.initialValue)) {
			this.value = this.options.initialValue;
			this.fireEvent('selectInitially', [$(this.element+'_'+this.value), this.value]);
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
	
	getValue: function()
	{
		return this.value;
	},
	
	unselectValue: function(oldvalue)
	{
		this.fireEvent('unselect', [$(this.element+'_'+oldvalue), oldvalue]);
	},
	
	disableVoting: function()
	{
		this.fireEvent('feedbackDone', [$(this.element+'_'+this.value), this.value, $$('#'+this.element+'>.[id!='+this.element+'_'+this.value+']')]);
	},
	
	valueIsReasonable: function(value)
	{
		if (!value) return false;
		return (this.options.possibleValues.indexOf(value) != -1);
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
		
		// start request
		if (this.request) {
			this.newvalue = newvalue;
			requestparams = this.options.ajaxParam+"="+newvalue;
			if (params) {
				requestparams = requestparams+"&"+params;
			}
			
			this.request.send(requestparams);
			
		}
		else {
			if (this.value && this.value != newvalue) {
				this.unselectValue(this.value);
			}		
			this.selectValue(newvalue);	
		}
	},

});