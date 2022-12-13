const NUMBER_FORMATTER = new Intl.NumberFormat("en");

const displayNumber = function (number) {
  const stringNumber = number.toString() || "";
  if (stringNumber === "") return "";

  const [integer, decimal] = stringNumber.split(".");

  const formattedInteger = NUMBER_FORMATTER.format(integer);

  if (!decimal) return formattedInteger;

  return `${formattedInteger}.${decimal}`;
};

export default displayNumber;
