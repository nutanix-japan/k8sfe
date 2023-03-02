var yamlEditor = CodeMirror.fromTextArea(document.getElementById("yaml-editor"), {
  mode: "yaml",
  lineNumbers: true,
  indentUnit: 2,
  tabSize: 2,
  theme: "default",
});

document.getElementById("yaml-form").addEventListener("submit", function(event) {
  event.preventDefault();

  var apiURL = document.getElementById("api-url").value;
  var kubeconfigFile = document.getElementById("kubeconfig-file").files[0];
  var yamlContent = yamlEditor.getValue();

  var formData = new FormData();
  formData.append("kubeconfig", kubeconfigFile);
  formData.append("yaml", yamlContent);

  axios.post(apiURL, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  .then(function(response) {
    console.log("Success:", response);
  })
  .catch(function(error) {
    console.error("Error:", error);
  });
});
