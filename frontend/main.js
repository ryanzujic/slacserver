// Example of a gene's hit against its source (reference) genome
const EXAMPLE_A_GENOMIC_SEQ = 'TGAATATTATTCTAATTTAACTAATGGCCTTAAACTTGGATACTTATGCAATTAATTAAGTTAGATACTTCAGAAAGAGAACTTTAACTATCCTAATAATCATATTCAAGTCAAACAAGATTCTATTTCCTAGAATATACATGCGAAGTAAAAAAAATGACACTATAATTGATTTTAGCATTTATTATATTTTATCATCATTGAGTGAGACTAATTTTGCTCTTATAAAAACATTTATGCCATACCAATCGACCCCATTTAAGGTTGATGATAGTGCAGCCATGCAGGGAAAGTAAACCCAAATAATAGTACGAAGTAGCTAGGCATAAAAAACTTCAAACAATATATTGTTCTCCCACTATCTAAAAACAAGAAGCCCGGCCCCCATTTTGTGGAGACCACGTATATACTCCAGTAAACAAAAGATATTTAGTCCTCAAATTAACTTTATCCCATGTCAGTGTATGGTATATTCTTAATAATTTTTTGCGGGGTACCCTCACATCATATGAATTTCTCCTTTTTTTTTGTATACCTCAAAACATGTGTTTTCCTTAATATTGCCATAAGCTAACAAAAGCATGGTAGCTAATACTTTTTCTCGATCTAAACCTGCATGTTTACCACTTTCATGAAACAAAAACTATGAACTATTCTTCGGGCTTTTTCATCATTCTTCTTCTGCTGCTATCCCATTTCTTCCCATATTCAAGCTCGAGCATGAGAATAATGATTCAGCAAGTCACCAAAGCAGCAACAGAAAATCACCATCACATGGTAAGTATATAATTTCTTTGATATGATCCGTAATCACTTTTTATTTTTTATAAGCAAGAGGAGCTTTTAAGTTCCTATCATGTTTTCTCTTCTTTTTTTTTTTTGGGTGAAGTTATCATGTTTTCTTTCGTGCCAGTCAAGAGGAGCTGAGAGGGATCATGTTCAAAGGAAAGCATTGCATGAAGTACACTCAGGACCTAATCCTATCAGTAACTCCATTCCACAACAGAAGTTGAAAAATATACAAAGAAATCATATGCATTAGGTCTTCTTTTGTATGTTAATTATTTTTTCCTTTTCTGTTCTTTGTTCTTTCTTTCCCTCCCTTCCTCATATTTGTTACACATATTTCATGAGTCAGCTTTGAATCATGCATAATGAATCTACATTCAGATTGATGCATAACTATAGCTAGCATGACCATCTTCAGTTCTTCACTCTTTTCATTGTGTTATACTGTTATTATCCCTCCCTCCCTCCCTCCCTCCCTCATTTTTCTTTGCGTATAAATTTCAAT'
const EXAMPLE_A_CODING_SEQ = '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ATGAACTATTCTTCGGGCTTTTTCATCATTCTTCTTCTGCTGCTATCCCATTTCTTCCCATATTCAAGCTCGAGCATGAGAATAATGATTCAGCAAGTCACCAAAGCAGCAACAGAAAATCACCATCACAT----------------------------------------------------------------------------------------------------------------------------------------GTCAAGAGGAGCTGAGAGGGATCATGTTCAAAGGAAAGCATTGCATGAAGTACACTCAGGACCTAATCCTATCAGTAACTCCATTCCACAACAGAAGTTGAAAAATATACAAAGAAATCATATGCATTAG------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------'
const EXAMPLE_A_HIT_SEQ = 'TGAATATTATTCTAATTTAACTAATGGCCTTAAACTTGGATACTTATGCAATTAATTAAGTTAGATACTTCAGAAAGAGAACTTTAACTATCCTAATAATCATATTCAAGTCAAACAAGATTCTATTTCCTAGAATATACATGCGAAGTAAAAAAAATGACACTATAATTGATTTTAGCATTTATTATATTTTATCATCATTGAGTGAGACTAATTTTGCTCTTATAAAAACATTTATGCCATACCAATCGACCCCATTTAAGGTTGATGATAGTGCAGCCATGCAGGGAAAGTAAACCCAAATAATAGTACGAAGTAGCTAGGCATAAAAAACTTCAAACAATATATTGTTCTCCCACTATCTAAAAACAAGAAGCCCGGCCCCCATTTTGTGGAGACCACGTATATACTCCAGTAAACAAAAGATATTTAGTCCTCAAATTAACTTTATCCCATGTCAGTGTATGGTATATTCTTAATAATTTTTTGCGGGGTACCCTCACATCATATGAATTTCTCCTTTTTTTTTGTATACCTCAAAACATGTGTTTTCCTTAATATTGCCATAAGCTAACAAAAGCATGGTAGCTAATACTTTTTCTCGATCTAAACCTGCATGTTTACCACTTTCATGAAACAAAAACTATGAACTATTCTTCGGGCTTTTTCATCATTCTTCTTCTGCTGCTATCCCATTTCTTCCCATATTCAAGCTCGAGCATGAGAATAATGATTCAGCAAGTCACCAAAGCAGCAACAGAAAATCACCATCACATGGTAAGTATATAATTTCTTTGATATGATCCGTAATCACTTTTTATTTTTTATAAGCAAGAGGAGCTTTTAAGTTCCTATCATGTTTTCTCTTCTTTTTTTTTTTTGGGTGAAGTTATCATGTTTTCTTTCGTGCCAGTCAAGAGGAGCTGAGAGGGATCATGTTCAAAGGAAAGCATTGCATGAAGTACACTCAGGACCTAATCCTATCAGTAACTCCATTCCACAACAGAAGTTGAAAAATATACAAAGAAATCATATGCATTAGGTCTTCTTTTGTATGTTAATTATTTTTTCCTTTTCTGTTCTTTGTTCTTTCTTTCCCTCCCTTCCTCATATTTGTTACACATATTTCATGAGTCAGCTTTGAATCATGCATAATGAATCTACATTCAGATTGATGCATAACTATAGCTAGCATGACCATCTTCAGTTCTTCACTCTTTTCATTGTGTTATACTGTTATTATCCCTCCCTCCCTCCCTCCCTCCCTCATTTTTCTTTGCGTATAAATTTCAAT'

// Example of a gene hit against a non-reference genome with extensive polymorphisms
const EXAMPLE_B_GENOMIC_SEQ = 'TGAATATTATTCTAATTTAACTAATGGCCTTAAACTTGGATACTTATGCAATTAATTAAGTTAGATACTTCAGAAAGAGAACTTTAACTATCCTAATAATCATATTCAAGTCAAACAAGATTCTATTTCCTAGAATATACATGCGAAGTAAAAAAAATGACACTATAATTGATTTTAGCATTTATTATATTTTATCATCATTGAGTGAGACTAATTTTGCTCTTATAAAAACATTTATGCCATACCAATCGACCCCATTTAAGGTTGATGATAGTGCAGCCATGCAGGGAAAGTAAACCCAAATAATAGTACGAAGTAGCTAGGCATAAAAAACTTCAAACAATATATTGTTCTCCCACTATCTAAAAACAAGAAGCCCGGCCCCCATTTTGTGGAGACCACGTATATACTCCAGTAAACAAAAGATATTTAGTCCTCAAATTAACTTTATCCCATGTCAGTGTATGGTATATTCTTAATAATTTTTTGCGGGGTACCCTCACATCATATGAATTTCTCCTTTTTTTTTGTATACCTCAAAACATGTGTTTTCCTTAATATTGCCATAAGCTAACAAAAGCATGGTAGCTAATACTTTTTCTCGATCTAAACCTGCATGTTTACCACTTTCATGAAACAAAAACTATGAACTATTCTTCGGGCTTTTTCATCATTCTTCTTCTGCTGCTATCCCATTTCTTCCCATATTCAAGCTCGAGCATGAGAATAATGATTCAGCAAGTCACCAAAGCAGCAACAGAAAATCACCATCACATGGTAAGTATATAATTTCTTTGATATGATCCGTAATCACTTTTTATTTTTTATAAGCAAGAGGAGCTTTTAAGTTCCTATCATGTTTTCTCTTCTTTTTTTTTTTTGGGTGAAGTTATCATGTTTTCTTTCGTGCCAGTCAAGAGGAGCTGAGAGGGATCATGTTCAAAGGAAAGCATTGCATGAAGTACACTCAGGACCTAATCCTATCAGTAACTCCATTCCACAACAGAAGTTGAAAAATATACAAAGAAATCATATGCATTAGGTCTTCTTTTGTATGTTAATT-ATT------------------------------TTTTCCTTTTCTGTTCTTTGTTCTTTCTTTCCCTCCCTTCCTCATATTTGTTACACATATTTCATGAGTCAGCTTTGAATCATGCATAATGAATCTACATTCAGATTGATGCATAACTATAGCTAGCATGACCATCTTCAGTTCTTCACTCTTTTCATTGTGTTATACTGTTATTATCCCTCCCTCCCTCCCTCCCTCCCTCATTTTTCTTTGCGTATAAATTTCAAT'
const EXAMPLE_B_CODING_SEQ = '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ATGAACTATTCTTCGGGCTTTTTCATCATTCTTCTTCTGCTGCTATCCCATTTCTTCCCATATTCAAGCTCGAGCATGAGAATAATGATTCAGCAAGTCACCAAAGCAGCAACAGAAAATCACCATCACAT----------------------------------------------------------------------------------------------------------------------------------------GTCAAGAGGAGCTGAGAGGGATCATGTTCAAAGGAAAGCATTGCATGAAGTACACTCAGGACCTAATCCTATCAGTAACTCCATTCCACAACAGAAGTTGAAAAATATACAAAGAAATCATATGCATTAG-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------'
const EXAMPLE_B_HIT_SEQ = 'TGAATATTATTCTAATTTAACTAATGGCCTTAAACTTGGATACTTATGCAATTAATTAAGTTAGATACTTCAGAAAGAGAACTTTAACTATCCTAATAATCATATTCAAGTCAAACAAGATTCTATTTCCTAGAATATACATGCGAAGTAAAAAAAATGACACTATAATTGATTTTAGCATTTATTATATTTTATCATCATTGAGTGAGAATAATTTTGCTCTTATAAAAACATTTATGCCATACCAATCGACCCCATTTAAGGTTGATGATAGTGCAGCCATGCAGGGAAAGTAAACCCAAATAATAGTACGAAGTAGCTAGGCATAAAAAACTTCAAACAATATATTGTTCTCCCACTATCTAAAAACAAGAAGCCCGGCCCCCATTTTGTGGAGACCACGTATATACTCCA--------------------------------------------------------------------------------------------------------------------------------------------------------------------------GTAGCTAATACTTTTTCTCGATCTAAACCTGCATGTTTACCACTTTCATGAAACAAAAACTATGAACTATTCTTCGGGCTTTTTCATCATTCTTCTTCTGCTGCTATACCATTTCTTCCCATATTCAAGCTCGAGCATGAGAATAATGATTCAGCAAGTCACCAAAGCAGCAACAGAAAATCACCATCACATGGTAAGTATATAATTTCTTTGATATGATCCATAATCACTTTTTATTTTTTATAAGCAAGAGGAGCTTTTAAGTTCCTATCATGTTTTCTCTTC--TTTTTTTCTTGGGTGAAGTTATCATGTTTTCTTTCGTGCCAGTCAAGAGGAGCTGAGAGGGATCATGTTCAAAGGAAAGCATTGCATGAAGTACACTCAGGACCTAATCCTATCAGTAACTCCATTCCACAACAGAAGTTGAAAAATATACAAAGAAATCATATGCATTAGGTCTTCTTTTGTATGTTAATTAATTATTTTTTCCTTTTCTTAATAGTAAACTCTCTTTTCCTTTTCTGTTCTTTGTTCTTTCTTTCCCTCCCTTCCTCATATTTGTTACACATATTTCATGAGTCAGCTTTGAATCATGCATAATGAATATAAATTCAGATTGATGCATAACTATAGCTAGCATGACCATCTTCAGTTCTTCACTCTTTTCATTGTGTTATACTGTTATTATCCCTCCCTCCCTCCCT--CT--CTCATTTTTCTTTGCGTATAAATTTCAAT'

const DEFAULT_SLAC_LENGTH = 50;

// Internal variables to track user inputs to allow re-querying backend on SLAC length change.
// In terms of efficiency, it's not ideal re-running the whole thing each time but we'll cross that bridge when we need to.
let lastInputMethod = null;
let miniSlacLength = null;

// Load Example A - Pre-fill sequences and trigger process
document.getElementById('load-example-a').addEventListener('click', () => {
    document.getElementById('per-sequence-tab').click();
    document.getElementById('genomic-seq').value = EXAMPLE_A_GENOMIC_SEQ;  // Example A genomic
    document.getElementById('coding-seq').value = EXAMPLE_A_CODING_SEQ;   // Example A coding
    document.getElementById('hit-seq').value = EXAMPLE_A_HIT_SEQ;         // Example A hit
    document.getElementById('process-per-sequence').click();
});

// Load Example B - Pre-fill sequences and trigger process
document.getElementById('load-example-b').addEventListener('click', () => {
    document.getElementById('per-sequence-tab').click();
    document.getElementById('genomic-seq').value = EXAMPLE_B_GENOMIC_SEQ;  // Example B genomic
    document.getElementById('coding-seq').value = EXAMPLE_B_CODING_SEQ;   // Example B coding
    document.getElementById('hit-seq').value = EXAMPLE_B_HIT_SEQ;         // Example B hit
    document.getElementById('process-per-sequence').click();
});

// Helper functions for sliders and inputs
function updateNumberInput(value) {
    document.getElementById('mini-slac-length-input').value = value;
}

function updateSliderInput(value) {
    const slider = document.getElementById('mini-slac-length');
    const numericValue = parseInt(value);
    if (numericValue >= slider.min && numericValue <= slider.max) {
        slider.value = numericValue;
    }
}

function refreshOutputsOnLengthChange() {
    let newLength = document.getElementById('mini-slac-length').value;
    // Only run if the length has changed
    if (newLength !== miniSlacLength) {
        miniSlacLength = newLength;
        if (lastInputMethod === 'process-per-sequence') {
            document.getElementById('process-per-sequence').click();
        } else if (lastInputMethod === 'process-fasta-text') {
            document.getElementById('process-fasta-text').click();
        } else if (lastInputMethod === 'process-fasta-upload') {
            document.getElementById('process-fasta-upload').click();
        }
    }
}

// Function to check if an element is in view
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to scroll to the miniSLAC card and log if not in view
function scrollToResults() {
    const miniSlacCard = document.querySelector('#minislac_output');
    const logAlert = document.querySelector('#log_output');

    // Scroll to the log and output if neither is currently in view
    if (!isInViewport(miniSlacCard) && !isInViewport(logAlert)) {
        logAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Event listeners for processing buttons
document.getElementById('process-per-sequence').addEventListener('click', async () => {
    const hitSeq = document.getElementById('hit-seq').value.trim();
    const fullRefSeq = document.getElementById('genomic-seq').value.trim();
    const refContextSeq = document.getElementById('coding-seq').value.trim();
    miniSlacLength = document.getElementById('mini-slac-length').value;

    lastInputMethod = 'process-per-sequence';

    updateLog('Processing... Please wait.', 'info');

    try {
        const startTime = performance.now();
        const response = await fetch('https://slacserver.vercel.app/slac-3-input', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hitSeq, fullRefSeq, refContextSeq, miniSlacLength })
        });

        const endTime = performance.now();
        const elapsedTime = (endTime - startTime).toFixed(2);

        if (response.ok) {
            const data = await response.json();
            updateLog(`Finished in ${elapsedTime} ms`, 'success');
            displayResults(data);
        } else {
            throw new Error(`Server returned status: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error processing request:', error);

        // User-friendly message for network errors
        if (error.message === 'Failed to fetch') {
            updateLog('Connection error: Unable to reach the server. Please check your connection and try again.', 'danger');
        } else {
            updateLog(`Processing failed: ${error.message}`, 'danger');
        }
    }
});

document.getElementById('process-fasta-text').addEventListener('click', async () => {
    const fastaText = document.getElementById('fasta-text').value.trim();
    miniSlacLength = document.getElementById('mini-slac-length').value;

    lastInputMethod = 'process-fasta-text';

    updateLog('Processing... Please wait.', 'info');

    try {
        const startTime = performance.now();
        const response = await fetch('https://slacserver.vercel.app/slac-paste-fasta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fastaText, miniSlacLength })
        });

        const endTime = performance.now();
        const elapsedTime = (endTime - startTime).toFixed(2); // Unused but keeping for future reference

        if (response.ok) {
            const data = await response.json();
            updateLog('Finished', 'success');
            displayResults(data);
        } else {
            throw new Error(`Server returned status: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error processing request:', error);

        // User-friendly message for network errors
        if (error.message === 'Failed to fetch') {
            updateLog('Connection error: Unable to reach the server. Please check your connection and try again.', 'danger');
        } else {
            updateLog(`Processing failed: ${error.message}`, 'danger');
        }
    }
});

document.getElementById('process-fasta-upload').addEventListener('click', async () => {
    const fastaFile = document.getElementById('fasta_file').files[0];
    miniSlacLength = document.getElementById('mini-slac-length').value;
    
    if (!fastaFile) {
        alert('Please upload a FASTA file.');
        return;
    }
    
    lastInputMethod = 'process-fasta-upload';
    
    const formData = new FormData();
    formData.append('fastaFile', fasta_file);
    formData.append('miniSlacLength', miniSlacLength);


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
            updateLog('Finished', 'success');
            displayResults(data);
        } else {
            throw new Error(`Server returned status: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error processing request:', error);

        // User-friendly message for network errors
        if (error.message === 'Failed to fetch') {
            updateLog('Connection error: Unable to reach the server. Please check your connection and try again.', 'danger');
        } else {
            updateLog(`Processing failed: ${error.message}`, 'danger');
        }
    }
});

// Helper function to update the log message
function updateLog(message, type = 'info') {
    const logAlert = document.getElementById('log_alert');
    logAlert.textContent = message;
    logAlert.className = 'alert alert-' + type;
}

// Displaying the generated SLAC sequences
function displayResults(data) {
    document.getElementById('minislac_output').textContent = data.mini_slac;
    document.getElementById('fullslac_output').value = data.full_slac;
    document.getElementById('seqslac_output').value = data.seq_slac;
    console.log('Processing time: ', data.time);
    scrollToResults();
}

// Handle miniSLAC length changes once an output has already been generated
document.getElementById('mini-slac-length').addEventListener('change', async () => {
    refreshOutputsOnLengthChange();
});

// Clear page on refresh
window.addEventListener('DOMContentLoaded', () => {
    // Reset input fields and text areas
    document.getElementById('genomic-seq').value = '';
    document.getElementById('coding-seq').value = '';
    document.getElementById('hit-seq').value = '';

    // Clear textareas for SLAC outputs
    document.getElementById('fullslac_output').value = '';
    document.getElementById('minislac_output').textContent = '';
    document.getElementById('seqslac_output').value = '';

    // Reset log message to the default placeholder
    updateLog('Click process to generate outputs.', 'info');

    // Reset internal variables
    lastInputMethod = null;
    miniSlacLength = null;

    // Reset sliders and number inputs
    updateNumberInput(DEFAULT_SLAC_LENGTH);
    updateSliderInput(DEFAULT_SLAC_LENGTH);

    // Reset to the default tab
    const defaultTab = new bootstrap.Tab(document.getElementById('per-sequence-tab'));
    defaultTab.show();
});