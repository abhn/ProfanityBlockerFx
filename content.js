let NOT_COOL_WORDS = []

let notCoolWorldsRegex = new RegExp(NOT_COOL_WORDS.join("|"), 'gi');

function isExcluded(elm) {
  if (elm.tagName == "STYLE") {
    return true;
  }
  if (elm.tagName == "SCRIPT") {
    return true;
  }
  if (elm.tagName == "NOSCRIPT") {
    return true;
  }
  if (elm.tagName == "IFRAME") {
    return true;
  }
  if (elm.tagName == "OBJECT") {
    return true;
  }
  return false
}

function traverse(elm) {
  if (elm.nodeType == Node.ELEMENT_NODE || elm.nodeType == Node.DOCUMENT_NODE) {
    if (isExcluded(elm)) {
      return
    }

    for (let i=0; i < elm.childNodes.length; i++) {
      traverse(elm.childNodes[i]);
    }
  }

  if (elm.nodeType == Node.TEXT_NODE) {
    if (elm.nodeValue.trim() == "") {
      return
    }
    
    const stringInElem = elm.nodeValue;
    const cleanString = stringInElem.replace(notCoolWorldsRegex, '*****')
    elm.nodeValue = cleanString;
  }
}

browser.runtime.onMessage.addListener(({wordList}) => {  
  notCoolWorldsRegex = new RegExp(wordList.join("|"), 'gi');
  traverse(document.querySelector('body'));
})
