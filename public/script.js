window.onload = function() {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');

    var previousMarkdownValue;

    var convertTextAreaToMarkdown = function(){
        var markdownText = pad.value;
        previousMarkdownValue = markdownText;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    var didChangeOccur = function(){
        if(previousMarkdownValue != pad.value){
            return true;
        }
        return false;
    };

    setInterval(function(){
        if(didChangeOccur()){
            convertTextAreaToMarkdown();
        }
    }, 1000);

    pad.addEventListener('input', convertTextAreaToMarkdown);

    // checks path, if homepage, it ignores it
    // keeps text area in sync with all other users
    if(document.location.pathname > 1) {
        let documentName = document.location.pathname.substring(1); // removes `/` from path
        sharejs.open(documentName, 'text', function(error, doc) {
            doc.attach_textarea(pad);
            convertTextAreaToMarkdown();
        }); 
    }

    // convert on page load
    convertTextAreaToMarkdown();
};