let isInject = false;

chrome.action.onClicked.addListener(async (tab) => {
  
  if (isInject) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {greeting: "show"});
    // do something with response here, not outside the function
    console.log(response);
    return;
  } 

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['static/js/main.js', ]
  });
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ['static/css/main.css', ]
  })

  isInject = true;
});

