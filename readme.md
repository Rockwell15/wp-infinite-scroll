# WP Infinite Scroll

Lightweight function to turn `/page/#` style pagination to infinite scroll in WordPress

### Usage

```

// set the pagination path ( defaults to 'path/' )
infiniteScroll.path = 'path/';

// set the next page to get ( defaults to 2 )
infiniteScroll.page = 4

// set the container up for infinite scroll
infiniteScroll.init( '#container-selector', '.item-selector' );

```