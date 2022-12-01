document.querySelector('#submit').addEventListener('click', () => {
  const newWord = document.querySelector('input').value;
  
  browser.storage.sync.get().then(syncStore => {
    const wordList = syncStore.wordList;
    if(!wordList || wordList.length === 0|| !Array.isArray(wordList)) {
      browser.storage.sync.set({
        wordList: [newWord]
      })
        .then(() => {})
        .catch(e => console.log(e));
    } else {
      browser.storage.sync.set({
        wordList: [...wordList, newWord]
      })
        .then(() => {})
        .catch(e => console.log(e));
    }
  })
})

document.querySelector('#clear').addEventListener('click', () => {
  browser.storage.sync.clear();
})

browser.storage.sync.get().then(({wordList}) => {
  browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
    browser.tabs.sendMessage(tabs[0].id, {wordList});
  })  
})
