/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
  const trie = new Trie();
  for (let i = 0; i < words.length; i++) {
      trie.insert(words[i]);
  }
  const record = {};
  const ans = [];
  const map = {};
  for (let i = 0; i < words.length; i++) {
    map[words[i]] = -1;
  }
  function dfs (m, n, prePoint, curStr, curNode) {
      if (map[curStr] === 0) return;
      if (!curNode) return;
      if (map[curStr] === undefined) {
        if (!curNode.map[board[m][n]]) {
          map[curStr] = 0;
          return
        } else {
          map[curStr] = 2;
        }
      }
      if (record[m * 100 + n]) return;
      if (map[curStr] === -1) {
          ans.push(curStr);
          map[curStr] = 1;
      };
      record[m * 100 + n] = 1
      if (prePoint.length === 0 || m + 1 !== prePoint[0] || n !== prePoint[1]) {
          if (m + 1 < board.length) {
              dfs(m + 1, n, [m, n], curStr + board[m + 1][n], curNode.map[board[m][n]]);
          }
      }
      if (prePoint.length === 0 || m - 1 !== prePoint[0] || n !== prePoint[1]) {
          if (m - 1 >= 0) {
              dfs(m - 1, n, [m, n], curStr + board[m - 1][n], curNode.map[board[m][n]]);
          }
      }
      if (prePoint.length === 0 || m !== prePoint[0] || n + 1 !== prePoint[1]) {
          if (n + 1 < board[0].length) {
              dfs(m, n + 1, [m, n], curStr + board[m][n + 1], curNode.map[board[m][n]]);
          }
      }
      if (prePoint.length === 0 || m !== prePoint[0] || n - 1 !== prePoint[1]) {
          if (n - 1 >= 0) {
              dfs(m, n - 1, [m, n], curStr + board[m][n - 1], curNode.map[board[m][n]]);
          }
      }
      record[m * 100 + n] = 0;
  }
  for (let m = 0; m < board.length; m++) {
      for (let n = 0; n < board[0].length; n++) {
          dfs(m, n, [], board[m][n], trie.root);
      }
  }
  return ans;
};

class Node {
  constructor(value, isWord) {
      this.map = {};
      this.value = value || null;
      this.isWord = isWord || false;
  }
}

var Trie = function() {
  this.root = new Node();
};

/** 
* @param {string} word
* @return {void}
*/
Trie.prototype.insert = function(word) {
  const [node, charIndex] = this.realSearch(word);
  if (charIndex === -1) {
      node.isWord = true;
      return;
  }
  let curNode = node;
  for (let i = charIndex; i < word.length; i++) {
      let temp
      if (i === word.length - 1) {
          temp = new Node(word[i], true);
      } else {
          temp = new Node(word[i], false);
      }
      curNode.map[word[i]] = temp;
      curNode = temp;
  }
};

Trie.prototype.realSearch = function(word) {
  const chars = word.split('');
  let curNode = this.root;
  for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      if (curNode.map[char]) {
          curNode = curNode.map[char];
      } else {
          return [curNode, i];
      }
  }
  return [curNode, -1];
}

/** 
* @param {string} word
* @return {boolean}
*/
Trie.prototype.search = function(word) {
  const result = this.realSearch(word);
  if (result[1] !== -1) return false;
  if (!result[0].isWord) return false;
  return true;
};

/** 
* @param {string} prefix
* @return {boolean}
*/
Trie.prototype.startsWith = function(prefix) {
  const result = this.realSearch(prefix);
  if (result[1] !== -1) return false;
  return true;
};

/** 
* Your Trie object will be instantiated and called as such:
* var obj = new Trie()
* obj.insert(word)
* var param_2 = obj.search(word)
* var param_3 = obj.startsWith(prefix)
*/

export { findWords }