async function searchUser() {
  const name = document.getElementById("username").value.trim();
  const result = document.getElementById("result");

  if (!name) {
    result.innerHTML = `<p class="text-red-500">⚠️ Lütfen bir kullanıcı adı yaz.</p>`;
    return;
  }

  result.innerHTML = "🔍 Yükleniyor...";

  try {
    // Roblox API'den kullanıcı bilgilerini al
    const res = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernames: [name] })
    });
    const data = await res.json();
    const user = data.data[0];

    if (!user) throw new Error("Kullanıcı bulunamadı.");

    // Avatar resmi al
    const avatarRes = await fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${user.id}&size=420x420&format=Png&isCircular=true`);
    const avatarData = await avatarRes.json();
    const avatarUrl = avatarData.data[0].imageUrl;

    // Sonuçları göster
    result.innerHTML = `
      <div class="bg-gray-800 p-6 rounded shadow-lg">
        <img src="${avatarUrl}" class="mx-auto w-32 h-32 rounded-full mb-4" />
        <h2 class="text-xl font-bold">${user.displayName}</h2>
        <p class="text-gray-300">@${user.username}</p>
        <p class="text-sm">ID: ${user.id}</p>
        <a href="https://www.roblox.com/users/${user.id}/profile" target="_blank" class="text-blue-400 underline block mt-2">Roblox Profilini Aç</a>
      </div>
    `;
  } catch (err) {
    result.innerHTML = `<p class="text-red-500">🚫 ${err.message}</p>`;
  }
}
