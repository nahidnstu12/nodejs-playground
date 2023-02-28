const puppeteer = require("puppeteer");
(async () => {
  try {
    let url = "https://entrptaher.github.io/playground-partial-extraction/";
    const browser = await puppeteer.launch(url);
    const page = await browser.newPage();
    await page.goto(url);
    data = await page.evaluate(() => {
      titleList = Array.from(document.querySelectorAll(".title"));
      subtitleList = Array.from(document.querySelectorAll(".subtitle"));
      root = document.querySelector(".title").parentNode.parentNode;
      itemLists = Array.from(root.children);

      finalArray = itemLists.map((item) => ({
        title:
          item.querySelector(".title")?.textContent !== undefined
            ? item.querySelector(".title")?.textContent
            : " ",
        subtitle:
          item.querySelector(".subtitle")?.textContent === undefined
            ? ""
            : item.querySelector(".subtitle")?.textContent,
      }));

      titlesArray = titleList.map((t) => ({
        title: t.textContent,
        subtitle:
          t.nextSibling?.textContent === undefined
            ? ""
            : t.nextSibling?.textContent,
      }));

      subtitlesArray = subtitleList.map((t) => ({
        subtitle: t?.textContent,
      }));

      return { titlesArray, subtitlesArray, finalArray };
    });
    console.log(data);
    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
