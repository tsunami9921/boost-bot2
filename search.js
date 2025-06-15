async function searchUser() {
  const username = document.getElementById("username").value.trim();
  const result = document.getElementById("result");

  if (!username) {
    result.innerHTML = `<p class="text-red-500">⚠️ Kullanıcı adı boş olamaz.</p>`;
    return;
  }

  result.innerHTML = "⏳ Aranıyor...";

  try {
    const res = await fetch("/api-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Hata");

    result.innerHTML = `
      <div class="bg-gray-800 p-6 rounded shadow-lg">
        <img src="${data.avatar}" class="mx-auto w-32 h-32 rounded-full mb-4" />
        <h2 class="text-xl font-bold">${data.displayName}</h2>
        <p class="text-gray-300">@${data.username}</p>
        <p class="text-sm">ID: ${data.id}</p>
        <a href="https://www.roblox.com/users/${data.id}/profile" target="_blank" class="text-blue-400 underline block mt-2">Profili Aç</a>
      </div>
    `;
  } catch (err) {
    result.innerHTML = `<p class="text-red-500">🚫 ${err.message}</p>`;
  }
}
