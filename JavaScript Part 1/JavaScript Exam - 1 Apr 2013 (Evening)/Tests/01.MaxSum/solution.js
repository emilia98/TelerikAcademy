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
    return maxSum;
}

module.exports = {
    findMaxSum
};