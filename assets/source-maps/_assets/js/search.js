(function() {
    
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';
    
      var resultsNum = 10; // setting the number of search output, TODO: pagination of search
      if (results.length > resultsNum) { 
          results.length = resultsNum;
      }

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
          
        appendString += '<li><h2><a href="' + item.url + '">' + item.title + '</a></h2>';
        appendString += '<div class="post-summary"><a href="' + item.url + '">' + item.thumbsmall + '</a><p>' + item.summary.substring(0, 200) + '...</p></div></li>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>No results found</li>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);
      
      var idx = lunr(function () {
            this.field('title');
            this.field('keywords');
            this.field('summary');
            this.field('tags');
            this.field('description');
          
            for (var key in window.store) { 
                this.add({
                    'id': key,
                    'title': window.store[key].title,
                    'keywords': window.store[key].keywords,
                    'summary': window.store[key].summary,
                    'tags': window.store[key].tags,
                    'description': window.store[key].description
                }); 
                
            }
        });
       
        var results = idx.search(searchTerm); // Get lunr to perform a search
        displaySearchResults(results, window.store); 
        
  }
   
})();