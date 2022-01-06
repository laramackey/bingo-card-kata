const test = require('tape');

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
        return;
      }
    });
  });
  return [checkedRows, checkedColumns];
};

const bingoGame = (bingoNumbers, bingoCard) => {
  let checkedRows = new Array(bingoCard.length).fill(0);
  let checkedColumns = new Array(bingoCard[0].length).fill(0);
  return bingoNumbers.some((number) => {
    [checkedRows, checkedColumns] = markBingoNumberToCard(
      bingoCard,
      number,
      checkedRows,
      checkedColumns
    );
    return checkIsBingo(checkedRows, checkedColumns);
  });
};

/* --- UNIT TESTS --- */

test('checkIsBingo returns false when there is no bingo', (assert) => {
  assert.false(checkIsBingo([0, 0, 0, 3, 4], [1, 2, 3, 4, 0]), 'does not find bingo');
  assert.end();
});

test('checkIsBingo returns true when there is bingo', (assert) => {
  assert.true(checkIsBingo([0, 0, 5, 3, 4], [1, 2, 3, 4, 0]), 'finds bingo');
  assert.end();
});

test('markBingoNumberToCard increments row and column count when a bingo number is found', (assert) => {
  const bingoCard = [
    [22, 13],
    [8, 2],
  ];
  const rows = [0, 0];
  const columns = [0, 0];
  const [checkedRows, checkedColumns] = markBingoNumberToCard(bingoCard, 2, rows, columns);
  assert.deepEqual(checkedRows, [0, 1], 'second row count is incremented');
  assert.deepEqual(checkedColumns, [0, 1], 'second column count is incremented');
  assert.end();
});

test('markBingoNumberToCard does not increment row and column count when a bingo number is not found', (assert) => {
  const bingoCard = [
    [22, 13],
    [8, 2],
  ];
  const rows = [0, 0];
  const columns = [0, 0];
  const [checkedRows, checkedColumns] = markBingoNumberToCard(bingoCard, 11, rows, columns);
  assert.deepEqual(checkedRows, [0, 0], 'row count is not incremented');
  assert.deepEqual(checkedColumns, [0, 0], 'column cound is not incremented');
  assert.end();
});

/* --- ACCEPTANCE TESTS --- */

test('it finds bingo in a horizontal row', (assert) => {
  const bingoNumbers = [12, 6, 19, 5, 22, 3, 18, 10, 2, 7];
  const bingoCard = [
    [22, 13, 17, 11, 0],
    [8, 2, 23, 4, 24],
    [21, 9, 14, 16, 7],
    [6, 10, 3, 18, 5],
    [1, 12, 20, 15, 19],
  ];

  assert.true(bingoGame(bingoNumbers, bingoCard), 'finds bingo on row 4');
  assert.end();
});

test('it finds bingo in a vertical column', (assert) => {
  const bingoNumbers = [7, 0, 14, 24, 3, 5, 23, 7, 19, 1, 2];
  const bingoCard = [
    [22, 13, 17, 11, 0],
    [8, 2, 23, 4, 24],
    [21, 9, 14, 16, 7],
    [6, 10, 3, 18, 5],
    [1, 12, 20, 15, 19],
  ];

  assert.true(bingoGame(bingoNumbers, bingoCard), 'finds bingo on column 5');
  assert.end();
});

test('it finds no bingo', (assert) => {
  const bingoNumbers = [22, 1, 8, 2, 16, 4, 24];
  const bingoCard = [
    [22, 13, 17, 11, 0],
    [8, 2, 23, 4, 24],
    [21, 9, 14, 16, 7],
    [6, 10, 3, 18, 5],
    [1, 12, 20, 15, 19],
  ];

  assert.false(bingoGame(bingoNumbers, bingoCard), 'does not find bingo');
  assert.end();
});

test('test it ignores non-numbers', (assert) => {
  const bingoNumbers = [12, 6, 19, 5, 22, '&', '£^$*£$£', 3, 18, 10, 2, 7];
  const bingoCard = [
    [22, 13, 17, 11, 0],
    [8, 2, 23, 4, 24],
    [21, 9, 14, 16, 7],
    [6, 10, 3, 18, 5],
    [1, 12, 20, 15, 19],
  ];

  assert.true(bingoGame(bingoNumbers, bingoCard), 'finds bingo on row 4');
  assert.end();
});

test('it can handle different sized bingo cards', (assert) => {
  const bingoNumbers = [1, 2, 3, 4];
  const bingoCard = [
    [1, 2, 4],
    [5, 6, 7],
  ];

  assert.true(bingoGame(bingoNumbers, bingoCard), 'finds bingo on row 1');
  assert.end();
});
