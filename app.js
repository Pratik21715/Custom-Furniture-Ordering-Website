const grid=document.getElementById("productGrid");
const furniture=document.getElementById("furniture");
const price=document.getElementById("price");
async function loadProducts(){
 const r=await fetch("/api/products"); const products=await r.json();
 grid.innerHTML=products.map(p=>`<div class="card"><h3>${p.name}</h3><p>${p.category}</p><p>${p.material}</p><p class="price">₹${p.price.toLocaleString("en-IN")}</p><button class="btn" onclick="customize('${p.name}',${p.price})">Customize</button></div>`).join("");
}
function customize(name,p){document.getElementById("custom").scrollIntoView({behavior:"smooth"});furniture.value="Custom "+name.replace("Modern ","").replace("Luxury ","");price.value=p;}
document.getElementById("orderForm").addEventListener("submit",async e=>{
 e.preventDefault();
 const data={customer:customer.value,email:email.value,furniture:furniture.value,material:material.value,color:color.value,dimensions:dimensions.value,quantity:+quantity.value,price:+price.value};
 const r=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
 const x=await r.json(); message.textContent=x.message; if(r.ok){e.target.reset();quantity.value=1;loadOrders();}
});
async function loadOrders(){
 const r=await fetch("/api/orders");const os=await r.json();
 document.getElementById("ordersList").innerHTML=os.length?os.map(o=>`<div class="order"><b>${o.furniture}</b> — ${o.customer}<br>Material: ${o.material} | Size: ${o.dimensions}<br>Qty: ${o.quantity} | ₹${o.price.toLocaleString("en-IN")}</div>`).join(""):"<p style='text-align:center'>No orders yet.</p>";
}
loadProducts();loadOrders();