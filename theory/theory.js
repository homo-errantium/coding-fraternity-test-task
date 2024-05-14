const arr = [10, 12, 15, 21];

//некорректный вариант
// for (var i = 0; i < arr.length; i++) {
//   setTimeout(function() {
//     console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`)
//   }, 3000)
// }

//рабочий вариант №1
// for (let i = 0; i < arr.length; i++) {
//     setTimeout(function () {
//         console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`);
//     }, 3000);
// }

//рабочий вариант №2
for (let i = 0; i < arr.length; i++) {
  setTimeout((i_local) => {
    return ( ()=>{
                console.log(
            arr[i_local] > 13 ? `Good: ${arr[i_local]}` : `Bad: ${arr[i_local]}`
        )
      })
    }, 3000, i);
}
