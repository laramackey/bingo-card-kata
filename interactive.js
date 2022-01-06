const prompt = require('prompt-sync')({ sigint: true });

const checkIsBingo = (checkedRows, checkedColumns) => {
  const foundRow = checkedRows.findIndex((num) => num === checkedColumns.length);
  if (foundRow > -1) {
    console.log(`BINGO ON ROW ${foundRow + 1}`);
    return true;
  }
  const foundCol = checkedColumns.findIndex((num) => num === checkedRows.length);
  if (foundCol > -1) {
    console.log(`BINGO ON COLUMN ${foundCol + 1}`);
    return true;
  }
  return false;
};
const markBingoNumberToCard = (bingoCard, bingoNumber, checkedRows, checkedColumns) => {
  bingoCard.forEach((row, i) => {
    row.forEach((number, j) => {
      if (number === bingoNumber) {
        checkedRows[i] += 1;
        checkedColumns[j] += 1;
        bingoCard[i][j] = 'x';
        return;
      }
    });
  });
  return [checkedRows, checkedColumns, bingoCard];
};

const bingoGameInteractive = (bingoCard) => {
  let checkedRows = new Array(bingoCard.length).fill(0);
  let checkedColumns = new Array(bingoCard[0].length).fill(0);
  let gameRunning = true;
  console.log(bingoCard);
  while (gameRunning) {
    const bingoNumber = prompt('Enter bingo number or press q to quit: ');
    if (bingoNumber === 'q') {
      gameRunning = false;
    }
    [checkedRows, checkedColumns, bingoCard] = markBingoNumberToCard(
      bingoCard,
      parseInt(bingoNumber),
      checkedRows,
      checkedColumns
    );
    console.log(bingoCard);
    if (checkIsBingo(checkedRows, checkedColumns)) {
      gameRunning = false;
    }
  }
};

bingoGameInteractive([
  [22, 13, 17, 11, 0],
  [8, 2, 23, 4, 24],
  [21, 9, 14, 16, 7],
  [6, 10, 3, 18, 5],
  [1, 12, 20, 15, 19],
]);
