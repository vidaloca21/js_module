document.addEventListener("DOMContentLoaded", function () {
  const invertedIndex = {};

  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.upbit.com/v1/market/all");
      const data = response.data;
      const myList = data.map((item) => item.market);
      return myList;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  fetchData().then((data) => {
    data.forEach((word) => {
      for (let i = 0; i < word.length; i++) {
        for (let j = i + 1; j <= word.length; j++) {
          const substring = word.slice(i, j);
          if (!invertedIndex[substring]) {
            invertedIndex[substring] = new Set();
          }
          invertedIndex[substring].add(word);
        }
      }
    });

    document.querySelector("#searchText").addEventListener("keyup", (e) => {
      const searchTerm = e.target.value.toUpperCase();
      const results = invertedIndex[searchTerm]
        ? Array.from(invertedIndex[searchTerm])
        : [];
      updateKeywordList(results);
    });
  });

  const updateKeywordList = (words) => {
    const keywordList = document.querySelector("#keywordList");
    keywordList.innerHTML = "";

    words.slice(0, 10).forEach((word) => {
      const li = document.createElement("li");
      li.textContent = word;
      keywordList.appendChild(li);
    });

    keywordList.style.overflowY = words.length > 10 ? "scroll" : "hidden";
  };
});
