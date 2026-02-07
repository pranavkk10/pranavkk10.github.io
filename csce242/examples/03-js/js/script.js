// button click example
document.getElementById("btn-click").onclick = () => {
    document.getElementById("p-message").innerHTML = "Hi Pranav";
};

// link click example
document.getElementById("a-click").onclick = (e) => {
    e.preventDefault(); // not go to the link's destination
    e.currentTarget.innerHTML = "You clicked me!";
};