document.getElementById("btn-loop").onclick = () => {
    const ul=document.getElementById("ul-first-loop");

    for(let i=0; i<10; i++){
        const li=document.createElement("li");
        li.innerHTML= 'Im the ${i+1} element';
        ul.appendChild(li);
    }

};

document.getElementById("btn-count-range").onclick = () => {
    const startNumber = (document.getElementById("text-start").value);
    const endNumber = (document.getElementById("text-end").value);
    const errorP= document.getElementById("error-range");
    errorP.innerHTML = "";
    const divNumRange= document.getElementById("number-range");

    if(startNumber > endNumber) {
        errorP.innerHTML = "Not a valid range";
        return;
    }

    for(let i =startNumber; i< endNumber +1; i++){
        const p =  document.createElement("p");
        p.innerHTML=i;
        divNumRange.append(p);
        p.onclick = () => {
            document.getElementById("number-message").innerHTML = `You clicked the ${i}th item`;
        };
    }


};

document.getElementById("a-show-toys").onclick = () => {
    e.preventDefault();
    const toyList=document.getElementById("toy-list");
    toyList.innerHTML= "";

    const toys=["fish", "guitar", "popsicle stick", "rc cars", "shoe"];

    //traditional for loop
    for(let i=0; i<toys.length; i++){
        const li = document.createElement("li");
        li.innerHTML= toys[i];
        toyList.append(li);
    }

    //second way preferred
    //(toy, i)
    toys.forEach((toy)=>{
        const li = document.createElement("li");
        li.innerHTML= toy;
        toyList.append(li);
    });

};

const toyPrices=[];
toyPrices["first"] = 2.99;
toyPrices["second"] = 200.00;
toyPrices["popsicle sticks"] = 0.1;
toyPrices["rc cars"] = 50.00;
toyPrices["shoe"] = 49.99;

for(let toy in toyPrices){
    const toyTable = document.getElementById("toy-table");
    const tr=document.createElement("tr");
    toyTable.append(tr);

    const tdToy = document.createElement("td");
    tdToy.innerHTML= toy;
    tr.append(tdToy);

    const tdPrice = document.createElement("td");
    tdPrice.innerHTML= `$${toyPrices[toy]}`;
    tr.append(tdPrice);

    tr.onclick = () => {
        document.getElementById("p-toy-desc").innerHTML = 
        `You want a ${toy} sp ask your mom for $${toyPrices[toy]}`;    
    };
      
}       


