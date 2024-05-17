// Initialize CodeMirror for HTML
var htmlEditor = CodeMirror.fromTextArea(document.getElementById("html-code"), {
  mode: "htmlmixed",
  theme: "yonce",
  lineNumbers: true,
  autoCloseTags: true,
  autoCloseBrackets: true,
});

// Initialize CodeMirror for CSS
var cssEditor = CodeMirror.fromTextArea(document.getElementById("css-code"), {
  mode: "css",
  theme: "yonce",
  lineNumbers: true,
  autoCloseTags: true,
  autoCloseBrackets: true,
});

// Initialize CodeMirror for JavaScript
var jsEditor = CodeMirror.fromTextArea(document.getElementById("js-code"), {
  mode: "javascript",
  theme: "yonce",
  lineNumbers: true,
  autoCloseTags: true,
  autoCloseBrackets: true,
});

// Function to update the output
function run() {
  let htmlCode = htmlEditor.getValue();
  let cssCode = cssEditor.getValue();
  let jsCode = jsEditor.getValue();
  let output = document.getElementById("output");

  output.contentDocument.body.innerHTML =
    htmlCode + "<style>" + cssCode + "</style>";
  output.contentWindow.eval(jsCode);
}

// Add event listeners to CodeMirror instances to run the code
htmlEditor.on("change", run);
cssEditor.on("change", run);
jsEditor.on("change", run);

// Download function
const downloadButton = document.getElementById("download-button");
downloadButton.onclick = function () {
  let zip = new JSZip();

  zip.file("index.html", htmlEditor.getValue());
  zip.file("style.css", cssEditor.getValue());
  zip.file("script.js", jsEditor.getValue());

  zip.generateAsync({ type: "blob" }).then(function (content) {
    const element = document.createElement("a");
    element.href = URL.createObjectURL(content);
    element.download = "source-files.zip";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  });
};
