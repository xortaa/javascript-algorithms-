const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
})
const prompt = (query) => new Promise((resolve) => readline.question(query, resolve))

class Task {
  constructor(name, priority) {
    this.name = name
    this.priority = priority
  }
}

class PriorityQueue {
  constructor() {
    this.queue = []
  }

  enqueue(item) {
    if (this.isEmpty()) {
      this.queue.push(item)
    } else {
      let added = false
      for (let i = 0; i < this.queue.length; i++) {
        if (item.priority < this.queue[i].priority) {
          this.queue.splice(i, 0, item)
          added = true
          break
        }
      }
      if (!added) {
        this.queue.push(item)
      }
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Underflow"
    }
    return this.queue.shift()
  }

  isEmpty() {
    return this.queue.length === 0
  }
}

function multilevelQueueScheduling(priorityQueue) {
  while (!priorityQueue.isEmpty()) {
    let task = priorityQueue.dequeue()
    console.log(`Processing task: ${task.name} with priority: ${task.priority}`)
  }
}

let tasks = []
let priorityQueue = new PriorityQueue()

async function scheduleRequests() {
  const noOfTasks = await prompt("How many tasks do you want to schedule? ")
  for (let i = 0; i < noOfTasks; i++) {
    const name = await prompt(`Enter name of task ${i + 1}: `)
    const priority = await prompt(`Enter priority of task ${i + 1}: `)
    tasks.push(new Task(name, priority))
  }
  readline.close()
  for (let i = 0; i < tasks.length; i++) {
    priorityQueue.enqueue(tasks[i])
  }
  multilevelQueueScheduling(priorityQueue)
}

module.exports = { scheduleRequests }
