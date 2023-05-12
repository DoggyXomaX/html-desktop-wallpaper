const getAudio = () => new Promise(async (ok, err) => {
  try {
    document.body.innerText += JSON.stringify(window.AudioContext || window.webkitAudioContext);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    ok(stream);
  } catch (e) {
    err(e);
  }
});

document.body.innerText += 'Lol?';

window.onload = () => {
  getAudio().then((stream) => {
    const div = document.createElement('div');
    div.innerText = JSON.stringify(stream) + "\nOkay?";
    document.body.appendChild(div);
  }).catch((err) => {
    const p = document.createElement('p');
    p.innerText = err.message;
    document.body.appendChild(p);
  });
}