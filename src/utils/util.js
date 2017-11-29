export function getRandomIndex(min,max){
    return Math.floor( Math.random()* ( max - min + 1 )  + min );
}

//找出第二个数组中相同的元素并删除相同元素，返回arr2,
export function arrRemoveSame(arr1,arr2){
    arr1.forEach(item =>{
        arr2.forEach((i,index)=>{
            if(item.id == i.id){
                arr2.splice(index,1);
            }
        });
    });

    return arr2;
}
