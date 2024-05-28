let board = document.querySelector(".board")
let currentPlayer = "X"
let cells = Array.from({length: 9}) // Create array has 9 elements

const buildPlayersAndPoints = () => {

    let thePlayers = document.createElement("div")
    thePlayers.className = `the-players`

    let xPlayer = document.createElement("div")
    xPlayer.className = `x-player`

    let bX = document.createElement("b")
    let inBX = document.createTextNode("X")
    bX.appendChild(inBX)

    let pointX = document.createElement("span")
    let inpointX = document.createTextNode(localStorage.getItem("xPoints") || 0)
    pointX.appendChild(inpointX)

    xPlayer.append(bX, pointX)

    let vs = document.createElement("strong")
    vs.title = `Reset the game`
    let inVs = document.createTextNode("VS")

    let small = document.createElement("small")
    let inSmall = document.createTextNode("Reset")
    small.appendChild(inSmall)

    
    vs.append(inVs, small)

    let oPlayer = document.createElement("div")
    oPlayer.className = `o-player`

    let bO = document.createElement("b")
    let inBO = document.createTextNode("O")
    bO.appendChild(inBO)

    let pointO = document.createElement("span")
    let inpointO = document.createTextNode(localStorage.getItem("oPoints") || 0)
    pointO.appendChild(inpointO)

    oPlayer.append(pointO, bO)

    thePlayers.append(xPlayer, vs, oPlayer)

    document.querySelector(".container").append(thePlayers)

}
buildPlayersAndPoints()

const handleClick = (e) => {
    
    let cellIndex = e.target.dataset.index
    
    if (cells[cellIndex]) return // Check if the cell empty or not
    
    updateCell(cellIndex, currentPlayer)
    
    const winner = checkWinner()
    
    let x = parseInt(document.querySelector(".x-player span").textContent)
    let o = parseInt(document.querySelector(".o-player span").textContent)

    if (winner || !cells.includes(undefined)) {

        let theWinnerIs = winner ? `You did it, grats!` : `It's draw!`

        if (winner === "X") {

            x += 1
            localStorage.setItem("xPoints", x)

        } else if (winner === "O") {
            
            o += 1
            localStorage.setItem("oPoints", o)

        }
        
        Swal.fire({
            title: winner,
            text: theWinnerIs,
            background: "#241023",
            color: "#d5e68d",
            showConfirmButton: false,
            timer: 2000,
        });

        resetGame()
    }

}

const updateCell = (index, value) => {

    cells[index] = value // Update array value

    let cell = board.querySelector(`[data-index="${index}"]`) // This line has simple details
    cell.textContent = value
    cell.classList.add(value === "X" ? "player-x" : "player-o")

    currentPlayer = (currentPlayer === "X") ? "O" : "X" // Switch player

}

const checkWinner = () => {

    let winningStates = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    
    for (const state of winningStates) {
        
        let [a, b, c] = state // Unload the state array on these variables. EX: a = 0, b = 1, c = 2

        if (cells[a] && cells[a] == cells[b] && cells[a] === cells[c]) { // these three conditions together
            return cells[a]
        }

    }

    return null

}

const resetGame = () => {

    cells = Array.from({length: 9})

    document.querySelector(".x-player span").textContent = localStorage.getItem("xPoints") || 0
    document.querySelector(".o-player span").textContent = localStorage.getItem("oPoints") || 0

    currentPlayer = "X"

    board.querySelectorAll(".cell").forEach((cell) => {

        cell.textContent = ""

        cell.classList.remove("player-x", "player-o")

    })

}

document.addEventListener("keydown", (e) => {
    if (e.key === " " || "r") resetGame()
})

document.querySelector("strong").addEventListener("click", () => {
    
    localStorage.clear()

    resetGame()

})

cells.forEach((cell, i) => {

    cell = document.createElement("div")
    cell.classList.add("cell")
    cell.dataset.index = i

    // cell.textContent = i

    cell.onclick = handleClick

    board.appendChild(cell)
    
})

checkWinner()

function myInformation(myInfo) {

    myInfo = document.createElement("div")
    myInfo.className = `my-info`

    let xLink = document.createElement("a")
    xLink.href = "https://twitter.com/AhmadAlhadidi95"
    xLink.target = "_blank"
    xLink.rel = "noopener noreferrer"
    xLink.title = "Visit my X"

    let xIcon = document.createElement("i")
    xIcon.className = `fa-brands fa-x-twitter`

    xLink.appendChild(xIcon)

    let myLogo = document.createElement("img")
    myLogo.src = `My-sign.png`
    myLogo.alt = `My-sign`
    myLogo.title = `Ahmad Alhadidi`
    myLogo.style.width = `50px`

    let githubLink = document.createElement("a")
    githubLink.href = "https://github.com/AhmadAlhadidi95"
    githubLink.target = "_blank"
    githubLink.rel = "noopener noreferrer"
    githubLink.title = "Visit my Github"

    let githubIcon = document.createElement("i")
    githubIcon.className = `fa-brands fa-github`

    githubLink.appendChild(githubIcon)

    myInfo.append(xLink, myLogo, githubLink)

    return myInfo

}

document.querySelector(".container").appendChild(myInformation())