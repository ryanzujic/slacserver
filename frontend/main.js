document.getElementById('submit-3-seq-button').addEventListener('click', async () = {
    const hit_seq = document.getElementById('hit_seq').value;
    const full_ref_seq = document.getElementById('full_ref_seq').value;
    const ref_context_seq = document.getElementById('ref_context_seq').value;

    const response = await fetch('https://slacserver.vercel.app/generate-slac', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hit_seq, full_ref_seq, ref_context_seq })
    });

    const data = await response.json();
    document.getElementById('result').textContent = data.result;

});