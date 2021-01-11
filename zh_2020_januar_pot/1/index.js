const txtNumbers = document.querySelector('#numbers')
const task1 = document.querySelector('#task1')
const task2 = document.querySelector('#task2')
const task3 = document.querySelector('#task3')
const task4 = document.querySelector('#task4')
const task5 = document.querySelector('#task5')


txtNumbers.addEventListener("input", function(event){
    const array = (event.target.value.trim()).split(',');
    for(let i = 0; i< array.length;++i){
        if(array[i] ===""){
            array.splice(i,1);
        }
        array[i] = parseInt(array[i]);
    }
    console.log(array)

    task1.innerHTML = array.filter(element => element%3===0).length;

    const result2 = array.find(element => element<0);
    task2.innerHTML = result2==null ? "Nincs negatív szám" : result2;

    const result3 = array.find(element => element%2==0);
    task3.innerHTML = result3==null ? "Mindegyik páratlan" : "Van páros szám is";

    const result4 = Math.max(...array);
    task4.innerHTML = result4 ;

    const unique =(value, ind,self) => {
        return self.indexOf(value)===ind;
    }

    const result5 = array.filter(unique);
    task5.innerHTML = result5 ;

    const check = array.find(element => isNaN(element));
    if(check!=null){
        event.target.classList.add("error");
    }else{
        event.target.classList.remove("error");
    }


})