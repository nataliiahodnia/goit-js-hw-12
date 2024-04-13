import{a as c,S as u,i as d}from"./assets/vendor-eded45c0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();async function p(s,t){const o="43339285-ea15b1a3e45dc18314900d076",n="https://pixabay.com/api/",e=new URLSearchParams({key:o,q:s,orientation:"horizontal",image_type:"photo",safesearch:!0,page:t,per_page:15});try{return(await c.get(`${n}?${e}`)).data}catch(r){throw new Error(r.response.status)}}function h(s){return s.map(t=>`
    <li class="gallery-item">
      <a href="${t.largeImageURL}">
        <img src="${t.webformatURL}" alt="${t.tags}" title="${t.tags}">
      </a>
      <div class="image-details">
        <ul>
         <li>
           <h3>Likes:</h3>
           <p>${t.likes}</p>
         </li>
         <li>
           <h3>Views:</h3>
           <p>${t.views}</p>
         </li>  
         <li>
           <h3>Comments:</h3>
           <p>${t.comments}</p>
         </li>  
         <li>
           <h3>Downloads:</h3>
           <p>${t.downloads}</p>
         </li>
        </ul>
      </div>
    </li>
  `).join("")}const l=document.querySelector(".gallery"),f=document.querySelector(".js-form"),a=document.querySelector(".loader"),m=new u(".gallery a");loadMoreBtn.style.display="none";a.style.display="none";function y(){a.classList.remove("is-hidden")}function g(){a.classList.add("is-hidden")}f.addEventListener("submit",L);function L(s){s.preventDefault();const t=s.currentTarget.elements.search.value.trim();y(),l.innerHTML="",p(t).then(o=>{if(o.hits.length===0)return d.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});l.innerHTML=h(o.hits),m.refresh()}).catch(o=>{console.log(o)}).finally(()=>{g()})}
//# sourceMappingURL=commonHelpers.js.map
