export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Yalnızca POST");

  const { username } = req.body;

  try {
    const userRes = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernames: [username] })
    });

    const data = await userRes.json();
    const user = data.data[0];

    if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı." });

    const avatarRes = await fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${user.id}&size=420x420&format=Png&isCircular=true`);
    const avatarData = await avatarRes.json();
    const avatar = avatarData.data[0].imageUrl;

    res.status(200).json({
      username: user.username,
      displayName: user.displayName,
      id: user.id,
      avatar: avatar
    });
  } catch (e) {
    res.status(500).json({ error: "API hatası" });
  }
}
