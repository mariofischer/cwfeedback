Class: CwFeedback {#CwFeedback}
===============================



### Implements:

Options, Events




CwFeedback Method: onSelectInitially {#CwFeedback:onSelectInitially}
---------------------------------------------------------------------


### Syntax:



### Arguments:

1. el - (**)
2. value - (**)


CwFeedback Method: constructor {#CwFeedback:constructor}
---------------------------------------------------------


### Syntax:

	var myCwFeedback = new CwFeedback(element, options);

### Arguments:

1. element - (**)
2. options - (**)

### Options:

* url - (**)
* ajaxMethod - (**)
* ajaxParam - (**)
* possibleValues - (**)
* initialValue - (**)
* multipleVotes - (**)

### Events:

* onSelectInitially -

### Returns:





CwFeedback Method: buildRequest {#CwFeedback:buildRequest}
-----------------------------------------------------------


### Syntax:




CwFeedback Method: onRequest {#CwFeedback:onRequest}
-----------------------------------------------------


### Syntax:




CwFeedback Method: onComplete {#CwFeedback:onComplete}
-------------------------------------------------------


### Syntax:




CwFeedback Method: onSuccess {#CwFeedback:onSuccess}
-----------------------------------------------------


### Syntax:



### Arguments:

1. response - (**)


CwFeedback Method: onCancel {#CwFeedback:onCancel}
---------------------------------------------------


### Syntax:




CwFeedback Method: onFailure {#CwFeedback:onFailure}
-----------------------------------------------------


### Syntax:



### Arguments:

1. xhr - (**)


CwFeedback Method: onException {#CwFeedback:onException}
---------------------------------------------------------


### Syntax:



### Arguments:

1. headerName - (**)
2. value - (**)


CwFeedback Method: selectValue {#CwFeedback:selectValue}
---------------------------------------------------------


### Syntax:



### Arguments:

1. newvalue - (**)
2. response - (**)


CwFeedback Method: getValue {#CwFeedback:getValue}
---------------------------------------------------


### Syntax:



### Returns:





CwFeedback Method: unselectValue {#CwFeedback:unselectValue}
-------------------------------------------------------------


### Syntax:



### Arguments:

1. oldvalue - (**)


CwFeedback Method: disableVoting {#CwFeedback:disableVoting}
-------------------------------------------------------------


### Syntax:




CwFeedback Method: valueIsReasonable {#CwFeedback:valueIsReasonable}
---------------------------------------------------------------------


### Syntax:



### Arguments:

1. value - (**)

### Returns:





CwFeedback Method: doVote {#CwFeedback:doVote}
-----------------------------------------------


### Syntax:



### Arguments:

1. newvalue - (**)
2. params - (**)

### Returns:




