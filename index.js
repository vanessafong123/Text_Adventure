class Room {
  constructor(name, description) {
    this._name = name;
    this._description = description;
    this._linkedRooms = {};
    this._character = "";
    this._linkedWeapons = {};
  }

  set character(value) {
    this._character = value;
  }

  get character() {
    return this._character;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._description = value;
  }

  describe() {
    return "Looking around the " + this._name + " you can see " + this._description;
  }

  linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("There is nothing in this direction.");
      return this;
    }
  }

  linkWeapon(Weapon) {
    this._linkedWeapons[Weapon.name] = Weapon;
  }

  showWeapons() {
    return this._linkedWeapons;
  }
}

class Character {
  constructor(name, description, conversation) {
    this._name = name;
    this._description = description;
    this._conversation = conversation;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._description = value;
  }

  set conversation(value) {
    if (value.length < 4) {
      alert("Conversation is too short.");
      return;
    }
    this._conversation = value;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get conversation() {
    return this._conversation;
  }

  describe() {
    return "You have met " + this._name + ", " + this._name + " is " + this._description;
  }

  talk() {
    return this._name + " says " + "'" + this._conversation + "'";
  }
}

class Weapon {
  constructor(name) {
    this._name = name;
     }

  collect(command) {
    console.log(command)
    // return command.toLowerCase() === "collect";
  }
}

console.log("online");

const Castle = new Room("castle", "It is a tall and pointy tower. Why is everyone petrified?!!!");
const Jungle = new Room("jungle", "There are huge green plants, and you can barely see any sunlight here. There is a loud noise...");
const Maze = new Room("maze", "It is a gigantic grass maze, and you seem to be lost. All of a sudden...");
const Home = new Room("Sir Charlie Stinky Socks' home", "It is the smelliest and messiest place in the whole wide world.");
const Socks = new Weapon("a pair of socks");

Maze.linkWeapon(Socks);
Castle.linkRoom("south", Jungle);
Castle.linkRoom("east", Maze);
Jungle.linkRoom("north", Castle);
Jungle.linkRoom("east", Home);
Home.linkRoom("west", Jungle);
Home.linkRoom("north", Maze);
Maze.linkRoom("west", Castle);
Maze.linkRoom("south", Home);

console.log(Home._linkedRooms);

const Wizard = new Character("Evil Wizard", "A wizard", "Let me turn you into a stone!!!!");
Castle.character = Wizard;

const Monster = new Character("Monster", "A huge monster", "Roarrrr...I am hungry!!!!");
Jungle.character = Monster;

const Fairy = new Character("Fairy", "A kind-hearted fairy", "You will need this weapon, take it.");
Maze.character = Fairy;

let currentRoom;

const displayRoomInfo = (room) => {
  let occupantMsg = "";
  if (room.character) {
    occupantMsg = `${room.character.talk()}`;
  } else {
    occupantMsg = "There is no one here...so where do you want to go now?";
  }

  let textContent = "<p>" + room.describe() + "</p>" + "<p>" + occupantMsg + "</p>";
  document.getElementById("textarea").innerHTML = textContent;
  document.getElementById("usertext").value = "";
  document.getElementById("usertext").focus();
};

const startGame = () => {
  currentRoom = Home;
  displayRoomInfo(currentRoom);

};

const endGame = () => {
  alert("You are killed!!!!!");
  return;
};

const endGame2 = () => {
  currentRoom = Castle;
  displayRoomInfo(currentRoom);

  setTimeout(() => {
    alert("Congrats!! With the pair of stinky socks, you defeat the evil wizard!");
  }, 1000)
  return;
};

document.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    const command = document.getElementById("usertext").value.toLowerCase();
    const directions = ["north", "south", "east", "west"];

    if (directions.includes(command)) {

      currentRoom = currentRoom.move(command);
      displayRoomInfo(currentRoom);

      setTimeout(() => {
        if (currentRoom === Maze) {        
          const collectCommand = prompt("The fairy gives you a pair of stinky socks! Type 'collect' to collect the socks.");
          console.log(collectCommand)
          if (collectCommand === "collect") {
            document.getElementById("usertext").style.display = "none";
            setTimeout(endGame2, 1000);
          } else {
            alert("You need to type 'collect' to collect the stinky socks.");
          }
          return;
        }
      }, 1000)

      if (currentRoom === Jungle) {
        document.getElementById("usertext").style.display = "none";
        setTimeout(endGame, 1000);
      }

      if (currentRoom === Castle) {
        document.getElementById("usertext").style.display = "none";
       
      }
    } else {
      document.getElementById("usertext").value = "";
      alert("This is not a valid command.");
    }
  }
});

startGame();
