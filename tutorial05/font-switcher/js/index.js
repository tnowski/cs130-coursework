const makeBigger = () => {
   // document.querySelector(".content").style.fontSize = "4em";
   // let OG = document.querySelector(".content").fontSize.value;
   let OG = document.querySelector(".content").style.fontSize;
   console.log(OG);
   let newSize = Number(OG) * 2
   // newSize = OG + 1;
   console.log(newSize);
   document.querySelector(".content").style.fontSize = newSize;
};

const makeSmaller = () => {
   document.querySelector(".content").style.fontSize = "1em";
};


document.querySelector(".a1").onclick = makeBigger;
document.querySelector(".a2").onclick = makeSmaller;
