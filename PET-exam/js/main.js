window.showToast = function(msg, type='info') {
    const old = document.getElementById('toast');
    if(old) old.remove();
    const div = document.createElement('div');
    div.id = 'toast';
    div.style.cssText = `position:fixed; top:20px; left:50%; transform:translateX(-50%); background:${type=='error'?'#e74c3c':'#2ecc71'}; color:white; padding:10px 20px; border-radius:30px; z-index:9999; box-shadow:0 5px 15px rgba(0,0,0,0.2);`;
    div.textContent = msg;
    document.body.appendChild(div);
    setTimeout(()=>div.remove(), 3000);
};