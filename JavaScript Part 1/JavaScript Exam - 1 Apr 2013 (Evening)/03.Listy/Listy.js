function solve(args){
    let variablesInfo = {};
    let lastLine = args.pop();

    for(let arg of args){
        let list = matchList(arg);
        let tokens = arg.split('[');
        tokens = tokens[0].split(" ").filter(el => el !== "");

        let variableName = tokens[1];
        let operation = undefined;

        if(tokens.length > 2){
            operation = matchOperation(tokens[2])
        }

        list = getArray(list);

        if(operation === undefined){
            variablesInfo[variableName] = list;
        }else{
            variablesInfo[variableName] = doOperation(operation, list);
        }
    }

    let finalList = matchList(lastLine);
    finalList = getArray(finalList);
    let finalOperation = matchOperation(lastLine);

    if(finalOperation !== undefined){
        console.log(doOperation(finalOperation, finalList));
    }else{
        console.log(finalList[0]);
    }

    function matchList(entry){
        let listPattern = /\[[^\]]+\]/g;
        let matchedList = entry.match(listPattern)[0];

        let list = getList(matchedList);
        return list;
    }

    function getList(matchedList){
        matchedList = matchedList
            .slice(1, matchedList.length - 1)
            .split(",").filter(el => el !== ",")
            .map(el => el.trim());

        return matchedList;
    }

    function matchOperation(entry){
        let operation = undefined;
        let operationPattern = /\b(sum|max|min|avg)\b/g;
        let matchedOperation = entry.match(operationPattern);

        if(matchedOperation){
            operation = matchedOperation[0];
        }
        return operation;
    }

    function doOperation(operation, list){
        let result = 0;

        switch(operation){
            case "sum": {
                list.forEach(el => result += el);
                break;
            }
            case "avg": {
                list.forEach(el => result += el);
                result = parseInt(result / list.length);
                break;
            }
            case "min": {
                result = Number.POSITIVE_INFINITY;
                for(let el of list){
                    if(el < result){
                        result = el;
                    }
                }
                break;
            }
            case "max": {
                result = Number.NEGATIVE_INFINITY;
                for(let el of list){
                    if(el > result){
                        result = el;
                    }
                }
                break;
            }
        }
        return result;
    }

    function getArray(list){
        let storeElements = list.slice(0);
        let positionsIndex = 0;

        //console.log(storeElements);
        for(let index = 0; index < storeElements.length; index++){
            let element = storeElements[index];
            element = element.split(' ').join("");

            let parsedElement = parseFloat(element);

            // If the parsed element is a reference to number/list of numbers
            if(isNaN(parsedElement)){
                if(variablesInfo[element] !== undefined){
                    let reference = variablesInfo[element];

                    if(reference.length !== undefined){
                        // Remove the reference to the element
                        list.splice(positionsIndex, 1);

                        for(let el of reference){
                            // Add an element to a given position
                            list.splice(positionsIndex, 0, el);
                            positionsIndex++;
                        }
                    }else{

                        // if there is only one number, not a list of number, replace the reference to this element with the actual number
                        list[positionsIndex] = parseFloat(reference);
                        positionsIndex++;
                    }
                }
            }
            // If the parsed element is a number, not a reference
            else{
                list[positionsIndex] = parsedElement;
                positionsIndex++;
            }
        }

        return list;
    }
}

let args = [
    "def func sum[5, 3, 7, 2, 6, 3]",
    "def func2 [5, 3, 7, 2, 6, 3]",
    "def func3 min[func2]",
    "def func4 max[5, 3, 7, 2, 6, 3]",
    "def func5 avg[5, 3, 7, 2, 6, 3]",
    "def func6 sum[func2, func3, func4 ]",
    "sum[func6, func4]",
]

solve(args);

args = [
    "def var1 [1, 2, 6, 8]",
    "def var2 sum[1, 5, -10, 20]",
    "def var3 max[5, 2, 4, var2, 2]",
    "def var4 min[var1, 6, 50]",
    "def var5 avg[var1]",
    "def var6 sum[var1, var1, 1]",
    "avg[var6, var4]"
];

solve(args);

args = [
    "def func sum[1, 2, 3, -6]",
    "def newList [func, 10, 1]",
    "def newFunc sum[func, 100, newList]",
    " [newFunc]"
];

solve(args);