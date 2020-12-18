var redColor = "#af2e33";
var yellowColor = "#e9b872";
var redScore = 0;
var yellowScore = 0;
var redLives = 2;
var yellowLives = 2;
var yellowStreakLost = 0;
var redStreakLost = 0;
var tick;
var introTick;
var confirmedColor;
var games = [];
var instructionUrls = ["https://i.imgur.com/cnAdUAK.png", "https://i.imgur.com/qrbnhfh.png", "https://i.imgur.com/8ynpgFh.png", "https://i.imgur.com/GQUm7Q2.png", "https://i.imgur.com/2RbmjuW.png", "https://i.imgur.com/U9NSMaz.png", "https://i.imgur.com/2jibueY.png", "https://i.imgur.com/O3hHkpp.png"];
var currentInstruction = 0;
fireworkCanvas.style.display = "none";
var pieces = [];

(function introBackground() {
  introBack.width = window.innerWidth;
  introBack.height = window.innerHeight;
  var currentColor = redColor;
  var ctx = introBack.getContext("2d");
  ctx.shadowBlur = 4;
  ctx.shadowColor = "black";
  function introPiece() {
    this.x = Math.random() * window.innerWidth;
    this.y = -20;
    this.r = 30;
    this.xv = Math.random() * 10 - 5;
    this.yv = -1;
    this.l = false;
    this.c = (confirmedColor || currentColor);
    this.o = 10;
  }
  function introAddPiece() {
    if (document.hasFocus()) {
      pieces.push(new introPiece());
      if (currentColor == redColor) {
        currentColor = yellowColor;
      } else {
        currentColor = redColor;
      }
    }

    setTimeout(introAddPiece, Math.random() * 250 + 125);
  }
  introAddPiece();
  introTick = function () {
    ctx.clearRect(0, 0, introBack.width, introBack.height);
    pieces.map(function (x) {
      ctx.globalAlpha = 1;

      //   ctx.globalAlpha = x.o / Math.abs(x.o);
      if (x.l) {
        x.o -= 0.1;
      }
      if (x.o < 0) {
        ctx.globalAlpha = 0;
        x.o = 0.1;
      } else {
        ctx.globalAlpha = x.o;
      }
      ctx.fillStyle = x.c;
      ctx.beginPath();
      ctx.arc(x.x, x.y, x.r, 0, 2 * Math.PI);
      x.x += x.xv;
      x.y += x.yv;
      if (x.xv != 0) {
        x.xv -= (x.xv / Math.abs(x.xv)) * 0.001;
      }
      if (x.y > window.innerHeight - x.r) {
        x.y = window.innerHeight - x.r;
        x.yv *= -0.7;
        if (x.xv != 0) {
          x.xv -= (x.xv / Math.abs(x.xv)) * 0.1;
        }
        if (x.xv < 0.000001) {
          x.xv = 0;
          if (x.yv < 0.000001) {
            if (window.innerHeight - x.y < x.r + 10) {
              x.l = true;
            }
          }
        }
      } else {
        x.yv += 0.1;
      }
      if (x.x < 0 || x.x > window.innerWidth) {
        x.xv *= -0.8;
      }
      ctx.fill();
    });
    pieces = pieces.filter(function (x) {
      return x.o > 0;
    });
  }
  tick = setInterval(introTick, 10);
})();
instructionImage.onclick = function () {
  currentInstruction++;
  instructionImage.src = instructionUrls[currentInstruction % instructionUrls.length];
}
play.onclick = function () {
  clearInterval(tick);
  introCont.style.display = "none";
  gameCont.style.display = "block";
  // games = JSON.parse(`[["data:image/png;base64,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","r"],["data:image/png;base64,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","r"],["data:image/png;base64,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","r"],["data:image/png;base64,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","r"],["data:image/png;base64,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","r"],["data:image/png;base64,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","y"],["data:image/png;base64,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","y"],["data:image/png;base64,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","r"]]`)
  // gameOver('r');
};
if (true) {
  //Rows and Columns of board
  var boardColumns = 5;
  var boardRows = 7;
  var winLength = 3;
  var circleRad = 20;
  var circlePad = 5;
  var startPad = 5;
  var gameTable = [];
  var dropIndicator = document.getElementById("dropIndicator");

  for (var i = 0; i < boardColumns; i++) {
    gameTable.push(Array.apply(null, Array(boardRows)));
  }
  //Configure canvas size;
  var gameCanvas = document.getElementById("gameCanvas");
  var canvasWidth;
  gameCanvas.width = canvasWidth;
  gameCanvas.height =
    circleRad * 2 * boardRows + circleRad + (boardRows + 1) * circlePad;
  setShield();
  function setRotateSymbols() {
    rotateLeft.style.left = `${window.innerWidth / 2 -
      (circleRad * 2 * boardColumns +
        circleRad +
        (boardColumns + 1) * circlePad) /
      2 -
      startPad - 50
      }px`;
    rotateLeft.style.top = `${window.innerHeight / 2 -
      (circleRad * 2 * boardRows + circleRad + (boardRows + 1) * circlePad) /
      2 -
      40
      }px`;
    rotateRight.style.left = `${window.innerWidth / 2 +
      (circleRad * 2 * boardColumns +
        circleRad +
        (boardColumns + 1) * circlePad) /
      2 -
      startPad + 50
      }px`;
    rotateRight.style.top = `${window.innerHeight / 2 -
      (circleRad * 2 * boardRows + circleRad + (boardRows + 1) * circlePad) /
      2 -
      40
      }px`;
    setShield();
    updateSize();
    drawBoard();
  }
  window.onresize = function () {
    setRotateSymbols();
    setTimeout(function () {
      setRotateSymbols();
    }, 250);
  };
  var boardBackground = "#9797f7";
  gameCanvas.style.background = boardBackground;
  var ctx = gameCanvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.lineWidth = 0;
  ctx.strokeStyle = boardBackground;
  //Draw board
  shieldButton.style.width = `${circleRad * 2}px`;
  shieldButton.style.height = `${circleRad * 2}px`;
  dropIndicator.style.width = `${circleRad * 2}px`;
  dropIndicator.style.height = `${circleRad * 2}px`;
  // shieldDisplay.style.width = `${circleRad * 2}px`;
  // shieldDisplay.style.height = `${circleRad * 2}px`;
  function drawBoard() {
    canvasWidth =
      circleRad * 2 * boardColumns +
      (boardColumns - 1) * circlePad +
      startPad * 2;
    dropIndicator.style.width = `${circleRad * 2}px`;
    dropIndicator.style.height = `${circleRad * 2}px`;
    // shieldDisplay.style.width = `${circleRad * 2}px`;
    // shieldDisplay.style.height = `${circleRad * 2}px`;
    gameCanvas.width = canvasWidth;
    gameCanvas.height =
      circleRad * 2 * boardRows + circleRad + (boardRows + 1) * circlePad;
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    var drawX = startPad;
    var drawY =
      (gameCanvas.height -
        (circleRad * 2 * boardRows + (boardRows - 1) * circlePad)) /
      2;
    for (rowCount = 0; rowCount < boardRows; rowCount++) {
      for (columnCount = 0; columnCount < boardColumns; columnCount++) {
        if (gameTable[columnCount][rowCount]) {
          ctx.fillStyle = gameTable[columnCount][rowCount].t;
          ctx.lineWidth = 0;
          ctx.strokeStyle = boardBackground;
        } else {
          ctx.fillStyle = "white";
          ctx.lineWidth = 0;
          ctx.strokeStyle = boardBackground;
        }
        ctx.beginPath();
        ctx.arc(
          drawX + circleRad,
          drawY + circleRad,
          circleRad,
          0,
          2 * Math.PI
        );
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(
          drawX + circleRad,
          drawY + circleRad,
          circleRad,
          0,
          2 * Math.PI
        );
        ctx.fill();
        drawX += circleRad * 2 + circlePad;
      }
      drawY += circleRad * 2 + circlePad;
      drawX = startPad;
    }
  }
  drawBoard();
  var selectedColumn = 0;
  var currentColor = 0;
  var colors = [redColor, yellowColor];
  var mouseMoveEvent;
  document.onmousemove = function (e) {
    if (
      e.clientX - (window.innerWidth / 2 - gameCanvas.width / 2 + startPad) >
      0 &&
      (Math.round(
        (e.clientX -
          circleRad -
          (window.innerWidth / 2 - gameCanvas.width / 2 + startPad)) /
        (circleRad * 2 + circlePad)
      ) *
        (circleRad * 2 + circlePad)) /
      (circleRad * 2 + circlePad) < boardColumns
    ) {
      selectedColumn =
        (Math.round(
          (e.clientX -
            circleRad -
            (window.innerWidth / 2 - gameCanvas.width / 2 + startPad)) /
          (circleRad * 2 + circlePad)
        ) *
          (circleRad * 2 + circlePad)) /
        (circleRad * 2 + circlePad);


      if (shieldMode) {
        console.log(Math.round(
          (mouseMoveEvent.clientY -
            circleRad -
            (window.innerHeight / 2 - gameCanvas.height / 2 + startPad)) /
          (circleRad * 2 + circlePad)
        ), selectedColumn);
        if (Math.round(
          (mouseMoveEvent.clientY -
            circleRad -
            (window.innerHeight / 2 - gameCanvas.height / 2 + startPad)) /
          (circleRad * 2 + circlePad)
        ) > boardRows - 1 || selectedColumn > boardColumns || Math.round(
          (mouseMoveEvent.clientY -
            circleRad -
            (window.innerHeight / 2 - gameCanvas.height / 2 + startPad)) /
          (circleRad * 2 + circlePad)
        ) < 0) {
          mouseMoveEvent = e;

          return;
        }
        shieldDisplay.style.top = `${gameCanvas.getBoundingClientRect().top +
          startPad +
          ((Math.round(
            (mouseMoveEvent.clientY -
              circleRad -
              (window.innerHeight / 2 - gameCanvas.height / 2 + startPad)) /
            (circleRad * 2 + circlePad)
          ) *
            (circleRad * 2 + circlePad)) /
            (circleRad * 2 + circlePad)) * (circleRad * 2 + circlePad)
          + circleRad}px`;
        shieldDisplay.style.left = `${gameCanvas.getBoundingClientRect().left +
          startPad +
          selectedColumn * (circleRad * 2 + circlePad)
          + circleRad - shieldDisplay.getBoundingClientRect().width / 5}px`;
      } else {
        dropIndicator.style.left = `${gameCanvas.getBoundingClientRect().left +
          startPad +
          selectedColumn * (circleRad * 2 + circlePad)
          }px`;
      }
      mouseMoveEvent = e;
    }
  };
  gameCanvas.onclick = function () {
    if (shieldMode) {
      if (gameTable[
        (Math.round(
          (mouseMoveEvent.clientX -
            circleRad -
            (window.innerWidth / 2 - gameCanvas.width / 2 + startPad)) /
          (circleRad * 2 + circlePad)
        ) *
          (circleRad * 2 + circlePad)) /
        (circleRad * 2 + circlePad)
      ][
        (Math.round(
          (mouseMoveEvent.clientY -
            circleRad -
            (window.innerHeight / 2 - gameCanvas.height / 2 + startPad)) /
          (circleRad * 2 + circlePad)
        ) *
          (circleRad * 2 + circlePad)) /
        (circleRad * 2 + circlePad)
      ] != undefined) { return }
      shieldDisplay.style.display = "none";
      placedShield = true;
      shieldButton.style.opacity = ".3";
      gameTable[
        (Math.round(
          (mouseMoveEvent.clientX -
            circleRad -
            (window.innerWidth / 2 - gameCanvas.width / 2 + startPad)) /
          (circleRad * 2 + circlePad)
        ) *
          (circleRad * 2 + circlePad)) /
        (circleRad * 2 + circlePad)
      ][
        (Math.round(
          (mouseMoveEvent.clientY -
            circleRad -
            (window.innerHeight / 2 - gameCanvas.height / 2 + startPad)) /
          (circleRad * 2 + circlePad)
        ) *
          (circleRad * 2 + circlePad)) /
        (circleRad * 2 + circlePad)
      ] = {
        c: Math.abs(
          (Math.round(
            (mouseMoveEvent.clientX -
              circleRad -
              (window.innerWidth / 2 - gameCanvas.width / 2 + startPad)) /
            (circleRad * 2 + circlePad)
          ) *
            (circleRad * 2 + circlePad)) /
          (circleRad * 2 + circlePad)
        ),
        r:
          (Math.round(
            (mouseMoveEvent.clientY -
              circleRad -
              (window.innerHeight / 2 - gameCanvas.height / 2 + startPad)) /
            (circleRad * 2 + circlePad)
          ) *
            (circleRad * 2 + circlePad)) /
          (circleRad * 2 + circlePad),
        t: "#90a959",
        w: true,
      };
      shieldMode = false;
      shieldButton.style.boxShadow = "unset";
      drawBoard();
    } else {
      if (!moved && !locked) {
        if (gameTable[selectedColumn][0]) { return }
        locked = true;
        moved = true;
        doneMove.style.opacity = "1";
        shieldButton.style.opacity = ".3";
        shieldButton.style.cursor = "not-allowed";
        rotateLeft.style.opacity = "1";
        rotateRight.style.opacity = "1";
        rotateLeft.style.cursor = "pointer";
        rotateRight.style.cursor = "pointer";
        gameTable[selectedColumn][0] = {
          c:
            (Math.round(
              (mouseMoveEvent.clientX -
                circleRad -
                (window.innerWidth / 2 - gameCanvas.width / 2 + startPad)) /
              (circleRad * 2 + circlePad)
            ) *
              (circleRad * 2 + circlePad)) /
            (circleRad * 2 + circlePad),
          r: 0,
          t: colors[currentColor % colors.length],
        };
        drawBoard();
        // if (placedShield) {
        //   setTimeout(function () {
        //     locked = false;
        //     doneMove.click();
        //   }, 500);
        // }
      }
    }
  };
  rotateLeft.onclick = function () {
    rotateBoard(-1);
  };
  rotateRight.onclick = function () {
    rotateBoard(1);
  };
  function rotateBoard(dir) {
    if (rotateRight.style.opacity != "1" || rotateLeft.style.opacity != "1") {
      return null;
    }
    if (dir == -1) {
      gameCanvas.style.transform = "translate(-50%,-50%) rotate(-90deg)";
    } else {
      gameCanvas.style.transform = "translate(-50%,-50%) rotate(90deg)";
    }
    // setTimeout(function () {
    // }, 300);
    var old = boardColumns;
    boardColumns = boardRows;
    boardRows = old;

    dropIndicator.style.left = `50%`;
    setShield();

    setTimeout(function () {
      var newarr = [];
      if (dir == -1) {
        for (var x = 0; x < gameTable[0].length; x++) {
          newarr[x] = [];
          for (var y = gameTable.length - 1; y >= 0; y--) {
            newarr[x].push(gameTable[y][x]);
          }
        }
      } else {
        gameTable[0].forEach(function () {
          newarr.push(new Array(gameTable.length));
        });
        newarr = newarr
          .map(function (x, i) {
            return gameTable.map(function (l) {
              return l[i];
            });
          })
          .reverse();
      }
      gameTable = newarr;
      setRotateSymbols();
      gameCanvas.width = canvasWidth;
      gameCanvas.height =
        circleRad * 2 * boardRows + circleRad + (boardRows + 1) * circlePad;

      drawBoard();
      gameCanvas.style.transition = "unset";
      gameCanvas.style.transform = "translate(-50%,-50%)";

      setTimeout(function () {
        rotated = true;
        checked = false;
        locked = true;
        console.log('unlockedddddd');
        setRotateSymbols();
        gameCanvas.style.transition = "transform .2s";
        // setTimeout(function () {
        //   doneMove.click();
        // }, 500);
        updateSize();
      }, 50);
    }, 200);
  }
  //Apply gravity to pieces
  var foundFall = false;
  function fallDown() {
    foundFall = false;
    gameTable = gameTable.map(function (l) {
      var temp = l.reverse();
      temp.forEach(function (x, i) {
        if (
          temp[i - 1] == undefined &&
          temp[i] != undefined &&
          i != 0 &&
          l[i].w != true
        ) {
          foundFall = true;
          temp[i - 1] = temp[i];
          temp[i] = undefined;
        } else {
        }
      });
      return temp.reverse();
    });
    if (foundFall) {
      drawBoard();
    } else {
      if (!checked) {
        if (moved || rotated) {
          checkWin(gameTable);
          checked = true;
          if (rotated || placedShield) {
            doneMove.click();
          }

          rotated = false;

        }
      }
    }
  }
  setInterval(fallDown, 50);
  var checked = false;
  var shieldMode = false;
  var moved = false;
  var placedShield = false;
  var rotated = false;
  shieldButton.style.opacity = "1";
  shieldButton.onclick = function () {
    if (shieldButton.style.opacity != "1") {
      return null;
    }
    shieldMode = shieldMode ? false : true;
    shieldDisplay.style.display = shieldMode ? "block" : "none";
    if (shieldMode) {
      shieldButton.style.boxShadow = "black 0px 0px 0px 3px";
    } else {
      shieldButton.style.boxShadow = "unset";
    }
  };
  doneMove.onclick = function (e) {
    console.log(moved, locked);
    if (moved && !locked) {
      doneMove.style.opacity = ".5";
      moved = false;
      checked = false;
      locked = false;
      placedShield = false;
      var temp = document.createElement("span");
      temp.classList.add("doneRipple");
      temp.style.left =
        (e.offsetX || doneMove.getBoundingClientRect().width / 2) + "px";
      temp.style.top =
        (e.offsetY || doneMove.getBoundingClientRect().height / 2) + "px";
      doneMove.appendChild(temp);
      setTimeout(function () {
        temp.remove();
      }, 1000);
      doneMove.style.boxShadow = "rgb(6 6 6) 0px 0px 24px 10px";
      setTimeout(function () {
        doneMove.style.boxShadow = "rgb(6 6 6 / 0%) 0px 0px 4px 30px";
        setTimeout(function () {
          doneMove.style.boxShadow = "unset";
        }, 200);
      }, 100);
      rotateLeft.style.opacity = ".3";
      rotateRight.style.opacity = ".3";
      shieldButton.style.opacity = "1";
      shieldButton.style.cursor = "pointer";
      rotateLeft.style.cursor = "not-allowed";
      rotateRight.style.cursor = "not-allowed";
      currentColor++;
      dropIndicator.style.background = colors[currentColor % colors.length];
    }
  };
  function updateSize() {
    if (gameCanvas.getBoundingClientRect().width < window.innerWidth / 3) {
      while (
        window.innerWidth / 3 >
        circleRad * 2 * boardColumns +
        circleRad +
        (boardColumns + 1) * circlePad
      ) {
        if (circleRad < 25) {
          circleRad++;
        } else {
          break;
        }
      }
    } else {
      while (
        circleRad * 2 * boardColumns +
        circleRad +
        (boardColumns + 1) * circlePad >
        window.innerWidth / 3
      ) {
        circleRad--;
      }
    }
    if (gameCanvas.getBoundingClientRect().height < window.innerHeight / 2.5) {
      while (
        window.innerHeight / 2.5 >
        circleRad * 2 * boardRows + circleRad + (boardRows + 1) * circlePad
      ) {
        circleRad++;
      }
    } else {
      while (
        circleRad * 2 * boardRows + circleRad + (boardRows + 1) * circlePad >
        window.innerHeight / 2.5
      ) {
        circleRad--;
      }
    }

    setShield();
  }
  updateSize();
  setRotateSymbols();
}
function collapseArray(a) {
  return a.filter(function (x) { return !x }).concat(a.filter(function (x) {
    return x
  }))
}
updateSize();

var locked = false;
function checkWin(board) {
  var redWon = false;
  var yellowWon = false;
  var win = true;
  var rcheckedSpots = [];
  var ycheckedSpots = [];
  board.forEach(function (column, ci) {
    //Loop through each column
    column.forEach(function (hole, hi) {
      //Up and down check
      if (!redWon) {
        win = true;
        rcheckedSpots = [];
        for (var i = 0; i < winLength; i++) {
          try {
            rcheckedSpots.push([ci, hi - i]);
            if (!column[hi - i] || column[hi - i].t != redColor) {
              win = false;
            }
          } catch { }
        }
        if (win) {
          console.log("red");
          redWon = true;
          return;
        }
      }
      // Left and right check
      if (!redWon) {
        win = true;
        rcheckedSpots = [];
        for (var i = 0; i < winLength; i++) {
          try {
            rcheckedSpots.push([ci + i, hi]);
            if (
              !board[ci + i] ||
              !board[ci + i][hi] ||
              board[ci + i][hi].t != redColor
            ) {
              win = false;
            }
          } catch { }
        }
        if (win) {
          redWon = true;
          console.log("red");
          return;
        }
      }
      if (!redWon) {
        // Left to right, down to up diagonal
        rcheckedSpots = [];
        win = true;
        for (var i = 0; i < winLength; i++) {
          try {
            rcheckedSpots.push([ci + i, hi - i]);
            if (!board[ci + i][hi - i] || board[ci + i][hi - i].t != redColor) {
              win = false;
            }
          } catch {
            win = false;
          }
        }
        if (win) {
          console.log("red");
          redWon = true;
          return;
        }
      }
      if (!redWon) {
        // Left to right, up to down diagonal
        rcheckedSpots = [];
        win = true;
        for (var i = 0; i < winLength; i++) {
          try {
            rcheckedSpots.push([ci + i, hi + i]);
            if (!board[ci + i][hi + i] || board[ci + i][hi + i].t != redColor) {
              win = false;
            }
          } catch {
            win = false;
          }
        }
        if (win) {
          console.log("red");
          redWon = true;
          return;
        }
      }
      //YELLOW CHECK
      if (!yellowWon) {
        var win = true;
        ycheckedSpots = [];
        for (var i = 0; i < winLength; i++) {
          try {
            ycheckedSpots.push([ci, hi - i]);
            if (!column[hi - i] || column[hi - i].t != yellowColor) {
              win = false;
            }
          } catch { }
        }
        if (win) {
          console.log("yellow");
          yellowWon = true;
          return;
        }
      }
      if (!yellowWon) {
        // Left and right check
        ycheckedSpots = [];
        win = true;
        for (var i = 0; i < winLength; i++) {
          try {
            ycheckedSpots.push([ci + i, hi]);
            if (
              !board[ci + i] ||
              !board[ci + i][hi] ||
              board[ci + i][hi].t != yellowColor
            ) {
              win = false;
            }
          } catch { }
        }
        if (win) {
          console.log("yellow");
          yellowWon = true;
          return;
        }
      }
      if (!yellowWon) {
        // Left to right, down to up diagonal
        win = true;
        ycheckedSpots = [];
        for (var i = 0; i < winLength; i++) {
          try {
            ycheckedSpots.push([ci + i, hi - i]);
            if (
              !board[ci + i][hi - i] ||
              board[ci + i][hi - i].t != yellowColor
            ) {
              win = false;
            }
          } catch {
            win = false;
          }
        }
        if (win) {
          console.log("yellow");
          yellowWon = true;
          return;
        }
      }
      if (!yellowWon) {
        // Left to right, up to down diagonal
        win = true;
        ycheckedSpots = [];
        for (var i = 0; i < winLength; i++) {
          try {
            ycheckedSpots.push([ci + i, hi + i]);
            if (
              !board[ci + i][hi + i] ||
              board[ci + i][hi + i].t != yellowColor
            ) {
              win = false;
            }
          } catch {
            win = false;
          }
        }
        if (win) {
          console.log("yellow");
          yellowWon = true;
          return;
        }
      }
    });
  });
  locked = false;

  if (redWon && yellowWon) {
    tieScreen();
  } else if (redWon) {
    won("r", rcheckedSpots);
  } else if (yellowWon) {
    won("y", ycheckedSpots);
  }
  console.log("unlocked from win check");
  var tie = true;
  board.forEach(function (x) {
    if (x.indexOf(undefined) != -1) {
      tie = false;
    }
  });
  if (tie) {
    tieScreen();
  }
}
var flashDelay = 150;
var prevFlash;
function flashColor(spots, color) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      spots.forEach(function (x) {
        gameTable[x[0]][x[1]].t = "white";
      });
      drawBoard();
      if (!prevFlash) {
        prevFlash = gameCanvas.toDataURL();
      }
      setTimeout(function () {
        spots.forEach(function (x) {
          gameTable[x[0]][x[1]].t = color == "r" ? redColor : yellowColor;
        });
        drawBoard();
        resolve("");
      }, flashDelay);
    }, flashDelay);
  });
}
async function gameOver(color) {
  pieces = [];
  introBack.style.opacity = ".15";
  confirmedColor = (color == "r" ? redColor : yellowColor);
  winScreen.style.display = "block";
  showWinner.style.color = (color == "r" ? redColor : yellowColor);
  showWinner.innerText = (color == "r" ? "Red Wins" : "Yellow Wins");
  scoreRecap.innerHTML = "<div style='color:" + redColor + ";display:inline-block;'>" + redScore + " </div> " + "<div style='color:#6494aa;display:inline-block;'> to </div>" + " <div style='color:" + yellowColor + ";display:inline-block;'>" + yellowScore + "</div>";
  scoreRecap.style.color = (color == "r" ? redColor : yellowColor);
  winScreen.appendChild(introBack);
  tick = setInterval(introTick, 10);
  games.forEach(function (x) {
    var img = new Image();
    img.src = x[0];
    img.draggable = false;
    img.style.border = `${x[1] == "r" ? redColor : yellowColor} solid 5px`;
    img.classList.add("gameImages");
    gamesRecap.appendChild(img);
  })
  gameCanvas.style.display = "none";
  celebratory.style.top = gameTitle.getBoundingClientRect().top + gameTitle.getBoundingClientRect().height - 15 + "px";
  celebratory.style.left = gameTitle.getBoundingClientRect().left + gameTitle.getBoundingClientRect().width - 15 + "px";
  celebratory.innerText = celebrationTexts[Math.round(celebrationTexts.length * Math.random())]

}
var celebrationTexts = ["Great Work!", "Great Job!", "Epic!", "Awesome!", "Amazing!"];
// var gameRecapScroll = [false, 0];
// gamesRecap.onmousedown = function (e) {
//   gameRecapScroll[0] = true;
//   gameRecapScroll[1] = Number(e.clientX - gamesRecap.style.left.slice(0, -2));
// }
// document.onmouseup = function (e) {
//   gameRecapScroll[0] = false;
// }
// var lastX = 0;
// var currentDirection;
// // gamesRecap.onmousemove = function (e) {
// //   // console.log(e.clientX > lastX);
// //   console.log(e.clientX, lastX)
// //   if (e.clientX < lastX) {
// //     if ((gamesRecap.getBoundingClientRect().width - window.innerWidth) * -1 > gamesRecap.getBoundingClientRect().left) {
// //       gamesRecap.getBoundingClientRect().left = `${(gamesRecap.getBoundingClientRect().width - window.innerWidth) * -1}px`;
// //       if ((lastX - e.clientX) / Math.abs((lastX - e.clientX)) != currentDirection) {
// //         lastX = e.clientX;
// //         currentDirection = (lastX - e.clientX) / Math.abs((lastX - e.clientX));
// //       }
// //       return
// //     }
// //   }
// //   if ((lastX - e.clientX) / Math.abs((lastX - e.clientX)) != currentDirection) {
// //     lastX = e.clientX;
// //     currentDirection = (lastX - e.clientX) / Math.abs((lastX - e.clientX));
// //   }

// //   if (gameRecapScroll[0]) {
// //     gamesRecap.style.left = `${e.clientX - gameRecapScroll[1]}px`;
// //   }
// // }
async function won(color, spots) {
  fireworkCanvas.style.display = "block";
  plusPoints.innerHTML = (color == "r" ? "<div style='color:" + redColor + ";display:inline-block;'>Red</div> Won" : "<div style='color:" + yellowColor + ";display:inline-block;'>Yellow</div> Won") + "<br>+" + winLength + " points";
  if (color == "r") {
    redScore += winLength;
    redScoreText.innerText = redScore;
    yellowStreakLost++;
    redStreakLost = 0;
  } else {
    yellowScore += winLength;
    yellowScoreText.innerText = yellowScore;
    redStreakLost++;
    yellowStreakLost = 0;
  }

  if (winLength == 5) {
    nextUp.innerText = "Next up: " + "3" + " In A Row";
  } else {
    nextUp.innerText = "Next up: " + (winLength + 1) + " In A Row";
  }

  //Flash winning connection
  locked = true;
  for (var i = 0; i < 5; i++) {
    await flashColor(spots, color);
  }
  moved = false;

  //Handle lives
  if (redStreakLost == 2) {
    redLives--;
    if (redLives == 0) {
      setTimeout(function () {
        gameOver('y');
        redLivesText.innerText = "💀💀"
      }, 500);
    } else {
      redLives = 1;
      redLivesText.innerText = "🖤💀";
      redStreakLost = 0;

    }
  }
  if (yellowStreakLost == 2) {
    yellowLives--;
    if (yellowLives == 0) {
      setTimeout(function () {
        gameOver('r');
        yellowLivesText.innerText = "💀💀"
      }, 500);
    } else {
      yellowLives = 1;
      yellowLivesText.innerText = "🖤💀";
      yellowStreakLost = 0;

    }
  }
  // setTimeout(function () {
  wipe(color);
  setTimeout(function () {
    if (redScore >= 20) {
      //red won
      gameOver("r");
    } else if (yellowScore >= 20) {
      //yellow won
      gameOver("y");
    }
    if (winLength == 5) {
      winLength = 3;
      gameTable = [];
      boardColumns -= 2;
      boardRows -= 2;
    } else {
      winLength++;
      gameTable = [];
      boardColumns++;
      boardRows++;
    }
    rowShow.innerText = "";
    for (var i = 0; i < winLength; i++) {
      rowShow.innerText = rowShow.innerText + "⚪";
    }
    for (var i = 0; i < boardColumns; i++) {
      gameTable.push(Array.apply(null, Array(boardRows)));
    }
    locked = false;
    drawBoard();
    updateSize();
    setRotateSymbols();
  }, 500);
  // }, 200);
}
function tieScreen() {
  plusPoints.innerHTML = "Tie<br>No points given";
  if (winLength == 5) {
    nextUp.innerText = "Next up: " + "3" + " in a row";
  } else {
    nextUp.innerText = "Next up: " + (winLength + 1) + " in a row";
  }
  moved = false;
  wipe("t");
  setTimeout(function () {
    if (winLength == 5) {
      winLength = 3;
      gameTable = [];
      boardColumns -= 2;
      boardRows -= 2;
    } else {
      winLength++;
      gameTable = [];
      boardColumns++;
      boardRows++;
    }

    for (var i = 0; i < boardColumns; i++) {
      gameTable.push(Array.apply(null, Array(boardRows)));
    }
    drawBoard();
    updateSize();
    setRotateSymbols();
  }, 500);
}
var wipeShowTime = 6000;
function flashPrev(prev, current) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      prevBoard.src = prev;
      setTimeout(function () {
        prevBoard.src = current;
        resolve("");
      }, flashDelay);
    }, flashDelay);
  });
}
async function wipe(color) {

  prevBoard.style.top = `${winTitle.getBoundingClientRect().height + 50}px`;
  wipeInfo.style.top = `${winTitle.getBoundingClientRect().height + 50}px`;
  // nextUp.style.left = `${Math.round(plusPoints.getBoundingClientRect().left)}px`;
  if (color == "t") {
    screenWipe.style.background = "#c4c4c7";
  } else {
    if (color == "r") {
      fireworkBackColor = redColor;
      screenWipe.style.background = redColor;
    } else {
      fireworkBackColor = yellowColor;
      screenWipe.style.background = yellowColor;
    }
    // spawnFireworks(20);
  }
  screenWipe.style.left = "0%";
  setTimeout(function () {
    spawnFireworks(10);
  }, 500);
  setTimeout(function () {
    screenWipe.style.left = "100%";
    setTimeout(function () {
      screenWipe.style.transition = "left 0s";
      screenWipe.style.left = "-100%";

      setTimeout(function () {
        fireworkCanvas.style.display = "none";
        clearFctx();
        screenWipe.style.transition = "left .5s";
        rotated = false;
        checked = false;
        locked = false;
        prevFlash = undefined;
        console.log("ya");
      }, 50);
    }, 500);
  }, wipeShowTime);

  var oldRad = circleRad;
  circleRad = 5;
  drawBoard();
  games.push([gameCanvas.toDataURL(), color]);
  circleRad = oldRad;
  drawBoard();
  var currentBoard = gameCanvas.toDataURL();
  if (color != "t") {
    for (var i = 0; i < 10; i++) {
      await flashPrev(prevFlash, currentBoard);
    }
  } else {
    prevBoard.src = currentBoard;
  }

}
setTimeout(flash, 10000);
function flash() {
  gameBack.style.filter = "brightness(2)";
  setTimeout(function () {
    gameBack.style.filter = "none";
  }, 500);
}
(function gameBackDraw() {
  gameBack.width = window.innerWidth;
  gameBack.height = window.innerHeight;
  var currentColor = redColor;
  var ctx = gameBack.getContext("2d");
  ctx.shadowBlur = "10";
  ctx.shadowColor = "#1F1F1F";
  var pieces = [];
  function gameBackPiece() {
    this.r = Math.random() * 100 + 15;
    this.rv = Math.random() * 0.1 - 0.05;
    this.a = Math.random() * 360;
    this.av = Math.random() * 0.01 - 0.005;
    this.xv = Math.random() * 1;
    this.yv = Math.random() * 1;
    this.xvv = Math.random() * 0.01 - 0.005;
    this.yvv = Math.random() * 0.01 - 0.005;
    if (Math.round(Math.random()) == 1) {
      if (Math.round(Math.random()) == 1) {
        //top
        this.x = Math.random() * window.innerWidth;
        this.y = -this.r;
      } else {
        //bottom
        this.x = Math.random() * window.innerWidth;
        this.y = window.innerHeight + this.r;
        this.yv *= -1;
      }
    } else {
      if (Math.round(Math.random()) == 1) {
        this.y = Math.random() * window.innerHeight;
        this.x = -this.r;
        //left
      } else {
        //right
        this.y = Math.random() * window.innerHeight;
        this.x = window.innerWidth + this.r;
        this.yv *= -1;
      }
    }
    this.on = false;
    this.del = false;
    this.c = "#1F1F1F";
  }
  function gameBackAddPiece() {
    if (pieces.length < 20) {
      pieces.push(new gameBackPiece());
    }

    setTimeout(gameBackAddPiece, Math.random() * 1000 + 300);
  }
  gameBackAddPiece();
  function introTick() {
    ctx.clearRect(0, 0, gameBack.width, gameBack.height);
    // ctx.fillStyle = "rgba(10, 10, 10, .05)";
    // ctx.fillRect(0, 0, gameBack.width, gameBack.height);
    pieces = pieces.map(function (x) {
      ctx.fillStyle = x.c;
      ctx.beginPath();
      polygon(ctx, x.x, x.y, x.r, winLength, x.a);
      ctx.fill();
      x.r += x.rv;
      x.a += x.av;
      x.x += x.xv;
      x.y += x.yv;
      x.xv += x.xvv;
      x.yv += x.yvv;
      if (
        x.x - 3 * x.r > window.innerWidth ||
        x.x + 3 * x.r < 0 ||
        x.y - 3 * x.r > window.innerHeight ||
        x.y + 3 * x.r < 0
      ) {
        if (x.on) {
          x.on = false;
          x.del = true;
        }
      } else {
        x.on = true;
      }
      return x;
    });
    pieces = pieces.filter(function (x) {
      return !x.del;
    });
  }

  function polygon(ctx, x, y, radius, sides, startAngle) {
    if (sides < 3) return;
    var a = (Math.PI * 2) / sides;
    radius = Math.abs(radius);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(startAngle);
    ctx.moveTo(radius, 0);
    for (var i = 1; i < sides; i++) {
      ctx.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));
    }
    ctx.closePath();
    ctx.restore();
  }
  setInterval(introTick, 10);
})();

document.onkeydown = function () {
  doneMove.click();
};
updateSize();
setRotateSymbols();
function setShield() {
  setTimeout(function () {
    shieldButton.style.top = `${window.innerHeight / 2 + gameCanvas.getBoundingClientRect().height / 2 + 5
      }px`;
    dropIndicator.style.bottom =
      window.innerHeight / 2 +
      gameCanvas.getBoundingClientRect().height / 2 +
      "px";
  }, 250);
}
instructionButton.onclick = function () {
  instructions.style.opacity = "1";
  instructions.style.pointerEvents = "unset";
}
instructionClose.onclick = function () {
  instructions.style.opacity = "0";
  instructions.style.pointerEvents = "none";
}
