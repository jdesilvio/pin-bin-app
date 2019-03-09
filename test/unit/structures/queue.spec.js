import Queue from '../../../src/structures/queue'

describe('queue', () => {
  it('should construct a new Queue', () => {
    var queue = new Queue()
    expect(queue).toBeDefined()
  })

  it('should be empty', () => {
    var queue = new Queue()
    expect(queue.isEmpty()).toBe(true)
  })

  it('cannot peek', () => {
    var queue = new Queue()
    expect(queue.peek()).toBe(undefined)
  })

  it('should enqueue an item', () => {
    const anItem = 'an item'
    var queue = new Queue()
    queue.enqueue(anItem)
    expect(queue.isEmpty()).toBe(false)
    expect(queue.peek()).toBe(anItem)
  })

  it('should dequeue an item', () => {
    const anItem = 'an item'
    var queue = new Queue()
    queue.enqueue(anItem)
    expect(queue.isEmpty()).toBe(false)
    expect(queue.peek()).toBe(anItem)
    expect(queue.dequeue()).toBe(anItem)
    expect(queue.isEmpty()).toBe(true)
    expect(queue.peek()).toBe(undefined)
  })
})
