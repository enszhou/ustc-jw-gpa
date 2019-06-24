function invoke_gpa() {
    console.log("you are acessing gpa");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.pageAction.show(tabs[0].id);
        chrome.tabs.sendMessage(tabs[0].id, { greeting: "114514" });
    });
}

var callback = invoke_gpa;
var filter = {
    urls: ["https://jw.ustc.edu.cn/eams5/for-std/grade/sheet/info/*", "https://jw.ustc.edu.cn/for-std/grade/sheet/info/*"]
};

chrome.webRequest.onCompleted.addListener(callback, filter);
chrome.pageAction.onClicked.addListener(function () {
    chrome.tabs.create({ url: 'https://www.teach.ustc.edu.cn/?s=%E9%80%80%E5%AD%A6' });
});