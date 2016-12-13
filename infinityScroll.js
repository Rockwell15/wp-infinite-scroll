infiniteScroll = (function() {

	var

	$window = $(window),
	$doc    = $(document),

	// the selector of the container to infinie scroll
	selector,

	// the current container to infinite scroll
	container,

	// the selector for the items in the infinite scroll
	delimiter,

	// the new container
	newCon,

	// the content to be appended once the user scrolls far enough
	nextContent,

	// url path for pagination
	path = 'page/',

	// page number to retrieve content from next
	page = 2,

	// used to determine if an ajax call is in progress
	called = false,

	init = function( containerSelector, itemSelector ) {

		// bind the current selector
		selector = containerSelector;

		// bind the current container
		container = $( selector );

		// bind the item selector
		delimiter = itemSelector;

		// if the container doesn't exist, nothing we can do
		if ( ! container.length ) {
			return;
		}

		// preload the content
		getInfinityRows();

		// listen to window scrolling
		$window.bind( 'scroll', onScroll );

	},

	// on window scroll, do this
	onScroll = function() {

		// we only want to ask for a specific page once
		if ( ! called ) {

			// we only add the content once the bottom of the holding container is visible
			if ( container.position().top + container.outerHeight() < $window.scrollTop() + $window.height() ) {

				addInfinityRows();

			}

		}

	},

	// preload the next rows
	getInfinityRows = function() {

		// make sure we don't duplicate the call for this page
		called = true;

		// make the request
		$.get( path + page++, function( data ) {

			// grab the new content container
			newCon = $( data ).find( selector );

			// if there is no more content to fetch our job is done
			if ( ! newCon.find( delimiter ).length ) {

				// unbind our scroll event
				$window.unbind( 'scroll', onScroll );

				// prep for garbage collection
				infiniteScroll = undefined;

				return;

			}

			// grab the new content
			nextContent = newCon.html();

			// if the user scrolled to the bottom of the page 
			if ( $doc.height() <= $window.scrollTop() + $window.height() ) {

				addInfinityRows();

			}

			// we can now call the next page
			called = false;

		});

	},

	// add the next rows to the html & preload the next rows
	addInfinityRows = function() {

		// append the next content to the container
		container.append( nextContent );

		// preload the next content
		getInfinityRows();

	}

	// return the function to bind the container
	return {
		path: path,
		page: page,
		init: init
	};

})();
