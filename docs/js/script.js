'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => { navLinks.classList.toggle('nav-active'); });

    const thumbs   = document.querySelectorAll('#projects .thumbs img');
    const lightbox = document.getElementById('lightbox');
    const lbImg    = lightbox.querySelector('.lightbox__img');
    const prevBtn  = lightbox.querySelector('.lightbox__nav--prev');
    const nextBtn  = lightbox.querySelector('.lightbox__nav--next');
    const closeLb  = lightbox.querySelector('.lightbox__close');
    let idx = 0;
    const images = Array.from(thumbs).map(i => i.src);
    thumbs.forEach((img,i)=>{
        img.addEventListener('click', ()=>{
            idx=i; lbImg.src=images[idx]; lightbox.classList.add('open');
            prevBtn.style.display = idx===0 ? 'none' : 'flex';
            nextBtn.style.display = idx===images.length-1 ? 'none' : 'flex';
        });
    });
    prevBtn.addEventListener('click', ()=> thumbs[--idx].click());
    nextBtn.addEventListener('click', ()=> thumbs[++idx].click());
    closeLb.addEventListener('click', ()=> lightbox.classList.remove('open'));
    lightbox.addEventListener('click', e=> e.target===lightbox && lightbox.classList.remove('open'));

    // Contact popup
    const cbtn = document.getElementById('contact-btn');
    const cmod = document.getElementById('contact-modal');
    cbtn.addEventListener('click', ()=> cmod.classList.add('open'));
    cmod.querySelectorAll('.modal__close').forEach(b=> b.addEventListener('click', ()=> cmod.classList.remove('open')));
    cmod.addEventListener('click', e=> e.target===cmod && cmod.classList.remove('open'));

    // Form validation + POST
    const patterns = {
        name:    /^[A-Za-zА-Яа-яЁё\s]+$/,
        email:   /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone:   /^\+?\d{10,15}$/,
        message: /^[A-Za-zА-Яа-яЁё0-9\s.,!?"'«»()\-]+$/
    };
    const form = document.getElementById('modal-form');
    form.addEventListener('submit', async e=>{
        e.preventDefault(); let ok=true, data={};
        for(let id of ['name','email','phone','message']){
            const inp=form[id], err=inp.nextElementSibling;
            if(!patterns[id].test(inp.value.trim())){ ok=false; err.textContent='Неверный формат'; }
            else{ err.textContent=''; data[id]=inp.value.trim(); }
        }
        if(!ok) return;
        const btn=form.querySelector('.submit-btn'); btn.textContent='Отправляем...'; btn.disabled=true;
        try{ await fetch('https://example.com/api/contact',{ method:'POST', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify(data)});
            btn.textContent='Успешно отправлено'; btn.classList.add('btn--success');
        } catch{ btn.textContent='Ошибка. Повторите'; btn.disabled=false; }
    });

    // Promo after 30s
    const pmod=document.getElementById('promo-modal');
    setTimeout(()=>{ if(!localStorage.getItem('promoClosed')) pmod.classList.add('open'); }, 30000);
    pmod.querySelector('.modal__close').addEventListener('click', ()=>{ localStorage.setItem('promoClosed','1'); pmod.classList.remove('open'); });
    pmod.addEventListener('click', e=> e.target===pmod && pmod.classList.remove('open'));

    // Countdown
    const tgt=new Date('2025-07-01T00:00:00'); const te=document.getElementById('timer');
    const iv=setInterval(()=>{
        const diff=tgt-Date.now(); if(diff<=0){ te.textContent='Поздравляем!'; clearInterval(iv); return; }
        const d=Math.floor(diff/86400000), h=Math.floor(diff/3600000)%24, m=Math.floor(diff/60000)%60, s=Math.floor(diff/1000)%60;
        te.textContent=`${d}д ${h}ч ${m}м ${s}с`;
    },1000);

    // Sticky nav & SVG animation
    const nav=document.getElementById('main-nav'), svg=document.getElementById('design-svg');
    window.addEventListener('scroll',()=>{
        nav.classList.toggle('sticky', window.scrollY>window.innerHeight);
        const pct=window.scrollY/(document.body.scrollHeight-window.innerHeight);
        svg.style.transform=`rotate(${pct*360}deg)`;
    });
    document.addEventListener('mousemove',e=>{
        const x=(e.clientX/window.innerWidth-0.5)*20, y=(e.clientY/window.innerHeight-0.5)*20;
        svg.style.transform+=` translate(${x}px,${y}px)`;
    });
});