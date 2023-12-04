const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
})
const prompt = (query) => new Promise((resolve) => readline.question(query, resolve))

function calculateDifference(queue, numberOfRequests, head) {
  let diff = new Array(numberOfRequests)
  for (let i = 0; i < numberOfRequests; i++) diff[i] = Math.abs(queue[i] - head)
  return diff
}

function findMin(diff, visited, numberOfRequests) {
  let index = -1
  let minimum = Number.MAX_VALUE

  for (let i = 0; i < numberOfRequests; i++) {
    if (!visited[i] && diff[i] < minimum) {
      minimum = diff[i]
      index = i
    }
  }
  return index
}

function shortestSeekTimeFirst(requests, head) {
  if (requests.length === 0) {
    return
  }

  let l = requests.length
  let diff = calculateDifference(requests, l, head)
  let visited = new Array(l).fill(false)
  let seekCount = 0
  let seekSequence = new Array(l + 1)

  for (let i = 0; i < l; i++) {
    let index = findMin(diff, visited, l)
    visited[index] = true
    seekSequence[i] = requests[index]
    seekCount += diff[index]
    diff = calculateDifference(requests, l, requests[index])
  }

  console.log(`Total number of seek operations = ${seekCount}`)
  console.log(`Seek Sequence is`)

  for (let i = 0; i < l; i++) console.log(seekSequence[i])
}

// Usage
let requests = []
async function scheduleRequests() {
  const noOfRequests = await prompt("How many requests do you want to schedule? ")
  for (let i = 0; i < noOfRequests; i++) {
    const request = await prompt(`Enter request ${i + 1}: `)
    requests.push(request)
  }
  const head = await prompt("Enter head: ")
  shortestSeekTimeFirst(requests, head)
  readline.close()
}

scheduleRequests()

module.exports = { scheduleRequests }

