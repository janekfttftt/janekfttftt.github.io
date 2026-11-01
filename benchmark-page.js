(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const button = $("bench-run");
  const results = $("bench-results");

  function runOnce(code, input, timeoutMs = 2000) {
    return new Promise((resolve, reject) => {
      const frame = document.createElement("iframe");
      frame.setAttribute("sandbox", "allow-scripts");
      frame.setAttribute("aria-hidden", "true");
      frame.style.display = "none";
      frame.srcdoc = `<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; connect-src 'none'; img-src 'none'; form-action 'none'; navigate-to 'none'"><script>
        addEventListener('message', (event) => {
          if (event.source !== parent || event.data?.type !== 'run') return;
          try {
            const fn = new Function('input', '\"use strict\";\\n' + event.data.code);
            const started = performance.now();
            const result = fn(event.data.input);
            const duration = performance.now() - started;
            let json;
            try { json = JSON.stringify(result); } catch (_) { throw new Error('Wynik nie może zostać zapisany jako JSON.'); }
            parent.postMessage({ type: 'done', id: event.data.id, result: json === undefined ? String(result) : json, duration }, '*');
          } catch (error) { parent.postMessage({ type: 'error', id: event.data.id, message: String(error.message || error) }, '*'); }
        });
        parent.postMessage({ type: 'ready' }, '*');
      <\/script>`;
      const id = Math.random().toString(36).slice(2);
      const finish = (fn, value) => { clearTimeout(timer); removeEventListener("message", onMessage); frame.remove(); fn(value); };
      const timer = setTimeout(() => finish(reject, new Error("Przekroczono limit 2 sekund. Sprawdź, czy pętla się kończy.")), timeoutMs);
      const onMessage = (event) => {
        if (event.source !== frame.contentWindow) return;
        if (event.data?.type === "ready") frame.contentWindow.postMessage({ type: "run", id, code, input }, "*");
        if (event.data?.type === "done" && event.data.id === id) finish(resolve, { result: event.data.result, duration: event.data.duration });
        if (event.data?.type === "error" && event.data.id === id) finish(reject, new Error(event.data.message));
      };
      addEventListener("message", onMessage);
      document.body.appendChild(frame);
    });
  }

  async function measure(code, input, reps) {
    let last;
    const samples = [];
    for (let i = 0; i < reps; i++) {
      last = await runOnce(code, input);
      samples.push(last.duration);
    }
    samples.sort((a, b) => a - b);
    const median = samples.length % 2 ? samples[(samples.length - 1) / 2] : (samples[samples.length / 2 - 1] + samples[samples.length / 2]) / 2;
    return { result: last.result, min: samples[0], median, max: samples[samples.length - 1] };
  }

  button.addEventListener("click", async () => {
    button.disabled = true;
    results.textContent = "Trwa pomiar…";
    try {
      const input = JSON.parse($("bench-input").value);
      const reps = Number($("bench-reps").value);
      if (!Number.isInteger(reps) || reps < 1 || reps > 100) throw new Error("Liczba powtórzeń musi być od 1 do 100.");
      const a = await measure($("bench-a").value, input, reps);
      const b = await measure($("bench-b").value, input, reps);
      const same = a.result === b.result;
      results.replaceChildren();
      const heading = document.createElement("h2");
      heading.textContent = same ? "Wyniki są zgodne" : "Wyniki się różnią — porównaj je przed oceną czasu";
      results.append(heading);
      for (const [name, data] of [["Wariant A", a], ["Wariant B", b]]) {
        const p = document.createElement("p");
        p.textContent = `${name}: wynik ${data.result}; mediana ${data.median.toFixed(3)} ms (min ${data.min.toFixed(3)}, max ${data.max.toFixed(3)})`;
        results.append(p);
      }
    } catch (error) {
      results.textContent = `Nie udało się wykonać pomiaru: ${error.message}`;
    } finally { button.disabled = false; }
  });
})();

