// ===== EFEITOS JS =====
document.querySelectorAll('#placar > div:not(.header)').forEach(cell=>{
    cell.addEventListener('click',()=>{
      document.querySelectorAll('#placar > div:not(.header)')
        .forEach(c=>{c.style.background='';c.style.color=''}); 
      const startIndex = Math.floor([...cell.parentNode.children].indexOf(cell)/4)*4;
      for(let i=0;i<4;i++){
        const item = cell.parentNode.children[startIndex+i];
      }
    });
  });
  window.addEventListener('load',()=>{
    const logo=document.querySelector('header img');
    logo.style.transform='scale(1.05)';
    setTimeout(()=>logo.style.transform='scale(1)',500);
  });