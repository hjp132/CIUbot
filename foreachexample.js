const exampleArray = [1,2,3];

foreach(exampleArray, element => {
  
})

foreach(['AA','BB','XX'], element => {
    console.log(element.toLowerCase());
})
foreach(['matt', 'harry'], element => {
  console.log(element);
})

function foreach(array, callback){
    for (const item of array) {
        callback(item)
    }
}

