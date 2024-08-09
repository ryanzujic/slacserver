document.getElementById('submit-3-seq-button').addEventListener('click', async () => {
    const hit_seq = document.getElementById('hit_seq').value;
    const full_ref_seq = document.getElementById('full_ref_seq').value;
    const ref_context_seq = document.getElementById('ref_context_seq').value;
    const button = document.getElementById('submit-3-seq-button');
    const statusDiv = document.getElementById('status');
    const resultDiv = document.getElementById('result');

    // Validate inputs. At least hit and full_ref_seq are required.
    if (!hit_seq || !full_ref_seq) {
        statusDiv.textContent = 'Please provide hit and full reference sequences at a minimum.';
        return;
    }

    // All provided sequences provided must be the same length. Ref context sequence is optional but must be equal
    // in length to the hit and full reference sequences if provided.
    if (hit_seq.length !== full_ref_seq.length) {
        statusDiv.textContent = 'Hit and full reference sequences must be the same length.';
        return;
    }
    if (ref_context_seq && ref_context_seq.length !== hit_seq.length) {
        statusDiv.textContent = 'Ref context sequence must be the same length as hit and full reference sequences.';
        return;
    }

    button.disabled = true;
    button.textContent = 'Loading...';
    statusDiv.textContent = 'Sending sequences to server...';
    resultDiv.textContent = '';

    try {
            const response = await fetch('https://slacserver.vercel.app/generate-slac', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ hit_seq, full_ref_seq, ref_context_seq })
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}')
            }

            const data = await response.json();
            resultDiv.textContent = 'SLAC: ${data.result}';
            // In status dialog show time taken to process the request.
            statusDiv.textContent = `Completed in ${data.time}s.`;
    } catch (error) {
    statusDiv.textContent = 'Error: ${error.message}';
    } finally {
        // Re-enable button and reset text
        button.disabled = false;
        button.textContent = 'Submit';
    }

});