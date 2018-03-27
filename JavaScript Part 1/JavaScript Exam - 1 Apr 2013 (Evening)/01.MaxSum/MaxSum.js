function findMaxSum(arr){
    arr = arr.map(el => parseInt(el));
    let n = arr.shift();

    let maxSum = Number.NEGATIVE_INFINITY;

    for(let outerIndex = 0; outerIndex < n - 1; outerIndex++){
        let currentSum = 0;

        for(let innerIndex = outerIndex; innerIndex < n; innerIndex++){
            currentSum += arr[innerIndex];

            if(currentSum > maxSum){
                maxSum = currentSum;
            }
        }
    }

    console.log(maxSum);
}


args=[
"8",
"1",
"6",
"-9",
"4",
"4",
"-2",
"10",
"-1"];

findMaxSum(args);

args = [
    "6", "1", "3", "-5", "8", "7", "-6"
];

findMaxSum(args);

args=[
    "9",
    "-9",
    "-8",
    "-8",
    "-7",
    "-6",
    "-5",
    "-1",
    "-7",
    "-6"
];

findMaxSum(args);

