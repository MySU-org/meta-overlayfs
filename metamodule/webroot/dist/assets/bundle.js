(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const C={"tachometer-alt":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',cubes:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',"sliders-h":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="8" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="12" cy="18" r="2"/></svg>',"info-circle":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',"check-circle":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',"pause-circle":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="10" y1="15" x2="10" y2="9"/><line x1="14" y1="15" x2="14" y2="9"/></svg>',"sync-alt":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',sync:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',play:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>',pause:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',ban:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',microchip:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M5 9h14M5 15h14M9 5v14M15 5v14"/></svg>',hdd:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12H2"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></svg>',folder:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',spinner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>',"exclamation-triangle":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',"exclamation-circle":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',lightbulb:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>',heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',"user-tie":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="9" y1="11" x2="9" y2="21"/><path d="M6 14l3-3 3 3"/></svg>',user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',"user-astronaut":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="2"/><path d="M12 3v1M8.5 5.5l-.7-.7M5.5 8.5l-.7-.7M18.5 5.5l.7-.7M19.5 8.5l.7-.7"/></svg>',users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',"layer-group":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',"laptop-code":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="20" x2="22" y2="20"/><polyline points="10 7 8 12 10 17"/><polyline points="14 7 16 12 14 17"/></svg>',book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',code:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',"file-alt":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',inbox:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',compress:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>',undo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>'};function L(y,e=""){const t=C[y]||C["info-circle"];return`<i class="icon ${e}">${t}</i>`}class N{static async execCommand(e){return new Promise((t,s)=>{if(typeof mysu<"u"&&typeof mysu.exec=="function"){const i=`exec_cb_${Date.now()}_${Math.floor(Math.random()*1e4)}`;window[i]=function(a,l,n){delete window[i],a!==0?s(new Error(n||`Error ${a}`)):t(l)},mysu.exec(e,"{}",i)}else setTimeout(()=>t(""),100)})}static async getModuleProp(e,t){try{return(await this.execCommand(`grep "^${t}=" "/data/adb/modules/${e}/module.prop" 2>/dev/null | cut -d'=' -f2-`)).trim()||null}catch{return null}}static async updateRootStatus(){}static async getStorageUsage(e,t){try{const[s,i]=await Promise.all([this.execCommand(`mountpoint -q "${t}" && echo "1"`).then(()=>!0).catch(()=>!1),this.execCommand(`[ -f "${e}" ] && echo "1"`).then(()=>!0).catch(()=>!1)]),a={used:0,total:0,free:0,percent:0,usedFormatted:"0 B",totalFormatted:"0 B",freeFormatted:"0 B",mounted:s,exists:i};if(!i)return a;const l=await this.execCommand(`stat -c%s "${e}" 2>/dev/null`).catch(()=>"0"),n=parseInt(l)||0;let o=0;if(s){const c=(await this.execCommand(`df -k "${t}" 2>/dev/null | tail -1`).catch(()=>"")).trim().split(/\s+/);c.length>=3&&(o=(parseInt(c[2])||0)*1024)}else o=Math.round(n*.11);const d=n-o,r=n>0?Math.round(o/n*100):0;return{used:o,total:n,free:d,percent:r,usedFormatted:this.formatBytes(o),totalFormatted:this.formatBytes(n),freeFormatted:this.formatBytes(d),mounted:s,exists:i}}catch{return{used:0,total:0,free:0,percent:0,usedFormatted:"Error",totalFormatted:"Error",freeFormatted:"Error",mounted:!1,exists:!1}}}static logToFile(e,t="INFO"){if(typeof mysu>"u")return;const i=`[${t.padEnd(5," ")} myoverlayfs::webui] ${e}`.replace(/'/g,"'\\''").replace(/\n/g," ");mysu.exec(`echo '${i}' >> "${CONFIG.LOG_FILE}"`,"{}",()=>{})}static formatBytes(e,t=1){if(!e||e===0)return"0 B";const s=1024,i=["B","KB","MB","GB","TB"],a=Math.floor(Math.log(Math.abs(e))/Math.log(s));return`${parseFloat((e/Math.pow(s,a)).toFixed(t<0?0:t))} ${i[a]}`}static showToast(e,t="info",s=3e3){const i=t==="warning"?"WARN":"INFO",a=e.replace(/<[^>]+>/g,"");this.logToFile(a,i);const l=document.getElementById("toast-container");if(!l)return;const n=document.createElement("div");n.className=`toast toast-${t}`;const o={success:"check-circle",error:"exclamation-circle",warning:"exclamation-triangle",info:"info-circle"}[t]||"info-circle";n.innerHTML=`${L(o)}<span>${e}</span>`,l.appendChild(n),setTimeout(()=>{n.style.animation="toastOut 0.25s cubic-bezier(0.4,0,0.2,1) forwards",setTimeout(()=>n.remove(),250)},s)}static showModal(e,t,s=[]){return new Promise(i=>{document.body.classList.add("modal-open");const a=document.getElementById("modal-container"),l=document.createElement("div");l.className="modal";const n=s.map(r=>({...r,resultString:String(r.result)}));l.innerHTML=`
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">${e}</h3>
                        <button class="modal-close">✕</button>
                    </div>
                    <div class="modal-body">${t}</div>
                    ${n.length?`
                    <div class="modal-footer">
                        ${n.map(r=>`
                            <button class="s-btn ${r.type==="danger"?"danger":r.type==="primary"?"primary":""}"
                                    data-result="${r.resultString}">
                                ${r.text}
                            </button>
                        `).join("")}
                    </div>
                    `:""}
                </div>
            `,a.appendChild(l);let o=!1;const d=r=>{o||(o=!0,l.style.animation="fadeIn 0.2s reverse forwards",setTimeout(()=>{l.remove(),document.body.classList.remove("modal-open"),i(r)},200))};l.querySelector(".modal-close").addEventListener("click",()=>d(null)),l.addEventListener("click",r=>{r.target===l&&d(null)}),l.querySelectorAll(".modal-footer button").forEach(r=>{r.addEventListener("click",u=>{u.stopPropagation();const c=r.dataset.result;d(c==="true"?!0:c==="false"?!1:c==="null"?null:c)})})})}static async confirmAction(e,t,s="Confirm",i="Cancel"){return this.showModal(e,`<div class="confirm-message">${t}</div>`,[{text:i,type:"secondary",result:!1},{text:s,type:"danger",result:!0}])}static async checkRoot(){try{return(await this.execCommand("id")).includes("uid=0")}catch{return!1}}static async checkKernelSU(){try{const e=await this.execCommand('mysud -V 2>/dev/null || echo "N/A"');return e.trim()!=="N/A"&&e.trim()!==""}catch{return!1}}static async copyToClipboard(e){try{return await navigator.clipboard.writeText(e),this.showToast("Copied to clipboard","success"),!0}catch{const t=Object.assign(document.createElement("textarea"),{value:e,className:"hidden-textarea"});document.body.appendChild(t),t.select(),t.setSelectionRange(0,99999);try{const s=document.execCommand("copy");return document.body.removeChild(t),this.showToast(s?"Copied":"Copy failed",s?"success":"error"),s}catch{return document.body.removeChild(t),this.showToast("Copy failed","error"),!1}}}}class T{constructor(e){this.app=e,this.data={deviceInfo:{model:"—",android:"—"},mysuVersion:"—",moduleStats:{total:0,active:0,inactive:0,updating:0,uninstalling:0},partitionData:[],imageUsage:{total:0,used:0,free:0,percent:0,mounted:!1,exists:!1,freeFormatted:"0 B"}}}async render(){return await this.loadData(),this.buildHTML()}buildHTML(){const{imageUsage:e,moduleStats:t,deviceInfo:s,mysuVersion:i,partitionData:a}=this.data,l=e.total||1,n=e.free||0,o=2*Math.PI*58,d={system:{hex:"#f87171",var:"--red",filter:"glow-red"},product:{hex:"#22d3ee",var:"--cyan",filter:"glow-cyan"},vendor:{hex:"#34d399",var:"--green",filter:"glow-green"},system_ext:{hex:"#fbbf24",var:"--yellow",filter:"glow-yellow"},odm:{hex:"#a78bfa",var:"--violet",filter:"glow-violet"},oem:{hex:"#fb923c",var:"--orange",filter:"glow-orange"}};let r="",u="",c="",v=0;for(const g of a){let h=g.bytes/l*100;h>0&&h<.1&&(h=.1),h=parseFloat(h.toFixed(1));const x=`${h/100*o} ${o}`,M=v;v-=h/100*o;const m=d[g.name]||{hex:"#ffffff",var:"--text",filter:""},I=g.name.charAt(0).toUpperCase()+g.name.slice(1);r+=`<circle cx="80" cy="80" r="58" class="donut-seg" stroke="${m.hex}" stroke-dasharray="${x}" stroke-dashoffset="${M}" ${m.filter?`filter="url(#${m.filter})"`:""} />`,u+=`
                <div class="legend-item">
                    <div class="legend-dot" style="background:${m.hex};color:${m.hex};box-shadow:0 0 8px currentColor;"></div>
                    <div class="legend-info">
                        <div class="legend-name">${I}</div>
                        <div class="legend-pct" style="color:var(${m.var})">${h}% · ${this.app.utils.formatBytes(g.bytes)}</div>
                    </div>
                </div>`,c+=`
                <div class="partition-row">
                    <div class="partition-icon" style="background:var(${m.var}-dim);border-color:rgba(255,255,255,0.1);color:var(${m.var});">${g.name.substring(0,3)}</div>
                    <div class="partition-info">
                        <div class="partition-name">${I}</div>
                        <div class="partition-sub">Overlay data</div>
                        <div class="partition-bar">
                            <div class="partition-bar-fill" style="width:${h}%;background:linear-gradient(90deg,var(${m.var}),transparent);"></div>
                        </div>
                    </div>
                    <div class="partition-right">
                        <div class="partition-pct" style="color:var(${m.var})">${h}%</div>
                        <div class="partition-bytes">${this.app.utils.formatBytes(g.bytes)}</div>
                    </div>
                </div>`}let p=n/l*100;p>0&&p<.1&&(p=.1),p=parseFloat(p.toFixed(1));const $=`${p/100*o} ${o}`;r+=`<circle cx="80" cy="80" r="58" class="donut-seg part-free" stroke-dasharray="${$}" stroke-dashoffset="${v}"/>`;const b=e.mounted?"ok":e.exists?"warn":"bad",w=e.mounted?"Mounted":e.exists?"Unmounted":"No Image",f=[];return f.push(`<span class="text-green">${t.active} Active</span>`),t.inactive>0&&f.push(`<span class="text-red">${t.inactive} Disabled</span>`),t.updating>0&&f.push(`<span class="text-yellow">${t.updating} Update</span>`),t.uninstalling>0&&f.push(`<span class="text-red-dim">${t.uninstalling} Uninstall</span>`),`
        <div class="dashboard-page">
            <div class="storage-donut-card">
                <div class="donut-wrap">
                    <div class="donut-svg-wrap">
                        <svg class="donut-svg" viewBox="0 0 160 160">
                            <defs>
                                <filter id="glow-red"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                                <filter id="glow-cyan"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                                <filter id="glow-green"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                                <filter id="glow-yellow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                                <filter id="glow-violet"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                                <filter id="glow-orange"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                            </defs>
                            <circle cx="80" cy="80" r="58" class="donut-bg"/>
                            ${r}
                        </svg>
                        <div class="donut-center">
                            <div class="donut-center-pct">Storage</div>
                            <div class="donut-center-label">${this.app.utils.formatBytes(l)}</div>
                        </div>
                    </div>
                    <div class="donut-legend">
                        ${u}
                        <div class="legend-item">
                            <div class="legend-dot part-free"></div>
                            <div class="legend-info">
                                <div class="legend-name">Unused</div>
                                <div class="legend-pct part-free-text">${p}% · ${e.freeFormatted}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="partition-rows">
                    ${c}
                    <div class="partition-row">
                        <div class="partition-icon part-free">FRE</div>
                        <div class="partition-info">
                            <div class="partition-name">Unused Space</div>
                            <div class="partition-sub">Available for new modules</div>
                        </div>
                        <div class="partition-right">
                            <div class="partition-pct part-free-text">${p}%</div>
                            <div class="partition-bytes">${e.freeFormatted}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="stat-chip-wide" id="btn-view-modules" role="button">
                <div class="scw-icon">
                    ${this.app.icon("cubes")}
                </div>
                <div class="scw-info">
                    <div class="scw-title">${t.total} Modules Installed</div>
                    <div class="scw-stats">
                        ${f.join("<span>·</span>")}
                    </div>
                </div>
                <div class="scw-arrow">
                    <svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
                </div>
            </div>

            <div class="info-pair">
                <div class="info-glass info-full">
                    <div class="info-glass-header">
                        <div class="info-glass-title">Image Status</div>
                        <span class="info-glass-tag ${b}">${w}</span>
                    </div>
                    <div class="info-rows-grid">
                        <div class="info-row"><span class="k">Status</span><span class="v ${b}">${w}</span></div>
                        <div class="info-row"><span class="k">File</span><span class="v ${e.exists?"ok":"bad"}">${e.exists?"Found":"Missing"}</span></div>
                        <div class="info-row"><span class="k">Filesystem</span><span class="v">ext4</span></div>
                    </div>
                </div>

                <div class="info-glass info-full">
                    <div class="info-glass-header">
                        <div class="info-glass-title">Device</div>
                        <span class="info-glass-tag">${i}</span>
                    </div>
                    <div class="info-rows-grid">
                        <div class="info-row"><span class="k">Model</span><span class="v">${s.model}</span></div>
                        <div class="info-row"><span class="k">Android</span><span class="v">${s.android}</span></div>
                        <div class="info-row"><span class="k">Root</span><span class="v ok">Active</span></div>
                    </div>
                </div>
            </div>
        </div>
        `}async loadData(){try{const e=this.app.utils,s=await e.execCommand('getprop ro.product.model; echo "|||"; getprop ro.build.version.release; echo "|||"; mysud -V 2>/dev/null || echo "—"'),[i,a,l]=s.split("|||").map(o=>o.trim()),n=await this.getModules();if(this.data.deviceInfo={model:i||"—",android:a||"—"},this.data.mysuVersion=l||"—",this.data.moduleStats={total:n.length,active:n.filter(o=>o.enabled&&!o.removePending).length,inactive:n.filter(o=>!o.enabled&&!o.removePending).length,updating:n.filter(o=>o.hasUpdate).length,uninstalling:n.filter(o=>o.removePending).length},this.data.imageUsage=await e.getStorageUsage(CONFIG.IMG_FILE,CONFIG.MNT_DIR),this.data.partitionData=[],this.data.imageUsage.mounted){const o=`
                    for p in system vendor product system_ext odm oem; do
                        sz=0
                        for d in "${CONFIG.MNT_DIR}"/*/"$p"; do
                            if [ -d "$d" ]; then
                                k=$(du -sk "$d" 2>/dev/null | awk '{print $1}')
                                if [ -n "$k" ]; then
                                    sz=$((sz + k))
                                fi
                            fi
                        done
                        if [ "$sz" -gt 0 ]; then
                            echo "$p|$sz"
                        fi
                    done
                `,d=await e.execCommand(o);d&&d.trim().split(`
`).forEach(r=>{const u=r.split("|");if(u.length===2){const c=(parseInt(u[1].trim())||0)*1024;c>0&&this.data.partitionData.push({name:u[0].trim(),bytes:c})}})}}catch{}}async getModules(){try{const e=this.app.utils;if(!await e.execCommand(`mountpoint -q "${CONFIG.MNT_DIR}" && echo "1"`).then(()=>!0).catch(()=>!1))return[];const s=`
                sizes=$(du -sk "${CONFIG.MODULES_DIR}"/* 2>/dev/null)
                ls -1 "${CONFIG.MNT_DIR}" 2>/dev/null | grep -v 'lost+found' | grep -v '_update$' | while read -r id; do
                    [ -z "$id" ] && continue
                    p="${CONFIG.MODULES_DIR}/$id"
                    name=$(grep "^name=" "$p/module.prop" 2>/dev/null | cut -d'=' -f2-)
                    [ -z "$name" ] && name=""
                    exists=$([ -d "$p" ] && echo "1" || echo "0")
                    upd=$([ -f "$p/update" ] && echo "1" || echo "0")
                    rmv=$([ -f "$p/remove" ] && echo "1" || echo "0")
                    dis=$([ -f "$p/disable" ] && echo "1" || echo "0")
                    size=0
                    if [ "$exists" = "1" ]; then
                        size=$(echo "$sizes" | grep -w "$p" | awk '{print $1}')
                        [ -z "$size" ] && size=0
                    fi
                    echo "$id|__NAME__|$name|__STAT__|$exists|$upd|$rmv|$dis|$size"
                done
            `,i=await e.execCommand(s);if(!i)return[];const a=[],l=i.trim().split(`
`);for(const n of l){if(!n.includes("|__NAME__|"))continue;const o=n.split("|__STAT__|"),[d,r]=o[0].split("|__NAME__|"),[u,c,v,p,$]=o[1].split("|"),b=u==="1",w=c==="1",f=v==="1",g=p==="1",h=r.trim()||d,x=(parseInt($)||0)*1024,M=b?!g:!1;a.push({id:d,name:h,enabled:M,hasUpdate:w,removePending:f,existsInModulesDir:b,sizeFormatted:e.formatBytes(x)})}return a.sort((n,o)=>(n.name||n.id).localeCompare(o.name||o.id)),a}catch{return[]}}async bindEvents(){var e;(e=document.getElementById("btn-view-modules"))==null||e.addEventListener("click",()=>this.app.showPage("modules"))}async update(){await this.loadData();const e=document.getElementById("page-content");e&&(e.innerHTML=this.buildHTML()),await this.bindEvents()}}class F{constructor(e){this.app=e,this.modules=[],this.searchTerm="",this.loading=!1}async render(){return await this.loadModules(),this.buildHTML()}buildHTML(){const e=this.filterModules(),t=this.modules,s=t.filter(a=>a.enabled&&!a.removePending).length,i=[`<span>${t.length} total</span>`,`<span class="text-green">${s} active</span>`].join("<span>·</span>");return`
        <div class="modules-page">
            <div class="search-bar mb-4">
                ${this.app.icon("search")}
                <input type="text" id="module-search" placeholder="Search modules..." value="${this.searchTerm}" autocomplete="off" spellcheck="false">
            </div>
            <div id="modules-content">
                ${this.renderList(e)}
            </div>
            <div class="modules-footer" id="modules-footer">
                ${i}
            </div>
        </div>
        `}renderList(e){return e.length===0?`<div class="empty-state">${this.app.icon("inbox")}<h3>No modules</h3><p>${this.searchTerm?"No modules match.":"No modules found."}</p></div>`:e.map((t,s)=>this.renderSlab(t,s)).join("")}renderSlab(e,t){const s=e.name||e.id;let i="active",a="",l="check-circle";e.removePending?(i="uninstalling",l="trash",a='<span class="slab-badge uninstalling">Removing</span>'):e.hasUpdate?(i="updating",l="sync-alt",a=`<span class="slab-badge updating">${this.app.icon("sync-alt")} Update</span>`):e.enabled?a='<span class="slab-badge active"><span class="live-dot"></span> On</span>':(i="inactive",l="pause-circle",a='<span class="slab-badge inactive">Off</span>');const n=[];e.id!==s&&n.push(`<span class="slab-tag">${this.app.icon("code")} ${e.id}</span>`),e.activeFiles!==void 0&&n.push(`<span class="slab-tag">${this.app.icon("file-alt")} ${e.activeFiles} Files</span>`),e.conflictsLost&&e.conflictsLost.length>0&&n.push(`<span class="slab-tag text-red tag-danger">${this.app.icon("exclamation-circle")} ${e.conflictsLost.length} Ignored</span>`),e.conflictsWon&&e.conflictsWon.length>0&&n.push(`<span class="slab-tag text-yellow tag-warning">${this.app.icon("exclamation-triangle")} ${e.conflictsWon.length} Overwrites</span>`),e.existsInModulesDir||n.push(`<span class="slab-tag text-red">${this.app.icon("exclamation-triangle")} Not Linked</span>`);let o=e.removePending?`<button class="slab-btn success restore-module" data-module="${e.id}">${this.app.icon("undo")} Restore</button>`:e.hasUpdate?`<button class="slab-btn" disabled>${this.app.icon("ban")} Update Pending</button>`:`<button class="slab-btn info-module" data-module="${e.id}">${this.app.icon("info-circle")} Info</button>
             <button class="slab-btn danger uninstall-module" data-module="${e.id}">${this.app.icon("trash")} Delete</button>
             <button class="slab-btn ${e.enabled?"warning":"success"} toggle-module" data-module="${e.id}" data-action="${e.enabled?"disable":"enable"}">${this.app.icon(e.enabled?"pause":"play")} ${e.enabled?"Disable":"Enable"}</button>`;return`
            <div class="module-slab ${i}" data-module="${e.id}" style="animation-delay:${t%10*40}ms">
                <div class="slab-top">
                    <div class="slab-avatar">${this.app.icon(l)}</div>
                    <div class="slab-info"><div class="slab-name">${s}</div>${n.length?`<div class="slab-meta">${n.join("")}</div>`:""}</div>
                    ${a}
                </div>
                <div class="slab-actions">${o}</div>
            </div>`}async loadModules(){if(!this.loading){this.loading=!0;try{const e=this.app.utils;if(!await e.execCommand(`mountpoint -q "${CONFIG.MNT_DIR}" && echo "1"`).then(()=>!0).catch(()=>!1)){this.modules=[];return}const s=`sizes=$(du -sk "${CONFIG.MODULES_DIR}"/* 2>/dev/null); ls -1 "${CONFIG.MNT_DIR}" 2>/dev/null | grep -v 'lost+found' | grep -v '_update$' | while read -r id; do [ -z "$id" ] && continue; p="${CONFIG.MODULES_DIR}/$id"; name=$(grep "^name=" "$p/module.prop" 2>/dev/null | cut -d'=' -f2-); exists=$([ -d "$p" ] && echo "1" || echo "0"); upd=$([ -f "$p/update" ] && echo "1" || echo "0"); rmv=$([ -f "$p/remove" ] && echo "1" || echo "0"); dis=$([ -f "$p/disable" ] && echo "1" || echo "0"); size=0; if [ "$exists" = "1" ]; then size=$(echo "$sizes" | grep -w "$p" | awk '{print $1}'); fi; echo "$id|__NAME__|$name|__STAT__|$exists|$upd|$rmv|$dis|$size"; done`,i=await e.execCommand(s);if(!i)return[];const a=[],l=i.trim().split(`
`);for(const n of l){if(!n.includes("|__NAME__|"))continue;const o=n.split("|__STAT__|"),[d,r]=o[0].split("|__NAME__|"),[u,c,v,p,$]=o[1].split("|"),b=u==="1",w=c==="1",f=v==="1",g=p==="1",h=r.trim()||d,x=(parseInt($)||0)*1024,M=b?!g:!1;a.push({id:d,name:h,enabled:M,hasUpdate:w,removePending:f,existsInModulesDir:b,sizeFormatted:e.formatBytes(x),conflictsLost:[],conflictsWon:[],activeFiles:void 0,partitions:[]})}a.sort((n,o)=>(n.name||n.id).localeCompare(o.name||o.id));try{const n=await e.execCommand(`"${CONFIG.BINARY}" inspect -r 2>/dev/null`),o=n.indexOf("{"),d=n.lastIndexOf("}");if(o!==-1&&d!==-1){const r=n.substring(o,d+1),u=JSON.parse(r);if(u.status==="success")for(const c of a){const v=(u.modules||[]).find(p=>p.id===c.id);if(v&&(c.activeFiles=v.files,c.partitions=v.partitions||[]),u.conflicts)for(const p of u.conflicts)p.ignored&&p.ignored.includes(c.id)&&c.conflictsLost.push(p),p.winner===c.id&&c.conflictsWon.push(p)}}}catch{}this.modules=a}catch{this.modules=[]}finally{this.loading=!1}}}filterModules(){let e=this.modules;if(this.searchTerm){const t=this.searchTerm.toLowerCase();e=e.filter(s=>s.id.toLowerCase().includes(t)||s.name&&s.name.toLowerCase().includes(t))}return e}async bindEvents(){var e;(e=document.getElementById("module-search"))==null||e.addEventListener("input",t=>{this.searchTerm=t.target.value,this.refreshContent()}),this.bindModuleActions()}bindModuleActions(){const e=document.getElementById("modules-content");e&&(e.onclick=async t=>{const s=t.target.closest(".toggle-module"),i=t.target.closest(".uninstall-module"),a=t.target.closest(".restore-module"),l=t.target.closest(".info-module");if(s)await this.toggleModule(s.dataset.module,s.dataset.action==="enable");else if(i){const n=i.dataset.module,o=this.modules.find(d=>d.id===n);await this.app.utils.confirmAction("Uninstall",`Remove <strong>${(o==null?void 0:o.name)||n}</strong> on next reboot?`,"Uninstall")&&await this.toggleUninstall(n,!0)}else a?await this.toggleUninstall(a.dataset.module,!1):l&&await this.showModuleInfo(this.modules.find(n=>n.id===l.dataset.module))})}async showModuleInfo(e){var i,a,l,n,o;if(!e)return;let t=`<div class="module-info-modal">
            <div class="info-stats-card">
                <div class="info-stat"><span class="stat-label">Active Files</span><span class="stat-value text-blue">${e.activeFiles!==void 0?e.activeFiles:"—"}</span></div>
                <div class="info-stat"><span class="stat-label">Mounted In</span><span class="stat-value mounts-list">${(i=e.partitions)!=null&&i.length?[...new Set(e.partitions)].map(d=>`<span class="mount-tag">${d}</span>`).join(""):'<span class="text-3">None</span>'}</span></div>
            </div>`;const s=(d,r)=>{const u=new Set;return d.map(c=>{const v=c.file.split("/").pop(),p=`${v}-${r?c.winner:c.ignored.join(",")}`;return u.has(p)?"":(u.add(p),`<div class="conflict-item clickable-conflict" onclick="app.pages.modules.showPathDetails('${c.file}', '${c.winner}', '${(c.ignored||[]).join(",")}')">
                    <div class="conflict-icon">${this.app.icon("file-alt")}</div>
                    <div class="conflict-details">
                        <div class="conflict-file">${v}</div>
                        <div class="conflict-reason">${r?`Lost to <span>${c.winner}</span>`:`Overrides <span>${c.ignored.join(", ")}</span>`}</div>
                    </div>
                    <div class="conflict-arrow">${this.app.icon("play")}</div>
                </div>`)}).join("")};(a=e.conflictsLost)!=null&&a.length&&(t+=`<div class="conflict-section bad"><div class="conflict-header">${this.app.icon("exclamation-circle")} Ignored by Mount</div><div class="conflict-list">${s(e.conflictsLost,!0)}</div></div>`),(l=e.conflictsWon)!=null&&l.length&&(t+=`<div class="conflict-section warn"><div class="conflict-header">${this.app.icon("exclamation-triangle")} Active Overwrites</div><div class="conflict-list">${s(e.conflictsWon,!1)}</div></div>`),!((n=e.conflictsLost)!=null&&n.length)&&!((o=e.conflictsWon)!=null&&o.length)&&(t+=`<div class="empty-state clean-mount-state">
                ${this.app.icon("check-circle")}
                <h3 class="text-green mb-4">Clean Mount</h3>
                <p>No file conflicts detected.</p>
            </div>`),t+="</div>",await this.app.utils.showModal(`${e.name||e.id}`,t,[{text:"Close",type:"secondary",result:"close"}])}async showPathDetails(e,t,s){const i=s.split(","),a=`
        <div class="path-details-modal">
            <div class="path-group">
                <div class="path-header text-green">${this.app.icon("check-circle")} Running (Active)</div>
                <div class="path-box-full"><strong>Module:</strong> ${t}<br><strong>Path:</strong> /${e}</div>
            </div>
            <div class="path-group">
                <div class="path-header text-red">${this.app.icon("ban")} Ignored (Shadowed)</div>
                ${i.map(l=>`<div class="path-box-full"><strong>Module:</strong> ${l}<br><strong>Path:</strong> /${e}</div>`).join("")}
            </div>
        </div>`;await this.app.utils.showModal("Path Conflict Details",a,[{text:"Done",type:"primary",result:"ok"}])}refreshContent(){const e=document.getElementById("modules-content");e&&(e.innerHTML=this.renderList(this.filterModules()))}async toggleModule(e,t){try{const s=this.modules.find(a=>a.id===e),i=(s==null?void 0:s.name)||e;await this.app.utils.execCommand(t?`rm -f "${CONFIG.MODULES_DIR}/${e}/disable"`:`touch "${CONFIG.MODULES_DIR}/${e}/disable"`),this.app.utils.showToast(`Module '${i}' ${t?"enabled":"disabled"}`,t?"success":"warning"),await this.update()}catch(s){this.app.utils.logToFile(`Toggle failure: ${s.message}`,"ERROR"),this.app.utils.showToast(s.message,"error")}}async toggleUninstall(e,t){try{const s=this.modules.find(a=>a.id===e),i=(s==null?void 0:s.name)||e;await this.app.utils.execCommand(t?`touch "${CONFIG.MODULES_DIR}/${e}/remove"`:`rm -f "${CONFIG.MODULES_DIR}/${e}/remove"`),this.app.utils.showToast(t?`'${i}' queued for removal`:`'${i}' restored`,t?"error":"success"),await this.update()}catch(s){this.app.utils.logToFile(`Removal toggle failure: ${s.message}`,"ERROR"),this.app.utils.showToast(s.message,"error")}}async update(){await this.loadModules(),this.refreshContent()}}class E{constructor(e){this.app=e,this.data={exists:!1,mounted:!1,imageSize:"—",imageUsage:"—",imageStatus:{mounted:!1,exists:!1},moduleId:"myoverlayfs",removePending:!1}}async render(){return await this.loadData(),this.buildHTML()}buildHTML(){const{imageStatus:e,imageSize:t,imageUsage:s,removePending:i}=this.data,a=e.mounted?"Mounted":e.exists?"Unmounted":"No Image",l=e.mounted?"ok":e.exists?"warn":"bad";return`
        <div class="settings-page">
            <div class="s-plane">
                <div class="s-plane-head">
                    <div class="s-plane-icon icon-blue">
                        ${this.app.icon("hdd")}
                    </div>
                    <div class="s-plane-title">Image Configuration</div>
                </div>
                <div class="s-row">
                    <div class="s-row-icon icon-blue">
                        ${this.app.icon("hdd")}
                    </div>
                    <div class="s-row-body">
                        <div class="s-row-label">Status</div>
                        <div class="s-row-sub">Overlay filesystem mount state</div>
                    </div>
                    <span class="s-row-value ${l}" id="settings-mount-status">${a}</span>
                </div>
                <div class="s-row">
                    <div class="s-row-icon icon-violet">
                        ${this.app.icon("layer-group")}
                    </div>
                    <div class="s-row-body">
                        <div class="s-row-label">Image Size</div>
                        <div class="s-row-sub">Allocated space for modules</div>
                    </div>
                    <span class="s-row-value" id="settings-image-size">${t}</span>
                </div>
                <div class="s-row border-none">
                    <div class="s-row-icon icon-green">
                        ${this.app.icon("compress")}
                    </div>
                    <div class="s-row-body">
                        <div class="s-row-label">Storage Usage</div>
                        <div class="s-row-sub">Used / Total</div>
                    </div>
                    <span class="s-row-value" id="settings-usage">${s}</span>
                </div>
            </div>

            ${e.mounted?`
            <div class="s-plane">
                <div class="s-plane-head">
                    <div class="s-plane-icon icon-green">
                        ${this.app.icon("compress")}
                    </div>
                    <div class="s-plane-title">Storage</div>
                </div>
                <div class="s-row-static border-none pb-4">
                    <div class="s-row-body">
                        <div class="s-row-label-desc">Compacts the myoverlayfs image file to reclaim empty space left behind by deleted or updated modules.</div>
                    </div>
                </div>
                <div class="s-actions pt-6">
                    <button class="s-btn primary full" id="optimize-image" ${this.data.mounted?"":"disabled"}>
                        ${this.app.icon("compress")} Optimize Storage
                    </button>
                </div>
            </div>
            `:""}

            <div class="s-plane">
                <div class="s-plane-head">
                    <div class="s-plane-icon icon-violet">
                        ${this.app.icon("file-alt")}
                    </div>
                    <div class="s-plane-title">System Logs</div>
                </div>
                <div class="s-row-static border-none">
                    <div class="s-row-icon icon-gray">
                        ${this.app.icon("code")}
                    </div>
                    <div class="s-row-body">
                        <div class="s-row-label">Log File</div>
                    </div>
                </div>
                <div class="path-box">
                    <span class="path-box-text">${CONFIG.LOG_FILE}</span>
                    <button class="path-copy" data-copy="${CONFIG.LOG_FILE}" title="Copy">
                        ${this.app.icon("copy")}
                    </button>
                </div>
                <div class="s-actions">
                    <button class="s-btn primary" id="view-logs">
                        ${this.app.icon("eye")} View
                    </button>
                    <button class="s-btn danger" id="clear-logs">
                        ${this.app.icon("trash")} Clear
                    </button>
                </div>
            </div>

            <div class="s-plane">
                <div class="s-plane-head">
                    <div class="s-plane-icon icon-blue">
                        ${this.app.icon("folder")}
                    </div>
                    <div class="s-plane-title">Paths</div>
                </div>
                ${[{label:"Image File",path:CONFIG.IMG_FILE},{label:"Mount Point",path:CONFIG.MNT_DIR},{label:"Modules Dir",path:CONFIG.MODULES_DIR},{label:"Binary",path:CONFIG.BINARY}].map(n=>`
                    <div class="s-row-static">
                        <div class="s-row-body">
                            <div class="s-row-sub mb-2">${n.label}</div>
                        </div>
                    </div>
                    <div class="path-box">
                        <span class="path-box-text">${n.path}</span>
                        <button class="path-copy" data-copy="${n.path}" title="Copy">
                            ${this.app.icon("copy")}
                        </button>
                    </div>
                `).join("")}
            </div>

            <div class="s-plane ${i?"":"danger"}" id="meta-uninstall-plane">
                <div class="s-plane-head">
                    <div class="s-plane-icon ${i?"icon-green":"icon-red"}" id="meta-uninstall-icon">
                        ${this.app.icon(i?"undo":"trash")}
                    </div>
                    <div class="s-plane-title ${i?"text-green":"text-red-dim"}" id="meta-uninstall-title">
                        ${i?"Restore Meta OverlayFS":"Uninstall Meta OverlayFS"}
                    </div>
                </div>
                <div class="s-row-static border-none pb-4">
                    <div class="s-row-body">
                        <div class="s-row-label-desc" id="meta-uninstall-desc">
                            ${i?"The core module is queued for removal. Restore it to cancel the uninstallation.":"Mark the core Meta OverlayFS module for removal. This disables the entire overlay system on next reboot."}
                        </div>
                    </div>
                </div>
                <div class="s-actions pt-6">
                    <button class="s-btn ${i?"success":"danger"} full" id="uninstall-meta-btn">
                        ${this.app.icon(i?"undo":"trash")} <span id="meta-uninstall-btn-txt">${i?"Cancel Uninstall":"Uninstall Meta OverlayFS"}</span>
                    </button>
                </div>
            </div>
        </div>
        `}async getModuleId(){let e="myoverlayfs";try{if(typeof mysu<"u"&&typeof mysu.moduleInfo=="function"){const t=mysu.moduleInfo(),s=typeof t=="string"?JSON.parse(t):t;s&&s.id&&(e=s.id)}}catch{}return e}async loadData(){try{const e=this.app.utils,t=await e.getStorageUsage(CONFIG.IMG_FILE,CONFIG.MNT_DIR),s=await this.getModuleId(),i=`${CONFIG.MODULES_DIR}/${s}/remove`,a=await e.execCommand(`[ -f "${i}" ] && echo "1"`).then(()=>!0).catch(()=>!1);this.data={exists:t.exists,mounted:t.mounted,imageSize:t.totalFormatted,imageUsage:`${t.usedFormatted} / ${t.totalFormatted} (${t.percent}%)`,imageStatus:{mounted:t.mounted,exists:t.exists},moduleId:s,removePending:a}}catch{this.data={exists:!1,mounted:!1,imageSize:"Error",imageUsage:"Error",imageStatus:{mounted:!1,exists:!1},moduleId:"myoverlayfs",removePending:!1}}}escapeHTML(e){return e.replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t])}formatLogs(e){return!e||e==="No logs available"?e:e.split(`
`).map(t=>{const s=this.escapeHTML(t);return s.includes("[WARN ")?`<span class="log-warn">${s}</span>`:s.includes("[ERROR ")?`<span class="log-err">${s}</span>`:s.includes("[INFO ")?`<span class="log-info">${s}</span>`:s}).join(`
`)}async bindEvents(){var e,t,s,i;(e=document.getElementById("view-logs"))==null||e.addEventListener("click",()=>this.viewLogs()),(t=document.getElementById("clear-logs"))==null||t.addEventListener("click",async()=>{await this.app.utils.confirmAction("Clear Logs","Delete all log entries? This cannot be undone.","Clear")&&await this.clearLogs()}),(s=document.getElementById("optimize-image"))==null||s.addEventListener("click",a=>this.optimizeStorage(a.currentTarget)),(i=document.getElementById("uninstall-meta-btn"))==null||i.addEventListener("click",()=>this.uninstallMetaModule()),document.querySelectorAll(".path-copy").forEach(a=>{a.addEventListener("click",async l=>{l.stopPropagation(),await this.app.utils.copyToClipboard(a.dataset.copy)})})}async uninstallMetaModule(){const{moduleId:e,removePending:t}=this.data,s=`${CONFIG.MODULES_DIR}/${e}/remove`;if(t)try{await this.app.utils.execCommand(`rm -f "${s}"`),this.app.utils.showToast("Meta OverlayFS restored","success"),await this.update()}catch(i){this.app.utils.logToFile(`Restoration failed: ${i.message}`,"ERROR"),this.app.utils.showToast(`Failed: ${i.message}`,"error")}else{if(!await this.app.utils.confirmAction("Confirm Uninstall",`Are you sure you want to uninstall the core <strong>Meta OverlayFS</strong> module?<br><br>
                 The overlay system will be completely disabled and removed on your next reboot.`,"Yes, Uninstall"))return;try{await this.app.utils.execCommand(`touch "${s}"`),this.app.utils.showToast("Meta OverlayFS queued for removal on reboot","success"),await this.update()}catch(a){this.app.utils.logToFile(`Uninstall trigger failure: ${a.message}`,"ERROR"),this.app.utils.showToast(`Failed: ${a.message}`,"error")}}}async optimizeStorage(e){if(!await this.app.utils.confirmAction("Optimize Storage","Compact the modules image to reclaim unused space. This creates a temporary copy and may take a minute.<br><br><strong>Reboot required</strong> for size changes to appear in file managers.","Optimize"))return;const s=e.innerHTML;e.innerHTML=`${this.app.icon("spinner","fa-spin")} Optimizing...`,e.disabled=!0;try{this.app.utils.showToast("Starting storage optimization","info");const i=`
                dd if=/dev/zero of="${CONFIG.MNT_DIR}/zero.fill" bs=1M 2>/dev/null
                rm -f "${CONFIG.MNT_DIR}/zero.fill"
                "${CONFIG.BINARY}" xcp "${CONFIG.IMG_FILE}" "${CONFIG.IMG_FILE}.new" --punch-hole
                mv "${CONFIG.IMG_FILE}.new" "${CONFIG.IMG_FILE}"
                chmod 644 "${CONFIG.IMG_FILE}"
                chcon u:object_r:mysu_file:s0 "${CONFIG.IMG_FILE}"
            `;await this.app.utils.execCommand(i),this.app.utils.showToast("Storage optimized! Reboot to apply changes.","success"),await this.update()}catch(i){this.app.utils.logToFile(`Optimization engine failure: ${i.message}`,"ERROR"),this.app.utils.showToast(`Optimization failed: ${i.message}`,"error")}finally{e.innerHTML=s,e.disabled=!1}}async viewLogs(){try{const e=await this.app.utils.execCommand(`cat "${CONFIG.LOG_FILE}" 2>/dev/null || echo "No logs available"`),t=this.formatLogs(e),s=this.app.utils.showModal("System Logs",`
                <div class="log-viewer-modal">
                    <div class="log-controls">
                        <button class="s-btn" id="refresh-logs">${this.app.icon("sync")} Refresh</button>
                        <button class="s-btn" id="copy-logs">${this.app.icon("copy")} Copy</button>
                    </div>
                    <div class="log-content"><pre id="log-content">${t}</pre></div>
                </div>
                `,[{text:"Close",type:"secondary",result:"close"}]);setTimeout(()=>{var i,a;(i=document.getElementById("refresh-logs"))==null||i.addEventListener("click",async l=>{l.stopPropagation();const n=l.currentTarget,o=n.innerHTML;n.innerHTML=`${this.app.icon("spinner","fa-spin")} Refreshing`,n.disabled=!0;try{const d=await this.app.utils.execCommand(`cat "${CONFIG.LOG_FILE}" 2>/dev/null || echo "No logs available"`),r=document.getElementById("log-content");r&&(r.innerHTML=this.formatLogs(d)),this.app.utils.showToast("Refreshed log view","success")}catch{this.app.utils.showToast("Refresh failed","error")}n.innerHTML=o,n.disabled=!1}),(a=document.getElementById("copy-logs"))==null||a.addEventListener("click",async l=>{l.stopPropagation();const n=document.getElementById("log-content");n&&await this.app.utils.copyToClipboard(n.innerText)})},100),await s}catch(e){this.app.utils.showToast(`Failed to read logs: ${e.message}`,"error")}}async clearLogs(){try{await this.app.utils.execCommand(`> "${CONFIG.LOG_FILE}"`),this.app.utils.showToast("System logs cleared","success")}catch(e){this.app.utils.showToast(`Failed: ${e.message}`,"error")}}async update(){await this.loadData();const e=document.getElementById("page-content");e&&(e.innerHTML=this.buildHTML()),await this.bindEvents()}}class O{constructor(e){this.app=e,this.moduleInfo=null,this.bannerBase64="",this.maintainer={name:"AshBorn",role:"Fork Maintainer (WebUI & Core)",handle:"@RipperHybrid",icon:"user-astronaut",highlight:!0},this.contributors=[{name:"weishu / tiann",role:"KernelSU Creator & Core",icon:"user-tie"},{name:"Ylarod",role:"Magic Mount",icon:"user"},{name:"Wang Han",role:"GitHub: @aviraxp",icon:"user"},{name:"7a72",role:"GitHub: @7a72",icon:"user"}]}async render(){this.moduleInfo=this.getModuleInfo();const e=this.moduleInfo.id&&this.moduleInfo.id!=="—"?this.moduleInfo.id:"myoverlayfs";try{const t=await this.app.utils.execCommand(`base64 "${CONFIG.MODULES_DIR}/${e}/banner" 2>/dev/null`);if(t){const s=t.replace(/\s+/g,"");s.length>100&&(this.bannerBase64=`data:image/png;base64,${s}`)}}catch{}return this.buildHTML()}buildHTML(){const e=this.moduleInfo;return`
        <div class="about-page">
            ${this.bannerBase64?`<img src="${this.bannerBase64}" class="about-banner">`:""}

            <div class="s-plane">
                <div class="s-plane-head">
                    <div class="s-plane-icon icon-blue">
                        ${this.app.icon("layer-group")}
                    </div>
                    <div class="s-plane-title">Module</div>
                </div>
                ${[{k:"Name",v:e.name||"—"},{k:"Version",v:e.version||"—"},{k:"Version Code",v:e.versionCode||"—"},{k:"Author",v:e.author||"—"},{k:"Module ID",v:e.id||"—"},{k:"Type",v:e.metamodule==="1"?"Meta Module":"Regular Module"}].map(s=>`
                    <div class="s-row cursor-default">
                        <div class="s-row-body">
                            <div class="s-row-label">${s.k}</div>
                        </div>
                        <span class="s-row-value">${s.v}</span>
                    </div>
                `).join("")}
                <div class="s-row cursor-default border-none">
                    <div class="s-row-body">
                        <div class="s-row-label">Status</div>
                    </div>
                    <span class="s-row-value ${e.enabled==="true"?"ok":"bad"}">
                        ${e.enabled==="true"?"Enabled":"Disabled"}
                    </span>
                </div>
            </div>

            <div class="s-plane">
                <div class="s-plane-head">
                    <div class="s-plane-icon icon-violet">
                        ${this.app.icon("laptop-code")}
                    </div>
                    <div class="s-plane-title">WebUI & Modifications</div>
                </div>
                <div class="contributor-card">
                    <div class="contributor-avatar highlight">
                        ${this.app.icon(this.maintainer.icon)}
                    </div>
                    <div class="contributor-info">
                        <div class="contributor-name">${this.maintainer.name}</div>
                        <div class="contributor-role">${this.maintainer.role}</div>
                        <div class="contributor-handle">${this.maintainer.handle}</div>
                    </div>
                </div>
                <div class="info-banner warn border-top-subtle">
                    ${this.app.icon("exclamation-triangle")}
                    <span>Problem with this fork project? Report it to <strong>${this.maintainer.name}</strong>. Do not report bugs for this modified fork to the original creators.</span>
                </div>
            </div>

            <div class="s-plane">
                <div class="s-plane-head">
                    <div class="s-plane-icon icon-blue">
                        ${this.app.icon("book")}
                    </div>
                    <div class="s-plane-title">What is Meta OverlayFS?</div>
                </div>
                <div class="info-banner pad-14 border-none">
                    ${this.app.icon("lightbulb")}
                    <span>An advanced KernelSU module that uses an image file and overlay filesystem to manage modules separately from the main modules directory — enabling better isolation and organization without touching core system directories.</span>
                </div>
            </div>

            <div class="s-plane">
                <div class="s-plane-head">
                    <div class="s-plane-icon icon-green">
                        ${this.app.icon("users")}
                    </div>
                    <div class="s-plane-title">Original Base Project</div>
                </div>
                ${this.contributors.map(s=>`
                    <div class="contributor-card">
                        <div class="contributor-avatar">
                            ${this.app.icon(s.icon)}
                        </div>
                        <div class="contributor-info">
                            <div class="contributor-name">${s.name}</div>
                            <div class="contributor-role">${s.role}</div>
                        </div>
                    </div>
                `).join("")}
                <div class="info-banner ok border-top-subtle">
                    ${this.app.icon("heart")}
                    <span>Thanks to the original creators who built the Meta OverlayFS foundation.</span>
                </div>
            </div>
        </div>
        `}getModuleInfo(){try{if(typeof mysu<"u"&&typeof mysu.moduleInfo=="function"){const e=mysu.moduleInfo();if(e)return typeof e=="string"?JSON.parse(e):e}}catch{}return{id:"—",moduleDir:"—",name:"—",version:"—",versionCode:"—",author:"—",metamodule:"0",enabled:"false"}}async bindEvents(){}}class k{constructor(){this.utils=N,this.icon=L,this.currentPage=null,this.isLoading=!1,this.pages={dashboard:null,modules:null,settings:null,about:null},this.init()}async init(){this.renderNav(),this.bindGlobalEvents(),this.bindGlobalSwipe(),await this.showPage("dashboard"),setTimeout(()=>this.updateIslandStatus(),150)}async updateIslandStatus(){const e=document.getElementById("island-status"),t=document.getElementById("island-status-text");if(!(!e||!t))try{const s=await this.utils.execCommand(`mountpoint -q "${CONFIG.MNT_DIR}" && echo "1"`).then(()=>!0).catch(()=>!1),i=await this.utils.checkRoot();s?(e.className="island-status",t.textContent="Mounted"):i?(e.className="island-status warn",t.textContent="Unmounted"):(e.className="island-status err",t.textContent="No Root")}catch{e.className="island-status err",t.textContent="Error"}}bindGlobalEvents(){const e=document.getElementById("global-refresh-btn");e&&e.addEventListener("click",async()=>{e.classList.add("spinning"),e.disabled=!0;try{await this.refreshCurrentPage(),await this.updateIslandStatus(),this.utils.showToast("Refreshed global webUI","success",1500)}catch{this.utils.showToast("Refresh failed","error")}finally{e.classList.remove("spinning"),e.disabled=!1}})}bindGlobalSwipe(){const e=document.getElementById("page-content");if(!e)return;let t=0,s=0,i=!1;e.addEventListener("touchstart",a=>{t=a.changedTouches[0].screenX,s=a.changedTouches[0].screenY,i=!1},{passive:!0}),e.addEventListener("touchmove",a=>{if(i)return;const l=Math.abs(a.changedTouches[0].screenX-t);Math.abs(a.changedTouches[0].screenY-s)>l+10&&(i=!0)},{passive:!0}),e.addEventListener("touchend",a=>{if(i)return;const l=a.changedTouches[0].screenX-t,n=a.changedTouches[0].screenY-s;if(Math.abs(l)<50||Math.abs(n)>Math.abs(l)*.6)return;const o=["dashboard","modules","settings","about"],d=o.indexOf(this.currentPage);if(d===-1)return;let r=d;l<0&&d<o.length-1?r=d+1:l>0&&d>0&&(r=d-1),r!==d&&this.showPage(o[r])},{passive:!0})}async refreshCurrentPage(){if(this.currentPage&&this.pages[this.currentPage]){const e=this.pages[this.currentPage];if(typeof e.update=="function")await e.update();else if(typeof e.render=="function"){const t=document.getElementById("page-content");t.innerHTML=await e.render(),typeof e.bindEvents=="function"&&await e.bindEvents()}}}renderNav(){const e=document.getElementById("bottom-nav");if(!e)return;const t=[{id:"dashboard",label:"Dash",iconName:"tachometer-alt"},{id:"modules",label:"Modules",iconName:"cubes"},{id:"settings",label:"Settings",iconName:"sliders-h"},{id:"about",label:"About",iconName:"info-circle"}];e.innerHTML=t.map(s=>`
            <button class="nav-item ${this.currentPage===s.id?"active":""}" data-page="${s.id}">
                ${this.icon(s.iconName)}
                <span>${s.label}</span>
            </button>
        `).join(""),e.querySelectorAll(".nav-item").forEach(s=>{s.addEventListener("click",i=>{const a=i.currentTarget.dataset.page;this.currentPage!==a&&this.showPage(a)})})}async showPage(e,t={}){if(this.isLoading)return;this.isLoading=!0,this.currentPage=e,this.renderNav(),document.body.className=`theme-${e}`,window.scrollTo({top:0,left:0,behavior:"instant"});const s=document.getElementById("page-content");s.innerHTML='<div class="spinner"></div>';try{let i="";e==="dashboard"?(this.pages.dashboard=new T(this),i=await this.pages.dashboard.render(),s.innerHTML=i,await this.pages.dashboard.bindEvents()):e==="modules"?(this.pages.modules=new F(this),i=await this.pages.modules.render(),s.innerHTML=i,await this.pages.modules.bindEvents()):e==="settings"?(this.pages.settings=new E(this),i=await this.pages.settings.render(),s.innerHTML=i,await this.pages.settings.bindEvents()):e==="about"&&(this.pages.about=new O(this),i=await this.pages.about.render(),s.innerHTML=i,await this.pages.about.bindEvents())}catch(i){s.innerHTML=`
                <div class="empty-state">
                    ${this.icon("exclamation-triangle")}
                    <h3>Error Loading Page</h3>
                    <p>${i.message}</p>
                </div>
            `}finally{this.isLoading=!1}}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{window.app=new k}):window.app=new k;
