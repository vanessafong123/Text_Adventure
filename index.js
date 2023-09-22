class Room {
  constructor(name, description) {
    this._name = name;
    this._description = description;
    this._linkedRooms = {};
    this._character ="";
  }

  set character(value){
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
      alert("description is too short.");
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
      } 
      else {
          alert("There is nothing in this direction.")
          return this;
      }
  }
}

class Character {
  constructor(name, description, conversation) {
    this._name = name,
    this._description = description
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
      alert("Decription is too short.");
      return;
    }
    this._description = value;
  }

  set conversation(value) {
    if (value.length < 4) {
      alert("conversation is too short.");
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

console.log("online")

const Castle = new Room("castle", "it is a tall and pointy tower. Why everyone is petrified?!!!");
const Jungle = new Room("jungle", "there is a lot of huge green plants and you can barely see any sunlight here. There is a loud noise...") ;
const Maze = new Room("maze", "it is a gigantic grass maze and you seem to be lost. All of a sudden...");
const Home = new Room("Sir Charlie Stinky Socks' home", "it is the smelliest and messiest place in the whole wide world.")


Castle.linkRoom("south", Jungle)
Castle.linkRoom("east", Maze)
Jungle.linkRoom("north", Castle)
Jungle.linkRoom("east", Home)
Home.linkRoom("west", Jungle)
Home.linkRoom("north", Maze)
Maze.linkRoom("west", Castle)
Maze.linkRoom("south", Home)

console.log(Home._linkedRooms)

const Wizard = new Character("Evil Wizard", "a wizard", "Let me turn you into a stone!!!!");
Castle._character = Wizard;

const Monster = new Character("Monster", "a huge monster", "Roarrrr...I am hungry!!!!")
Jungle._character = Monster;

const Fairy = new Character("Fairy", "a kind-hearted fairy", "It's good to see you here, let me help you.")
Maze._character = Fairy;

let currentRoom;

const displayRoomInfo = (room) => {
  let occupantMsg = "";

  if (room.character) {
      occupantMsg = `${room._character.talk()}`
  }
  else {
      occupantMsg = "There is no one here...so where do you want to go now?";
  }

  let textContect = "<p>" + room.describe() + "</p>" + "<p>" + occupantMsg + "</p>";
  document.getElementById("textarea").innerHTML = textContect;
  document.getElementById("usertext").value = ""
  document.getElementById("usertext").focus()
  };

const startGame = () => {
  currentRoom = Home;
  displayRoomInfo(currentRoom);

const endGame = () => {
alert("You are killed!!!!!");
return;
}

const endGame2 = () => {
alert("Congrats!! With the help of the fairy, you defeat the evil wizard!")
return;
}


document.addEventListener("keydown", (event) => {
if (event.key === "Enter") {
const command = document.getElementById("usertext").value.toLowerCase();
const directions = ["north", "south", "east", "west"]
if (directions.includes(command)) {
  currentRoom = currentRoom.move(command);
  displayRoomInfo(currentRoom);
  
  if (currentRoom === Jungle) {
    const command = document.getElementById("usertext");
    command.style.display = "none";
  }

  setTimeout(() => {
    if (currentRoom === Jungle) {
      endGame();
    }    
  }, 1000)

  if (currentRoom === Castle) {
    const command = document.getElementById("usertext");
    command.style.display = "none";
  }

  setTimeout(() => {
    if (currentRoom === Castle) {
      endGame2();
    }    
  }, 1000)


} else {
  document.getElementById("usertext").value = "";
  alert("This is not a valid command.");
  return;
}
}});
};


startGame();