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

function nonPreemptivePriorityScheduling(tasks) {
  // Sort tasks in ascending order of their priority
  tasks.sort((a, b) => a.priority - b.priority)

  // Process tasks
  for (let i = 0; i < tasks.length; i++) {
    console.log(`Processing task: ${tasks[i].name} with priority: ${tasks[i].priority}`)
  }
}

let tasks = []
async function scheduleRequests() {
  const noOfTasks = await prompt("How many tasks do you want to schedule? ")
  for (let i = 0; i < noOfTasks; i++) {
    const name = await prompt(`Enter name of task ${i + 1}: `)
    const priority = await prompt(`Enter priority of task ${i + 1}: `)
    tasks.push(new Task(name, priority))
  }
  readline.close()
  nonPreemptivePriorityScheduling(tasks)
}

scheduleRequests()


module.exports = { scheduleRequests }

