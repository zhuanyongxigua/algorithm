class ListNode {
  constructor (value = 0, next = null, zippedNum) {
    // 估价值 h
    this.value = value;
    this.next = next;
    this.zippedNum = zippedNum;
  }
}

class BinaryHeap {
  comparator;
  nodes;
  isMax;
  constructor (comparator) {
    this.comparator = comparator;
    if (this.comparator(new ListNode(0), new ListNode(1))) {
      this.nodes = [new ListNode(Number.MIN_SAFE_INTEGER)];
      this.isMax = false;
    } else {
      this.nodes = [new ListNode(Number.MAX_SAFE_INTEGER)];
      this.isMax = true;
    }
  }

  insert (node) {
    this.nodes.push(node);
    let index = this.nodes.length - 1;
    let parentIndex = Math.floor(index / 2);
    let parent = this.nodes[parentIndex];
    while (this.comparator(node, parent) && parentIndex > 0) {
      this.nodes[parentIndex] = node;
      this.nodes[index] = parent;
      index = parentIndex;
      parentIndex = Math.floor(index / 2);
      parent = this.nodes[parentIndex];
    }
  }

  extract () {
    const topItem = this.nodes[1];
    this.nodes[1] = this.nodes[this.nodes.length - 1];
    this.nodes[this.nodes.length - 1] = topItem;
    this.nodes.pop();
    const getNode = (nodeIndex) => {
      return this.nodes[nodeIndex]
        ? this.nodes[nodeIndex]
        : this.isMax
          ? new ListNode(Number.MIN_SAFE_INTEGER)
          : new ListNode(Number.MAX_SAFE_INTEGER);
    };
    const getExtremeNode = (leftNode, rightNode) => {
      return this.isMax
        ? leftNode.value > rightNode.value
          ? leftNode
          : rightNode
        : leftNode.value > rightNode.value
          ? rightNode
          : leftNode;
    };
    let index = 1;
    let left = index * 2;
    let leftNode = getNode(left);
    let right = index * 2 + 1;
    let rightNode = getNode(right);
    let extremeNode = getExtremeNode(leftNode, rightNode);
    while (this.nodes[index] && !this.comparator(this.nodes[index], extremeNode)) {
      if (this.comparator(leftNode, rightNode)) {
        const temp = this.nodes[left];
        this.nodes[left] = this.nodes[index];
        this.nodes[index] = temp;
        index = left;
      } else {
        const temp = this.nodes[right];
        this.nodes[right] = this.nodes[index];
        this.nodes[index] = temp;
        index = right;
      }
      left = index * 2;
      right = index * 2 + 1;
      leftNode = getNode(left);
      rightNode = getNode(right);
      extremeNode = getExtremeNode(leftNode, rightNode);
    }
    return topItem;
  }

  peek () {
    return this.nodes[1];
  }
}

function zip (list) {
    let result = 0;
    for (let i = 0; i < 6; i++) {
        result = result * 10 + list[i];
    }
    return result;
}

function unzip (num) {
    const list = [];
    for (let i = 5; i >= 0; i--) {
        list[i] = num % 10;
        num = Math.floor(num / 10);
    }
    return list;
}

function getZeroIndex (list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] === 0) return i;
    }
}

function swap (list, i, j) {
    const resultList = [];
    for (let k = 0; k < 6; k++) {
        if (k === i) {
            resultList[k] = list[j];
        } else if (k === j) {
            resultList[k] = list[i];
        } else {
            resultList[k] = list[k];
        }
    }
    return resultList;
}

function evaluate (list) {
    let result = 0;
    for (let i = 0; i < list.length; i++) {
        const curNum = list[i];
        if (curNum === 0) continue;
        const curX = Math.floor(i / 3);
        const curY = i % 3;
        const targetIndex = curNum - 1;
        const targetX = Math.floor(targetIndex / 3);
        const targetY = targetIndex % 3;
        result += Math.abs(curX - targetX) + Math.abs(curY - targetY);
    }
    return result;
}

/**
 * @param {number[][]} board
 * @return {number}
 */
var slidingPuzzle = function(board) {
    const dist = {};
    const queue = new BinaryHeap((a, b) => a.value < b.value);
    const target = 123450;
    const curNum = [];
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
            curNum.push(board[i][j]);
        }
    }
    const firstEle = zip(curNum);
    if (firstEle === target) return 0;
    const firstEleValue = evaluate(curNum);
    queue.insert(new ListNode(firstEleValue, null, firstEle));
    dist[firstEle] = 1;
    let result = -1;
    function check (list, i, j, steps) {
        const queueItem = swap(list, i, j);
        const distKey = zip(queueItem);
        if (distKey === target) {
            result = steps + 1;
            return;
        }
        if (!dist[distKey]) {
            const distKeyValue = evaluate(queueItem);
            queue.insert(new ListNode(steps + distKeyValue, null, distKey));
            dist[distKey] = steps + 1;
        }
    }
    while (queue.nodes.length > 1) {
        const frontKey = queue.extract().zippedNum;
        const frontSteps = dist[frontKey];
        const front = unzip(frontKey);
        const zeroIndex = getZeroIndex(front);
        const nextVerticalZeroIndex = (zeroIndex + 3) % 6
        if (zeroIndex === 0 || zeroIndex === 3) {
            const nextHorizontalZeroIndex = zeroIndex + 1;
            check(front, zeroIndex, nextVerticalZeroIndex, frontSteps);
            check(front, zeroIndex, nextHorizontalZeroIndex, frontSteps);
        } else if (zeroIndex === 2 || zeroIndex === 5) {
            const nextHorizontalZeroIndex = zeroIndex - 1;
            check(front, zeroIndex, nextVerticalZeroIndex, frontSteps);
            check(front, zeroIndex, nextHorizontalZeroIndex, frontSteps);
        } else {
            const nextLeftHorizontalZeroIndex = zeroIndex - 1;
            const nextRightHorizontalZeroIndex = zeroIndex + 1;
            check(front, zeroIndex, nextVerticalZeroIndex, frontSteps);
            check(front, zeroIndex, nextLeftHorizontalZeroIndex, frontSteps);
            check(front, zeroIndex, nextRightHorizontalZeroIndex, frontSteps);
        }
        if (result !== -1) return result - 1;
    }
    return -1;
};

export { slidingPuzzle }
