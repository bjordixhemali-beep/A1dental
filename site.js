/* A1 Dental Tirana — shared script for the guide pages */
(function(){
  var GA='G-LNJVQ65EZ3', WA='355683000884';

  /* FAQ accordion */
  window.tq=function(btn){
    var item=btn.parentElement, ans=btn.nextElementSibling;
    if(item.className.indexOf('on')>=0){item.className='qi';ans.style.maxHeight=null;}
    else{item.className='qi on';ans.style.maxHeight=ans.scrollHeight+'px';}
  };

  /* Analytics only after consent (same choice as the home page) */
  function loadGA(){
    if(window.__gaLoaded)return; window.__gaLoaded=true;
    var s=document.createElement('script'); s.async=true;
    s.src='https://www.googletagmanager.com/gtag/js?id='+GA; document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){dataLayer.push(arguments);};
    gtag('js',new Date()); gtag('config',GA,{anonymize_ip:true});
  }
  function trk(name){ if(window.gtag){ try{gtag('event',name,{event_category:'contatto',page_path:location.pathname});}catch(e){} } }
  function getC(){ try{return localStorage.getItem('a1_consent');}catch(e){return null;} }
  function setC(v){ try{localStorage.setItem('a1_consent',v);}catch(e){} }

  function banner(){
    var b=document.createElement('div'); b.className='ck on'; b.id='ckb';
    b.innerHTML='<p>Usiamo cookie tecnici necessari al funzionamento del sito e, solo con il tuo consenso, cookie statistici (Google Analytics) per capire come viene usato il sito. Puoi accettare o rifiutare: il sito funziona in entrambi i casi.</p>'+
      '<div class="ck-b"><button class="ck-ok" data-v="yes">Accetta</button><button class="ck-no" data-v="no">Rifiuta</button>'+
      '<a class="ck-no" href="index.html#privacy" style="display:inline-flex;align-items:center;text-decoration:none">Informativa privacy</a></div>';
    b.addEventListener('click',function(e){
      var v=e.target.getAttribute('data-v'); if(!v)return;
      setC(v); b.className='ck'; if(v==='yes')loadGA();
    });
    document.body.appendChild(b);
  }

  /* Floating WhatsApp button, message tailored to the page */
  function waFloat(){
    if(document.querySelector('.waf'))return;
    var topic=(document.querySelector('h1')||{}).textContent||'';
    var msg='Salve, ho letto la vostra guida "'+topic.trim()+'" e vorrei una prima valutazione.';
    var a=document.createElement('a'); a.className='waf'; a.target='_blank'; a.rel='noopener';
    a.href='https://wa.me/'+WA+'?text='+encodeURIComponent(msg); a.setAttribute('aria-label','Scrivici su WhatsApp');
    a.innerHTML='<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
    document.body.appendChild(a);
  }

  document.addEventListener('DOMContentLoaded',function(){
    waFloat();
    var c=getC(); if(c==='yes')loadGA(); else if(c!=='no')setTimeout(banner,900);
    document.addEventListener('click',function(e){
      var a=e.target.closest&&e.target.closest('a[href*="wa.me"]');
      if(a)trk(a.className==='waf'?'click_whatsapp_float':'click_whatsapp_guide');
    });
    var y=document.getElementById('yr'); if(y)y.textContent=new Date().getFullYear();
    if('IntersectionObserver' in window){
      var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add('vi');});},{threshold:.1});
      document.querySelectorAll('.fu').forEach(function(el){o.observe(el);});
    } else document.querySelectorAll('.fu').forEach(function(el){el.classList.add('vi');});
  });
})();
