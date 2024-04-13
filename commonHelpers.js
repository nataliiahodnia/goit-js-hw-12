import{a as v,S,i as M}from"./assets/vendor-eded45c0.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();async function p(e,s,o){const a="43339285-ea15b1a3e45dc18314900d076",t="https://pixabay.com/api/",r={key:a,q:e,orientation:"horizontal",image_type:"photo",safesearch:!0,page:s,per_page:o};try{return(await v.get(t,{params:r})).data}catch(n){throw new Error(n.response.status)}}const P=e=>`<li class="gallery-item">
    <a href="${e.largeImageURL}">
      <img src="${e.webformatURL}" alt="${e.tags}" title="${e.tags}">
    </a>
    <div class="image-details">
      <ul>
       <li>
         <h3>Likes:</h3>
         <p>${e.likes}</p>
       </li>
       <li>
         <h3>Views:</h3>
         <p>${e.views}</p>
       </li>  
       <li>
         <h3>Comments:</h3>
         <p>${e.comments}</p>
       </li>  
       <li>
         <h3>Downloads:</h3>
         <p>${e.downloads}</p>
       </li>
      </ul>
    </div>
  </li>`;function f(e){return e.map(P).join("")}const d=15,l=document.querySelector(".gallery"),q=document.querySelector(".js-form"),y=document.querySelector(".loader"),h=document.querySelector(".btn-load-more"),g=new S(".gallery a");let c=null,i=1,m=0;const L=()=>y.classList.add("hidden"),w=()=>y.classList.remove("hidden"),u=()=>h.classList.add("hidden"),b=()=>{i*d<m?h.classList.remove("hidden"):l.innerHTML+="We're sorry, but you've reached the end of search results."},$=()=>{c=null,i=1,m=0},I=e=>{e.preventDefault();const s=e.currentTarget.elements.search.value.trim();w(),u(),$(),l.innerHTML="",p(s,i,d).then(o=>{if(o.hits.length===0)return M.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});l.innerHTML=f(o.hits),c=s,m=o.totalHits,g.refresh(),b()}).catch(o=>{console.log(o),u()}).finally(()=>{L()})},H=()=>{c&&(w(),u(),i+=1,p(c,i,d).then(e=>{l.innerHTML+=f(e.hits),g.refresh();const o=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:o.height*2,behavior:"smooth"}),b()}).catch(e=>{console.log(e)}).finally(()=>{L()}))};q.addEventListener("submit",I);h.addEventListener("click",H);
//# sourceMappingURL=commonHelpers.js.map
