chrome.action.onClicked.addListener(async (tab) => {
	const url = 'https://jglobal.jst.go.jp';

	chrome.tabs.query({ url: `${url}/*` }, (tabs) => {
	  if (tabs && tabs.length > 0) {
		const existingTab = tabs[0];
		chrome.tabs.update(existingTab.id, { active: true });
		// タブが完全に読み込まれたらメッセージを送信する
		chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
		  if (tabId === existingTab.id && info.status === 'complete') {
			chrome.tabs.sendMessage(existingTab.id, { action: 'searchResearchers' });
			chrome.tabs.onUpdated.removeListener(listener);
		  }
		});
	  } else {
		chrome.tabs.create({ url }, (newTab) => {
		  // タブが完全に読み込まれたらメッセージを送信する
		  chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
			if (tabId === newTab.id && info.status === 'complete') {
			  chrome.tabs.sendMessage(newTab.id, { action: 'searchResearchers' });
			  chrome.tabs.onUpdated.removeListener(listener);
			}
		  });
		});
	  }
	});
  });

  // ... その他の関数（findTabByUrl）は使用しなくなったため削除します。
