const STORAGE_KEY = "findit-campus-reports-v1";
const $ = (id) => document.getElementById(id);
const today = new Date();
$("reportDate").value = today.toISOString().slice(0,10);

const starterReports = [
  {id:"FI-1042",name:"Navy blue water bottle",type:"Lost",category:"Accessories",location:"Central Library — 2nd floor",date:"2026-11-24",description:"Matte navy bottle with a silver cap. Might have been left near the study tables.",resolved:false,created:3},
  {id:"FI-1041",name:"Wireless earbuds case",type:"Found",category:"Electronics",location:"Cafeteria entrance",date:"2026-11-24",description:"White charging case found near the entrance. No earbuds inside.",resolved:false,created:2},
  {id:"FI-1040",name:"Data structures notebook",type:"Lost",category:"Books & Notes",location:"Block C — Room 204",date:"2026-11-23",description:"A5 notebook with a dark green cover and handwritten notes.",resolved:false,created:1},
  {id:"FI-1039",name:"Black umbrella",type:"Found",category:"Other",location:"Main auditorium",date:"2026-11-22",description:"Foldable black umbrella found after the afternoon session.",resolved:true,created:0}
];
let reports;
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  reports = saved ? JSON.parse(saved) : starterReports;
  if (!Array.isArray(reports)) reports = starterReports;
} catch { reports = starterReports; }

function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(reports)); }
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function prettyDate(value){if(!value)return "";return new Date(value+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});}
function iconFor(category){return ({Electronics:"🎧",Accessories:"🎒","Books & Notes":"📚",Clothing:"🧥","Wallets & ID":"👛",Other:"📦"})[category]||"📦";}
function showToast(message){$("toastText").textContent=message; if(window.bootstrap) bootstrap.Toast.getOrCreateInstance($("appToast")).show(); else alert(message);}
function updateStats(){
  $("totalCount").textContent=reports.length;
  $("lostCount").textContent=reports.filter(r=>r.type==="Lost"&&!r.resolved).length;
  $("foundCount").textContent=reports.filter(r=>r.type==="Found"&&!r.resolved).length;
  $("resolvedCount").textContent=reports.filter(r=>r.resolved).length;
}
function render(){
  const query=$("searchInput").value.trim().toLowerCase();
  const status=$("statusFilter").value, category=$("categoryFilter").value;
  const filtered=reports.filter(r=>{
    const haystack=[r.name,r.description,r.location,r.category,r.id].join(" ").toLowerCase();
    const statusMatch=status==="All"||(status==="Resolved"?r.resolved:!r.resolved&&r.type===status);
    return haystack.includes(query)&&statusMatch&&(category==="All"||r.category===category);
  }).sort((a,b)=>(b.created||0)-(a.created||0));
  $("resultCount").textContent=`${filtered.length} report${filtered.length===1?"":"s"}`;
  $("emptyState").classList.toggle("d-none",filtered.length!==0);
  $("reportList").innerHTML=filtered.map(r=>`
    <article class="report-card">
      <div class="item-emoji">${iconFor(r.category)}</div>
      <div class="report-main">
        <div class="report-title-row">
          <h3 class="report-title">${escapeHTML(r.name)}</h3>
          <span class="type-badge ${r.type==="Lost"?"type-lost":"type-found"}">${r.type}</span>
          ${r.resolved?'<span class="resolved-badge">✓ Resolved</span>':""}
        </div>
        <p class="report-description">${escapeHTML(r.description||"No additional description provided.")}</p>
        <div class="report-meta"><span>⌖ ${escapeHTML(r.location)}</span><span>▦ ${prettyDate(r.date)}</span><span>${escapeHTML(r.category)}</span><span>${escapeHTML(r.id)}</span></div>
      </div>
      <div class="report-actions">
        ${r.resolved?`<button class="action-btn" data-action="reopen" data-id="${r.id}">Reopen</button>`:`<button class="action-btn" data-action="resolve" data-id="${r.id}">✓ Resolve</button>`}
        <button class="action-btn delete" data-action="delete" data-id="${r.id}">Delete</button>
      </div>
    </article>`).join("");
  updateStats();
}
$("reportForm").addEventListener("submit",e=>{
  e.preventDefault();
  const fields=["itemName","category","location","reportDate"];
  let valid=true;
  fields.forEach(id=>{const el=$(id);const ok=!!el.value.trim();el.classList.toggle("is-invalid",!ok);if(!ok)valid=false;});
  if(!valid){$("formMessage").textContent="Please complete all required fields.";return;}
  const id="FI-"+String(Date.now()).slice(-6);
  reports.unshift({id,name:$("itemName").value.trim(),type:$("itemType").value,category:$("category").value,location:$("location").value.trim(),date:$("reportDate").value,description:$("description").value.trim(),resolved:false,created:Date.now()});
  save();render();e.target.reset();$("reportDate").value=today.toISOString().slice(0,10);$("formMessage").textContent="";
  showToast(`Report ${id} published successfully.`);
  window.scrollTo({top:document.querySelector(".listing-panel").offsetTop-20,behavior:"smooth"});
});
["searchInput","statusFilter","categoryFilter"].forEach(id=>$(id).addEventListener(id==="searchInput"?"input":"change",render));
$("clearFilters").addEventListener("click",()=>{$("searchInput").value="";$("statusFilter").value="All";$("categoryFilter").value="All";render();});
$("reportList").addEventListener("click",e=>{
  const btn=e.target.closest("button[data-action]");if(!btn)return;
  const {action,id}=btn.dataset;const item=reports.find(r=>r.id===id);if(!item)return;
  if(action==="resolve"){item.resolved=true;showToast("Report marked as resolved.");}
  if(action==="reopen"){item.resolved=false;showToast("Report reopened.");}
  if(action==="delete"){if(!confirm("Delete this report permanently?"))return;reports=reports.filter(r=>r.id!==id);showToast("Report deleted.");}
  save();render();
});
render();
