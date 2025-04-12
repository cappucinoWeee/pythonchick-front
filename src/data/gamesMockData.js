// src/data/gamesMockData.js
const gamesMockData = [
    {
      id: 1,
      title: "Python Adventure",
      slug: "python-adventure",
      description: "Embark on a journey through a magical world where you solve Python puzzles to proceed to the next level.",
      shortDescription: "Solve Python puzzles in a magical world",
      image: "/games/python-adventure.png",
      difficulty: "Beginner",
      category: "adventure",
      xp: 150,
      estimatedTime: "30 minutes",
      unlocked: true,
      gameType: "adventure",
      gameData: {
        introduction: "Welcome to the Kingdom of Pythonia! The royal castle is under a spell that only Python code can break.",
        scenes: [
          {
            id: "scene1",
            background: "/games/scenes/castle-gate.png",
            title: "The Castle Gate",
            description: "You approach the massive castle gate. It's locked with a magical seal.",
            challenge: {
              type: "print",
              instructions: "Print 'Open Sesame' to unlock the gate",
              starterCode: "# Type your magic spell\n",
              solution: "print('Open Sesame')",
              expectedOutput: "Open Sesame"
            },
            hints: [
              "Use the print() function",
              "Remember to use quotes around the text",
              "Python is case-sensitive"
            ]
          },
          // More scenes here
        ]
      }
    },
    {
      id: 2,
      title: "Code Quest",
      slug: "code-quest",
      description: "Choose your character and embark on a quest to collect coding gems by solving Python challenges.",
      shortDescription: "Collect gems by solving Python challenges",
      image: "/games/code-quest.png",
      difficulty: "Beginner",
      category: "quest",
      xp: 200,
      estimatedTime: "45 minutes",
      unlocked: true,
      gameType: "quest",
      gameData: {
        characters: [
          {
            id: "wizard",
            name: "Pyther the Wizard",
            avatar: "/games/characters/wizard.png",
            specialPower: "Code Insight"
          },
          {
            id: "knight",
            name: "Sir Loopington",
            avatar: "/games/characters/knight.png",
            specialPower: "Debug Shield"
          },
          {
            id: "archer",
            name: "Arya Functions",
            avatar: "/games/characters/archer.png",
            specialPower: "Precision Syntax"
          }
        ],
        levels: [
          {
            id: "level1",
            title: "The Forest of Variables",
            description: "Navigate through the Forest of Variables, collecting gems as you define and use variables correctly.",
            challenges: [
              {
                id: "challenge1",
                title: "Create a Variable",
                description: "Create a variable named 'gems' with a value of 5",
                starterCode: "# Create your variable below\n\n",
                solution: "gems = 5\nprint(gems)",
                expectedOutput: "5"
              }
            ]
          }
        ]
      }
    },
    {
      id: 3,
      title: "Function Factory",
      slug: "function-factory",
      description: "Build and operate a function factory! Define Python functions to automate various processes in your growing factory.",
      shortDescription: "Build a factory using Python functions",
      image: "/games/function-factory.png",
      difficulty: "Intermediate",
      category: "simulation",
      xp: 250,
      estimatedTime: "1 hour",
      unlocked: false,
      gameType: "factory",
      gameData: {
        factoryLevels: [
          {
            level: 1,
            title: "Basic Production",
            description: "Set up your first production line by creating basic functions",
            tasks: [
              {
                id: "task1",
                title: "Product Creator",
                description: "Create a function that produces widgets",
                starterCode: "# Define your function below\ndef create_widget():\n    # Your code here\n    pass",
                solution: "def create_widget():\n    return 'Widget created!'",
                tests: [
                  {
                    input: "create_widget()",
                    expectedOutput: "Widget created!"
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      id: 4,
      title: "Bug Hunter",
      slug: "bug-hunter",
      description: "Track down and eliminate bugs in Python code! Use your debugging skills to fix broken code.",
      shortDescription: "Fix bugs in Python code",
      image: "/games/bug-hunter.png",
      difficulty: "Intermediate",
      category: "puzzle",
      xp: 300,
      estimatedTime: "45 minutes",
      unlocked: false,
      gameType: "debugging",
      gameData: {
        missions: [
          {
            id: "mission1",
            title: "Syntax Error Emergency",
            description: "A critical system has syntax errors that need immediate fixing!",
            buggyCode: "print('Starting system')\nif True\n    print('System ready')\nelse\n    print('System failure')",
            fixedCode: "print('Starting system')\nif True:\n    print('System ready')\nelse:\n    print('System failure')"
          }
        ]
      }
    },
    {
      id: 5,
      title: "Data Explorer",
      slug: "data-explorer",
      description: "Embark on a data science adventure where you analyze data to discover hidden treasures.",
      shortDescription: "Analyze data to find treasures",
      image: "/games/data-explorer.png",
      difficulty: "Advanced",
      category: "data-science",
      xp: 350,
      estimatedTime: "1.5 hours",
      unlocked: false,
      gameType: "exploration",
      gameData: {
        expeditions: [
          {
            id: "expedition1",
            title: "Treasure Island Dataset",
            description: "Analyze the Treasure Island dataset to locate buried treasure",
            dataset: "treasure_island.csv",
            challenges: [
              {
                id: "challenge1",
                title: "Calculate Average",
                description: "Calculate the average treasure value in the dataset",
                starterCode: "# Your code to calculate average\n\n",
                solution: "import statistics\nvalues = [10, 20, 30, 40, 50]\naverage = statistics.mean(values)\nprint(average)"
              }
            ]
          }
        ]
      }
    }
  ];
  
  export default gamesMockData;