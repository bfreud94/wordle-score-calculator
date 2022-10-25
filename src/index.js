import { createInterface } from 'readline'

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

const scores = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
}

const main = async () => {
    for (let i = 1; i <= Object.keys(scores).length; i++) {
        let score;
        while (isNaN(score)) {
            score = await prompt(i)
        }
        scores[i] = Number(score)
    }
    rl.close()
    calculateAverage()
}

const prompt = (questionNumber) => {
    return new Promise((resolve, reject) => {
        const guessString = questionNumber === 1 ? 'guess' : 'guesses'
        rl.question(`Enter how many times you completed Wordle in ${questionNumber} ${guessString}: `, async (answer) => {
            resolve(answer)
        })
    })
}

const calculateAverage = () => {
    let average = 0
    let totalPlays = 0
    Object.keys(scores).forEach(score => {
        average += (score * scores[score])
        totalPlays += scores[score]
    })
    average /= totalPlays
    console.log(`You have played Wordle ${totalPlays} times`)
    console.log(`It takes you ${average} guesses to win`)
}

main()