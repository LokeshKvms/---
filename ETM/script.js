const runTime = document.getElementById('rt');
setInterval(()=>{
    const dt = new Date();
    runTime.textContent = dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();
},1000);