function run() {
    let htmlCode = document.getElementById("html-code").value;
    let cssCode = document.getElementById("css-code").value;
    let jsCode = document.getElementById("js-code").value;
    let output = document.getElementById("output");
  
    output.contentDocument.body.innerHTML =
      htmlCode + "<style>" + cssCode + "</style>";
    output.contentWindow.eval(jsCode);
}

const downloadButton = document.getElementById("download-button");
downloadButton.onclick = function () {
    let zip = new JSZip();
    
    zip.file("index.html", document.getElementById("html-code").value);
    zip.file("style.css", document.getElementById("css-code").value);
    zip.file("script.js", document.getElementById("js-code").value);
  
    zip.generateAsync({type: "blob"}).then(function (content) {
      const element = document.createElement('a');
      element.href = URL.createObjectURL(content);
      element.download = "source-files.zip";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    });
};
