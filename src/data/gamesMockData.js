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
          {
            id: "scene2",
            background: "/games/scenes/castle-courtyard.png",
            title: "The Royal Courtyard",
            description: "You've entered the courtyard. A fountain in the center has strange symbols that match the numbers 1 to 10.",
            challenge: {
              type: "loop",
              instructions: "Use a for loop to print numbers 1 through 10, each on a new line",
              starterCode: "# Write a loop to print numbers 1-10\n",
              solution: "for i in range(1, 11):\n    print(i)",
              expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10"
            },
            hints: [
              "Use the range() function to create a sequence of numbers",
              "range(1, 11) creates numbers from 1 to 10",
              "Put the print statement inside the loop"
            ]
          },
          {
            id: "scene3",
            background: "/games/scenes/garden.png",
            title: "The Enchanted Garden",
            description: "The garden path is blocked by magical plants that respond only to calculations.",
            challenge: {
              type: "calculation",
              instructions: "Calculate and print the sum of numbers from 1 to 20",
              starterCode: "# Calculate the sum of numbers from 1 to 20\n",
              solution: "total = 0\nfor i in range(1, 21):\n    total += i\nprint(total)",
              expectedOutput: "210"
            },
            hints: [
              "Create a variable to store the running sum",
              "Use a loop to add each number to your sum variable",
              "Print the final result after the loop ends"
            ]
          },
          {
            id: "scene4",
            background: "/games/scenes/library.png",
            title: "The Ancient Library",
            description: "You find an old library filled with magical books. A strange puzzle blocks the path forward.",
            challenge: {
              type: "string",
              instructions: "Create a string variable named 'password' with the value 'Pythonista' and print it in all uppercase",
              starterCode: "# Create and manipulate the password\n",
              solution: "password = 'Pythonista'\nprint(password.upper())",
              expectedOutput: "PYTHONISTA"
            },
            hints: [
              "Assign the string to a variable called 'password'",
              "Use the .upper() method to convert a string to uppercase",
              "Don't forget to print the result"
            ]
          },
          {
            id: "scene5",
            background: "/games/scenes/potion-room.png",
            title: "The Alchemist's Laboratory",
            description: "The laboratory is filled with potion ingredients. You need to create a potion by mixing ingredients in a specific order.",
            challenge: {
              type: "list",
              instructions: "Create a list of ingredients: 'frog legs', 'dragon scale', 'wizard hair', 'phoenix feather', and 'troll snot'. Then print each item on a separate line.",
              starterCode: "# Create a list of ingredients\n",
              solution: "ingredients = ['frog legs', 'dragon scale', 'wizard hair', 'phoenix feather', 'troll snot']\nfor ingredient in ingredients:\n    print(ingredient)",
              expectedOutput: "frog legs\ndragon scale\nwizard hair\nphoenix feather\ntroll snot"
            },
            hints: [
              "Create a list using square brackets []",
              "Separate list items with commas",
              "Use a for loop to iterate through the list"
            ]
          },
          {
            id: "scene6",
            background: "/games/scenes/tower.png",
            title: "The Wizard's Tower",
            description: "You've reached the top of the wizard's tower. A magical chessboard blocks your path with a logic puzzle.",
            challenge: {
              type: "conditionals",
              instructions: "Write code that checks if a number is divisible by both 3 and 5. If it is, print 'Magic Number'. If not, print 'Ordinary Number'. Test with the number 15.",
              starterCode: "# Check if 15 is divisible by both 3 and 5\n",
              solution: "number = 15\nif number % 3 == 0 and number % 5 == 0:\n    print('Magic Number')\nelse:\n    print('Ordinary Number')",
              expectedOutput: "Magic Number"
            },
            hints: [
              "Use the modulo operator % to check divisibility",
              "The number is divisible if number % divisor equals 0",
              "Use the 'and' operator to combine conditions"
            ]
          },
          {
            id: "scene7",
            background: "/games/scenes/throne-room.png",
            title: "The Throne Room",
            description: "Finally, you've reached the throne room where the spell source is located. To break it, you must create a powerful function.",
            challenge: {
              type: "function",
              instructions: "Create a function called 'break_spell' that takes a string parameter and returns that string reversed. Call the function with the argument 'Python' and print the result.",
              starterCode: "# Create the break_spell function\n",
              solution: "def break_spell(text):\n    return text[::-1]\n\nresult = break_spell('Python')\nprint(result)",
              expectedOutput: "nohtyP"
            },
            hints: [
              "Define the function using the 'def' keyword",
              "To reverse a string in Python, use string slicing with [::-1]",
              "Call your function and store the result in a variable"
            ]
          }
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
              },
              {
                id: "challenge2",
                title: "Variable Types",
                description: "Create three variables: 'gem_name' with value 'Ruby', 'gem_count' with value 10, and 'gem_value' with value 15.5",
                starterCode: "# Create three variables of different types\n\n",
                solution: "gem_name = 'Ruby'\ngem_count = 10\ngem_value = 15.5\nprint(gem_name)\nprint(gem_count)\nprint(gem_value)",
                expectedOutput: "Ruby\n10\n15.5"
              },
              {
                id: "challenge3",
                title: "Variable Operations",
                description: "Calculate the total value of the gems by multiplying 'gem_count' (7) by 'gem_value' (12.5)",
                starterCode: "# Calculate total value using variables\ngem_count = 7\ngem_value = 12.5\n\n",
                solution: "gem_count = 7\ngem_value = 12.5\ntotal_value = gem_count * gem_value\nprint(total_value)",
                expectedOutput: "87.5"
              },
              {
                id: "challenge4",
                title: "String Concatenation",
                description: "Create a sentence combining the variables 'gem_count' (3) and 'gem_type' ('Emeralds')",
                starterCode: "# Create a sentence using variables\ngem_count = 3\ngem_type = 'Emeralds'\n\n",
                solution: "gem_count = 3\ngem_type = 'Emeralds'\nsentence = f'You found {gem_count} {gem_type}!'\nprint(sentence)",
                expectedOutput: "You found 3 Emeralds!"
              },
              {
                id: "challenge5",
                title: "Type Conversion",
                description: "Convert the string '25' to an integer and multiply it by 2",
                starterCode: "# Convert and calculate\ngem_string = '25'\n\n",
                solution: "gem_string = '25'\ngem_number = int(gem_string)\nresult = gem_number * 2\nprint(result)",
                expectedOutput: "50"
              },
              {
                id: "challenge6",
                title: "Multiple Variables",
                description: "Create a gem collection with red, green, and blue gems. Calculate and print the total.",
                starterCode: "# Count your gem collection\n\n",
                solution: "red_gems = 5\ngreen_gems = 3\nblue_gems = 7\ntotal_gems = red_gems + green_gems + blue_gems\nprint(f'Total gems: {total_gems}')",
                expectedOutput: "Total gems: 15"
              }
            ]
          },
          {
            id: "level2",
            title: "The Conditional Caverns",
            description: "Explore the mysterious caverns where your path depends on making the right decisions with conditional statements.",
            challenges: [
              {
                id: "challenge1",
                title: "Simple If Statement",
                description: "Check if the number of gems (8) is greater than 5. If true, print 'You have enough gems!'",
                starterCode: "# Write your if statement\ngems = 8\n\n",
                solution: "gems = 8\nif gems > 5:\n    print('You have enough gems!')",
                expectedOutput: "You have enough gems!"
              },
              {
                id: "challenge2",
                title: "If-Else Statement",
                description: "Check if the gem type is 'Diamond'. If true, print 'Rare gem!', otherwise print 'Common gem.'",
                starterCode: "# Write an if-else statement\ngem_type = 'Diamond'\n\n",
                solution: "gem_type = 'Diamond'\nif gem_type == 'Diamond':\n    print('Rare gem!')\nelse:\n    print('Common gem.')",
                expectedOutput: "Rare gem!"
              },
              {
                id: "challenge3",
                title: "Multiple Conditions",
                description: "Check if the gem count is greater than 10 AND the gem type is 'Ruby'",
                starterCode: "# Check multiple conditions\ngem_count = 15\ngem_type = 'Ruby'\n\n",
                solution: "gem_count = 15\ngem_type = 'Ruby'\nif gem_count > 10 and gem_type == 'Ruby':\n    print('You have a valuable collection!')\nelse:\n    print('Keep collecting!')",
                expectedOutput: "You have a valuable collection!"
              },
              {
                id: "challenge4",
                title: "If-Elif-Else Chain",
                description: "Categorize gems based on count: 0-5 is 'Beginner', 6-15 is 'Collector', above 15 is 'Gem Master'",
                starterCode: "# Categorize the collection\ngem_count = 12\n\n",
                solution: "gem_count = 12\nif gem_count <= 5:\n    print('Beginner')\nelif gem_count <= 15:\n    print('Collector')\nelse:\n    print('Gem Master')",
                expectedOutput: "Collector"
              },
              {
                id: "challenge5",
                title: "Nested Conditions",
                description: "Check if a gem is valuable based on both type and size",
                starterCode: "# Evaluate gem value\ngem_type = 'Sapphire'\ngem_size = 'Large'\n\n",
                solution: "gem_type = 'Sapphire'\ngem_size = 'Large'\nif gem_type in ['Diamond', 'Ruby', 'Sapphire']:\n    if gem_size == 'Large':\n        print('Very valuable gem!')\n    else:\n        print('Somewhat valuable gem')\nelse:\n    print('Not very valuable')",
                expectedOutput: "Very valuable gem!"
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
              },
              {
                id: "task2",
                title: "Material Processor",
                description: "Create a function that processes raw materials into usable components",
                starterCode: "# Define the process_material function\n\n",
                solution: "def process_material(material):\n    return f'{material} processed into components'",
                tests: [
                  {
                    input: "process_material('Iron')",
                    expectedOutput: "Iron processed into components"
                  }
                ]
              },
              {
                id: "task3",
                title: "Quality Control",
                description: "Create a function that checks if a product meets quality standards",
                starterCode: "# Define the quality_check function\n\n",
                solution: "def quality_check(product, min_quality):\n    product_quality = len(product)\n    return product_quality >= min_quality",
                tests: [
                  {
                    input: "quality_check('Premium Widget', 10)",
                    expectedOutput: "True"
                  },
                  {
                    input: "quality_check('Basic', 10)",
                    expectedOutput: "False"
                  }
                ]
              },
              {
                id: "task4",
                title: "Automated Assembly",
                description: "Create a function that assembles components into a final product",
                starterCode: "# Define the assemble_product function\n\n",
                solution: "def assemble_product(component1, component2):\n    return f'Assembled product from {component1} and {component2}'",
                tests: [
                  {
                    input: "assemble_product('Gears', 'Frame')",
                    expectedOutput: "Assembled product from Gears and Frame"
                  }
                ]
              },
              {
                id: "task5",
                title: "Production Calculator",
                description: "Create a function that calculates production capacity based on worker count and hours",
                starterCode: "# Define the calculate_production function\n\n",
                solution: "def calculate_production(workers, hours):\n    return workers * hours * 5",
                tests: [
                  {
                    input: "calculate_production(4, 8)",
                    expectedOutput: "160"
                  }
                ]
              },
              {
                id: "task6",
                title: "Factory Optimizer",
                description: "Create a function that suggests improvements based on production metrics",
                starterCode: "# Define the optimize_factory function\n\n",
                solution: "def optimize_factory(efficiency):\n    if efficiency < 50:\n        return 'Upgrade machinery'\n    elif efficiency < 80:\n        return 'Train workers'\n    else:\n        return 'Factory running optimally'",
                tests: [
                  {
                    input: "optimize_factory(40)",
                    expectedOutput: "Upgrade machinery"
                  },
                  {
                    input: "optimize_factory(70)",
                    expectedOutput: "Train workers"
                  },
                  {
                    input: "optimize_factory(90)",
                    expectedOutput: "Factory running optimally"
                  }
                ]
              }
            ]
          },
          {
            level: 2,
            title: "Advanced Manufacturing",
            description: "Enhance your factory with advanced functions that include parameters and return values",
            tasks: [
              {
                id: "task1",
                title: "Custom Product Creator",
                description: "Create a function that makes custom products based on specifications",
                starterCode: "# Define your custom_product function\n\n",
                solution: "def custom_product(base, color, size):\n    return f'Custom {color} {base} in size {size}'",
                tests: [
                  {
                    input: "custom_product('Widget', 'Blue', 'Large')",
                    expectedOutput: "Custom Blue Widget in size Large"
                  }
                ]
              },
              {
                id: "task2",
                title: "Resource Allocator",
                description: "Create a function that allocates resources efficiently to different production lines",
                starterCode: "# Define the allocate_resources function\n\n",
                solution: "def allocate_resources(total_resources, production_lines):\n    return total_resources // production_lines",
                tests: [
                  {
                    input: "allocate_resources(100, 4)",
                    expectedOutput: "25"
                  }
                ]
              },
              {
                id: "task3",
                title: "Advanced Quality Control",
                description: "Create a function that performs multiple quality checks and returns a comprehensive report",
                starterCode: "# Define the advanced_quality_check function\n\n",
                solution: "def advanced_quality_check(product, durability, appearance, functionality):\n    total_score = durability + appearance + functionality\n    if total_score >= 25:\n        return 'Premium quality'\n    elif total_score >= 15:\n        return 'Standard quality'\n    else:\n        return 'Below standards'",
                tests: [
                  {
                    input: "advanced_quality_check('Deluxe Widget', 9, 8, 9)",
                    expectedOutput: "Premium quality"
                  },
                  {
                    input: "advanced_quality_check('Regular Widget', 6, 5, 5)",
                    expectedOutput: "Standard quality"
                  },
                  {
                    input: "advanced_quality_check('Basic Widget', 3, 4, 4)",
                    expectedOutput: "Below standards"
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
          },
          {
            id: "mission2",
            title: "Indentation Investigation",
            description: "The code's indentation is all wrong, causing unpredictable behavior!",
            buggyCode: "def calculate_total(items):\n    total = 0\n for item in items:\n        total += item\n    return total\n\nprices = [10, 20, 30]\nprint(calculate_total(prices))",
            fixedCode: "def calculate_total(items):\n    total = 0\n    for item in items:\n        total += item\n    return total\n\nprices = [10, 20, 30]\nprint(calculate_total(prices))"
          },
          {
            id: "mission3",
            title: "Variable Name Mystery",
            description: "Someone used the wrong variable names and the code isn't working!",
            buggyCode: "def greet_user(name):\n    message = 'Hello, ' + user_name + '!'\n    return messag\n\nresult = greet_user('Alex')\nprint(result)",
            fixedCode: "def greet_user(name):\n    message = 'Hello, ' + name + '!'\n    return message\n\nresult = greet_user('Alex')\nprint(result)"
          },
          {
            id: "mission4",
            title: "Loop Logic Error",
            description: "The logic in this loop is wrong and it's producing incorrect results!",
            buggyCode: "# Function to find the sum of even numbers in a list\ndef sum_even_numbers(numbers):\n    total = 0\n    for num in numbers:\n        if num % 2:\n            total += num\n    return total\n\nnumber_list = [1, 2, 3, 4, 5, 6]\nprint(sum_even_numbers(number_list))",
            fixedCode: "# Function to find the sum of even numbers in a list\ndef sum_even_numbers(numbers):\n    total = 0\n    for num in numbers:\n        if num % 2 == 0:\n            total += num\n    return total\n\nnumber_list = [1, 2, 3, 4, 5, 6]\nprint(sum_even_numbers(number_list))"
          },
          {
            id: "mission5",
            title: "Function Parameter Problem",
            description: "The function parameters are messed up and causing errors!",
            buggyCode: "def calculate_rectangle_area(width, length):\n    area = width * height\n    return area\n\nprint(calculate_rectangle_area(5, 10))",
            fixedCode: "def calculate_rectangle_area(width, length):\n    area = width * length\n    return area\n\nprint(calculate_rectangle_area(5, 10))"
          },
          {
            id: "mission6",
            title: "List Index Catastrophe",
            description: "The list indices are out of range and crashing the program!",
            buggyCode: "fruits = ['apple', 'banana', 'cherry']\n\nprint(fruits[0])\nprint(fruits[1])\nprint(fruits[2])\nprint(fruits[3])",
            fixedCode: "fruits = ['apple', 'banana', 'cherry']\n\nprint(fruits[0])\nprint(fruits[1])\nprint(fruits[2])"
          },
          {
            id: "mission7",
            title: "Type Conversion Crisis",
            description: "The code is trying to perform operations on incompatible types!",
            buggyCode: "# Function to calculate total price\ndef calculate_total_price(price, quantity):\n    return price + quantity\n\nprice = '10'\nquantity = 5\ntotal = calculate_total_price(price, quantity)\nprint('Total price:', total)",
            fixedCode: "# Function to calculate total price\ndef calculate_total_price(price, quantity):\n    return price * quantity\n\nprice = 10\nquantity = 5\ntotal = calculate_total_price(price, quantity)\nprint('Total price:', total)"
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