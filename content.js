var names = [];
var url = chrome.runtime.getURL("listOfNames.json");

function listen(){

  $("*").find("button").click(function(){
    console.log("Button was clicked");
    names = [];
    parentObserver.observe(schedulerAppElement, {subtree: true, childList: true});
  });
  $("*").find("a").click(function(){
    console.log("Button was clicked");
    names = [];
    parentObserver.observe(schedulerAppElement, {subtree: true, childList: true});
  });
}




const schedulerAppElement = document.querySelector("#scheduler-app");

const parentObserver = new MutationObserver(function() {
    if($("#enabled_panel").length >0){
      $( "tbody tr td:nth-child(6) div div div span").each( function(index){
          names.push($(this).text());
          $(this).attr('id', 'id_' + index);
      });
      console.log(names);
      console.log("Observer disconnecting");
      listen();
      // getProfessorList();
      // console.log(x);
      $.getJSON(url, function(data){
        for(var i=0; i<names.length; i++){
          data.filter(function(e){
            let nameInData = e.name;
            let nameToSearch = names[i];
            nameInData = nameInData.toLowerCase();
            nameToSearch = nameToSearch.toLowerCase();
            if(nameInData == nameToSearch){
              $("#id_" + i).append("<br/><a class='linkToSite' href='https://www.ratemyprofessors.com/ShowRatings.jsp?tid=" + e.ID +  "' target='_blank'>" + e.score + "</a>");
            }
          });
        }
      });
      parentObserver.disconnect();
    }
});

parentObserver.observe(schedulerAppElement, {subtree: true, childList: true});




//this is a test below:
