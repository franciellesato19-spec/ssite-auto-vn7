const express = require("express");
const app = express();

app.use(express.json());

let total = 0;

app.get("/", (req, res) => {
  res.send(`
    <h1>Auto VN7</h1>
    <input id="u" placeholder="username">
    <button onclick="g()">Generate</button>
    <p id="t"></p>

    <script>
      async function g(){
        let u = document.getElementById('u').value;

        let r = await fetch('/generate', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({username:u})
        });

        let d = await r.json();
        alert(d.script);

        let s = await fetch('/stats');
        let j = await s.json();
        document.getElementById('t').innerText = "Total: " + j.total;
      }
    </script>
  `);
});

app.post("/generate", (req, res) => {
  const { username } = req.body;

  if (!username) return res.json({ error: "sem username" });

  total++;

  res.json({
    script: "Rodando para " + username
  });
});

app.get("/stats", (req, res) => {
  res.json({ total });
});

app.listen(3000, () => {
  console.log("🔥 http://localhost:3000");
});