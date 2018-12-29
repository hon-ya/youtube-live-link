const createElementFromHTML = htmlString => {
  var e = document.createElement('div');
  e.innerHTML = htmlString.trim();
  return e.firstChild; 
};

const init = async() => {

  let liveUrlStr = `
    <div style="font-size: 16px; width: 36px; height: 24px; margin: 10px 0px;">
      <a id="yll-link" href="${location.href}/live">/live</a>
    </div>
  `;
  let liveUrl = createElementFromHTML(liveUrlStr);

  let buttonRenderer = document.querySelector('ytd-subscribe-button-renderer');
  buttonRenderer.appendChild(liveUrl);

  (document.body || document.documentElement).addEventListener('transitionend', () => {
    liveUrl.querySelector("#yll-link").href = `${location.href}/live`;
  });
};
init();
