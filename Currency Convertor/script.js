const baseurl = "https://api.frankfurter.app/latest?";

let dropdownael = document.querySelectorAll("select");
let getbtn = document.querySelector("button");
let getfrom = document.querySelector(".from select");
let getto = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for(let sel of dropdownael){
    for(let c in countryList){
        // console.log(c,countryList[c]);
        let newoption = document.createElement("option");
        newoption.innerText = c;
        newoption.value = c;
        if(sel.name==="from" && c==="USD"){
            newoption.selected = "selected";
        }else if(sel.name==="to" && c==="INR"){
            newoption.selected = "selected";
        }
        sel.append(newoption);
  }
  sel.addEventListener("change",(evt)=>{
    changeflag(evt.target);
  })
}

let changeflag = (element)=>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newimgsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let oldimg = element.parentElement.querySelector("img");
    oldimg.src = newimgsrc;
}

getbtn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let accessamt = document.querySelector("input");
    let amtval = accessamt.value;
    if(amtval===" " || amtval<1){
        amtval = 1;
        accessamt.value = "1";
    }

    const conurl = `${baseurl}from=${getfrom.value}&to=${getto.value}`;
    let response = await fetch(conurl);
    let data = await response.json();
    let rate = data.rates[getto.value];
    let finalamt = amtval * rate;

    msg.innerText = `${amtval} ${getfrom.value} = ${finalamt} ${getto.value}`;
})