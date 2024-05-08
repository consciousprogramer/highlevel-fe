export const isServer = () => {
  return typeof window === "undefined";
};

export function formatToIndianNumber(number: number | string) {
  if (typeof number === "string") {
    if (!Number.isNaN(+number)) {
      number = +(+number as number).toFixed(4);
    }
    return number;
  } else if (typeof number === "number") {
    number = +number.toFixed(4);
  } else {
    return number;
  }

  var originalMag;
  var negative;

  if (number < 0) {
    originalMag = -1 * number;
    negative = true;
  } else {
    originalMag = number;
    negative = false;
  }

  var arr = String(originalMag).split("").reverse();
  var start = arr.indexOf(".") + 1; // start of full part
  var i; // source index
  var result = []; // array holder of the result

  // copy the fractional part and the decimal if present
  for (i = 0; i < start; i++) {
    result.push(arr[i]);
  }

  // main loop
  var c = 0; // digit counter
  for (i = start; i < arr.length; i++) {
    result.push(arr[i]);
    c++;
    if ((c === 3 || c === 5 || c === 7) && i < arr.length - 1) {
      result.push(",");
    }
    if (c === 7) {
      c = 0;
    }
  }

  if (negative) {
    result.push("-");
  }

  return result.reverse().join("");
}

export const safeToFixed = (value: number) => {
  const splitStr = value.toString().split(".") as [string, string] | [string];

  if (splitStr.length === 2) {
    splitStr[1] = splitStr[1].substring(0, 4);
  }

  const fixedDecimalNumber = Number(splitStr.join("."));

  return fixedDecimalNumber;
};
