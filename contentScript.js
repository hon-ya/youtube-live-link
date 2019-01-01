const createElementFromHTML = htmlString => {
  var e = document.createElement("div");
  e.innerHTML = htmlString.trim();
  return e.firstChild; 
};

const init = async() => {

  let addOrUpdate = () => {
    // URL をチェックし、channel 以下の場合にリンクの追加および更新を行う
    if (/^\/channel\/.+/.test(location.pathname)) {

      Array.prototype.slice.call(document.querySelectorAll("ytd-subscribe-button-renderer")).forEach((buttonRenderer) => {
        if (buttonRenderer.className === "style-scope ytd-c4-tabbed-header-renderer") {
          let link = buttonRenderer.querySelector("#yll-link");
          if (link == null) {
            // 追加
            let blockStr = `
              <div id="yll-block" style="font-size: 16px; width: 36px; height: 24px; margin: 10px 0px;">
                <a id="yll-link" href="${location.pathname}/live">/live</a>
              </div>
            `;
            let blockHtml = createElementFromHTML(blockStr);
            buttonRenderer.appendChild(blockHtml);
          } else {
            // 更新
            link.href = `${location.pathname}/live`;
          }
        }
      });
    }
  }

  // スクリプト初回実行時にとりあえず追加を試みる
  addOrUpdate();

  (document.body || document.documentElement).addEventListener("transitionend", () => {
    // チャンネルページ移動が行われる場合に追加あるいは更新を試みる
    addOrUpdate();
  });
};
init();
