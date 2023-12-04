const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
})

const prompt = (query) => new Promise((resolve) => readline.question(query, resolve))

async function runAlgorithm() {
  console.log("Choose an algorithm to run:")
  console.log("1. Multilevel Queue Scheduling")
  console.log("2. Non-preemptive Priority Scheduling")
  console.log("3. Shortest Seek Time First")

  const choice = await prompt("Enter the number of the algorithm: ")

  switch (choice) {
    case "1":
      readline.close()
      const mqs = require("./mqs")
      await mqs.scheduleRequests()
      break

    case "2":
      readline.close()
      const npp = require("./npp")
      await npp.scheduleRequests()
      break

    case "3":
      readline.close()
      const sstf = require("./sstf")
      await sstf.scheduleRequests()
      break

    default:
      readline.close()
      console.log("Invalid choice. Exiting.")
      break
  }

}

runAlgorithm()

