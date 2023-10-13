// どうするか。urlでぺーじを開く、ページを開いたら、開ききるまでまつ。処理をし続けるようにする。ページ遷移してもjsの処理をし続けるには？
// 遷移後もこのページの処理を続けるのは困難。やるとしたら、URlリストと学問名を保存しておいて、研究者ページにいるときは、処理を進め、最後にホームページに戻る。
// そのページがホームページあるいは、研究者の詳細ページそのものでなければ、次のURLに移動する。そのとき、URLリストで現在どこまで処理しているかを記録する。
/*
必要なデータ
allurl = [url1, url2, url3, ...]
currentIndex = 0
major = "xxx"
*/
let currentUrl;
let urlList = [];
let major;
let professor;
let currentIndex;
let localUrlList = [];
const yourNameInput = "森田未来";
const homeUrl = "https://jglobal.jst.go.jp/";
const researchUrl = "https://jglobal.jst.go.jp/detail?";
const mailUrl = "https://jglobal.jst.go.jp/mail/researcher";
/*
https://jglobal.jst.go.jp/detail?JGLOBAL_ID=200901010933262107
https://jglobal.jst.go.jp/detail?JGLOBAL_ID=200901077390402970
https://jglobal.jst.go.jp/detail?JGLOBAL_ID=200901021347989237
https://jglobal.jst.go.jp/detail?JGLOBAL_ID=200901093472221635
https://jglobal.jst.go.jp/detail?JGLOBAL_ID=200901085498106432

*/

currentUrl = window.location.href;
currentIndex = 0;
localUrlList = JSON.parse(localStorage.getItem("urlList"));

const moveNextUrl = () => {
  //   初回のみ、0、かつそれ以降は、次のindexを保存
  currentIndex = localStorage.getItem("currentIndex");
  currentIndex =
    currentIndex == null || currentIndex == "" ? 0 : JSON.parse(currentIndex);
  // 遷移用のURLリスト
  localUrlList = JSON.parse(localStorage.getItem("urlList"));
  // indxの保存
  currentIndex += 1;
  localStorage.setItem("currentIndex", currentIndex);
  // 遷移

  location.href = localUrlList[currentIndex - 1];
};

if (currentUrl == homeUrl) {
  if (confirm("URLリストを作成しますか？")) {
    // localStorage 削除
    localStorage.clear("urlList");
    localStorage.clear("major");
    localStorage.clear("currentIndex");
    // 追加
    urlList = prompt("URLのlistを入力してください");
    urlList = urlList.split(" ");
    major = prompt("研究者の専門分野を書いてください:");
    localStorage.setItem("urlList", JSON.stringify(urlList));
    localStorage.setItem("major", JSON.stringify(major));
  }
  moveNextUrl();
} else if (currentUrl.includes(researchUrl)) {
  const contactBtn = document.querySelector(
    "#detail_v > div.contents > div > div.contents_in_main > div > div.search_detail_topbox > button"
  );
  // URLoverチェック
  if (currentIndex < localUrlList.length) {
    if (contactBtn == null) {
      location.href = localUrlList[currentIndex++];
      moveNextUrl();
    }
  } else {
    console.log("End of urlList reached");
  }
  contactBtn.click();
} else if (currentUrl.includes(mailUrl)) {
  // 順番の逆転
  const backToResearchBtn = document.querySelector(
    "#researcher_contact_v > div > div > div.btn_center > div > a"
  );
  if (backToResearchBtn != null) {
    moveNextUrl();
  }

  const sentBtn = document.querySelector(
    "#researcher_contact_v > div > form > div.btn_center > div > button.btn_l.btn_color_1"
  );
  sentBtn.click();

  professor = document
    .getElementsByTagName("td")[1]
    .innerHTML.trim()
    .replace(/　/g, "");
  major = JSON.parse(localStorage.getItem("major"));
  const yourCompanyNameInput = "株式会社PRES";
  const subjectInput = professor + "先生へ記事監修のご依頼 - 株式会社PRES";
  const messageTextarea =
    professor +
    "先生\n突然のご連絡を失礼いたします、株式会社PRESの森田と申します。\nこのたびは" +
    professor +
    "先生に、企業が公開するWeb記事の監修についてご相談したく、ご連絡させていただいております。\n弊社は「研究者の方々が研究のみに没頭できる世界を作る」を理念とした新興企業(スタートアップ)です。投資機関・銀行から1.2億円を調達し、いくつかの産学連携マッチング事業を立ち上げました。\nこの事業を通じ、なるべく多くの研究資金を研究者の方々へお渡しすることで、国内研究業界の課題の一つと言われる研究資金不足を解決しようと挑戦しております。\nこのたびは、" +
    major +
    "学分野に関するWeb記事の監修にご協力いただける先生を探しており、大学・研究室HPや科研費データベースなどから、" +
    professor +
    "先生を拝見し、ご連絡させていただいております。\n監修依頼料についてですが、1記事につき「月額1万円×記事の掲載期間」をお支払いいたします。\n通常1社あたり3-4記事単位でご依頼いただいており、またもしご迷惑でなければ本件以外にも" +
    professor +
    "先生にお願いできそうな案件を積極的にご紹介させていただこうと思っております。\nもしご興味を持っていただけましたら、ぜひオンラインにて本事業の詳細についてご説明させていただきますので、本メールにご返信いただけると幸いです。私より日程候補をご提案させていただきます。\n突然のご連絡をしてしまい大変申し訳ございません。ご多用の中大変恐縮ですが、ご検討のほど何卒よろしくお願いいたします。";

  const nameBox = document.querySelector('input[name="your_name"]');
  nameBox.value = yourNameInput;
  const companyBox = document.querySelector('input[name="your_aff"]');
  companyBox.value = yourCompanyNameInput;
  const subject = document.querySelector('input[name="subject"]');
  subject.value = subjectInput;
  const message = document.querySelector('textarea[name="message"]');
  message.value = messageTextarea;

  const your_aff_type = document.querySelector(
    'input[name="your_aff_type"][value="1"]'
  );
  your_aff_type.click();
  const your_job_typeBox = document.querySelector(
    'input[name="your_job_type"][value="2"]'
  );
  your_job_typeBox.click();
  const your_purposeBox = document.querySelector(
    'input[name="your_purpose"][value="5"]'
  );
  your_purposeBox.click();
  const agreeCheckbox = document.querySelector('input[type="checkbox"]');
  agreeCheckbox.click();

  const sendButton = document.querySelector("#rc_form_confirm");
  sendButton.click();
  console.log("sendButton");
}
