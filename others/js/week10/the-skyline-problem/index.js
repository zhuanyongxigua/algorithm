class ListNode {
  constructor (value = 0, next = null) {
    this.value = value;
    this.next = next;
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

/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
var getSkyline = function(buildings) {
  const events = [];
  for (let i = 0; i < buildings.length; i++) {
    events.push([buildings[i][0], buildings[i][2]]);
    events.push([buildings[i][1], -buildings[i][2]]);
  }
  events.sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1]
    }
    return a[0] - b[0]
  });
  const ans = [];
  const h = new BinaryHeap((a, b) => a.value - b.value > 0);
  const hMap = {};
  for (let i = 0; i < events.length; i++) {
    const curEvent = events[i];
    if (curEvent[1] > 0) {
      h.insert(new ListNode(events[i][1]));
      if (!hMap[events[i][1]]) {
        hMap[events[i][1]] = 0;
      }
      hMap[events[i][1]] += 1;
      if (ans.length === 0 || events[i][1] > ans[ans.length - 1][1]) {
        ans.push([events[i][0], events[i][1]]);
      }
    } else {
      hMap[-events[i][1]] -= 1;
      let curTop = h.peek();
      while (curTop !== undefined && hMap[curTop.value] === 0) {
        h.extract();
        curTop = h.peek();
      }
      if (curTop === undefined) {
        ans.push([events[i][0], 0]);
      } else if (curTop.value < ans[ans.length - 1][1]) {
        ans.push([events[i][0], curTop.value]);
      }
    }
  }
  return ans;
};

// LC-218 Skyline —— Grid/Compression + "paint high→low" + DSU-next
// 1) 把所有 x 边界收集→排序去重→建立 x→index 的映射（坐标压缩）
// 2) 把相邻坐标 [xs[i], xs[i+1]) 视作一个“条带”（共 m = xs.length - 1 个）
// 3) 按高度从高到低遍历每栋楼，只给尚未被更高楼覆盖的条带赋高
//    为避免逐格 O(len)，用并查集“next 指针”：每涂过 i，就把 i 合并到 i+1，
//    下一次直接跳到当前区间内“下一段尚未上色”的条带索引
var getSkyline2 = function(buildings) {
  if (!buildings || buildings.length === 0) return [];

  // ---------- 坐标压缩：竖线网格 ----------
  const xs = Array.from(new Set(buildings.flatMap(([L, R]) => [L, R]))).sort((a, b) => a - b);
  if (xs.length === 0) return [];
  const id = new Map(xs.map((x, i) => [x, i]));
  const m = xs.length - 1;              // 条带数量 = 相邻坐标段
  if (m <= 0) return [[xs[0], 0]];

  // 每个条带 [xs[i], xs[i+1]) 的最终高度
  const h = new Array(m).fill(0);

  // ---------- 并查集（next 指针）：find(i) = 从 i 开始的“下一块未上色”的索引 ----------
  // parent[i] 指向“从 i 开始的下一个可涂位置”；涂过 i 就把 i union 到 i+1
  const parent = new Array(m + 1);
  for (let i = 0; i <= m; i++) parent[i] = i;
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x]))); // 路径压缩
  const unite = (a, b) => { parent[find(a)] = find(b); };

  // ---------- 按高度从高到低涂色（高的优先覆盖） ----------
  // 若同高：可按任意顺序；这里按 L 升序、R 降序以微小优化涂色次数
  buildings.sort((a, b) => b[2] - a[2] || a[0] - b[0] || b[1] - a[1]);

  for (const [L, R, H] of buildings) {
    let i = find(id.get(L));            // 从该楼左端对应的条带开始
    const end = id.get(R);              // 右端条带是半开区间的 end（不含）
    while (i < end) {
      // 给条带 i 上色（若尚未被更高楼涂过）
      if (h[i] === 0) {
        h[i] = H;
        // 涂过 i，以后从 i 跳到 i+1：把 i 合并到 i+1
        unite(i, i + 1);
      }
      // 跳到“下一块还没上色的条带”
      i = find(i + 1);
    }
  }

  // ---------- 从条带高度恢复天际线关键点 ----------
  const ans = [];
  let prev = 0;
  for (let i = 0; i < m; i++) {
    const cur = h[i];
    if (cur !== prev) {
      ans.push([xs[i], cur]);
      prev = cur;
    }
  }
  // 末尾回落到 0
  if (ans.length === 0 || ans[ans.length - 1][0] !== xs[m] || ans[ans.length - 1][1] !== 0) {
    ans.push([xs[m], 0]);
  }
  // 题目要求：相邻不允许等高水平线，这里天然满足（prev 变化才入）
  return ans;
};

var getSkyline3 = function(buildings) {
  if (!buildings || buildings.length === 0) return [];

  // 把建筑按左边界排序（也可以不提前排，递归里用 lo..hi 的范围就行；
  // 预排序有助于让左右两半更“规整”，但不是绝对必要）
  buildings.sort((a, b) => a[0] - b[0] || a[1] - b[1] || b[2] - a[2]);

  // solve(lo, hi)：
  // 输入：buildings[lo..hi]
  // 输出：该子集合形成的天际线 = 按 x 递增的一串关键点 [[x1,h1],[x2,h2],...]
  function solve(lo, hi) {
    if (lo === hi) {
      // 单栋楼的外轮廓是：
      //   在 x = L 处抬到高度 H
      //   在 x = R 处落回高度 0
      // 这就已经是“把这栋楼的左右边界当成网格线”之后得到的离散折线。
      const [L, R, H] = buildings[lo];
      return [[L, H], [R, 0]];
    }
    const mid = (lo + hi) >> 1;
    const leftSky  = solve(lo, mid);
    const rightSky = solve(mid + 1, hi);
    return mergeSkylines(leftSky, rightSky);
  }

  // mergeSkylines(A, B):
  // A 和 B 各自都是一条折线 (关键点数组)，它们的 x 都是那些“网格竖线”的子集，
  // 这里我们像归并排序那样，沿着这些离散 x（网格线）从左到右走。
  function mergeSkylines(A, B) {
    let i = 0, j = 0;
    let hA = 0, hB = 0;   // 当前左半/右半在各自覆盖下的高度
    let prevH = 0;        // 上一次加入答案的高度
    const out = [];

    while (i < A.length && j < B.length) {
      const [xA, yA] = A[i];
      const [xB, yB] = B[j];
      let x; // 这一步“取更小的 x”就是：走到下一个网格竖线

      if (xA < xB) {
        x = xA;
        hA = yA;
        i++;
      } else if (xB < xA) {
        x = xB;
        hB = yB;
        j++;
      } else {
        // xA === xB：左右两条折线在同一条竖线上都有关键点
        x = xA;
        hA = yA;
        hB = yB;
        i++;
        j++;
      }

      const curH = Math.max(hA, hB); // 在这条竖线右侧，整体城市的可见高度
      if (out.length === 0 || curH !== prevH) {
        // 如果这个 x 跟上一个输出点的 x 一样，就直接更新高度，
        // 否则 push 新点。这避免重复的 x。
        if (out.length && out[out.length - 1][0] === x) {
          out[out.length - 1][1] = curH;
        } else {
          out.push([x, curH]);
        }
        prevH = curH;
      }
    }

    // 把剩下没走完的折线也贴上来
    appendRemaining(out, A, i, hA, hB, prevH);
    appendRemaining(out, B, j, hA, hB, out.length ? out[out.length - 1][1] : 0);

    // 最后清一下可能出现的相邻等高冗余点
    return dedup(out);
  }

  // 把 S[k...] 剩余的关键点接到 out 上
  function appendRemaining(out, S, k, hA, hB, prevH) {
    let curPrev = out.length ? out[out.length - 1][1] : prevH;
    while (k < S.length) {
      const [x, y] = S[k++];
      // 这里谁在更新？取决于是来自左半还是右半：
      // 我们不知道 S 是左还是右，但这其实也没关系，
      // 因为我们只关心“在这个 x 上，新的全局高度是多少”，
      // 而 y 就是这条折线宣称的高度。
      const newH = y; // 因为另一边已经走完，不会再抬高
      if (out.length && out[out.length - 1][0] === x) {
        // 同一个 x 上直接更新高度为 newH
        out[out.length - 1][1] = newH;
        curPrev = newH;
      } else if (newH !== curPrev) {
        out.push([x, newH]);
        curPrev = newH;
      }
    }
  }

  // 清除相邻重复高度、同 x 的多次写入等冗余
  function dedup(arr) {
    const res = [];
    for (const [x, h] of arr) {
      if (!res.length) {
        res.push([x, h]);
        continue;
      }
      const [lx, lh] = res[res.length - 1];
      if (x === lx) {
        // 同一 x：保留最后的高度
        res[res.length - 1][1] = h;
      } else if (lh !== h) {
        // 不同 x：只有在高度变化时才加入
        res.push([x, h]);
      }
    }
    return res;
  }

  return solve(0, buildings.length - 1);
};

var getSkyline4 = function(buildings) {
  let indexes = [];
  for (let i = 0; i < buildings.length; i++) {
    indexes.push(buildings[i][0]);
    indexes.push(buildings[i][1]);
  }
  indexes = Array.from(new Set(indexes)).sort((a, b) => a - b);
  const map = {};
  for (let i = 0; i < indexes.length; i++) {
    map[indexes[i]] = i;
  }
  const colors = new Array(indexes.length).fill(0);
  for (let i = 0; i < buildings.length; i++) {
    const lIndex = map[buildings[i][0]];
    const rIndex = map[buildings[i][1]];
    const h = buildings[i][2];
    for (let j = lIndex; j < rIndex; j++) {
      if (h > colors[j]) {
        colors[j] = h;
      }
    }
  }
  const ans = [];
  for (let i = 0; i < colors.length; i++) {
    if (ans.length === 0 && colors[i] === 0) continue;
    if (ans.length === 0) {
      ans.push([indexes[i], colors[i]]);
    } else if (colors[i] !== ans[ans.length - 1][1]) {
      ans.push([indexes[i], colors[i]]);
    }
  }
  return ans;
};

export { getSkyline, getSkyline2, getSkyline3, getSkyline4 }
