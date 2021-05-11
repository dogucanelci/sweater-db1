
console.log("Selamlar kedişler! :)");
const form = document.querySelector("form");
const load = document.querySelector(".loading");
const mewselement = document.querySelector(".mews");
const API_URL = 'https://sweater-db.herokuapp.com/mews';
//const API_URL = "https://sweater-db-dogucanelci.vercel.app || 'http://localhost:5000/mews'";
load.style.display = "none";
listAllmews();
form.addEventListener("submit",(event)=>{

    event.preventDefault();
    console.log("you summited your twit succesfully!");
    const formdata = new FormData(form);
    const name = formdata.get("name");
    const content = formdata.get("content");
    const mew = {
        name,content
    };
    console.log(mew);
    form.style.display = "none";
    load.style.display = "";
    
    
    fetch(API_URL,{
        method:"POST",
        body: JSON.stringify(mew),
        headers: {
            "content-type": "application/json"
        }

    }).then(response => response.json())
    .then(
        createdMew => {
            form.reset();
            setTimeout(()=>{
                form.style.display = "",
                3000
            })
            form.style.display = "";
//            console.log(createdMew);
            listAllmews();
            load.style.display = "none";
        }
    );
});

function listAllmews(){
    mewselement.innerHTML = "";
    fetch(API_URL)
    .then(response=>response.json())
    .then(mews=>{
        mews.reverse();
//        console.log(mews);
        mews.forEach(mew => {
            const div =document.createElement("div");
            const header = document.createElement("h3");
            header.textContent = mew.name;
            const content = document.createElement("p");
            content.textContent = mew.content;
            const date = document.createElement("small");
            const blanck = document.createElement("br");
            date.textContent = new Date(mew.created);
            div.appendChild(date);
            div.appendChild(header);
            div.appendChild(content);
            div.appendChild(blanck);
            mewselement.appendChild(div);

            
        });
    });
}



