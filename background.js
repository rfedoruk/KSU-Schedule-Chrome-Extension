// background.js
var names = [];
console.log("names");
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
      if (changeInfo.status == 'complete' && tab.active) {

        $( "span" ).each( function(index){
            names.push($(this).text());
        });
        console.log(names);

      }
    });
