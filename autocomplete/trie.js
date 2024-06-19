document.addEventListener("DOMContentLoaded", function () {
  const trie = createNode();

  fetchData()
    .then((data) => {
      data.forEach((word) => insert(trie, word));
      document.querySelector("#searchText").addEventListener("keyup", (e) => {
        const searchTerm = e.target.value.toUpperCase();
        const results = autocomplete(trie, searchTerm);
        updateKeywordList(results);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});

const createNode = () => ({
  children: {},
  isEndOfWord: false,
});

const insert = (root, word) => {
  let currentNode = root;
  for (const char of word) {
    if (!currentNode.children[char]) {
      currentNode.children[char] = createNode();
    }
    currentNode = currentNode.children[char];
  }
  currentNode.isEndOfWord = true;
};

const search = (root, word) => {
  let currentNode = root;
  for (const char of word) {
    if (!currentNode.children[char]) {
      return false;
    }
    currentNode = currentNode.children[char];
  }
  return currentNode.isEndOfWord;
};

const autocomplete = (root, prefix) => {
  let currentNode = root;
  for (const char of prefix) {
    if (!currentNode.children[char]) {
      return [];
    }
    currentNode = currentNode.children[char];
  }
  return findAllWords(currentNode, prefix);
};

const findAllWords = (node, prefix) => {
  const words = [];
  const stack = [{ node, prefix }];

  while (stack.length > 0) {
    const { node: currentNode, prefix: currentPrefix } = stack.pop();

    if (currentNode.isEndOfWord) {
      words.push(currentPrefix);
    }

    for (const char in currentNode.children) {
      stack.push({
        node: currentNode.children[char],
        prefix: currentPrefix + char,
      });
    }
  }

  return words;
};

const fetchData = async () => {
  try {
    const response = await axios.get("https://api.upbit.com/v1/market/all");
    const data = response.data;
    return data.map((item) => item.market);
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Update the keyword list with the given results
const updateKeywordList = (results) => {
  const keywordList = document.querySelector("#keywordList");
  keywordList.innerHTML = ""; // Clear existing list items
  results.forEach((result) => {
    const li = document.createElement("li");
    li.textContent = result;
    keywordList.appendChild(li);
  });
};
