// const BASE_URL = "http://localhost:8089";
const BASE_URL="https://svp-backend-1.onrender.com"

function getToken() { return localStorage.getItem("svp_token"); }
function getUser()  { return JSON.parse(localStorage.getItem("svp_user") || "null"); }
function isAdmin()  { const u = getUser(); return u && (u.role === "ADMIN" || u.role === "PANCHAYAT"); }
function logout()   { localStorage.removeItem("svp_token"); localStorage.removeItem("svp_user"); window.location.href = "login.html"; }

async function api(method, path, body = null) {
  const opts = { method, headers: { "Content-Type": "application/json" } };
  const token = getToken();
  if (token) opts.headers["Authorization"] = "Bearer " + token;
  if (body)  opts.body = JSON.stringify(body);
  const res  = await fetch(BASE_URL + path, opts);
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Request failed");
  return data.data;
}

async function apiForm(method, path, formData) {
  const opts = { method, headers: {} };
  const token = getToken();
  if (token) opts.headers["Authorization"] = "Bearer " + token;
  opts.body = formData;
  const res  = await fetch(BASE_URL + path, opts);
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Request failed");
  return data.data;
}

function toast(msg, type = "success") {
  const t = document.createElement("div");
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add("out"), 3000);
  setTimeout(() => t.remove(), 3500);
}
function formatDate(d)     { if (!d) return "—"; return new Date(d).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" }); }
function formatDateTime(d) { if (!d) return "—"; return new Date(d).toLocaleString("en-IN",   { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" }); }
function rupee(n)          { return "₹" + Number(n || 0).toLocaleString("en-IN"); }
