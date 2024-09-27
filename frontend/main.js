// Load Example A - Pre-fill sequences and trigger process
document.getElementById('load-example-a').addEventListener('click', () => {
    document.getElementById('per-sequence-tab').click();
    document.getElementById('genomic_seq').value = 'ATGCGT...';  // Example A genomic
    document.getElementById('coding_seq').value = 'ATGCGT...';   // Example A coding
    document.getElementById('hit_seq').value = 'TGA...';         // Example A hit
    document.getElementById('process-per-sequence').click();
});

// Load Example B - Pre-fill sequences and trigger process
document.getElementById('load-example-b').addEventListener('click', () => {
    document.getElementById('per-sequence-tab').click();
    document.getElementById('genomic_seq').value = 'CGTACG...';  // Example B genomic
    document.getElementById('coding_seq').value = 'CGTACG...';   // Example B coding
    document.getElementById('hit_seq').value = 'CGT...';         // Example B hit
    document.getElementById('process-per-sequence').click();
});

// Helper functions for sliders and inputs
function updateNumberInput(value) {
    document.getElementById('minislac_length_input').value = value;
}

function updateSliderInput(value) {
    const slider = document.getElementById('minislac_length');
    const numericValue = parseInt(value);
    if (numericValue >= slider.min && numericValue <= slider.max) {
        slider.value = numericValue;
    }
}

// Event listeners for processing buttons
document.getElementById('process-per-sequence').addEventListener('click', async () => {
    const hit_seq = document.getElementById('hit_seq').value.trim();
    const full_ref_seq = document.getElementById('genomic_seq').value.trim();
    const ref_context_seq = document.getElementById('coding_seq').value.trim();

    try {
        const response = await fetch('/slac-3-input', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hit_seq, full_ref_seq, ref_context_seq })
        });

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error processing 3-sequence input:', error);
    }
});

document.getElementById('process-fasta-text').addEventListener('click', async () => {
    const fasta_text = document.getElementById('fasta_text').value.trim();

    try {
        const response = await fetch('/slac-paste-fasta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fasta_text })
        });

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error processing FASTA text input:', error);
    }
});

document.getElementById('process-fasta-upload').addEventListener('click', async () => {
    const fasta_file = document.getElementById('fasta_file').files[0];
    if (!fasta_file) {
        alert('Please upload a FASTA file.');
        return;
    }

    const formData = new FormData();
    formData.append('fasta_file', fasta_file);

    try {
        const response = await fetch('/slac-upload-fasta', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error processing FASTA file upload:', error);
    }
});

// Function to display results
function displayResults(data) {
    document.getElementById('minislac_output').textContent = data.mini_slac;
    document.getElementById('fullslac_output').value = data.full_slac;
    document.getElementById('seqslac_output').value = data.seq_slac;
    console.log('Processing time: ', data.time);
}
