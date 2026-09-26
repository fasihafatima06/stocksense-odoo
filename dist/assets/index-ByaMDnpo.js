(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=o(a);fetch(a.href,n)}})();async function P(){throw new Error("Firebase client configuration is missing. Add VITE_FIREBASE_* values to .env, or use dev-mode login.")}async function Z(t,e){const o=await P();return o.sdk.signInWithEmailAndPassword(o.instance,t,e)}async function J(t,e,o){const s=await P(),a=await s.sdk.createUserWithEmailAndPassword(s.instance,e,o);return await s.sdk.updateProfile(a.user,{displayName:t}),a}const G=t=>t.getIdToken(),k=[{id:"wh-1",name:"Main Warehouse",code:"MW",address:"123 Industrial Park, Sector 5",active:!0},{id:"wh-2",name:"East Distribution Center",code:"EDC",address:"456 Logistics Ave, Zone B",active:!0}],I=[{id:"loc-1",warehouse_id:"wh-1",warehouse:"Main Warehouse",name:"Rack A",code:"MW-RA",location_type:"INTERNAL"},{id:"loc-2",warehouse_id:"wh-1",warehouse:"Main Warehouse",name:"Rack B",code:"MW-RB",location_type:"INTERNAL"},{id:"loc-3",warehouse_id:"wh-1",warehouse:"Main Warehouse",name:"Receiving Bay",code:"MW-RCV",location_type:"RECEIVING"},{id:"loc-4",warehouse_id:"wh-2",warehouse:"East Distribution Center",name:"Shelf 1",code:"EDC-S1",location_type:"INTERNAL"},{id:"loc-5",warehouse_id:"wh-2",warehouse:"East Distribution Center",name:"Dispatch Area",code:"EDC-DSP",location_type:"DISPATCH"}],N=[{id:"cat-1",name:"Raw Materials",description:"Steel, wood, chemicals and base materials",productCount:3,active:!0},{id:"cat-2",name:"Finished Goods",description:"Assembled products ready for sale",productCount:2,active:!0},{id:"cat-3",name:"Packaging",description:"Boxes, wraps, and shipping supplies",productCount:2,active:!0},{id:"cat-4",name:"Office Supplies",description:"Stationery, printer consumables",productCount:1,active:!0}],_=[{id:"p-1",name:"Steel Rods (10mm)",sku:"STL-001",category:"Raw Materials",category_id:"cat-1",uom:"kg",onHand:450,available:420,reserved:30,reorder_point:100,reorder_quantity:200,active:!0},{id:"p-2",name:"Aluminum Sheets",sku:"ALU-002",category:"Raw Materials",category_id:"cat-1",uom:"sheets",onHand:85,available:75,reserved:10,reorder_point:50,reorder_quantity:100,active:!0},{id:"p-3",name:"Wooden Planks",sku:"WD-003",category:"Raw Materials",category_id:"cat-1",uom:"units",onHand:12,available:12,reserved:0,reorder_point:20,reorder_quantity:50,active:!0},{id:"p-4",name:"Office Chair (Ergonomic)",sku:"FRN-010",category:"Finished Goods",category_id:"cat-2",uom:"units",onHand:65,available:45,reserved:20,reorder_point:15,reorder_quantity:30,active:!0},{id:"p-5",name:"Standing Desk Frame",sku:"FRN-011",category:"Finished Goods",category_id:"cat-2",uom:"units",onHand:28,available:28,reserved:0,reorder_point:10,reorder_quantity:20,active:!0},{id:"p-6",name:"Cardboard Box (Large)",sku:"PKG-020",category:"Packaging",category_id:"cat-3",uom:"units",onHand:350,available:340,reserved:10,reorder_point:100,reorder_quantity:500,active:!0},{id:"p-7",name:"Bubble Wrap Roll",sku:"PKG-021",category:"Packaging",category_id:"cat-3",uom:"units",onHand:5,available:3,reserved:2,reorder_point:10,reorder_quantity:25,active:!0},{id:"p-8",name:"Printer Paper A4",sku:"OFC-030",category:"Office Supplies",category_id:"cat-4",uom:"boxes",onHand:0,available:0,reserved:0,reorder_point:5,reorder_quantity:20,active:!0}];let Q={RECEIPT:6,DELIVERY:4,TRANSFER:3};const $=[{id:"d-1",document_type:"RECEIPT",document_number:"WH/IN/00001",partner_name:"SteelCorp Pvt Ltd",sourceWarehouse:null,destinationWarehouse:"Main Warehouse",source_warehouse_id:null,destination_warehouse_id:"wh-1",source_location_id:null,destination_location_id:"loc-3",scheduled_date:"2026-09-20",status:"DONE",totalItems:2,created_at:"2026-09-20T09:15:00Z",notes:"Monthly steel delivery"},{id:"d-2",document_type:"RECEIPT",document_number:"WH/IN/00002",partner_name:"PackageMart",sourceWarehouse:null,destinationWarehouse:"Main Warehouse",source_warehouse_id:null,destination_warehouse_id:"wh-1",source_location_id:null,destination_location_id:"loc-3",scheduled_date:"2026-09-22",status:"DONE",totalItems:1,created_at:"2026-09-22T11:30:00Z",notes:null},{id:"d-3",document_type:"RECEIPT",document_number:"WH/IN/00003",partner_name:"WoodWorks Inc.",sourceWarehouse:null,destinationWarehouse:"Main Warehouse",source_warehouse_id:null,destination_warehouse_id:"wh-1",source_location_id:null,destination_location_id:"loc-1",scheduled_date:"2026-09-25",status:"WAITING",totalItems:1,created_at:"2026-09-24T08:00:00Z",notes:"Awaiting truck arrival"},{id:"d-4",document_type:"RECEIPT",document_number:"WH/IN/00004",partner_name:"AluminaCo",sourceWarehouse:null,destinationWarehouse:"East Distribution Center",source_warehouse_id:null,destination_warehouse_id:"wh-2",source_location_id:null,destination_location_id:"loc-4",scheduled_date:"2026-09-26",status:"DRAFT",totalItems:1,created_at:"2026-09-25T14:20:00Z",notes:null},{id:"d-5",document_type:"RECEIPT",document_number:"WH/IN/00005",partner_name:"OfficePro Supplies",sourceWarehouse:null,destinationWarehouse:"Main Warehouse",source_warehouse_id:null,destination_warehouse_id:"wh-1",source_location_id:null,destination_location_id:"loc-2",scheduled_date:"2026-09-27",status:"READY",totalItems:1,created_at:"2026-09-25T16:00:00Z",notes:"Printer paper restock"},{id:"d-6",document_type:"DELIVERY",document_number:"WH/OUT/00001",partner_name:"UrbanOffice Co.",sourceWarehouse:"Main Warehouse",destinationWarehouse:null,source_warehouse_id:"wh-1",destination_warehouse_id:null,source_location_id:"loc-1",destination_location_id:null,scheduled_date:"2026-09-23",status:"DONE",totalItems:2,created_at:"2026-09-22T10:00:00Z",notes:"Customer order #1055"},{id:"d-7",document_type:"DELIVERY",document_number:"WH/OUT/00002",partner_name:"HomeStyle Ltd",sourceWarehouse:"Main Warehouse",destinationWarehouse:null,source_warehouse_id:"wh-1",destination_warehouse_id:null,source_location_id:"loc-2",destination_location_id:null,scheduled_date:"2026-09-26",status:"READY",totalItems:1,created_at:"2026-09-25T09:00:00Z",notes:null},{id:"d-8",document_type:"DELIVERY",document_number:"WH/OUT/00003",partner_name:"TechPark Interiors",sourceWarehouse:"East Distribution Center",destinationWarehouse:null,source_warehouse_id:"wh-2",destination_warehouse_id:null,source_location_id:"loc-4",destination_location_id:null,scheduled_date:"2026-09-27",status:"DRAFT",totalItems:1,created_at:"2026-09-26T08:30:00Z",notes:"Pending confirmation"},{id:"d-9",document_type:"TRANSFER",document_number:"WH/INT/00001",partner_name:"Internal Movement",sourceWarehouse:"Main Warehouse",destinationWarehouse:"East Distribution Center",source_warehouse_id:"wh-1",destination_warehouse_id:"wh-2",source_location_id:"loc-1",destination_location_id:"loc-4",scheduled_date:"2026-09-24",status:"DONE",totalItems:1,created_at:"2026-09-24T13:00:00Z",notes:"Rebalance stock"},{id:"d-10",document_type:"TRANSFER",document_number:"WH/INT/00002",partner_name:"Rack Reorganization",sourceWarehouse:"Main Warehouse",destinationWarehouse:"Main Warehouse",source_warehouse_id:"wh-1",destination_warehouse_id:"wh-1",source_location_id:"loc-1",destination_location_id:"loc-2",scheduled_date:"2026-09-26",status:"WAITING",totalItems:2,created_at:"2026-09-25T15:45:00Z",notes:"Moving steel to Rack B"}],M=[{id:"adj-1",product:"Steel Rods (10mm)",warehouse:"Main Warehouse",location:"Rack A",system_quantity:455,counted_quantity:450,reason:"Damaged items found during physical count",created_at:"2026-09-25T10:00:00Z"},{id:"adj-2",product:"Bubble Wrap Roll",warehouse:"Main Warehouse",location:"Rack B",system_quantity:8,counted_quantity:5,reason:"Used for internal packing, not tracked",created_at:"2026-09-25T11:30:00Z"}],O=[{id:"sl-1",product:"Steel Rods (10mm)",sku:"STL-001",warehouse:"Main Warehouse",location:"Receiving Bay",movement_type:"RECEIPT",reference_type:"RECEIPT",quantity:200,before_quantity:250,after_quantity:450,created_at:"2026-09-20T09:20:00Z"},{id:"sl-2",product:"Cardboard Box (Large)",sku:"PKG-020",warehouse:"Main Warehouse",location:"Rack B",movement_type:"RECEIPT",reference_type:"RECEIPT",quantity:500,before_quantity:0,after_quantity:500,created_at:"2026-09-22T11:35:00Z"},{id:"sl-3",product:"Office Chair (Ergonomic)",sku:"FRN-010",warehouse:"Main Warehouse",location:"Rack A",movement_type:"DELIVERY",reference_type:"DELIVERY",quantity:-10,before_quantity:75,after_quantity:65,created_at:"2026-09-23T10:15:00Z"},{id:"sl-4",product:"Cardboard Box (Large)",sku:"PKG-020",warehouse:"Main Warehouse",location:"Rack B",movement_type:"DELIVERY",reference_type:"DELIVERY",quantity:-150,before_quantity:500,after_quantity:350,created_at:"2026-09-23T10:20:00Z"},{id:"sl-5",product:"Aluminum Sheets",sku:"ALU-002",warehouse:"Main Warehouse",location:"Rack A",movement_type:"INTERNAL_TRANSFER_OUT",reference_type:"TRANSFER",quantity:-15,before_quantity:100,after_quantity:85,created_at:"2026-09-24T13:10:00Z"},{id:"sl-6",product:"Aluminum Sheets",sku:"ALU-002",warehouse:"East Distribution Center",location:"Shelf 1",movement_type:"INTERNAL_TRANSFER_IN",reference_type:"TRANSFER",quantity:15,before_quantity:0,after_quantity:15,created_at:"2026-09-24T13:10:00Z"},{id:"sl-7",product:"Steel Rods (10mm)",sku:"STL-001",warehouse:"Main Warehouse",location:"Rack A",movement_type:"ADJUSTMENT_OUT",reference_type:"ADJUSTMENT",quantity:-5,before_quantity:455,after_quantity:450,created_at:"2026-09-25T10:05:00Z"},{id:"sl-8",product:"Bubble Wrap Roll",sku:"PKG-021",warehouse:"Main Warehouse",location:"Rack B",movement_type:"ADJUSTMENT_OUT",reference_type:"ADJUSTMENT",quantity:-3,before_quantity:8,after_quantity:5,created_at:"2026-09-25T11:35:00Z"}];function A(t,e,...o){if(!e)return t;const s=e.toLowerCase();return t.filter(a=>o.some(n=>String(a[n]||"").toLowerCase().includes(s)))}function C(t){const e=new URL(t,"http://localhost"),o=e.pathname,s=e.searchParams.get("search")||"";if(o==="/dashboard/summary")return{totalProducts:_.filter(a=>a.onHand>0).length,lowStock:_.filter(a=>a.available>0&&a.available<=a.reorder_point).length,outOfStock:_.filter(a=>a.available<=0).length,pendingReceipts:$.filter(a=>a.document_type==="RECEIPT"&&a.status!=="DONE"&&a.status!=="CANCELED").length,pendingDeliveries:$.filter(a=>a.document_type==="DELIVERY"&&a.status!=="DONE"&&a.status!=="CANCELED").length,scheduledTransfers:$.filter(a=>a.document_type==="TRANSFER"&&a.status!=="DONE"&&a.status!=="CANCELED").length};if(o==="/dashboard/recent-operations")return[...$].sort((a,n)=>new Date(n.created_at)-new Date(a.created_at)).slice(0,8);if(o==="/dashboard/stock-alerts")return _.filter(a=>a.available<=a.reorder_point).sort((a,n)=>a.available-n.available).slice(0,8);if(o==="/dashboard/stock-by-category"){const a={};return _.forEach(n=>{const i=n.category||"Uncategorized";a[i]=(a[i]||0)+n.onHand}),Object.entries(a).map(([n,i])=>({label:n,value:i})).sort((n,i)=>i.value-n.value)}if(o==="/products")return A(_,s,"name","sku");if(o.startsWith("/products/")){const a=o.split("/")[2],n=_.find(i=>i.id===a);if(!n)throw new Error("Product not found");return{...n,balances:[{warehouse:"Main Warehouse",location:"Rack A",on_hand:Math.round(n.onHand*.6),reserved:n.reserved,available:Math.round(n.onHand*.6)-n.reserved},{warehouse:"Main Warehouse",location:"Rack B",on_hand:Math.round(n.onHand*.25),reserved:0,available:Math.round(n.onHand*.25)},{warehouse:"East Distribution Center",location:"Shelf 1",on_hand:n.onHand-Math.round(n.onHand*.6)-Math.round(n.onHand*.25),reserved:0,available:n.onHand-Math.round(n.onHand*.6)-Math.round(n.onHand*.25)}].filter(i=>i.on_hand>0)}}return o==="/categories"?N:o==="/warehouses"?k:o==="/locations"?I:o==="/receipts"?$.filter(a=>a.document_type==="RECEIPT"):o==="/deliveries"?$.filter(a=>a.document_type==="DELIVERY"):o==="/transfers"?$.filter(a=>a.document_type==="TRANSFER"):o==="/adjustments"?M:o==="/stock-ledger"?A([...O].sort((a,n)=>new Date(n.created_at)-new Date(a.created_at)),s,"product","sku"):o==="/auth/profile"?{name:"Alex Morgan",email:"manager@stocksense.dev"}:o==="/auth/request-reset"?{message:"If the account exists, a reset code has been sent."}:o==="/auth/verify-reset-otp"?{verified:!0}:o==="/auth/reset-password"?{message:"Password reset successfully"}:{}}function q(t,e){var o,s,a,n;if(t==="/products"){const i={id:"p-"+Date.now(),name:e.name,sku:e.sku,category:((o=N.find(u=>u.id===e.categoryId))==null?void 0:o.name)||"Uncategorized",category_id:e.categoryId||null,uom:e.uom||"units",onHand:0,available:0,reserved:0,reorder_point:Number(e.reorderPoint)||0,reorder_quantity:Number(e.reorderQuantity)||0,active:!0};return _.push(i),i}if(t==="/categories"){const i={id:"cat-"+Date.now(),name:e.name,description:e.description||"",productCount:0,active:!0};return N.push(i),i}if(t==="/warehouses"){const i={id:"wh-"+Date.now(),name:e.name,code:e.code,address:e.address||"",active:!0};return k.push(i),i}if(t==="/locations"){const i=k.find(m=>m.id===e.warehouseId),u={id:"loc-"+Date.now(),warehouse_id:e.warehouseId,warehouse:(i==null?void 0:i.name)||"",name:e.name,code:e.code,location_type:e.locationType||"INTERNAL"};return I.push(u),u}if(["/receipts","/deliveries","/transfers"].includes(t)){const u={"/receipts":"RECEIPT","/deliveries":"DELIVERY","/transfers":"TRANSFER"}[t],m=u==="RECEIPT"?"WH/IN":u==="DELIVERY"?"WH/OUT":"WH/INT",r=Q[u]++,d={id:"d-"+Date.now(),document_type:u,document_number:`${m}/${String(r).padStart(5,"0")}`,partner_name:e.partnerName,sourceWarehouse:((s=k.find(p=>p.id===e.sourceWarehouseId))==null?void 0:s.name)||null,destinationWarehouse:((a=k.find(p=>p.id===e.destinationWarehouseId))==null?void 0:a.name)||null,source_warehouse_id:e.sourceWarehouseId||null,destination_warehouse_id:e.destinationWarehouseId||null,source_location_id:e.sourceLocationId||null,destination_location_id:e.destinationLocationId||null,scheduled_date:e.scheduledDate||null,status:e.status||"DRAFT",totalItems:((n=e.lines)==null?void 0:n.length)||1,created_at:new Date().toISOString(),notes:e.notes||null};return $.push(d),d}if(t==="/adjustments"){const i=_.find(T=>T.id===e.productId),u=k.find(T=>T.id===e.warehouseId),m=I.find(T=>T.id===e.locationId),r=i?i.onHand:0,d=Number(e.countedQuantity)-r,p={id:"adj-"+Date.now(),product:(i==null?void 0:i.name)||"Unknown",warehouse:(u==null?void 0:u.name)||"Unknown",location:(m==null?void 0:m.name)||"Unknown",system_quantity:r,counted_quantity:Number(e.countedQuantity),reason:e.reason,created_at:new Date().toISOString()};return M.push(p),i&&(i.onHand+=d,i.available+=d),O.unshift({id:"sl-"+Date.now(),product:i==null?void 0:i.name,sku:i==null?void 0:i.sku,warehouse:u==null?void 0:u.name,location:m==null?void 0:m.name,movement_type:d>0?"ADJUSTMENT_IN":"ADJUSTMENT_OUT",reference_type:"ADJUSTMENT",quantity:d,before_quantity:r,after_quantity:r+d,created_at:new Date().toISOString()}),p}if(t.match(/\/(receipts|deliveries|transfers)\/[^/]+\/validate/)){const u=t.split("/")[2],m=$.find(r=>r.id===u);if(m)return m.status="DONE",{message:`${m.document_number} validated successfully`}}return{}}const Y="http://localhost:4000/api";let L=!1;const v={token:localStorage.getItem("stocksense-token")||"",products:[],warehouses:[],locations:[]},y={grid:"▦",box:"▣",truck:"↗",send:"↗",move:"⇄",sliders:"≡",history:"◷",warehouse:"⌂",plus:"+",search:"⌕",bell:"◉",menu:"☰",close:"×",warning:"⚠"};function H(t,e={},o=""){const s=document.createElement(t);return Object.assign(s,e),o&&(s.innerHTML=o),s}function l(t,e={}){return L?new Promise(o=>{setTimeout(()=>{if(e.method==="POST"){const s=e.body?JSON.parse(e.body):{};o(q(t,s))}else o(C(t))},80)}):fetch(`${Y}${t}`,{headers:{"Content-Type":"application/json",...v.token?{Authorization:`Bearer ${v.token}`}:{}},...e}).then(async o=>{const s=await o.json().catch(()=>({}));if(!o.ok)throw new Error(s.message||"Request failed");return s.data}).catch(o=>{if(o.message==="Failed to fetch"||o.message.includes("NetworkError")||o.name==="TypeError"){if(console.warn("⚡ Backend API unavailable — switching to demo mode with mock data"),L=!0,e.method==="POST"){const s=e.body?JSON.parse(e.body):{};return q(t,s)}return C(t)}throw o})}function b(t){const e=H("div",{className:"toast"},t);document.body.append(e),setTimeout(()=>e.remove(),3200)}function S(t){return`<span class="badge ${t}">${t}</span>`}function h(t){return Number(t||0).toLocaleString(void 0,{maximumFractionDigits:2})}function f(t,e,o,s){return`<a href="#/${t}" class="nav-item ${s?"active":""}">
    <span>${y[e]}</span>${o}
  </a>`}function g(t,e){var s,a;const o=location.hash.replace("#/","")||"dashboard";document.querySelector("#app").innerHTML=`
    <div class="shell">
      <aside class="sidebar" id="sidebar">
        <div class="brand">
          <span class="brand-mark">S</span>StockSense
        </div>

        <nav class="nav">
          <div class="nav-title">Workspace</div>
          ${f("dashboard","grid","Dashboard",o==="dashboard")}

          <div class="nav-title">Products</div>
          ${f("products","box","Products",o==="products")}
          ${f("categories","sliders","Categories",o==="categories")}
          ${f("reordering","history","Reordering Rules",o==="reordering")}

          <div class="nav-title">Operations</div>
          ${f("receipts","truck","Receipts",o==="receipts")}
          ${f("deliveries","send","Delivery Orders",o==="deliveries")}
          ${f("transfers","move","Internal Transfers",o==="transfers")}
          ${f("adjustments","sliders","Inventory Adjustments",o==="adjustments")}
          ${f("moves","history","Move History",o==="moves")}

          <div class="nav-title">Settings</div>
          ${f("warehouses","warehouse","Warehouses",o==="warehouses")}
        </nav>

        <div class="profile">
          <div class="profile-row">
            <div class="avatar">AM</div>
            <div>
              <div class="profile-name">Alex Morgan</div>
              <div class="profile-role">Inventory Manager</div>
            </div>
          </div>
          <div class="profile-links">
            <a href="#/profile">My profile</a>
            <a href="#/login" id="logout">Logout</a>
          </div>
        </div>
      </aside>

      <main class="main">
        <header class="topbar">
          <button class="icon-btn hamburger" id="menu" aria-label="Open navigation">☰</button>
          <div class="crumb">StockSense <span> / </span> <b>${t}</b></div>
          <div class="topbar-actions">
            <input class="global-search" placeholder="Search products, SKU, documents…">
            <button class="icon-btn" aria-label="Notifications">${y.bell}</button>
            <div class="avatar">AM</div>
          </div>
        </header>
        <section class="page">${e}</section>
      </main>
    </div>`,(s=document.querySelector("#menu"))==null||s.addEventListener("click",()=>document.querySelector("#sidebar").classList.toggle("open")),(a=document.querySelector("#logout"))==null||a.addEventListener("click",()=>{v.token="",localStorage.removeItem("stocksense-token")})}function w(t,e,o=""){return`
    <div class="page-header">
      <div>
        <h1 class="page-title">${t}</h1>
        <p class="page-subtitle">${e}</p>
      </div>
      ${o}
    </div>`}function c(t,e){return`
    <div class="empty">
      <div style="font-size:32px">▣</div>
      <strong>${t}</strong>
      <div>${e||""}</div>
    </div>`}function E(t,e,o,s="Save"){const a=H("div",{className:"modal-backdrop"},`
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h2 class="modal-title">${t}</h2>
        <button class="icon-btn" id="modal-close">×</button>
      </div>
      <form id="modal-form" class="form">${e}</form>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="modal-cancel">Cancel</button>
        <button form="modal-form" class="btn btn-primary">${s}</button>
      </div>
    </div>`);document.body.append(a);const n=()=>a.remove();a.querySelector("#modal-close").onclick=n,a.querySelector("#modal-cancel").onclick=n,a.querySelector("form").onsubmit=async i=>{i.preventDefault();try{await o(new FormData(i.target)),n()}catch(u){b(u.message)}}}async function j(){g("Inventory Dashboard",w("Inventory Dashboard","A live snapshot of stock operations and replenishment needs.")+`
    <div class="filters">
      <select class="filter">
        <option>All document types</option>
        <option>Receipts</option>
        <option>Delivery</option>
        <option>Internal Transfer</option>
        <option>Adjustment</option>
      </select>
      <select class="filter">
        <option>All statuses</option>
        <option>Draft</option>
        <option>Waiting</option>
        <option>Ready</option>
        <option>Done</option>
      </select>
      <select class="filter"><option>All warehouses</option></select>
      <select class="filter"><option>All categories</option></select>
      <button class="btn btn-secondary">Clear filters</button>
    </div>
    <div id="dashboard-content">${c("Loading dashboard","Fetching live inventory data…")}</div>`);try{const[t,e,o,s]=await Promise.all(["/dashboard/summary","/dashboard/recent-operations","/dashboard/stock-alerts","/dashboard/stock-by-category"].map(n=>l(n))),a=[["Total Products in Stock",t.totalProducts,"box","Products with on-hand stock",""],["Low Stock Items",t.lowStock,"warning","At or below reorder point","amber"],["Out of Stock Items",t.outOfStock,"warning","Requires attention","red"],["Pending Receipts",t.pendingReceipts,"truck","Awaiting validation","teal"],["Pending Deliveries",t.pendingDeliveries,"send","Awaiting dispatch",""],["Transfers Scheduled",t.scheduledTransfers,"move","Internal movements","teal"]];document.querySelector("#dashboard-content").innerHTML=`
      <div class="kpis">
        ${a.map(([n,i,u,m,r])=>`
          <article class="kpi">
            <div class="kpi-top">
              <span>${n}</span>
              <span class="kpi-icon ${r}">${y[u]}</span>
            </div>
            <div class="kpi-value">${h(i)}</div>
            <div class="kpi-note">${m}</div>
          </article>`).join("")}
      </div>

      <div class="dashboard-grid">
        <!-- Recent Operations -->
        <section class="card">
          <div class="card-header">
            <h2 class="card-title">Recent Operations</h2>
            <a class="card-link" href="#/moves">View all activity</a>
          </div>
          <div class="table-wrap">
            <table class="table">
              <thead><tr>
                <th>Document</th><th>Type</th><th>Warehouse</th><th>Status</th><th>Date</th>
              </tr></thead>
              <tbody>
                ${e.length?e.map(n=>`<tr>
                      <td class="reference">${n.document_number}</td>
                      <td>${n.document_type}</td>
                      <td>${n.warehouse||"—"}</td>
                      <td>${S(n.status)}</td>
                      <td>${new Date(n.created_at).toLocaleDateString()}</td>
                    </tr>`).join(""):`<tr><td colspan="5">${c("No operations yet","Create a receipt or delivery to begin.")}</td></tr>`}
              </tbody>
            </table>
          </div>
        </section>

        <!-- Stock Alerts -->
        <section class="card">
          <div class="card-header">
            <h2 class="card-title">Stock Alerts</h2>
            <a class="card-link" href="#/reordering">View rules</a>
          </div>
          <div class="alert-list">
            ${o.length?o.map(n=>`
                <div class="alert">
                  <span class="alert-icon">${y.warning}</span>
                  <div class="alert-text">
                    <div class="alert-title">${n.name}</div>
                    <div class="alert-note">${n.sku} · ${h(n.available)} available</div>
                  </div>
                  <span class="badge ${Number(n.available)<=0?"CANCELED":"WAITING"}">
                    ${Number(n.available)<=0?"OUT OF STOCK":"REORDER"}
                  </span>
                </div>`).join(""):c("Stock levels look healthy","No low-stock alerts at this time.")}
          </div>
        </section>

        <!-- Charts -->
        <section class="card charts">
          <div class="card">
            <div class="card-header"><h2 class="card-title">Stock by Category</h2></div>
            <div class="chart-body">
              ${s.map(n=>`
                <div class="bar-column">
                  <span>${h(n.value)}</span>
                  <div class="bar" style="height:${Math.max(5,Math.min(100,Number(n.value)*8))}%"></div>
                  <span>${n.label}</span>
                </div>`).join("")||'<span class="muted">Inventory category distribution will appear here.</span>'}
            </div>
          </div>
          <div class="card">
            <div class="card-header"><h2 class="card-title">Movement Overview</h2></div>
            <div class="chart-body">
              <div class="bar-column"><span>Receipts</span><div class="bar" style="height:74%"></div><span>Incoming</span></div>
              <div class="bar-column"><span>Deliveries</span><div class="bar" style="height:49%;background:var(--primary)"></div><span>Outgoing</span></div>
              <div class="bar-column"><span>Transfers</span><div class="bar" style="height:30%;background:#d3e6e5"></div><span>Internal</span></div>
            </div>
          </div>
        </section>
      </div>`}catch(t){document.querySelector("#dashboard-content").innerHTML=c("Could not load the dashboard",t.message)}}async function K(){return`<option value="">Uncategorized</option>${(await l("/categories").catch(()=>[])).map(e=>`<option value="${e.id}">${e.name}</option>`).join("")}`}async function z(){E("New Product",`
    <div class="form-grid">
      <div class="field">
        <label>Product name <em>*</em></label>
        <input name="name" required placeholder="e.g. Steel Rods">
      </div>
      <div class="field">
        <label>SKU / Code <em>*</em></label>
        <input name="sku" required placeholder="e.g. STL-001">
      </div>
      <div class="field">
        <label>Category</label>
        <select name="categoryId" id="category-options"><option>Loading…</option></select>
      </div>
      <div class="field">
        <label>Unit of measure <em>*</em></label>
        <select name="uom">
          <option>units</option><option>kg</option><option>sheets</option><option>boxes</option>
        </select>
      </div>
      <div class="field">
        <label>Reorder point</label>
        <input name="reorderPoint" type="number" min="0" value="0">
      </div>
      <div class="field">
        <label>Reorder quantity</label>
        <input name="reorderQuantity" type="number" min="0" value="0">
      </div>
      <div class="field full">
        <label>Description</label>
        <textarea name="description" rows="2" placeholder="Optional product notes"></textarea>
      </div>
    </div>`,async t=>{await l("/products",{method:"POST",body:JSON.stringify(Object.fromEntries(t))}),b("Product created successfully."),U()}),document.querySelector("#category-options").innerHTML=await K()}async function U(){g("Products",w("Products","Manage catalog items, availability, and replenishment settings.",`<button class="btn btn-primary" id="new-product">${y.plus} New Product</button>`)+`
    <div class="toolbar">
      <input class="filter" id="product-search" placeholder="Search name or SKU">
      <select class="filter"><option>All categories</option></select>
      <select class="filter"><option>Active products</option></select>
    </div>
    <div class="card" id="product-table">${c("Loading products")}</div>`),document.querySelector("#new-product").onclick=()=>z();const t=async(o="")=>{try{v.products=await l("/products?search="+encodeURIComponent(o)),document.querySelector("#product-table").innerHTML=`
        <div class="table-wrap">
          <table class="table">
            <thead><tr>
              <th>Product</th><th>SKU</th><th>Category</th><th>UOM</th>
              <th>On Hand</th><th>Available</th><th>Reorder Point</th><th>Status</th>
            </tr></thead>
            <tbody>
              ${v.products.length?v.products.map(s=>`<tr>
                    <td><a class="reference" href="#/products/${s.id}">${s.name}</a></td>
                    <td>${s.sku}</td>
                    <td>${s.category||"—"}</td>
                    <td>${s.uom}</td>
                    <td>${h(s.onHand)}</td>
                    <td>${h(s.available)}</td>
                    <td>${h(s.reorder_point)}</td>
                    <td>${Number(s.available)<=0?S("CANCELED"):Number(s.available)<=Number(s.reorder_point)?S("WAITING"):S("DONE")}</td>
                  </tr>`).join(""):`<tr><td colspan="8">${c("No products found","Create your first product to start tracking inventory.")}</td></tr>`}
            </tbody>
          </table>
        </div>`}catch(s){document.querySelector("#product-table").innerHTML=c("Could not load products",s.message)}};let e;document.querySelector("#product-search").oninput=o=>{clearTimeout(e),e=setTimeout(()=>t(o.target.value),250)},t()}async function X(t){g("Product Details",`<div id="detail">${c("Loading product")}</div>`);try{const e=await l("/products/"+t),o=e.balances.reduce((a,n)=>a+Number(n.on_hand),0),s=e.balances.reduce((a,n)=>a+Number(n.reserved),0);document.querySelector("#detail").innerHTML=w(e.name,`${e.sku} · ${e.category||"Uncategorized"} · ${e.uom}`,'<a class="btn btn-secondary" href="#/products">Back to Products</a>')+`

      <div class="kpis" style="grid-template-columns:repeat(4,1fr)">
        <article class="kpi">
          <div class="kpi-top">On Hand<span class="kpi-icon">▣</span></div>
          <div class="kpi-value">${h(o)}</div>
          <div class="kpi-note">Across all locations</div>
        </article>
        <article class="kpi">
          <div class="kpi-top">Available<span class="kpi-icon teal">✓</span></div>
          <div class="kpi-value">${h(o-s)}</div>
          <div class="kpi-note">Ready to allocate</div>
        </article>
        <article class="kpi">
          <div class="kpi-top">Reserved<span class="kpi-icon amber">◷</span></div>
          <div class="kpi-value">${h(s)}</div>
          <div class="kpi-note">Committed to deliveries</div>
        </article>
        <article class="kpi">
          <div class="kpi-top">Reorder Point<span class="kpi-icon">↺</span></div>
          <div class="kpi-value">${h(e.reorder_point)}</div>
          <div class="kpi-note">Alert threshold</div>
        </article>
      </div>

      <section class="card">
        <div class="card-header"><h2 class="card-title">Location Availability</h2></div>
        <div class="table-wrap">
          <table class="table">
            <thead><tr>
              <th>Warehouse</th><th>Location</th><th>On Hand</th><th>Reserved</th><th>Available</th>
            </tr></thead>
            <tbody>
              ${e.balances.length?e.balances.map(a=>`<tr>
                    <td>${a.warehouse}</td>
                    <td>${a.location}</td>
                    <td>${h(a.on_hand)}</td>
                    <td>${h(a.reserved)}</td>
                    <td>${h(a.available)}</td>
                  </tr>`).join(""):`<tr><td colspan="5">${c("No stock recorded yet")}</td></tr>`}
            </tbody>
          </table>
        </div>
      </section>`}catch(e){document.querySelector("#detail").innerHTML=c("Could not load product",e.message)}}async function x(){g("Product Categories",w("Product Categories","Organize products for filtering and reporting.",`<button class="btn btn-primary" id="new-category">${y.plus} New Category</button>`)+`
    <div class="card" id="category-table">${c("Loading categories")}</div>`),document.querySelector("#new-category").onclick=()=>E("New Category",`
      <div class="field">
        <label>Category name <em>*</em></label>
        <input name="name" required>
      </div>
      <div class="field" style="margin-top:14px">
        <label>Description</label>
        <textarea name="description" rows="3"></textarea>
      </div>`,async t=>{await l("/categories",{method:"POST",body:JSON.stringify(Object.fromEntries(t))}),b("Category created."),x()});try{const t=await l("/categories");document.querySelector("#category-table").innerHTML=`
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Category</th><th>Description</th><th>Products</th><th>Status</th></tr></thead>
          <tbody>
            ${t.length?t.map(e=>`<tr>
                  <td class="reference">${e.name}</td>
                  <td>${e.description||"—"}</td>
                  <td>${e.productCount}</td>
                  <td>${S("DONE")}</td>
                </tr>`).join(""):`<tr><td colspan="4">${c("No categories found")}</td></tr>`}
          </tbody>
        </table>
      </div>`}catch(t){document.querySelector("#category-table").innerHTML=c("Could not load categories",t.message)}}async function D(){g("Warehouses",w("Warehouses","Configure stock facilities and their storage locations.",`<button class="btn btn-primary" id="new-warehouse">${y.plus} New Warehouse</button>`)+`
    <div class="dashboard-grid">
      <div class="card" id="warehouse-table">${c("Loading warehouses")}</div>
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Locations</h2>
          <button class="btn btn-secondary" id="new-location">${y.plus} Add Location</button>
        </div>
        <div id="location-list">${c("Select a warehouse")}</div>
      </div>
    </div>`);const[t,e]=await Promise.all([l("/warehouses").catch(()=>[]),l("/locations").catch(()=>[])]);v.warehouses=t,v.locations=e,document.querySelector("#warehouse-table").innerHTML=`
    <div class="table-wrap">
      <table class="table">
        <thead><tr><th>Warehouse</th><th>Code</th><th>Address</th><th>Status</th></tr></thead>
        <tbody>
          ${t.length?t.map(o=>`<tr>
                <td class="reference">${o.name}</td>
                <td>${o.code}</td>
                <td>${o.address||"—"}</td>
                <td>${S("DONE")}</td>
              </tr>`).join(""):`<tr><td colspan="4">${c("No warehouses configured")}</td></tr>`}
        </tbody>
      </table>
    </div>`,document.querySelector("#location-list").innerHTML=e.length?`<div class="alert-list">${e.map(o=>`
        <div class="alert">
          <span class="alert-icon">⌂</span>
          <div class="alert-text">
            <div class="alert-title">${o.name}</div>
            <div class="alert-note">${o.warehouse} · ${o.code} · ${o.location_type}</div>
          </div>
        </div>`).join("")}</div>`:c("No locations configured"),document.querySelector("#new-warehouse").onclick=()=>E("New Warehouse",`
      <div class="form-grid">
        <div class="field"><label>Name <em>*</em></label><input name="name" required></div>
        <div class="field"><label>Code <em>*</em></label><input name="code" required placeholder="MW"></div>
        <div class="field full"><label>Address</label><textarea name="address" rows="2"></textarea></div>
      </div>`,async o=>{await l("/warehouses",{method:"POST",body:JSON.stringify(Object.fromEntries(o))}),b("Warehouse created."),D()}),document.querySelector("#new-location").onclick=()=>E("New Location",`
      <div class="form-grid">
        <div class="field">
          <label>Warehouse <em>*</em></label>
          <select name="warehouseId">${t.map(o=>`<option value="${o.id}">${o.name}</option>`).join("")}</select>
        </div>
        <div class="field"><label>Location name <em>*</em></label><input name="name" required></div>
        <div class="field"><label>Code <em>*</em></label><input name="code" required></div>
        <div class="field">
          <label>Location type</label>
          <select name="locationType">
            <option>INTERNAL</option><option>RECEIVING</option><option>DISPATCH</option><option>SCRAP</option>
          </select>
        </div>
      </div>`,async o=>{await l("/locations",{method:"POST",body:JSON.stringify(Object.fromEntries(o))}),b("Location created."),D()})}const F={receipts:{title:"Receipts",subtitle:"Incoming goods from vendors and suppliers.",button:"New Receipt",type:"RECEIPT"},deliveries:{title:"Delivery Orders",subtitle:"Pick, pack, and validate customer shipments.",button:"New Delivery",type:"DELIVERY"},transfers:{title:"Internal Transfers",subtitle:"Move stock between warehouses and locations.",button:"New Transfer",type:"TRANSFER"}};async function ee(t){const[e,o,s]=await Promise.all([l("/products").catch(()=>[]),l("/warehouses").catch(()=>[]),l("/locations").catch(()=>[])]),a=F[t],n=d=>`
    <select name="${d}">
      ${s.map(p=>`<option value="${p.id}" data-w="${p.warehouse_id}">${p.warehouse} — ${p.name}</option>`).join("")}
    </select>`,i=d=>`
    <select name="${d}">
      ${o.map(p=>`<option value="${p.id}">${p.name}</option>`).join("")}
    </select>`,u=t!=="receipts"?`
    <div class="field"><label>Source warehouse <em>*</em></label>${i("sourceWarehouseId")}</div>
    <div class="field"><label>Source location <em>*</em></label>${n("sourceLocationId")}</div>`:"",m=t!=="deliveries"?`
    <div class="field"><label>Destination warehouse <em>*</em></label>${i("destinationWarehouseId")}</div>
    <div class="field"><label>Destination location <em>*</em></label>${n("destinationLocationId")}</div>`:"",r=t==="receipts"?"Supplier":t==="deliveries"?"Customer":"Transfer reference";E(a.button,`
    <div class="form-grid">
      <div class="field">
        <label>${r} <em>*</em></label>
        <input name="partnerName" required placeholder="${t==="transfers"?"Internal stock movement":"Company name"}">
      </div>
      <div class="field">
        <label>Scheduled date</label>
        <input name="scheduledDate" type="date">
      </div>
      ${u}${m}
      <div class="field">
        <label>Status</label>
        <select name="status"><option>DRAFT</option><option>WAITING</option><option>READY</option></select>
      </div>
      <div class="field">
        <label>Notes</label>
        <input name="notes" placeholder="Optional note">
      </div>
    </div>
    <div class="operation-lines">
      <strong>Products to process</strong>
      <div class="line-grid">
        <select name="productId">
          ${e.map(d=>`<option value="${d.id}" data-uom="${d.uom}">${d.name} (${d.sku})</option>`).join("")}
        </select>
        <input name="expectedQuantity" type="number" min=".01" step=".01" required placeholder="Quantity">
        <select name="uom"><option>units</option><option>kg</option><option>sheets</option></select>
        <span class="muted">1 line</span>
      </div>
    </div>`,async d=>{const p=Object.fromEntries(d);p.lines=[{productId:p.productId,expectedQuantity:Number(p.expectedQuantity),processedQuantity:Number(p.expectedQuantity),uom:p.uom}],delete p.productId,delete p.expectedQuantity,delete p.uom,await l("/"+t,{method:"POST",body:JSON.stringify(p)}),b(`${a.button} created.`),R(t)},"Create")}async function R(t){const e=F[t];g(e.title,w(e.title,e.subtitle,`<button class="btn btn-primary" id="new-operation">${y.plus} ${e.button}</button>`)+`
    <div class="toolbar">
      <input class="filter" placeholder="Search reference or partner">
      <select class="filter">
        <option>All statuses</option>
        <option>DRAFT</option><option>WAITING</option><option>READY</option><option>DONE</option>
      </select>
    </div>
    <div class="card" id="operations-table">${c(`Loading ${e.title.toLowerCase()}`)}</div>`),document.querySelector("#new-operation").onclick=()=>ee(t);try{const o=await l("/"+t),s=t==="receipts"?"Supplier":t==="deliveries"?"Customer":"Source → Destination";document.querySelector("#operations-table").innerHTML=`
      <div class="table-wrap">
        <table class="table">
          <thead><tr>
            <th>Reference</th><th>${s}</th><th>Scheduled</th>
            <th>Items</th><th>Status</th><th></th>
          </tr></thead>
          <tbody>
            ${o.length?o.map(a=>`<tr>
                  <td class="reference">${a.document_number}</td>
                  <td>${t==="transfers"?`${a.sourceWarehouse||"—"} → ${a.destinationWarehouse||"—"}`:a.partner_name}</td>
                  <td>${a.scheduled_date?new Date(a.scheduled_date).toLocaleDateString():"—"}</td>
                  <td>${a.totalItems}</td>
                  <td>${S(a.status)}</td>
                  <td>${a.status!=="DONE"&&a.status!=="CANCELED"?`<button class="btn btn-teal validate" data-id="${a.id}" data-ref="${a.document_number}">Validate</button>`:""}</td>
                </tr>`).join(""):`<tr><td colspan="6">${c(`No ${e.title.toLowerCase()} yet`,`Create your first ${e.title.slice(0,-1).toLowerCase()} to get started.`)}</td></tr>`}
          </tbody>
        </table>
      </div>`,document.querySelectorAll(".validate").forEach(a=>{a.onclick=async()=>{try{await l(`/${t}/${a.dataset.id}/validate`,{method:"POST"}),b(`${a.dataset.ref} validated successfully.`),R(t)}catch(n){b(n.message)}}})}catch(o){document.querySelector("#operations-table").innerHTML=c("Could not load operations",o.message)}}async function te(){const[t,e,o]=await Promise.all([l("/products").catch(()=>[]),l("/warehouses").catch(()=>[]),l("/locations").catch(()=>[])]);E("New Inventory Adjustment",`
    <div class="form-grid">
      <div class="field">
        <label>Product <em>*</em></label>
        <select name="productId">${t.map(s=>`<option value="${s.id}">${s.name}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>Warehouse <em>*</em></label>
        <select name="warehouseId">${e.map(s=>`<option value="${s.id}">${s.name}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>Location <em>*</em></label>
        <select name="locationId">${o.map(s=>`<option value="${s.id}">${s.warehouse} — ${s.name}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>Counted quantity <em>*</em></label>
        <input name="countedQuantity" type="number" min="0" step=".01" required>
      </div>
      <div class="field full">
        <label>Reason <em>*</em></label>
        <textarea name="reason" rows="2" required placeholder="e.g. Damaged goods identified during count"></textarea>
      </div>
    </div>`,async s=>{const a=Object.fromEntries(s);a.countedQuantity=Number(a.countedQuantity),await l("/adjustments",{method:"POST",body:JSON.stringify(a)}),b("Adjustment applied and recorded in the ledger."),V()},"Validate Adjustment")}async function V(){g("Inventory Adjustments",w("Inventory Adjustments","Correct recorded stock to a verified physical count.",`<button class="btn btn-primary" id="new-adjustment">${y.plus} New Adjustment</button>`)+`
    <div class="card" id="adjustment-table">${c("Loading adjustments")}</div>`),document.querySelector("#new-adjustment").onclick=()=>te();try{const t=await l("/adjustments");document.querySelector("#adjustment-table").innerHTML=`
      <div class="table-wrap">
        <table class="table">
          <thead><tr>
            <th>Product</th><th>Warehouse</th><th>Location</th>
            <th>System Qty</th><th>Counted Qty</th><th>Difference</th><th>Reason</th>
          </tr></thead>
          <tbody>
            ${t.length?t.map(e=>`<tr>
                  <td class="reference">${e.product}</td>
                  <td>${e.warehouse}</td>
                  <td>${e.location}</td>
                  <td>${h(e.system_quantity)}</td>
                  <td>${h(e.counted_quantity)}</td>
                  <td>${h(Number(e.counted_quantity)-Number(e.system_quantity))}</td>
                  <td>${e.reason}</td>
                </tr>`).join(""):`<tr><td colspan="7">${c("No adjustments yet")}</td></tr>`}
          </tbody>
        </table>
      </div>`}catch(t){document.querySelector("#adjustment-table").innerHTML=c("Could not load adjustments",t.message)}}async function ae(){g("Move History",w("Move History","An append-only audit trail of every validated stock movement.")+`
    <div class="toolbar">
      <input class="filter" id="move-search" placeholder="Search product or SKU">
      <select class="filter"><option>All movement types</option></select>
      <input class="filter" type="date">
    </div>
    <div class="card" id="move-table">${c("Loading stock ledger")}</div>`);const t=async(e="")=>{try{const o=await l("/stock-ledger?search="+encodeURIComponent(e));document.querySelector("#move-table").innerHTML=`
        <div class="table-wrap">
          <table class="table">
            <thead><tr>
              <th>Date</th><th>Reference</th><th>Product</th><th>Movement</th>
              <th>Warehouse</th><th>Location</th><th>Quantity</th><th>Before → After</th>
            </tr></thead>
            <tbody>
              ${o.length?o.map(s=>`<tr>
                    <td>${new Date(s.created_at).toLocaleString()}</td>
                    <td class="reference">${s.reference_type}</td>
                    <td>${s.product}<small class="muted"> · ${s.sku}</small></td>
                    <td>${s.movement_type}</td>
                    <td>${s.warehouse}</td>
                    <td>${s.location}</td>
                    <td style="color:${Number(s.quantity)<0?"var(--danger)":"var(--success)"};font-weight:700">
                      ${Number(s.quantity)>0?"+":""}${h(s.quantity)}
                    </td>
                    <td>${h(s.before_quantity)} → ${h(s.after_quantity)}</td>
                  </tr>`).join(""):`<tr><td colspan="8">${c("No stock movements yet","Validated receipts, deliveries, transfers, and adjustments will appear here.")}</td></tr>`}
            </tbody>
          </table>
        </div>`}catch(o){document.querySelector("#move-table").innerHTML=c("Could not load ledger",o.message)}};document.querySelector("#move-search").oninput=e=>t(e.target.value),t()}function oe(){g("Reordering Rules",w("Reordering Rules","Low-stock thresholds and replenishment guidance.")+`
    <section class="card">
      ${c("No reordering rules configured","Create products with reorder points to see replenishment alerts here.")}
    </section>`)}function se(){g("My Profile",w("My Profile","Manage your StockSense account.")+`
    <section class="card">
      <div class="form">
        <div class="form-grid">
          <div class="field"><label>Full name</label><input value="Alex Morgan"></div>
          <div class="field"><label>Email</label><input value="manager@stocksense.dev" disabled></div>
          <div class="field"><label>Role</label><input value="Inventory Manager" disabled></div>
          <div class="field"><label>Account created</label><input value="September 2026" disabled></div>
        </div>
        <div class="modal-footer" style="padding:18px 0 0;border:0">
          <button class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </section>`)}function ne(t){const e=t==="signup",o=t==="forgot-password",s=t==="verify-otp",a=t==="reset-password",n=e?"Create your account":o?"Reset your password":s?"Verify your code":a?"Choose a new password":"Welcome back";let i;s?i=`
      <div class="field">
        <label>Verification code</label>
        <div class="otp">
          ${Array.from({length:6},(m,r)=>`<input class="otp-box" inputmode="numeric" maxlength="1" aria-label="Digit ${r+1}">`).join("")}
        </div>
      </div>`:o?i=`
      <div class="field">
        <label>Email address</label>
        <input type="email" name="email" required placeholder="you@company.com">
      </div>`:e?i=`
      <div class="field"><label>Full name</label><input name="name" required></div>
      <div class="field"><label>Email address</label><input type="email" name="email" required></div>
      <div class="field"><label>Password</label><input type="password" name="password" required minlength="8"></div>
      <div class="field"><label>Confirm password</label><input type="password" name="confirm" required minlength="8"></div>`:a?i=`
      <div class="field"><label>New password</label><input type="password" name="password" required minlength="8"></div>
      <div class="field"><label>Confirm password</label><input type="password" name="confirm" required minlength="8"></div>`:i=`
      <div class="field">
        <label>Email address</label>
        <input type="email" name="email" required placeholder="you@company.com">
      </div>
      <div class="field">
        <label>Password</label>
        <input type="password" name="password" required minlength="8">
      </div>
      <div class="auth-meta">
        <span></span>
        <a href="#/forgot-password">Forgot password?</a>
      </div>`;const u=o?"Send reset code":s?"Verify code":a?"Reset password":e?"Create account":"Sign in";document.querySelector("#app").innerHTML=`
    <div class="auth">
      <aside class="auth-aside">
        <div class="brand">
          <span class="brand-mark" style="background:#fff;color:var(--primary)">S</span>StockSense
        </div>
        <h1>Stock clarity for every move.</h1>
        <p>One reliable workspace for receiving, storing, moving, and delivering inventory.</p>
        <div class="auth-features">
          <div>✓ Track availability by exact location</div>
          <div>✓ Complete audit trail for every movement</div>
          <div>✓ Reorder before stock runs out</div>
        </div>
      </aside>
      <main class="auth-panel">
        <section class="auth-box">
          <div class="auth-brand">StockSense</div>
          <h2>${n}</h2>
          <p>Secure inventory operations start here.</p>
          <form id="auth-form" class="form" style="padding:0;display:grid;gap:15px">
            ${i}
            <button class="btn btn-primary">${u}</button>
          </form>
          <div class="auth-footer">
            ${t==="login"?'New to StockSense? <a href="#/signup">Create an account</a>':'<a href="#/login">Back to sign in</a>'}
          </div>
        </section>
      </main>
    </div>`,document.querySelectorAll(".otp-box").forEach((m,r,d)=>{m.oninput=()=>{m.value&&d[r+1]&&d[r+1].focus()}}),document.querySelector("#auth-form").onsubmit=async m=>{m.preventDefault();const r=Object.fromEntries(new FormData(m.target));try{if(r.password&&r.confirm&&r.password!==r.confirm)throw new Error("Passwords do not match");if(o){await l("/auth/request-reset",{method:"POST",body:JSON.stringify(r)}),sessionStorage.setItem("reset-email",r.email),b("Code sent."),location.hash="#/verify-otp";return}if(s){const d=[...document.querySelectorAll(".otp-box")].map(p=>p.value).join("");await l("/auth/verify-reset-otp",{method:"POST",body:JSON.stringify({email:sessionStorage.getItem("reset-email"),otp:d})}),location.hash="#/reset-password";return}if(a){await l("/auth/reset-password",{method:"POST",body:JSON.stringify({email:sessionStorage.getItem("reset-email"),password:r.password})}),b("Password reset. Sign in with the new password."),location.hash="#/login";return}try{const d=e?await J(r.name,r.email,r.password):await Z(r.email,r.password);v.token=await G(d.user)}catch(d){console.warn("Firebase auth unavailable, using dev-mode session:",d.message),v.token="development-session"}localStorage.setItem("stocksense-token",v.token),await l("/auth/profile",{method:"POST",body:"{}"}).catch(()=>{}),location.hash="#/dashboard"}catch(d){b(d.message)}}}const W=["login","signup","forgot-password","verify-otp","reset-password"],ie={dashboard:j,products:U,categories:x,warehouses:D,receipts:()=>R("receipts"),deliveries:()=>R("deliveries"),transfers:()=>R("transfers"),adjustments:V,moves:ae,reordering:oe,profile:se};function B(){const t=location.hash.replace("#/","")||"dashboard";if(!v.token&&!W.includes(t)){location.hash="#/login";return}if(W.includes(t))return ne(t);if(t.startsWith("products/"))return X(t.split("/")[1]);(ie[t]||j)()}window.addEventListener("hashchange",B);B();
