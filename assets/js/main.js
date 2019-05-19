window.addCopyButton = function() {};

(function() {
  if (navigator && navigator.clipboard) {
    addCopyButton(navigator.clipboard);
  } else {
    var script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/clipboard-polyfill/2.8.0/clipboard-polyfill.js";
    script.integrity = "sha256-R5exLutdG2AICAp7jqb0ubzDpJQRugtQo2LQ/lIWnQo=";
    script.crossOrigin = "anonymous";
    script.onload = function() {
      addCopyButton(clipboard);
    };
    document.body.appendChild(script);
  }

  function addCopyButton(clipboard) {
    document.addEventListener("DOMContentLoaded", function() {
      const firstCode = document.querySelector(".highlight");
      if (firstCode) {
        const oneColumn = firstCode.childNodes[0].tagName === "PRE";
        document.querySelectorAll(".highlight").forEach(function(highlight) {
          const button = document.createElement("button");
          button.className = "copy-code-button";
          button.type = "button";
          button.innerText = "Copy";

          const src = oneColumn
            ? highlight.querySelector("pre")
            : highlight.querySelector("td:nth-child(2) > pre");
          button.addEventListener("click", function() {
            clipboard.writeText(src.innerText).then(
              function() {
                /* Chrome doesn't seem to blur automatically,

                 leaving the button in a focused state. */

                button.blur();
                button.innerText = "Copied!";
                setTimeout(function() {
                  button.innerText = "Copy";
                }, 2000);
              },
              function() {
                button.innerText = "Error";
              }
            );
          });
          highlight.parentNode.insertBefore(button, highlight);
        });
      }
    });
  }
})();
