//Define a Rover Object:

let rover = {
    direction: "N",
    x: 0,
    y: 0,
    travelLog: [{ x: 0, y: 0 }]
  };
  
  let wallERover = {
    direction: "N",
    x: 9,
    y: 9,
    travelLog: [{ x: 9, y: 9 }]
  };
  
  let boundaries = {
    north: 0,
    south: 9,
    west: 0,
    east: 9
  };
  
  //Define Obstacles:
  
  let grid = [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""]
  ];
  
  let createObstacles;
  let numberOfObstacles = 3;
  
  function positionRoversAndObstacles() {
    for (
      createObstacles = 0;
      createObstacles < numberOfObstacles;
      createObstacles++
    ) {
      let gridObstaclesX = Math.floor(Math.random() * 9);
      let gridObstaclesY = Math.floor(Math.random() * 9);
      while (grid[gridObstaclesY][gridObstaclesX] !== "") {
        gridObstaclesX = Math.floor(Math.random() * 9);
        gridObstaclesY = Math.floor(Math.random() * 9);
      }
      grid[gridObstaclesY][gridObstaclesX] = "Obstacle";
    }
    grid[rover.y][rover.x] = "Rover";
    grid[wallERover.y][wallERover.x] = "Rover";
    return;
  }
  
  positionRoversAndObstacles();
  console.log(grid);
  
  //Define a turnLeft Function:
  
  function turnLeft(theRover) {
    switch (theRover.direction) {
      case "N":
        theRover.direction = "W";
        break;
      case "W":
        theRover.direction = "S";
        break;
      case "S":
        theRover.direction = "E";
        break;
      case "E":
        theRover.direction = "N";
        break;
    }
    //console.log("turnLeft was called!");
    //console.log(`The rover is now facing ${rover.direction}.`);
    return;
  }
  
  //Define a turnRight Function:
  
  function turnRight(theRover) {
    switch (theRover.direction) {
      case "N":
        theRover.direction = "E";
        break;
      case "E":
        theRover.direction = "S";
        break;
      case "S":
        theRover.direction = "W";
        break;
      case "W":
        theRover.direction = "N";
        break;
    }
    //console.log("turnRight was called!");
    //console.log(`The rover is now facing ${rover.direction}.`);
    return;
  }
  
  /*turnLeft(rover);
  turnLeft(rover);
  turnLeft(rover);
  turnLeft(rover);
  turnRight(rover);
  turnRight(rover);
  turnRight(rover);
  turnRight(rover);
  turnRight(rover);
  console.log(rover.direction);
  console.log("End of turnLeft and turnRight functions.");
  console.log("---------------------------");*/
  
  //Define a rover moveForward Function:
  
  function moveForward(theRover) {
    //console.log("moveForward was called");
    switch (theRover.direction) {
      case "N":
        validateForwardNorth(theRover);
        break;
      case "S":
        validateForwardSouth(theRover);
        break;
      case "W":
        validateForwardWest(theRover);
        break;
      case "E":
        validateForwardEast(theRover);
        break;
    }
    return;
  }
  
  /*moveForward(rover);
  turnRight(rover);
  moveForward(rover);
  turnRight(rover);
  moveForward(rover);
  turnRight(rover);
  moveForward(rover);
  console.log("End of moveForward function.");
  console.log("---------------------------");*/
  
  //Define a rover moveBackward Function (Bonus 2 | Move Backwards):
  
  function moveBackward(theRover) {
    //console.log("moveBackward was called");
    switch (theRover.direction) {
      case "N":
        validateBackwardSouth(theRover);
        break;
      case "S":
        validateBackwardNorth(theRover);
        break;
      case "W":
        validateBackwardEast(theRover);
        break;
      case "E":
        validateBackwardWest(theRover);
        break;
    }
    return;
  }
  
  /*moveBackward(rover);
  moveBackward(rover);
  turnRight(rover);
  moveBackward(rover);
  moveBackward(rover);
  console.log("End of moveBackward function.");
  console.log("---------------------------");*/
  
  //Create a function of commands;
  //Bonus 3 | Validate Inputs;
  
  function roverCommand(theRover, command) {
    for (
      let commandSequence = 0;
      commandSequence < command.length;
      commandSequence++
    ) {
      let roverMovement = command[commandSequence];
      let validCommands =
        roverMovement === "l" ||
        roverMovement === "r" ||
        roverMovement === "f" ||
        roverMovement === "b";
      if (validCommands) {
        switch (roverMovement) {
          case "l":
            turnLeft(theRover);
            break;
          case "r":
            turnRight(theRover);
            break;
          case "f":
            moveForward(theRover);
            break;
          case "b":
            moveBackward(theRover);
            break;
        }
        let updateCoordinates = { x: theRover.x, y: theRover.y };
        theRover.travelLog.push(updateCoordinates);
        console.log(
          `Movement ${commandSequence + 1} => The rover is now facing ${
            theRover.direction
          } and its position is x = ${theRover.x}, y = ${theRover.y}.`
        );
      } else {
        console.log(
          `Movement "${roverMovement}" is not a valid Command! Choose a correct command to proceed: left ("l"), right("r"), forward("f") or backward("b").`
        );
        commandSequence = command.length;
      }
    }
    return;
  }
  
  console.log("Beginning of rover movement");
  roverCommand(rover, "rffrbbfffflflffffffbbbfrf");
  console.log("End of rover movement");
  console.log("Beginning of wallERover movement");
  roverCommand(wallERover, "rffrbbfffflflffffflffffflbb");
  console.log("End of wallERover movement");
  console.log("End of commands function.");
  console.log("---------------------------");
  
  //Enforce Boundaries and Analyze Obstacles/Rovers:
  
  //Enforce Boundaries MoveForward
  
  function validateForwardNorth(theRover) {
    if (theRover.y !== boundaries.north) {
      let desiredForwardNorthPosition = grid[theRover.y - 1][theRover.x];
      if (desiredForwardNorthPosition === "") {
        theRover.y--;
        grid[theRover.y][theRover.x] = "Rover";
        grid[theRover.y + 1][theRover.x] = "";
      } else {
        console.log(
          "The rover can't move to the desired position. There is an obstruction (a rover or an obstacle). Adjust your rover direction or your movement."
        );
      }
    } else {
      console.log(
        "You can´t place the rover outside the boundaries. Adjust your rover direction or your movement."
      );
    }
    return;
  }
  
  function validateForwardSouth(theRover) {
    if (theRover.y !== boundaries.south) {
      let desiredForwardSouthPosition = grid[theRover.y + 1][theRover.x];
      if (desiredForwardSouthPosition === "") {
        theRover.y++;
        grid[theRover.y][theRover.x] = "Rover";
        grid[theRover.y - 1][theRover.x] = "";
      } else {
        console.log(
          "The rover can't move to the desired position. There is an obstruction (a rover or an obstacle). Adjust your rover direction or your movement."
        );
      }
    } else {
      console.log(
        "You can´t place the rover outside the boundaries. Adjust your rover direction or your movement."
      );
    }
    return;
  }
  
  function validateForwardWest(theRover) {
    if (theRover.x !== boundaries.west) {
      let desiredForwardWestPosition = grid[theRover.y][theRover.x - 1];
      if (desiredForwardWestPosition === "") {
        theRover.x--;
        grid[theRover.y][theRover.x] = "Rover";
        grid[theRover.y][theRover.x + 1] = "";
      } else {
        console.log(
          "The rover can't move to the desired position. There is an obstruction (a rover or an obstacle). Adjust your rover direction or your movement."
        );
      }
    } else {
      console.log(
        "You can´t place the rover outside the boundaries. Adjust your rover direction or your movement."
      );
    }
    return;
  }
  
  function validateForwardEast(theRover) {
    if (theRover.x !== boundaries.east) {
      let desiredForwardEastPosition = grid[theRover.y][theRover.x + 1];
      if (desiredForwardEastPosition === "") {
        theRover.x++;
        grid[theRover.y][theRover.x] = "Rover";
        grid[theRover.y][theRover.x - 1] = "";
      } else {
        console.log(
          "The rover can't move to the desired position. There is an obstruction (a rover or an obstacle). Adjust your rover direction or your movement."
        );
      }
    } else {
      console.log(
        "You can´t place the rover outside the boundaries. Adjust your rover direction or your movement."
      );
    }
    return;
  }
  
  //Enforce Boundaries MoveBackward
  
  function validateBackwardSouth(theRover) {
    if (theRover.y !== boundaries.south) {
      let desiredBackwardSouthPosition = grid[theRover.y + 1][theRover.x];
      if (desiredBackwardSouthPosition === "") {
        theRover.y++;
        grid[theRover.y][theRover.x] = "Rover";
        grid[theRover.y - 1][theRover.x] = "";
      } else {
        console.log(
          "The rover can't move to the desired position. There is an obstruction (a rover or an obstacle). Adjust your rover direction or your movement."
        );
      }
    } else {
      console.log(
        "You can´t place the rover outside the boundaries. Adjust your rover direction or your movement."
      );
    }
    return;
  }
  
  function validateBackwardNorth(theRover) {
    if (theRover.y !== boundaries.north) {
      let desiredBackwardNorthPosition = grid[theRover.y - 1][theRover.x];
      if (desiredBackwardNorthPosition === "") {
        theRover.y--;
        grid[theRover.y][theRover.x] = "Rover";
        grid[theRover.y + 1][theRover.x] = "";
      } else {
        console.log(
          "The rover can't move to the desired position. There is an obstruction (a rover or an obstacle). Adjust your rover direction or your movement."
        );
      }
    } else {
      console.log(
        "You can´t place the rover outside the boundaries. Adjust your rover direction or your movement."
      );
    }
    return;
  }
  
  function validateBackwardEast(theRover) {
    if (theRover.x !== boundaries.east) {
      let desiredBackwardEastPosition = grid[theRover.y][theRover.x + 1];
      if (desiredBackwardEastPosition === "") {
        theRover.x++;
        grid[theRover.y][theRover.x] = "Rover";
        grid[theRover.y][theRover.x - 1] = "";
      } else {
        console.log(
          "The rover can't move to the desired position. There is an obstruction (a rover or an obstacle). Adjust your rover direction or your movement."
        );
      }
    } else {
      console.log(
        "You can´t place the rover outside the boundaries. Adjust your rover direction or your movement."
      );
    }
    return;
  }
  
  function validateBackwardWest(theRover) {
    if (theRover.x !== boundaries.west) {
      let desiredBackwardWestPosition = grid[theRover.y][theRover.x - 1];
      if (desiredBackwardWestPosition === "") {
        theRover.x--;
        grid[theRover.y][theRover.x] = "Rover";
        grid[theRover.y][theRover.x + 1] = "";
      } else {
        console.log(
          "The rover can't move to the desired position. There is an obstruction (a rover or an obstacle). Adjust your rover direction or your movement."
        );
      }
    } else {
      console.log(
        "You can´t place the rover outside the boundaries. Adjust your rover direction or your movement."
      );
    }
    return;
  }
  
  console.log(grid);
  