import{a as S,S as M,i as y}from"./assets/vendor-eded45c0.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();async function p(e,s,o){const a="43339285-ea15b1a3e45dc18314900d076",t="https://pixabay.com/api/",r={key:a,q:e,orientation:"horizontal",image_type:"photo",safesearch:!0,page:s,per_page:o};try{return(await S.get(t,{params:r})).data}catch(n){throw new Error(n.response.status)}}const P=e=>`<li class="gallery-item">
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
  </li>`;function f(e){return e.map(P).join("")}const d=15,c=document.querySelector(".gallery"),q=document.querySelector(".js-form"),g=document.querySelector(".loader"),h=document.querySelector(".btn-load-more"),L=new M(".gallery a");let l=null,i=1,m=0;const w=()=>g.classList.add("hidden"),b=()=>g.classList.remove("hidden"),u=()=>h.classList.add("hidden"),v=()=>{i*d<m?h.classList.remove("hidden"):y.info({message:"We're sorry, but you've reached the end of search results."})},$=()=>{l=null,i=1,m=0},I=async e=>{e.preventDefault();const s=e.currentTarget.elements.search.value.trim();b(),u(),$(),c.innerHTML="";try{const o=await p(s,i,d);if(o.hits.length===0)return y.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});c.innerHTML=f(o.hits),l=s,m=o.totalHits,L.refresh(),v()}catch(o){console.log(o),u()}finally{w()}},O=async()=>{if(l){b(),u(),i+=1;try{const e=await p(l,i,d);c.innerHTML+=f(e.hits),L.refresh();const o=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:o.height*2,behavior:"smooth"}),v()}catch(e){console.log(e)}finally{w()}}};q.addEventListener("submit",I);h.addEventListener("click",O);
//# sourceMappingURL=commonHelpers.js.map
