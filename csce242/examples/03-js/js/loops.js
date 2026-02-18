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