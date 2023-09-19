const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: "On the way home after attending Princess's party, you find that you have left your sword at the Castle.",
    options: [
      {
        text: 'Go back to the Castle',
        setState: { Castle: true },
        nextText: 2
      },
      {
        text: 'Just forget about it',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: "As you proceed, there's a messy road sign pointing to different directions. While you are wandering which way to go, there's a mysterious stranger coming up...",
    options: [
      {
        text: 'Follow the signage to the Castle direction',
        nextText: 3
      },
      {
        text: 'Follow the signage to the Jungle direction',
        nextText: 4
      },
      {
        text: 'Ask the stranger',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'With the hint, you start to hit the road again. After quite some time, you find yourself in the middle of a gigantic maze! Oh my!',
    options: [
      {
        text: 'Searching around with the hope of getting on the right path',
        nextText: 5
      },
      {
        text: 'Just give up, you will never make it',
        nextText: 5
      },
      {
        text: 'Try to climb up the walls of the maze',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You are lost in the jungle. Feeling tired and hungry, you fall asleep under a tree and are killed by some terrible monsters in your sleep.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'You are trapped in the maze. Without any food and water, you are doomed.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Thank God! Upon climbing the walls, you find the way out to the Castle! But wait...why is everyone petrified?',
    options: [
      {
        text: 'Head to the Castle',
        nextText: 7
      },
      {
        text: "Go back to the maze, try to find another way out",
        nextText: 5
      },
    ]
  },
  {
    id: 7,
    text: "At the entrance of the Castle, you see the mysterious stranger again. He reveals himself as an evil wizard and is the one who turned everyone into stone just because they didn't invite him to the party! Now you...",
    options: [
      {
        text: 'Fight him with bare hands (as your sword was left in the Castle)',
        nextText: 8
      },
      {
        text: 'Fight him with your stinky socks',
        nextText: 9
      },
      {
        text: 'Try to run',
        nextText: 8
      },
    ]
  },
  {
    id: 8,
    text: 'Your attempts are in vain and the evil wizard petrifies you as well.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Oh! Your socks are too stinky that make creatures around fainted. You defeat the evil wizard and save everyone! ',
    options: [
      {
        text: 'Congratulations! Now Play Again!',
        nextText: -1
      }
    ]
  }
]

startGame()