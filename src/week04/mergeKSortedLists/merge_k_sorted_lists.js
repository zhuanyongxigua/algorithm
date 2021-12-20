class BinaryHeap {
	constructor() {
		this.list = []
	}
	len() {
		return this.list.length
	}
	pop() {
		this.swap(0, this.list.length - 1)
		const min = this.list.pop()
		this.sortFromHead(0)
		console.log(this.list)
		console.log('pop')
		console.log(' ')
		return min
	}
	push(item) {
		this.list.push(item)
		this.sortFromTail(this.list.length - 1)
		console.log(this.list)
		console.log('push')
		console.log(' ')
	}
	swap(i, j) {
		const tmp = this.list[i]
		this.list[i] = this.list[j]
		this.list[j] = tmp
	}
	sortFromHead(index) {
		if (this.list.length === 0 || index === this.list.length - 1) {
			return
		}
		const left = index * 2 + 1
		const right = index * 2 + 2
		console.log('left: ', left)
		console.log('right: ', right)
		if (this.list[left] === undefined || this.list[left] === null) {
			return
		}
		if (this.list[right] === undefined || this.list[right] === null) {
			console.log(this.list)
			console.log('sortFromHead index: ', index)
			if (this.list[index].val > this.list[left].val) {
				this.swap(index, left)
				this.sortFromHead(left)
			}
			return
		}
		if (this.list[left].val < this.list[right].val) {
			if (this.list[index].val > this.list[left].val) {
				this.swap(index, left)
				this.sortFromHead(left)
			}
		} else {
			if (this.list[index].val > this.list[right].val) {
				this.swap(index, right)
				this.sortFromHead(right)
			}
		}
	}
	sortFromTail(index) {
		if (index === 0) {
			return
		}
		console.log('index: ', index)
		const remainder = index % 2
		let fatherIdx = 0
		if (remainder === 1) {
			fatherIdx = (index - 1) / 2
		} else {
			fatherIdx = (index - 2) / 2
		}
		console.log('remainder: ', remainder)
		console.log('fatherIdx: ', fatherIdx)
		if (this.list[fatherIdx].val > this.list[index].val) {
			console.log('swap')
			this.swap(fatherIdx, index)
			this.sortFromTail(fatherIdx)
		}
		console.log(' ')
	}
}

function mergeKLists(lists) {
	const pq = new BinaryHeap
	lists.forEach(list => {
		if (list !== undefined && list !== null) {
			pq.push(list)
		}
	})
	const head = {
		val: -1,
		next: null 
	}
	let tail = head
	while (pq.len() !== 0) {
		const cur = pq.pop()
		console.log('cur: ', cur)
		tail.next = cur
		tail = tail.next
		if (cur.next !== undefined && cur.next !== null) {
			pq.push(cur.next)
		}
	}
	console.log(pq.len())
	console.log(pq.list)
	console.log(' ')
	return head.next
}

~function test() {
	// const node1 = {
	// 	val: 1,
	// 	next: {
	// 		val: 4,
	// 		next: {
	// 			val: 5,
	// 			next: undefined
	// 		}
	// 	}
	// }
	// const node2 = {
	// 	val: 1,
	// 	next: {
	// 		val: 3,
	// 		next: {
	// 			val: 4,
	// 			next: undefined
	// 		}
	// 	}
	// }
	// const node3 = {
	// 	val: 2,
	// 	next: {
	// 		val: 6,
	// 		next: undefined
	// 	}
	// }

	const node1 = {
		val: -8,
		next: {
			val: -7,
			next: {
				val: -7,
				next: {
					val: -5,
					next: {
						val: 1,
						next: {
							val: 1,
							next: {
								val: 1,
								next: {
									val: 3,
									next: {
										val: 4,
										next: null
									}
								}
							}
						}
					}
				}
			}
		}
	}

	const node2 = {
		val: -2,
		next: null
	}

	const node3 = {
		val: -10,
		next: {
			val: -10,
			next: {
				val: -7,
				next: {
					val: 0,
					next: {
						val: 1,
						next: {
							val: 3,
							next: null
						}
					}
				}
			}
		}
	}

	const node4 = {
		val: 2,
		next: null
	}

	let result = mergeKLists([node1, node2, node3, node4])
	while (result !== undefined && result !== null) {
		console.log(result.val)
		result = result.next
	}
}()