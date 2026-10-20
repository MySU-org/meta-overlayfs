(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}})();const C={"tachometer-alt":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',cubes:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',"sliders-h":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="8" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="12" cy="18" r="2"/></svg>',"info-circle":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',"check-circle":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',"pause-circle":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="10" y1="15" x2="10" y2="9"/><line x1="14" y1="15" x2="14" y2="9"/></svg>',"sync-alt":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',sync:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',play:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>',pause:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',ban:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',microchip:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M5 9h14M5 15h14M9 5v14M15 5v14"/></svg>',hdd:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12H2"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></svg>',folder:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',spinner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>',"exclamation-triangle":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',"exclamation-circle":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',lightbulb:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>',heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',"user-tie":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="9" y1="11" x2="9" y2="21"/><path d="M6 14l3-3 3 3"/></svg>',user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',"user-astronaut":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="2"/><path d="M12 3v1M8.5 5.5l-.7-.7M5.5 8.5l-.7-.7M18.5 5.5l.7-.7M19.5 8.5l.7-.7"/></svg>',users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',"layer-group":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',"laptop-code":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="20" x2="22" y2="20"/><polyline points="10 7 8 12 10 17"/><polyline points="14 7 16 12 14 17"/></svg>',book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',code:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',"file-alt":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',inbox:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',compress:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>',undo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>'};function I(b,e=""){const t=C[b]||C["info-circle"];return`<i class="icon ${e}">${t}</i>`}class B{static async execCommand(e){return new Promise((t,s)=>{if(typeof mysu<"u"&&typeof mysu.exec=="function"){const a=`exec_cb_${Date.now()}_${Math.floor(Math.random()*1e4)}`;window[a]=function(i,n,o){delete window[a],i!==0?s(new Error(o||`Error ${i}`)):t(n)},mysu.exec(e,"{}",a)}else setTimeout(()=>t(""),100)})}static async getModuleProp(e,t){try{return(await this.execCommand(`grep "^${t}=" "/data/adb/modules/${e}/module.prop" 2>/dev/null | cut -d'=' -f2-`)).trim()||null}catch{return null}}static async updateRootStatus(){}static async getStorageUsage(){try{const t=(await this.execCommand('df -k "/data" 2>/dev/null | tail -1').catch(()=>"")).trim().split(/\s+/);let s=0,a=0,i=0;t.length>=4&&(s=(parseInt(t[1])||0)*1024,a=(parseInt(t[2])||0)*1024,i=(parseInt(t[3])||0)*1024);const n=s>0?Math.round(a/s*100):0;return{used:a,total:s,free:i,percent:n,usedFormatted:this.formatBytes(a),totalFormatted:this.formatBytes(s),freeFormatted:this.formatBytes(i),mounted:!0,exists:!0}}catch{return{used:0,total:0,free:0,percent:0,usedFormatted:"0 B",totalFormatted:"0 B",freeFormatted:"0 B",mounted:!0,exists:!0}}}static async getStealthInfo(){try{const e=await this.execCommand(`${window.CONFIG.BINARY} stealth 2>/dev/null`),t=e.includes("MYSUFS Stealth: ENABLED"),s=e.match(/Version:\s+(\S+)/),a=e.match(/Variant:\s+(\S+)/);return{enabled:t,version:s?s[1]:"N/A",variant:a?a[1]:"Standard"}}catch{return{enabled:!1,version:"N/A",variant:"Standard"}}}static logToFile(e,t="INFO"){if(typeof mysu>"u")return;const a=`[${t.padEnd(5," ")} myoverlayfs::webui] ${e}`.replace(/'/g,"'\\''").replace(/\n/g," ");mysu.exec(`echo '${a}' >> "${CONFIG.LOG_FILE}"`,"{}",()=>{})}static formatBytes(e,t=1){if(!e||e===0)return"0 B";const s=1024,a=["B","KB","MB","GB","TB"],i=Math.floor(Math.log(Math.abs(e))/Math.log(s));return`${parseFloat((e/Math.pow(s,i)).toFixed(t<0?0:t))} ${a[i]}`}static showToast(e,t="info",s=3e3){const a=t==="warning"?"WARN":"INFO",i=e.replace(/<[^>]+>/g,"");this.logToFile(i,a);const n=document.getElementById("toast-container");if(!n)return;const o=document.createElement("div");o.className=`toast toast-${t}`;const c={success:"check-circle",error:"exclamation-circle",warning:"exclamation-triangle",info:"info-circle"}[t]||"info-circle";o.innerHTML=`${I(c)}<span>${e}</span>`,n.appendChild(o),setTimeout(()=>{o.style.animation="toastOut 0.25s cubic-bezier(0.4,0,0.2,1) forwards",setTimeout(()=>o.remove(),250)},s)}static showModal(e,t,s=[]){return new Promise(a=>{document.body.classList.add("modal-open");const i=document.getElementById("modal-container"),n=document.createElement("div");n.className="modal";const o=s.map(r=>({...r,resultString:String(r.result)}));n.innerHTML=`
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">${e}</h3>
                        <button class="modal-close">✕</button>
                    </div>
                    <div class="modal-body">${t}</div>
                    ${o.length?`
                    <div class="modal-footer">
                        ${o.map(r=>`
                            <button class="s-btn ${r.type==="danger"?"danger":r.type==="primary"?"primary":""}"
                                    data-result="${r.resultString}">
                                ${r.text}
                            </button>
                        `).join("")}
                    </div>
                    `:""}
                </div>
            `,i.appendChild(n);let c=!1;const d=r=>{c||(c=!0,n.style.animation="fadeIn 0.2s reverse forwards",setTimeout(()=>{n.remove(),document.body.classList.remove("modal-open"),a(r)},200))};n.querySelector(".modal-close").addEventListener("click",()=>d(null)),n.addEventListener("click",r=>{r.target===n&&d(null)}),n.querySelectorAll(".modal-footer button").forEach(r=>{r.addEventListener("click",p=>{p.stopPropagation();const l=r.dataset.result;d(l==="true"?!0:l==="false"?!1:l==="null"?null:l)})})})}static async confirmAction(e,t,s="Confirm",a="Cancel"){return this.showModal(e,`<div class="confirm-message">${t}</div>`,[{text:a,type:"secondary",result:!1},{text:s,type:"danger",result:!0}])}static async checkRoot(){try{return(await this.execCommand("id")).includes("uid=0")}catch{return!1}}static async checkKernelSU(){try{const e=await this.execCommand('mysud -V 2>/dev/null || echo "N/A"');return e.trim()!=="N/A"&&e.trim()!==""}catch{return!1}}static async copyToClipboard(e){try{return await navigator.clipboard.writeText(e),this.showToast("Copied to clipboard","success"),!0}catch{const t=Object.assign(document.createElement("textarea"),{value:e,className:"hidden-textarea"});document.body.appendChild(t),t.select(),t.setSelectionRange(0,99999);try{const s=document.execCommand("copy");return document.body.removeChild(t),this.showToast(s?"Copied":"Copy failed",s?"success":"error"),s}catch{return document.body.removeChild(t),this.showToast("Copy failed","error"),!1}}}}class N{constructor(e){this.app=e,this.data={deviceInfo:{model:"—",android:"—"},mysuVersion:"—",stealth:{enabled:!1,version:"N/A",variant:"Standard"},moduleStats:{total:0,active:0,inactive:0,updating:0,uninstalling:0},partitionData:[],storageUsage:{total:0,used:0,free:0,percent:0,mounted:!0,exists:!0,freeFormatted:"0 B"}}}async render(){return await this.loadData(),this.buildHTML()}buildHTML(){const{storageUsage:e,moduleStats:t,deviceInfo:s,mysuVersion:a,partitionData:i,stealth:n}=this.data,o=e.total||1,c=e.free||0,d=2*Math.PI*58,r={system:{hex:"#f87171",var:"--red",filter:"glow-red"},product:{hex:"#22d3ee",var:"--cyan",filter:"glow-cyan"},vendor:{hex:"#34d399",var:"--green",filter:"glow-green"},system_ext:{hex:"#fbbf24",var:"--yellow",filter:"glow-yellow"},odm:{hex:"#a78bfa",var:"--violet",filter:"glow-violet"},oem:{hex:"#fb923c",var:"--orange",filter:"glow-orange"}};let p="",l="",v="",u=0;for(const f of i){let g=f.bytes/o*100;g>0&&g<.1&&(g=.1),g=parseFloat(g.toFixed(1));const L=`${g/100*d} ${d}`,S=u;u-=g/100*d;const m=r[f.name]||{hex:"#ffffff",var:"--text",filter:""},M=f.name.charAt(0).toUpperCase()+f.name.slice(1);p+=`<circle cx="80" cy="80" r="58" class="donut-seg" stroke="${m.hex}" stroke-dasharray="${L}" stroke-dashoffset="${S}" ${m.filter?`filter="url(#${m.filter})"`:""} />`,l+=`
                <div class="legend-item">
                    <div class="legend-dot" style="background:${m.hex};color:${m.hex};box-shadow:0 0 8px currentColor;"></div>
                    <div class="legend-info">
                        <div class="legend-name">${M}</div>
                        <div class="legend-pct" style="color:var(${m.var})">${g}% · ${this.app.utils.formatBytes(f.bytes)}</div>
                    </div>
                </div>`,v+=`
                <div class="partition-row">
                    <div class="partition-icon" style="background:var(${m.var}-dim);border-color:rgba(255,255,255,0.1);color:var(${m.var});">${f.name.substring(0,3)}</div>
                    <div class="partition-info">
                        <div class="partition-name">${M}</div>
                        <div class="partition-sub">Overlay payload</div>
                        <div class="partition-bar">
                            <div class="partition-bar-fill" style="width:${g}%;background:linear-gradient(90deg,var(${m.var}),transparent);"></div>
                        </div>
                    </div>
                    <div class="partition-right">
                        <div class="partition-pct" style="color:var(${m.var})">${g}%</div>
                        <div class="partition-bytes">${this.app.utils.formatBytes(f.bytes)}</div>
                    </div>
                </div>`}let h=c/o*100;h>0&&h<.1&&(h=.1),h=parseFloat(h.toFixed(1));const $=`${h/100*d} ${d}`;p+=`<circle cx="80" cy="80" r="58" class="donut-seg part-free" stroke-dasharray="${$}" stroke-dashoffset="${u}"/>`;const w=n.enabled?"ok":"warn",x=n.enabled?"Protected":"Standard",y=[];return y.push(`<span class="text-green">${t.active} Active</span>`),t.inactive>0&&y.push(`<span class="text-red">${t.inactive} Disabled</span>`),t.updating>0&&y.push(`<span class="text-yellow">${t.updating} Update</span>`),t.uninstalling>0&&y.push(`<span class="text-red-dim">${t.uninstalling} Uninstall</span>`),`
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
                            ${p}
                        </svg>
                        <div class="donut-center">
                            <div class="donut-center-pct">Storage</div>
                            <div class="donut-center-label">${this.app.utils.formatBytes(o)}</div>
                        </div>
                    </div>
                    <div class="donut-legend">
                        ${l}
                        <div class="legend-item">
                            <div class="legend-dot part-free"></div>
                            <div class="legend-info">
                                <div class="legend-name">Free (/data)</div>
                                <div class="legend-pct part-free-text">${h}% · ${e.freeFormatted}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="partition-rows">
                    ${v}
                    <div class="partition-row">
                        <div class="partition-icon part-free">DAT</div>
                        <div class="partition-info">
                            <div class="partition-name">Available Space</div>
                            <div class="partition-sub">Direct module storage in /data</div>
                        </div>
                        <div class="partition-right">
                            <div class="partition-pct part-free-text">${h}%</div>
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
                        ${y.join("<span>·</span>")}
                    </div>
                </div>
                <div class="scw-arrow">
                    <svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
                </div>
            </div>

            <div class="info-pair">
                <div class="info-glass info-full">
                    <div class="info-glass-header">
                        <div class="info-glass-title">MYSUFS Stealth</div>
                        <span class="info-glass-tag ${w}">${x}</span>
                    </div>
                    <div class="info-rows-grid">
                        <div class="info-row"><span class="k">Kernel VFS</span><span class="v ${w}">${n.enabled?"Cloaked":"Standard"}</span></div>
                        <div class="info-row"><span class="k">Version</span><span class="v ok">${n.version}</span></div>
                        <div class="info-row"><span class="k">Variant</span><span class="v">${n.variant}</span></div>
                    </div>
                </div>

                <div class="info-glass info-full">
                    <div class="info-glass-header">
                        <div class="info-glass-title">Device</div>
                        <span class="info-glass-tag">${a}</span>
                    </div>
                    <div class="info-rows-grid">
                        <div class="info-row"><span class="k">Model</span><span class="v">${s.model}</span></div>
                        <div class="info-row"><span class="k">Android</span><span class="v">${s.android}</span></div>
                        <div class="info-row"><span class="k">Root Engine</span><span class="v ok">MySU Active</span></div>
                    </div>
                </div>
            </div>
        </div>
        `}async loadData(){try{const e=this.app.utils,s=await e.execCommand('getprop ro.product.model; echo "|||"; getprop ro.build.version.release; echo "|||"; mysud -V 2>/dev/null || echo "—"'),[a,i,n]=s.split("|||").map(l=>l.trim()),[o,c,d]=await Promise.all([this.getModules(),e.getStealthInfo(),e.getStorageUsage()]);this.data.deviceInfo={model:a||"—",android:i||"—"},this.data.mysuVersion=n||"—",this.data.stealth=c,this.data.storageUsage=d,this.data.moduleStats={total:o.length,active:o.filter(l=>l.enabled&&!l.removePending).length,inactive:o.filter(l=>!l.enabled&&!l.removePending).length,updating:o.filter(l=>l.hasUpdate).length,uninstalling:o.filter(l=>l.removePending).length},this.data.partitionData=[];const r=`
                for p in system vendor product system_ext odm oem; do
                    sz=0
                    for d in "${CONFIG.MODULES_DIR}"/*/"$p"; do
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
            `,p=await e.execCommand(r);p&&p.trim().split(`
`).forEach(l=>{const v=l.split("|");if(v.length===2){const u=(parseInt(v[1].trim())||0)*1024;u>0&&this.data.partitionData.push({name:v[0].trim(),bytes:u})}})}catch{}}async getModules(){try{const e=this.app.utils,t=`
                sizes=$(du -sk "${CONFIG.MODULES_DIR}"/* 2>/dev/null)
                ls -1 "${CONFIG.MODULES_DIR}" 2>/dev/null | grep -v 'lost+found' | grep -v '_update$' | while read -r id; do
                    [ -z "$id" ] && continue
                    p="${CONFIG.MODULES_DIR}/$id"
                    [ ! -d "$p" ] && continue
                    name=$(grep "^name=" "$p/module.prop" 2>/dev/null | cut -d'=' -f2-)
                    [ -z "$name" ] && name=""
                    exists=1
                    upd=$([ -f "$p/update" ] && echo "1" || echo "0")
                    rmv=$([ -f "$p/remove" ] && echo "1" || echo "0")
                    dis=$([ -f "$p/disable" ] || [ -f "$p/.disable" ] && echo "1" || echo "0")
                    size=$(echo "$sizes" | grep -w "$p" | awk '{print $1}')
                    [ -z "$size" ] && size=0
                    echo "$id|__NAME__|$name|__STAT__|$exists|$upd|$rmv|$dis|$size"
                done
            `,s=await e.execCommand(t);if(!s)return[];const a=[],i=s.trim().split(`
`);for(const n of i){if(!n.includes("|__NAME__|"))continue;const o=n.split("|__STAT__|"),[c,d]=o[0].split("|__NAME__|"),[r,p,l,v,u]=o[1].split("|"),h=r==="1",$=p==="1",w=l==="1",x=v==="1",y=d.trim()||c,f=(parseInt(u)||0)*1024,g=h?!x:!1;a.push({id:c,name:y,enabled:g,hasUpdate:$,removePending:w,sizeFormatted:e.formatBytes(f)})}return a}catch{return[]}}bindEvents(){const e=document.getElementById("btn-view-modules");e&&e.addEventListener("click",()=>this.app.navigateTo("modules"))}}class T{constructor(e){this.app=e,this.modules=[],this.searchTerm="",this.loading=!1}async render(){return await this.loadModules(),this.buildHTML()}buildHTML(){const e=this.filterModules(),t=this.modules,s=t.filter(i=>i.enabled&&!i.removePending).length,a=[`<span>${t.length} total</span>`,`<span class="text-green">${s} active</span>`].join("<span>·</span>");return`
        <div class="modules-page">
            <div class="search-bar mb-4">
                ${this.app.icon("search")}
                <input type="text" id="module-search" placeholder="Search modules..." value="${this.searchTerm}" autocomplete="off" spellcheck="false">
            </div>
            <div id="modules-content">
                ${this.renderList(e)}
            </div>
            <div class="modules-footer" id="modules-footer">
                ${a}
            </div>
        </div>
        `}renderList(e){return e.length===0?`<div class="empty-state">${this.app.icon("inbox")}<h3>No modules</h3><p>${this.searchTerm?"No modules match.":"No modules found."}</p></div>`:e.map((t,s)=>this.renderSlab(t,s)).join("")}renderSlab(e,t){const s=e.name||e.id;let a="active",i="",n="check-circle";e.removePending?(a="uninstalling",n="trash",i='<span class="slab-badge uninstalling">Removing</span>'):e.hasUpdate?(a="updating",n="sync-alt",i=`<span class="slab-badge updating">${this.app.icon("sync-alt")} Update</span>`):e.enabled?i='<span class="slab-badge active"><span class="live-dot"></span> On</span>':(a="inactive",n="pause-circle",i='<span class="slab-badge inactive">Off</span>');const o=[];e.id!==s&&o.push(`<span class="slab-tag">${this.app.icon("code")} ${e.id}</span>`),e.activeFiles!==void 0&&o.push(`<span class="slab-tag">${this.app.icon("file-alt")} ${e.activeFiles} Files</span>`),e.conflictsLost&&e.conflictsLost.length>0&&o.push(`<span class="slab-tag text-red tag-danger">${this.app.icon("exclamation-circle")} ${e.conflictsLost.length} Ignored</span>`),e.conflictsWon&&e.conflictsWon.length>0&&o.push(`<span class="slab-tag text-yellow tag-warning">${this.app.icon("exclamation-triangle")} ${e.conflictsWon.length} Overwrites</span>`),e.existsInModulesDir||o.push(`<span class="slab-tag text-red">${this.app.icon("exclamation-triangle")} Not Linked</span>`);let c=e.removePending?`<button class="slab-btn success restore-module" data-module="${e.id}">${this.app.icon("undo")} Restore</button>`:e.hasUpdate?`<button class="slab-btn" disabled>${this.app.icon("ban")} Update Pending</button>`:`<button class="slab-btn info-module" data-module="${e.id}">${this.app.icon("info-circle")} Info</button>
             <button class="slab-btn danger uninstall-module" data-module="${e.id}">${this.app.icon("trash")} Delete</button>
             <button class="slab-btn ${e.enabled?"warning":"success"} toggle-module" data-module="${e.id}" data-action="${e.enabled?"disable":"enable"}">${this.app.icon(e.enabled?"pause":"play")} ${e.enabled?"Disable":"Enable"}</button>`;return`
            <div class="module-slab ${a}" data-module="${e.id}" style="animation-delay:${t%10*40}ms">
                <div class="slab-top">
                    <div class="slab-avatar">${this.app.icon(n)}</div>
                    <div class="slab-info"><div class="slab-name">${s}</div>${o.length?`<div class="slab-meta">${o.join("")}</div>`:""}</div>
                    ${i}
                </div>
                <div class="slab-actions">${c}</div>
            </div>`}async loadModules(){if(!this.loading){this.loading=!0;try{const e=`sizes=$(du -sk "${CONFIG.MODULES_DIR}"/* 2>/dev/null); ls -1 "${CONFIG.MODULES_DIR}" 2>/dev/null | grep -v 'lost+found' | grep -v '_update$' | while read -r id; do [ -z "$id" ] && continue; p="${CONFIG.MODULES_DIR}/$id"; [ ! -d "$p" ] && continue; name=$(grep "^name=" "$p/module.prop" 2>/dev/null | cut -d'=' -f2-); upd=$([ -f "$p/update" ] && echo "1" || echo "0"); rmv=$([ -f "$p/remove" ] && echo "1" || echo "0"); dis=$([ -f "$p/disable" ] || [ -f "$p/.disable" ] && echo "1" || echo "0"); size=$(echo "$sizes" | grep -w "$p" | awk '{print $1}'); [ -z "$size" ] && size=0; echo "$id|__NAME__|$name|__STAT__|1|$upd|$rmv|$dis|$size"; done`,t=await utils.execCommand(e);if(!t)return[];const s=[],a=t.trim().split(`
`);for(const i of a){if(!i.includes("|__NAME__|"))continue;const n=i.split("|__STAT__|"),[o,c]=n[0].split("|__NAME__|"),[d,r,p,l,v]=n[1].split("|"),u=d==="1",h=r==="1",$=p==="1",w=l==="1",x=c.trim()||o,y=(parseInt(v)||0)*1024,f=u?!w:!1;s.push({id:o,name:x,enabled:f,hasUpdate:h,removePending:$,existsInModulesDir:u,sizeFormatted:utils.formatBytes(y),conflictsLost:[],conflictsWon:[],activeFiles:void 0,partitions:[]})}s.sort((i,n)=>(i.name||i.id).localeCompare(n.name||n.id));try{const i=await utils.execCommand(`"${CONFIG.BINARY}" inspect -r 2>/dev/null`),n=i.indexOf("{"),o=i.lastIndexOf("}");if(n!==-1&&o!==-1){const c=i.substring(n,o+1),d=JSON.parse(c);if(d.status==="success")for(const r of s){const p=(d.modules||[]).find(l=>l.id===r.id);if(p&&(r.activeFiles=p.files,r.partitions=p.partitions||[]),d.conflicts)for(const l of d.conflicts)l.ignored&&l.ignored.includes(r.id)&&r.conflictsLost.push(l),l.winner===r.id&&r.conflictsWon.push(l)}}}catch{}this.modules=s}catch{this.modules=[]}finally{this.loading=!1}}}filterModules(){let e=this.modules;if(this.searchTerm){const t=this.searchTerm.toLowerCase();e=e.filter(s=>s.id.toLowerCase().includes(t)||s.name&&s.name.toLowerCase().includes(t))}return e}async bindEvents(){var e;(e=document.getElementById("module-search"))==null||e.addEventListener("input",t=>{this.searchTerm=t.target.value,this.refreshContent()}),this.bindModuleActions()}bindModuleActions(){const e=document.getElementById("modules-content");e&&(e.onclick=async t=>{const s=t.target.closest(".toggle-module"),a=t.target.closest(".uninstall-module"),i=t.target.closest(".restore-module"),n=t.target.closest(".info-module");if(s)await this.toggleModule(s.dataset.module,s.dataset.action==="enable");else if(a){const o=a.dataset.module,c=this.modules.find(d=>d.id===o);await this.app.utils.confirmAction("Uninstall",`Remove <strong>${(c==null?void 0:c.name)||o}</strong> on next reboot?`,"Uninstall")&&await this.toggleUninstall(o,!0)}else i?await this.toggleUninstall(i.dataset.module,!1):n&&await this.showModuleInfo(this.modules.find(o=>o.id===n.dataset.module))})}async showModuleInfo(e){var a,i,n,o,c;if(!e)return;let t=`<div class="module-info-modal">
            <div class="info-stats-card">
                <div class="info-stat"><span class="stat-label">Active Files</span><span class="stat-value text-blue">${e.activeFiles!==void 0?e.activeFiles:"—"}</span></div>
                <div class="info-stat"><span class="stat-label">Mounted In</span><span class="stat-value mounts-list">${(a=e.partitions)!=null&&a.length?[...new Set(e.partitions)].map(d=>`<span class="mount-tag">${d}</span>`).join(""):'<span class="text-3">None</span>'}</span></div>
            </div>`;const s=(d,r)=>{const p=new Set;return d.map(l=>{const v=l.file.split("/").pop(),u=`${v}-${r?l.winner:l.ignored.join(",")}`;return p.has(u)?"":(p.add(u),`<div class="conflict-item clickable-conflict" onclick="app.pages.modules.showPathDetails('${l.file}', '${l.winner}', '${(l.ignored||[]).join(",")}')">
                    <div class="conflict-icon">${this.app.icon("file-alt")}</div>
                    <div class="conflict-details">
                        <div class="conflict-file">${v}</div>
                        <div class="conflict-reason">${r?`Lost to <span>${l.winner}</span>`:`Overrides <span>${l.ignored.join(", ")}</span>`}</div>
                    </div>
                    <div class="conflict-arrow">${this.app.icon("play")}</div>
                </div>`)}).join("")};(i=e.conflictsLost)!=null&&i.length&&(t+=`<div class="conflict-section bad"><div class="conflict-header">${this.app.icon("exclamation-circle")} Ignored by Mount</div><div class="conflict-list">${s(e.conflictsLost,!0)}</div></div>`),(n=e.conflictsWon)!=null&&n.length&&(t+=`<div class="conflict-section warn"><div class="conflict-header">${this.app.icon("exclamation-triangle")} Active Overwrites</div><div class="conflict-list">${s(e.conflictsWon,!1)}</div></div>`),!((o=e.conflictsLost)!=null&&o.length)&&!((c=e.conflictsWon)!=null&&c.length)&&(t+=`<div class="empty-state clean-mount-state">
                ${this.app.icon("check-circle")}
                <h3 class="text-green mb-4">Clean Mount</h3>
                <p>No file conflicts detected.</p>
            </div>`),t+="</div>",await this.app.utils.showModal(`${e.name||e.id}`,t,[{text:"Close",type:"secondary",result:"close"}])}async showPathDetails(e,t,s){const a=s.split(","),i=`
        <div class="path-details-modal">
            <div class="path-group">
                <div class="path-header text-green">${this.app.icon("check-circle")} Running (Active)</div>
                <div class="path-box-full"><strong>Module:</strong> ${t}<br><strong>Path:</strong> /${e}</div>
            </div>
            <div class="path-group">
                <div class="path-header text-red">${this.app.icon("ban")} Ignored (Shadowed)</div>
                ${a.map(n=>`<div class="path-box-full"><strong>Module:</strong> ${n}<br><strong>Path:</strong> /${e}</div>`).join("")}
            </div>
        </div>`;await this.app.utils.showModal("Path Conflict Details",i,[{text:"Done",type:"primary",result:"ok"}])}refreshContent(){const e=document.getElementById("modules-content");e&&(e.innerHTML=this.renderList(this.filterModules()))}async toggleModule(e,t){try{const s=this.modules.find(i=>i.id===e),a=(s==null?void 0:s.name)||e;await this.app.utils.execCommand(t?`rm -f "${CONFIG.MODULES_DIR}/${e}/disable"`:`touch "${CONFIG.MODULES_DIR}/${e}/disable"`),this.app.utils.showToast(`Module '${a}' ${t?"enabled":"disabled"}`,t?"success":"warning"),await this.update()}catch(s){this.app.utils.logToFile(`Toggle failure: ${s.message}`,"ERROR"),this.app.utils.showToast(s.message,"error")}}async toggleUninstall(e,t){try{const s=this.modules.find(i=>i.id===e),a=(s==null?void 0:s.name)||e;await this.app.utils.execCommand(t?`touch "${CONFIG.MODULES_DIR}/${e}/remove"`:`rm -f "${CONFIG.MODULES_DIR}/${e}/remove"`),this.app.utils.showToast(t?`'${a}' queued for removal`:`'${a}' restored`,t?"error":"success"),await this.update()}catch(s){this.app.utils.logToFile(`Removal toggle failure: ${s.message}`,"ERROR"),this.app.utils.showToast(s.message,"error")}}async update(){await this.loadModules(),this.refreshContent()}}class E{constructor(e){this.app=e,this.data={stealth:{enabled:!1,version:"N/A",variant:"Standard"},storageUsage:"—",moduleId:"meta-myoverlayfs",removePending:!1}}async render(){return await this.loadData(),this.buildHTML()}buildHTML(){const{stealth:e,storageUsage:t,removePending:s}=this.data,a=e.enabled?"text-green":"text-yellow",i=e.enabled?"MYSUFS Engaged":"Standard Fallback";return`
        <div class="settings-page">
            <div class="s-plane">
                <div class="s-plane-head">
                    <div class="s-plane-icon icon-blue">
                        ${this.app.icon("sliders")}
                    </div>
                    <div class="s-plane-title">Engine Configuration</div>
                </div>
                <div class="s-row">
                    <div class="s-row-icon icon-green">
                        ${this.app.icon("shield")}
                    </div>
                    <div class="s-row-body">
                        <div class="s-row-label">Stealth Subsystem</div>
                        <div class="s-row-sub">Ring-0 VFS Interception & Stat Spoofing</div>
                    </div>
                    <span class="s-row-value ${a}" id="settings-stealth-status">${i}</span>
                </div>
                <div class="s-row">
                    <div class="s-row-icon icon-violet">
                        ${this.app.icon("layer-group")}
                    </div>
                    <div class="s-row-body">
                        <div class="s-row-label">Architecture</div>
                        <div class="s-row-sub">Single-directory native OverlayFS</div>
                    </div>
                    <span class="s-row-value">Direct (/data)</span>
                </div>
                <div class="s-row border-none">
                    <div class="s-row-icon icon-cyan">
                        ${this.app.icon("hdd")}
                    </div>
                    <div class="s-row-body">
                        <div class="s-row-label">Storage Usage</div>
                        <div class="s-row-sub">Used / Total (/data partition)</div>
                    </div>
                    <span class="s-row-value" id="settings-usage">${t}</span>
                </div>
            </div>

            <div class="s-plane">
                <div class="s-plane-head">
                    <div class="s-plane-icon icon-green">
                        ${this.app.icon("terminal")}
                    </div>
                    <div class="s-plane-title">Engine Tools</div>
                </div>
                <div class="s-row-static border-none pb-4">
                    <div class="s-row-body">
                        <div class="s-row-label-desc">Verify Ring-0 stealth status or re-evaluate overlay mounts.</div>
                    </div>
                </div>
                <div class="s-actions pt-6">
                    <button class="s-btn primary full" id="verify-stealth">
                        ${this.app.icon("shield")} Verify Stealth Status
                    </button>
                    <button class="s-btn full" id="remount-overlays">
                        ${this.app.icon("sync")} Remount Overlays
                    </button>
                </div>
            </div>

            <div class="s-plane">
                <div class="s-plane-head">
                    <div class="s-plane-icon icon-yellow">
                        ${this.app.icon("file-text")}
                    </div>
                    <div class="s-plane-title">Log File</div>
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
                ${[{label:"Modules Directory",path:CONFIG.MODULES_DIR},{label:"Log File",path:CONFIG.LOG_FILE},{label:"Engine Binary",path:CONFIG.BINARY}].map(n=>`
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

            <div class="s-plane">
                <div class="s-plane-head">
                    <div class="s-plane-icon icon-red">
                        ${this.app.icon("trash")}
                    </div>
                    <div class="s-plane-title">Metamodule Management</div>
                </div>
                <div class="s-row-static border-none pb-4">
                    <div class="s-row-body">
                        <div class="s-row-label-desc">
                            ${s?"MyOverlayFS is scheduled for removal on next reboot.":"Queue MyOverlayFS for removal on next reboot."}
                        </div>
                    </div>
                </div>
                <div class="s-actions pt-6">
                    <button class="s-btn ${s?"primary":"danger"} full" id="uninstall-module">
                        ${this.app.icon(s?"undo":"trash")} ${s?"Cancel Removal":"Uninstall MyOverlayFS"}
                    </button>
                </div>
            </div>
        </div>
        `}async getModuleId(){let e="meta-myoverlayfs";try{const t=await this.app.utils.execCommand(`${CONFIG.BINARY} inspect -r 2>/dev/null`);if(t){const s=JSON.parse(t);s.id&&(e=s.id)}}catch{}return e}async loadData(){try{const e=this.app.utils,[t,s,a]=await Promise.all([e.getStorageUsage(),e.getStealthInfo(),this.getModuleId()]),i=`${CONFIG.MODULES_DIR}/${a}/remove`,n=await e.execCommand(`[ -f "${i}" ] && echo "1"`).then(()=>!0).catch(()=>!1);this.data={stealth:s,storageUsage:`${t.usedFormatted} / ${t.totalFormatted} (${t.percent}%)`,moduleId:a,removePending:n}}catch{this.data={stealth:{enabled:!1,version:"N/A",variant:"Standard"},storageUsage:"Error",moduleId:"meta-myoverlayfs",removePending:!1}}}escapeHTML(e){return e.replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t])}bindEvents(){const e=document.getElementById("page-content");e&&e.addEventListener("click",async t=>{const s=t.target.closest(".path-copy");if(s){const d=s.getAttribute("data-copy");if(d)try{await navigator.clipboard.writeText(d),this.app.utils.showToast("Path copied to clipboard","success")}catch{this.app.utils.showToast("Failed to copy path","error")}return}if(t.target.closest("#uninstall-module")){await this.handleUninstallToggle();return}if(t.target.closest("#verify-stealth")){await this.verifyStealth();return}const n=t.target.closest("#remount-overlays");if(n){await this.remountOverlays(n);return}if(t.target.closest("#view-logs")){await this.viewLogs();return}t.target.closest("#clear-logs")&&await this.clearLogs()})}async handleUninstallToggle(){const e=`${CONFIG.MODULES_DIR}/${this.data.moduleId}/remove`;if(this.data.removePending)try{await this.app.utils.execCommand(`rm -f "${e}"`),this.app.utils.showToast("Uninstallation canceled","info"),await this.update()}catch(t){this.app.utils.showToast(`Failed: ${t.message}`,"error")}else{if(!await this.app.utils.confirmAction("Uninstall MyOverlayFS","Are you sure you want to uninstall MyOverlayFS? Overlay modifications will be disabled on next reboot.<br><br><strong>Reboot required</strong> to finalize.","Uninstall"))return;try{await this.app.utils.execCommand(`touch "${e}"`),this.app.utils.showToast("MyOverlayFS queued for removal on reboot","success"),await this.update()}catch(s){this.app.utils.showToast(`Failed: ${s.message}`,"error")}}}async verifyStealth(){try{const e=await this.app.utils.execCommand(`${CONFIG.BINARY} stealth 2>&1 || echo "Command failed"`);await this.app.utils.showModal("MYSUFS Stealth Status",`<div class="log-content-body"><pre>${this.escapeHTML(e)}</pre></div>`,[{label:"Close",class:"primary",onClick:()=>{}}])}catch(e){this.app.utils.showToast(`Check failed: ${e.message}`,"error")}}async remountOverlays(e){const t=e.innerHTML;e.innerHTML=`${this.app.icon("spinner","fa-spin")} Remounting...`,e.disabled=!0;try{await this.app.utils.execCommand(`${CONFIG.BINARY} 2>&1`),this.app.utils.showToast("Overlays remounted successfully","success"),await this.update()}catch(s){this.app.utils.showToast(`Remount failed: ${s.message}`,"error")}finally{e.innerHTML=t,e.disabled=!1}}async viewLogs(){try{const e=await this.app.utils.execCommand(`cat "${CONFIG.LOG_FILE}" 2>/dev/null || echo "No logs available"`),t=this.formatLogs(e);this.app.utils.showModal("System Logs",`
                <div class="log-viewer-modal">
                    <div class="log-controls">
                        <button class="s-btn" id="refresh-logs">${this.app.icon("sync")} Refresh</button>
                        <button class="s-btn" id="copy-logs">${this.app.icon("copy")} Copy</button>
                    </div>
                    <div class="log-content-body" id="log-body">
                        ${t}
                    </div>
                </div>
                `,[{label:"Close",class:"primary",onClick:()=>{}}]),setTimeout(()=>{const s=document.querySelector(".modal");if(!s)return;const a=s.querySelector("#refresh-logs");a&&a.addEventListener("click",async()=>{const n=await this.app.utils.execCommand(`cat "${CONFIG.LOG_FILE}" 2>/dev/null || echo "No logs available"`),o=s.querySelector("#log-body");o&&(o.innerHTML=this.formatLogs(n)),this.app.utils.showToast("Logs refreshed","info")});const i=s.querySelector("#copy-logs");i&&i.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(e),this.app.utils.showToast("Logs copied to clipboard","success")}catch{this.app.utils.showToast("Failed to copy logs","error")}})},50)}catch(e){this.app.utils.showToast(`Failed to read logs: ${e.message}`,"error")}}async clearLogs(){if(await this.app.utils.confirmAction("Clear Logs","Are you sure you want to truncate the system log file?","Clear"))try{await this.app.utils.execCommand(`> "${CONFIG.LOG_FILE}"`),this.app.utils.showToast("Logs cleared","success")}catch(t){this.app.utils.showToast(`Failed to clear logs: ${t.message}`,"error")}}formatLogs(e){return e.trim()?e.split(`
`).map(t=>{if(!t.trim())return"";let s="log-info";return t.includes("[ERROR")||t.includes("ERROR:")?s="log-error":t.includes("[WARN")||t.includes("WARN:")?s="log-warn":(t.includes("[DEBUG")||t.includes("DEBUG:"))&&(s="log-debug"),`<div class="log-line ${s}">${this.escapeHTML(t)}</div>`}).join(""):'<div class="log-empty">No logs recorded yet.</div>'}async update(){const e=await this.render(),t=document.getElementById("page-content");t&&(t.innerHTML=e)}}class O{constructor(e){this.app=e,this.moduleInfo=null,this.bannerBase64="",this.maintainer={name:"AshBorn",role:"Fork Maintainer (WebUI & Core)",handle:"@RipperHybrid",icon:"user-astronaut",highlight:!0},this.contributors=[{name:"weishu / tiann",role:"KernelSU Creator & Core",icon:"user-tie"},{name:"Ylarod",role:"Magic Mount",icon:"user"},{name:"Wang Han",role:"GitHub: @aviraxp",icon:"user"},{name:"7a72",role:"GitHub: @7a72",icon:"user"}]}async render(){this.moduleInfo=this.getModuleInfo();const e=this.moduleInfo.id&&this.moduleInfo.id!=="—"?this.moduleInfo.id:"myoverlayfs";try{const t=await this.app.utils.execCommand(`base64 "${CONFIG.MODULES_DIR}/${e}/banner" 2>/dev/null`);if(t){const s=t.replace(/\s+/g,"");s.length>100&&(this.bannerBase64=`data:image/png;base64,${s}`)}}catch{}return this.buildHTML()}buildHTML(){const e=this.moduleInfo;return`
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
        `}getModuleInfo(){try{if(typeof mysu<"u"&&typeof mysu.moduleInfo=="function"){const e=mysu.moduleInfo();if(e)return typeof e=="string"?JSON.parse(e):e}}catch{}return{id:"—",moduleDir:"—",name:"—",version:"—",versionCode:"—",author:"—",metamodule:"0",enabled:"false"}}async bindEvents(){}}class k{constructor(){this.utils=B,this.icon=I,this.currentPage=null,this.isLoading=!1,this.pages={dashboard:null,modules:null,settings:null,about:null},this.init()}async init(){this.renderNav(),this.bindGlobalEvents(),this.bindGlobalSwipe(),await this.showPage("dashboard"),setTimeout(()=>this.updateIslandStatus(),150)}async updateIslandStatus(){const e=document.getElementById("island-status"),t=document.getElementById("island-status-text");if(!(!e||!t))try{const s=await this.utils.execCommand(`mountpoint -q "${CONFIG.MNT_DIR}" && echo "1"`).then(()=>!0).catch(()=>!1),a=await this.utils.checkRoot();s?(e.className="island-status",t.textContent="Mounted"):a?(e.className="island-status warn",t.textContent="Unmounted"):(e.className="island-status err",t.textContent="No Root")}catch{e.className="island-status err",t.textContent="Error"}}bindGlobalEvents(){const e=document.getElementById("global-refresh-btn");e&&e.addEventListener("click",async()=>{e.classList.add("spinning"),e.disabled=!0;try{await this.refreshCurrentPage(),await this.updateIslandStatus(),this.utils.showToast("Refreshed global webUI","success",1500)}catch{this.utils.showToast("Refresh failed","error")}finally{e.classList.remove("spinning"),e.disabled=!1}})}bindGlobalSwipe(){const e=document.getElementById("page-content");if(!e)return;let t=0,s=0,a=!1;e.addEventListener("touchstart",i=>{t=i.changedTouches[0].screenX,s=i.changedTouches[0].screenY,a=!1},{passive:!0}),e.addEventListener("touchmove",i=>{if(a)return;const n=Math.abs(i.changedTouches[0].screenX-t);Math.abs(i.changedTouches[0].screenY-s)>n+10&&(a=!0)},{passive:!0}),e.addEventListener("touchend",i=>{if(a)return;const n=i.changedTouches[0].screenX-t,o=i.changedTouches[0].screenY-s;if(Math.abs(n)<50||Math.abs(o)>Math.abs(n)*.6)return;const c=["dashboard","modules","settings","about"],d=c.indexOf(this.currentPage);if(d===-1)return;let r=d;n<0&&d<c.length-1?r=d+1:n>0&&d>0&&(r=d-1),r!==d&&this.showPage(c[r])},{passive:!0})}async refreshCurrentPage(){if(this.currentPage&&this.pages[this.currentPage]){const e=this.pages[this.currentPage];if(typeof e.update=="function")await e.update();else if(typeof e.render=="function"){const t=document.getElementById("page-content");t.innerHTML=await e.render(),typeof e.bindEvents=="function"&&await e.bindEvents()}}}renderNav(){const e=document.getElementById("bottom-nav");if(!e)return;const t=[{id:"dashboard",label:"Dash",iconName:"tachometer-alt"},{id:"modules",label:"Modules",iconName:"cubes"},{id:"settings",label:"Settings",iconName:"sliders-h"},{id:"about",label:"About",iconName:"info-circle"}];e.innerHTML=t.map(s=>`
            <button class="nav-item ${this.currentPage===s.id?"active":""}" data-page="${s.id}">
                ${this.icon(s.iconName)}
                <span>${s.label}</span>
            </button>
        `).join(""),e.querySelectorAll(".nav-item").forEach(s=>{s.addEventListener("click",a=>{const i=a.currentTarget.dataset.page;this.currentPage!==i&&this.showPage(i)})})}async showPage(e,t={}){if(this.isLoading)return;this.isLoading=!0,this.currentPage=e,this.renderNav(),document.body.className=`theme-${e}`,window.scrollTo({top:0,left:0,behavior:"instant"});const s=document.getElementById("page-content");s.innerHTML='<div class="spinner"></div>';try{let a="";e==="dashboard"?(this.pages.dashboard=new N(this),a=await this.pages.dashboard.render(),s.innerHTML=a,await this.pages.dashboard.bindEvents()):e==="modules"?(this.pages.modules=new T(this),a=await this.pages.modules.render(),s.innerHTML=a,await this.pages.modules.bindEvents()):e==="settings"?(this.pages.settings=new E(this),a=await this.pages.settings.render(),s.innerHTML=a,await this.pages.settings.bindEvents()):e==="about"&&(this.pages.about=new O(this),a=await this.pages.about.render(),s.innerHTML=a,await this.pages.about.bindEvents())}catch(a){s.innerHTML=`
                <div class="empty-state">
                    ${this.icon("exclamation-triangle")}
                    <h3>Error Loading Page</h3>
                    <p>${a.message}</p>
                </div>
            `}finally{this.isLoading=!1}}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{window.app=new k}):window.app=new k;
