function add(numbers) {
  if (!numbers) {
    return 0;
  }

  const delimiter = [",", "\n"]; 

  if (numbers.startsWith("//")) {
    const parts = numbers.split("\n", 2);
    const customDelimiterPart = parts[0].substring(2);
    numbers = parts[1];

    const customDelimiter = customDelimiterPart.match(/\[(.*?)\]/g);
    if (customDelimiter) {
      customDelimiter.forEach((delim) => {
        delimiter.push(delim.slice(1, -1));
      });
    } else {
      delimiter.push(customDelimiterPart);
    }
  }

  const delimiterRegex = new RegExp(
    delimiter.map((d) => d.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")
  );

  const numList = numbers.split(delimiterRegex);

  let total = 0;
  const negatives = [];
  numList.forEach((num) => {
    if (num) {
      const n = parseInt(num, 10);
      if (n < 0) {
        negatives.push(n);
      } else {
        total += n;
      }
    }
  });

  if (negatives.length > 0) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
  }

  return total;
}

try {
  console.log(add("1,2,3")); 
  console.log(add("1\n2,3")); 
  console.log(add("//;\n1;2")); 
  console.log(add("//[***]\n1***2***3")); 
  console.log(add("-1,2,-3")); 
} catch (e) {
  console.error(e.message);
}
