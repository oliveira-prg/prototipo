
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script>
    const bairros = {
      "Centro": [-3.1316, -60.0239],
      "Adrianópolis": [-3.1013, -60.0101],
      "Alvorada": [-3.0901, -60.0464],
      "Aparecida": [-3.1333, -60.0236],
      "Cidade Nova": [-3.0467, -59.9806],
      "Compensa": [-3.1061, -60.0658],
      "Dom Pedro": [-3.0961, -60.0326],
      "Japiim": [-3.1183, -59.9942],
      "Ponta Negra": [-3.0827, -60.1403],
      "Tarumã": [-3.0208, -60.1053]
    };

    const toxidades = {
      "Centro": 2,
      "Adrianópolis": 1,
      "Alvorada": 3,
      "Aparecida": 2,
      "Cidade Nova": 1,
      "Compensa": 4,
      "Dom Pedro": 3,
      "Japiim": 2,
      "Ponta Negra": 1,
      "Tarumã": 5
    };

    const map = L.map('mapaManaus').setView([-3.119, -60.021], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    for (const bairro in bairros) {
      const coords = bairros[bairro];
      const nivel = toxidades[bairro];
      const cor = ["#4caf50", "#ffeb3b", "#ff9800", "#f44336", "#b71c1c"][nivel - 1];
      L.circle(coords, {
        color: cor,
        fillColor: cor,
        fillOpacity: 0.5,
        radius: 500
      }).addTo(map).bindPopup(`${bairro}: Nível de toxidade ${nivel}`);
    }

    function analisarBairro() {
      const bairro = document.getElementById("bairro").value;
      const nivel = toxidades[bairro];
      document.getElementById("resultado").innerHTML =
        nivel ? `O nível de toxidade em <strong>${bairro}</strong> é <strong>${nivel}</strong>.` : "Bairro não encontrado.";
    }

    function localizarUsuario() {
      navigator.geolocation?.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        map.setView([lat, lon], 14);
        L.marker([lat, lon]).addTo(map).bindPopup("📍 Você está aqui!").openPopup();
      }, () => alert("Não foi possível localizar sua posição."));
    }

    function fazerLogin() {
      const usuario = document.getElementById("usuario").value;
      const senha = document.getElementById("senha").value;
      if (usuario === "admin" && senha === "1234") {
        document.getElementById("inicio").style.display = "none";
        document.getElementById("telaLogin").classList.add("escondido");
        document.getElementById("barraPerfil").classList.remove("escondido");
      } else {
        document.getElementById("erroLogin").textContent = "Usuário ou senha incorretos!";
      }
    }

    function realizarCadastro() {
      const senha = document.getElementById("senhaCadastro").value;
      const confirmar = document.getElementById("confirmarSenhaCadastro").value;
      const erro = document.getElementById("erroCadastro");
      if (senha !== confirmar) {
        erro.textContent = "As senhas não coincidem!";
      } else {
        alert("Cadastro realizado!");
        document.getElementById("modalCadastro").classList.add("escondido");
        document.getElementById("inicio").style.display = "none";
        document.getElementById("barraPerfil").classList.remove("escondido");
      }
    }

    function abrirLogin() {
      document.getElementById("inicio").style.display = "none";
      document.getElementById("telaLogin").classList.add("show");
    }

    function abrirCadastro() {
      document.getElementById("inicio").style.display = "none";
      document.getElementById("modalCadastro").classList.add("show");
    }

    function entrarComoVisitante() {
      document.getElementById("inicio").style.display = "none";
      document.getElementById("barraPerfil").classList.remove("escondido");
    }

    function alternarModo() {
      const body = document.body;
      const isDark = body.classList.toggle("dark-mode");
      body.classList.toggle("light-mode", !isDark);
      localStorage.setItem("modoEscuro", isDark ? "true" : "false");
    }

    function confirmarSaida() {
      Swal.fire({
        title: 'Tem certeza?',
        text: "Você deseja sair do AcquaVig?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00796b',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, sair',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
    }

    window.addEventListener("DOMContentLoaded", () => {
      const preferencia = localStorage.getItem("modoEscuro");
      if (preferencia === "true") {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
      } else {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
      }

      const ctx = document.getElementById('graficoToxidade').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(toxidades),
          datasets: [{
            label: 'Nível de Toxidade',
            data: Object.values(toxidades),
            backgroundColor: Object.values(toxidades).map(n => ["#4caf50", "#ffeb3b", "#ff9800", "#f44336", "#b71c1c"][n - 1])
          }]
        },
        options: {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      max: 10, // AUMENTADO DE 5 PARA 10
      title: {
        display: true,
        text: 'Nível'
      }
    }
  }
}

      });
    });
  </script>
