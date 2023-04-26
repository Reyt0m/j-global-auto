chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "searchResearchers") {
	  startResearcherSearch();
	}
  });

  async function startResearcherSearch() {
	const researchersList = prompt("研究者のリストを入力してください（コンマで区切る）:");
	const researchers = researchersList.split(",");

	for (let i = 0; i < researchers.length; i++) {
	  const researcher = researchers[i].trim();
	  await searchResearcherAndSendMessage(researcher);
	}

	alert("リストアップされた研究者の全てをチェックし終わりました");
  }

  async function searchResearcherAndSendMessage(researcher) {
	await waitFor("input#searchBox");
	const searchBox = document.querySelector("input#searchBox");
	searchBox.value = researcher;

	const enterKeyEvent = new KeyboardEvent("keydown", {
	  key: "Enter",
	  code: "Enter",
	  keyCode: 13,
	  which: 13,
	  bubbles: true,
	  cancelable: true,
	});
	searchBox.dispatchEvent(enterKeyEvent);

	await waitFor("a.profile_name");
	const profileLink = document.querySelector("a.profile_name");
	profileLink.click();

	await waitFor("a.contact_author");
	const contactButton = document.querySelector("a.contact_author");
	contactButton.click();

	await waitFor('input[name="your_name"]');
	const yourNameInput = document.querySelector('input[name="your_name"]');
	const subjectInput = document.querySelector('input[name="subject"]');
	const messageTextarea = document.querySelector('textarea[name="message"]');

	yourNameInput.value = "森田未来";
	subjectInput.value = "Connectの紹介";
	messageTextarea.value = "Connectの紹介文";

	const agreeCheckbox = document.querySelector('input[type="checkbox"]');
	agreeCheckbox.click();

	const sendButton = document.querySelector("#rc_form_confirm");
	sendButton.click();

	await sleep(5000); // 5秒待機
  }

  function waitFor(selector) {
	const conditionFunction = () => document.querySelector(selector);
	const poll = (resolve) => {
	  if (conditionFunction()) resolve();
	  else setTimeout(() => poll(resolve), 100);
	};
	return new Promise(poll);
  }

  function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
  }
