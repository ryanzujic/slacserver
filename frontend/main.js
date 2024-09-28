// Example of a gene's hit against its source (reference) genome
const dna_example_a_genomic = 'TGAATATTATTCTAATTTAACTAATGGCCTTAAACTTGGATACTTATGCAATTAATTAAGTTAGATACTTCAGAAAGAGAACTTTAACTATCCTAATAATCATATTCAAGTCAAACAAGATTCTATTTCCTAGAATATACATGCGAAGTAAAAAAAATGACACTATAATTGATTTTAGCATTTATTATATTTTATCATCATTGAGTGAGACTAATTTTGCTCTTATAAAAACATTTATGCCATACCAATCGACCCCATTTAAGGTTGATGATAGTGCAGCCATGCAGGGAAAGTAAACCCAAATAATAGTACGAAGTAGCTAGGCATAAAAAACTTCAAACAATATATTGTTCTCCCACTATCTAAAAACAAGAAGCCCGGCCCCCATTTTGTGGAGACCACGTATATACTCCAGTAAACAAAAGATATTTAGTCCTCAAATTAACTTTATCCCATGTCAGTGTATGGTATATTCTTAATAATTTTTTGCGGGGTACCCTCACATCATATGAATTTCTCCTTTTTTTTTGTATACCTCAAAACATGTGTTTTCCTTAATATTGCCATAAGCTAACAAAAGCATGGTAGCTAATACTTTTTCTCGATCTAAACCTGCATGTTTACCACTTTCATGAAACAAAAACTATGAACTATTCTTCGGGCTTTTTCATCATTCTTCTTCTGCTGCTATCCCATTTCTTCCCATATTCAAGCTCGAGCATGAGAATAATGATTCAGCAAGTCACCAAAGCAGCAACAGAAAATCACCATCACATGGTAAGTATATAATTTCTTTGATATGATCCGTAATCACTTTTTATTTTTTATAAGCAAGAGGAGCTTTTAAGTTCCTATCATGTTTTCTCTTCTTTTTTTTTTTTGGGTGAAGTTATCATGTTTTCTTTCGTGCCAGTCAAGAGGAGCTGAGAGGGATCATGTTCAAAGGAAAGCATTGCATGAAGTACACTCAGGACCTAATCCTATCAGTAACTCCATTCCACAACAGAAGTTGAAAAATATACAAAGAAATCATATGCATTAGGTCTTCTTTTGTATGTTAATTATTTTTTCCTTTTCTGTTCTTTGTTCTTTCTTTCCCTCCCTTCCTCATATTTGTTACACATATTTCATGAGTCAGCTTTGAATCATGCATAATGAATCTACATTCAGATTGATGCATAACTATAGCTAGCATGACCATCTTCAGTTCTTCACTCTTTTCATTGTGTTATACTGTTATTATCCCTCCCTCCCTCCCTCCCTCCCTCATTTTTCTTTGCGTATAAATTTCAAT'
const dna_example_a_coding = '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ATGAACTATTCTTCGGGCTTTTTCATCATTCTTCTTCTGCTGCTATCCCATTTCTTCCCATATTCAAGCTCGAGCATGAGAATAATGATTCAGCAAGTCACCAAAGCAGCAACAGAAAATCACCATCACAT----------------------------------------------------------------------------------------------------------------------------------------GTCAAGAGGAGCTGAGAGGGATCATGTTCAAAGGAAAGCATTGCATGAAGTACACTCAGGACCTAATCCTATCAGTAACTCCATTCCACAACAGAAGTTGAAAAATATACAAAGAAATCATATGCATTAG------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------'
const dna_example_a_hit = 'TGAATATTATTCTAATTTAACTAATGGCCTTAAACTTGGATACTTATGCAATTAATTAAGTTAGATACTTCAGAAAGAGAACTTTAACTATCCTAATAATCATATTCAAGTCAAACAAGATTCTATTTCCTAGAATATACATGCGAAGTAAAAAAAATGACACTATAATTGATTTTAGCATTTATTATATTTTATCATCATTGAGTGAGACTAATTTTGCTCTTATAAAAACATTTATGCCATACCAATCGACCCCATTTAAGGTTGATGATAGTGCAGCCATGCAGGGAAAGTAAACCCAAATAATAGTACGAAGTAGCTAGGCATAAAAAACTTCAAACAATATATTGTTCTCCCACTATCTAAAAACAAGAAGCCCGGCCCCCATTTTGTGGAGACCACGTATATACTCCAGTAAACAAAAGATATTTAGTCCTCAAATTAACTTTATCCCATGTCAGTGTATGGTATATTCTTAATAATTTTTTGCGGGGTACCCTCACATCATATGAATTTCTCCTTTTTTTTTGTATACCTCAAAACATGTGTTTTCCTTAATATTGCCATAAGCTAACAAAAGCATGGTAGCTAATACTTTTTCTCGATCTAAACCTGCATGTTTACCACTTTCATGAAACAAAAACTATGAACTATTCTTCGGGCTTTTTCATCATTCTTCTTCTGCTGCTATCCCATTTCTTCCCATATTCAAGCTCGAGCATGAGAATAATGATTCAGCAAGTCACCAAAGCAGCAACAGAAAATCACCATCACATGGTAAGTATATAATTTCTTTGATATGATCCGTAATCACTTTTTATTTTTTATAAGCAAGAGGAGCTTTTAAGTTCCTATCATGTTTTCTCTTCTTTTTTTTTTTTGGGTGAAGTTATCATGTTTTCTTTCGTGCCAGTCAAGAGGAGCTGAGAGGGATCATGTTCAAAGGAAAGCATTGCATGAAGTACACTCAGGACCTAATCCTATCAGTAACTCCATTCCACAACAGAAGTTGAAAAATATACAAAGAAATCATATGCATTAGGTCTTCTTTTGTATGTTAATTATTTTTTCCTTTTCTGTTCTTTGTTCTTTCTTTCCCTCCCTTCCTCATATTTGTTACACATATTTCATGAGTCAGCTTTGAATCATGCATAATGAATCTACATTCAGATTGATGCATAACTATAGCTAGCATGACCATCTTCAGTTCTTCACTCTTTTCATTGTGTTATACTGTTATTATCCCTCCCTCCCTCCCTCCCTCCCTCATTTTTCTTTGCGTATAAATTTCAAT'

// Example of a gene hit against a non-reference genome with extensive polymorphisms
const dna_example_b_genomic = 'TGAATATTATTCTAATTTAACTAATGGCCTTAAACTTGGATACTTATGCAATTAATTAAGTTAGATACTTCAGAAAGAGAACTTTAACTATCCTAATAATCATATTCAAGTCAAACAAGATTCTATTTCCTAGAATATACATGCGAAGTAAAAAAAATGACACTATAATTGATTTTAGCATTTATTATATTTTATCATCATTGAGTGAGACTAATTTTGCTCTTATAAAAACATTTATGCCATACCAATCGACCCCATTTAAGGTTGATGATAGTGCAGCCATGCAGGGAAAGTAAACCCAAATAATAGTACGAAGTAGCTAGGCATAAAAAACTTCAAACAATATATTGTTCTCCCACTATCTAAAAACAAGAAGCCCGGCCCCCATTTTGTGGAGACCACGTATATACTCCAGTAAACAAAAGATATTTAGTCCTCAAATTAACTTTATCCCATGTCAGTGTATGGTATATTCTTAATAATTTTTTGCGGGGTACCCTCACATCATATGAATTTCTCCTTTTTTTTTGTATACCTCAAAACATGTGTTTTCCTTAATATTGCCATAAGCTAACAAAAGCATGGTAGCTAATACTTTTTCTCGATCTAAACCTGCATGTTTACCACTTTCATGAAACAAAAACTATGAACTATTCTTCGGGCTTTTTCATCATTCTTCTTCTGCTGCTATCCCATTTCTTCCCATATTCAAGCTCGAGCATGAGAATAATGATTCAGCAAGTCACCAAAGCAGCAACAGAAAATCACCATCACATGGTAAGTATATAATTTCTTTGATATGATCCGTAATCACTTTTTATTTTTTATAAGCAAGAGGAGCTTTTAAGTTCCTATCATGTTTTCTCTTCTTTTTTTTTTTTGGGTGAAGTTATCATGTTTTCTTTCGTGCCAGTCAAGAGGAGCTGAGAGGGATCATGTTCAAAGGAAAGCATTGCATGAAGTACACTCAGGACCTAATCCTATCAGTAACTCCATTCCACAACAGAAGTTGAAAAATATACAAAGAAATCATATGCATTAGGTCTTCTTTTGTATGTTAATT-ATT------------------------------TTTTCCTTTTCTGTTCTTTGTTCTTTCTTTCCCTCCCTTCCTCATATTTGTTACACATATTTCATGAGTCAGCTTTGAATCATGCATAATGAATCTACATTCAGATTGATGCATAACTATAGCTAGCATGACCATCTTCAGTTCTTCACTCTTTTCATTGTGTTATACTGTTATTATCCCTCCCTCCCTCCCTCCCTCCCTCATTTTTCTTTGCGTATAAATTTCAAT'
const dna_example_b_coding = '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ATGAACTATTCTTCGGGCTTTTTCATCATTCTTCTTCTGCTGCTATCCCATTTCTTCCCATATTCAAGCTCGAGCATGAGAATAATGATTCAGCAAGTCACCAAAGCAGCAACAGAAAATCACCATCACAT----------------------------------------------------------------------------------------------------------------------------------------GTCAAGAGGAGCTGAGAGGGATCATGTTCAAAGGAAAGCATTGCATGAAGTACACTCAGGACCTAATCCTATCAGTAACTCCATTCCACAACAGAAGTTGAAAAATATACAAAGAAATCATATGCATTAG-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------'
const dna_example_b_hit = 'TGAATATTATTCTAATTTAACTAATGGCCTTAAACTTGGATACTTATGCAATTAATTAAGTTAGATACTTCAGAAAGAGAACTTTAACTATCCTAATAATCATATTCAAGTCAAACAAGATTCTATTTCCTAGAATATACATGCGAAGTAAAAAAAATGACACTATAATTGATTTTAGCATTTATTATATTTTATCATCATTGAGTGAGAATAATTTTGCTCTTATAAAAACATTTATGCCATACCAATCGACCCCATTTAAGGTTGATGATAGTGCAGCCATGCAGGGAAAGTAAACCCAAATAATAGTACGAAGTAGCTAGGCATAAAAAACTTCAAACAATATATTGTTCTCCCACTATCTAAAAACAAGAAGCCCGGCCCCCATTTTGTGGAGACCACGTATATACTCCA--------------------------------------------------------------------------------------------------------------------------------------------------------------------------GTAGCTAATACTTTTTCTCGATCTAAACCTGCATGTTTACCACTTTCATGAAACAAAAACTATGAACTATTCTTCGGGCTTTTTCATCATTCTTCTTCTGCTGCTATACCATTTCTTCCCATATTCAAGCTCGAGCATGAGAATAATGATTCAGCAAGTCACCAAAGCAGCAACAGAAAATCACCATCACATGGTAAGTATATAATTTCTTTGATATGATCCATAATCACTTTTTATTTTTTATAAGCAAGAGGAGCTTTTAAGTTCCTATCATGTTTTCTCTTC--TTTTTTTCTTGGGTGAAGTTATCATGTTTTCTTTCGTGCCAGTCAAGAGGAGCTGAGAGGGATCATGTTCAAAGGAAAGCATTGCATGAAGTACACTCAGGACCTAATCCTATCAGTAACTCCATTCCACAACAGAAGTTGAAAAATATACAAAGAAATCATATGCATTAGGTCTTCTTTTGTATGTTAATTAATTATTTTTTCCTTTTCTTAATAGTAAACTCTCTTTTCCTTTTCTGTTCTTTGTTCTTTCTTTCCCTCCCTTCCTCATATTTGTTACACATATTTCATGAGTCAGCTTTGAATCATGCATAATGAATATAAATTCAGATTGATGCATAACTATAGCTAGCATGACCATCTTCAGTTCTTCACTCTTTTCATTGTGTTATACTGTTATTATCCCTCCCTCCCTCCCT--CT--CTCATTTTTCTTTGCGTATAAATTTCAAT'

// Load Example A - Pre-fill sequences and trigger process
document.getElementById('load-example-a').addEventListener('click', () => {
    document.getElementById('per-sequence-tab').click();
    document.getElementById('genomic_seq').value = dna_example_a_genomic;  // Example A genomic
    document.getElementById('coding_seq').value = dna_example_a_coding;   // Example A coding
    document.getElementById('hit_seq').value = dna_example_a_hit;         // Example A hit
    document.getElementById('process-per-sequence').click();
});

// Load Example B - Pre-fill sequences and trigger process
document.getElementById('load-example-b').addEventListener('click', () => {
    document.getElementById('per-sequence-tab').click();
    document.getElementById('genomic_seq').value = dna_example_b_genomic;  // Example B genomic
    document.getElementById('coding_seq').value = dna_example_b_coding;   // Example B coding
    document.getElementById('hit_seq').value = dna_example_b_hit;         // Example B hit
    document.getElementById('process-per-sequence').click();
});

// Helper functions for sliders and inputs
function updateNumberInput(value) {
    document.getElementById('mini_slac_length_input').value = value;
}

function updateSliderInput(value) {
    const slider = document.getElementById('mini_slac_length');
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
    const mini_slac_length = document.getElementById('mini_slac_length').value;

    updateLog('Processing... Please wait.', 'info');

    try {
        const startTime = performance.now();
        const response = await fetch('https://slacserver.vercel.app/slac-3-input', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hit_seq, full_ref_seq, ref_context_seq, mini_slac_length })
        });

        const endTime = performance.now();
        const elapsedTime = (endTime - startTime).toFixed(2);

        if (response.ok) {
            const data = await response.json();
            updateLog(`Finished in ${elapsedTime} ms`, 'success');
            displayResults(data);
        } else {
            const errorData = await response.json();
            updateLog(`Error: ${errorData.error}`, 'danger');  // Backend error display
        }
    } catch (error) {
        console.error('Error processing request:', error);
        updateLog('An unexpected error occurred processing per sequence. Please review your inputs and try again later', 'danger');
    }
});

document.getElementById('process-fasta-text').addEventListener('click', async () => {
    const fasta_text = document.getElementById('fasta_text').value.trim();
    const mini_slac_length = document.getElementById('mini_slac_length').value;

    updateLog('Processing... Please wait.', 'info');

    try {
        const startTime = performance.now();
        const response = await fetch('https://slacserver.vercel.app/slac-paste-fasta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fasta_text, mini_slac_length })
        });

        const endTime = performance.now();
        const elapsedTime = (endTime - startTime).toFixed(2);

        if (response.ok) {
            const data = await response.json();
            updateLog(`Finished in ${elapsedTime} ms`, 'success');
            displayResults(data);
        } else {
            const errorData = await response.json();
            updateLog(`Error: ${errorData.error}`, 'danger');  // Backend error display
        }
    } catch (error) {
        console.error('Error processing request:', error);
        updateLog('An unexpected error occurred processing FASTA text. Please review your inputs and try again later', 'danger');
    }
});

document.getElementById('process-fasta-upload').addEventListener('click', async () => {
    const fasta_file = document.getElementById('fasta_file').files[0];
    const mini_slac_length = document.getElementById('mini_slac_length').value;

    if (!fasta_file) {
        alert('Please upload a FASTA file.');
        return;
    }

    const formData = new FormData();
    formData.append('fasta_file', fasta_file);  // Append the file
    formData.append('mini_slac_length', mini_slac_length);  // Append the mini_slac_length


    updateLog('Processing... Please wait.', 'info');

    try {
        const response = await fetch('https://slacserver.vercel.app/slac-upload-fasta', {
            method: 'POST',
            body: formData
        });

        const endTime = performance.now();
        const elapsedTime = (endTime - startTime).toFixed(2);

        if (response.ok) {
            const data = await response.json();
            updateLog(`Finished in ${elapsedTime} ms`, 'success');
            displayResults(data);
        } else {
            const errorData = await response.json();
            updateLog(`Error: ${errorData.error}`, 'danger');  // Backend error display
        }
    } catch (error) {
        console.error('Error processing request:', error);
        updateLog('An unexpected error occurred processing the file. Please review your inputs and try again later', 'danger');
    }
});

// Helper function to update the log message
function updateLog(message, type = 'info') {
    const logAlert = document.getElementById('log_alert');
    logAlert.textContent = message;

    // Remove any existing alert-* classes (for type consistency)
    logAlert.className = 'alert alert-' + type;
}

// Function to display results
function displayResults(data) {
    document.getElementById('minislac_output').textContent = data.mini_slac;
    document.getElementById('fullslac_output').value = data.full_slac;
    document.getElementById('seqslac_output').value = data.seq_slac;
    console.log('Processing time: ', data.time);
}
