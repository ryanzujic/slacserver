import logging
import time
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from .slac import SLAC

app = Flask(__name__)
CORS(app, origins=["https://ryanzujic.github.io"])

# Set up logging
logging.basicConfig(level=logging.INFO)

@app.after_request
def after_request(response):
    # Log all response headers
    logging.info("Response Headers: %s", response.headers)
    return response

@app.route('/')
def index():
    return render_template('index.html', version=VERSION)

# Route for 3-sequence input method
@app.route('/slac-3-input', methods=['POST'])
def slac_3_input():
    # Ingest JSON input from request
    data = request.get_json()
    hit_seq = data.get('hitSeq')
    full_ref_seq = data.get('fullRefSeq')
    ref_context_seq = data.get('refContextSeq')
    mini_slac_length = data.get('miniSlacLength')

    if hit_seq:
        hit_seq = sanitise_string(hit_seq)
    if full_ref_seq:
        full_ref_seq = sanitise_string(full_ref_seq)
    if ref_context_seq:
        ref_context_seq = sanitise_string(ref_context_seq)

    return process_sequences(hit_seq=hit_seq, full_ref_seq=full_ref_seq, ref_context_seq=ref_context_seq,
                             mini_slac_length=mini_slac_length)

# Route for FASTA text input method
@app.route('/slac-paste-fasta', methods=['POST'])
def slac_paste_fasta():
    # Ingest JSON input from request
    data = request.get_json()
    fasta_text = data.get('fastaText')
    mini_slac_length = data.get('miniSlacLength')

    try:
        sequences = read_fasta_lines(fasta_text.split('\n'))
    except Exception as e:
        return jsonify({'error': f"Error reading FASTA text: {str(e)}"})

    if not sequences:
        return jsonify({'error': 'No labelled sequences found in FASTA text'})

    return slac_process_fasta_sequences(sequences, mini_slac_length)


# Route for FASTA file upload method
@app.route('/slac-upload-fasta', methods=['POST'])
def slac_upload_fasta():

    # Ingest the uploaded file from the request
    fasta_file = request.files.get('fastaFile')
    mini_slac_length = request.form.get('miniSlacLength')

    try:
        sequences = read_fasta_file(fasta_file)
    except Exception as e:
        return jsonify({'error': f"Error reading file: {str(e)}"})

    if not sequences:
        return jsonify({'error': 'No labelled sequences found in FASTA file'})

    return slac_process_fasta_sequences(sequences, mini_slac_length)

def slac_process_fasta_sequences(sequences, mini_slac_length):
    """
    Process a list of sequences from a FASTA file or text input, and return the json resultst
    Args:
        sequences: List of dictionaries, each containing a single sequence ID and sequence
        length: (int) The length of the miniSLAC output
    """
    full_ref_seq = None
    ref_context_seq = None
    hit_seq = None

    if len(sequences) == 3:
        full_ref_seq, ref_context_seq, hit_seq = [next(iter(seq.values())) for seq in sequences]
    elif len(sequences) == 2:
        full_ref_seq, hit_seq = [next(iter(seq.values())) for seq in sequences]
    else:
        return jsonify({'error': f'Incorrect number of sequences in FASTA input. Expected 2 or 3, got {len(sequences)}'})

    return process_sequences(hit_seq=hit_seq, full_ref_seq=full_ref_seq, ref_context_seq=ref_context_seq, mini_slac_length=mini_slac_length)


def sanitise_string(input_string):
    # Basic implementation assuming we'll allow any alphanumeric character, spaces, dashes, underscores as >
    # and newlines
    import re
    try:
        return re.sub(r'[^a-zA-Z0-9\s\-_>]', '', input_string)
    except Exception as e:
        raise ValueError(f"Error processing input text")


def read_fasta_file(fasta_file):
    fasta_content = fasta_file.read().decode('utf-8')
    fasta_lines = fasta_content.split('\n')
    return read_fasta_lines(fasta_lines)


def read_fasta_lines(fasta_lines):
    # Sequences is an ordered list of dictionaries so that we can recover them in order
    seqs = []
    # Sequence ID as key, sequence as value
    current_seq_name = None
    current_seq = ""
    for line in fasta_lines:
        # If the line is empty or only contains newlines, skip it
        if not line.strip():
            continue

        line = sanitise_string(line)

        if line.startswith('>'):
            # Store the previous sequence if it exists
            if current_seq_name:
                seqs.append({current_seq_name: current_seq})
                current_seq_name = None
                current_seq = ""
            current_seq_name = line[1:]
        else:
            if not current_seq_name:
                raise ValueError('Each FASTA sequence must have a > labelled sequence ID')
            else:
                current_seq = current_seq + line

    # Store the last sequence
    if current_seq_name:
        seqs.append({current_seq_name: current_seq})

    return seqs


def process_sequences(hit_seq, full_ref_seq, ref_context_seq, mini_slac_length):
    """
    Process the sequences and return the SLAC results as a JSON response.

    Args:
        hit_seq: (str) The aligned hit sequence
        full_ref_seq: (str) The aligned reference sequence (ie, genomic)
        ref_context_seq: (str) The reference context sequence (ie, CDS, may be unaligned)
        mini_slac_length: (int) The length of the miniSLAC output

    Returns:
        JSON response containing the full SLAC output, the sequence-only SLAC output, the miniSLAC output, and the processing
        time in seconds.
    """

    start_time = time.time()

    try:
        slac = SLAC(genomic=full_ref_seq, cds=ref_context_seq, hit=hit_seq, auto_align_cds_to_genomic=True, size_limit=mini_slac_length)
    except Exception as e:
        return jsonify({'error': f"Error processing SLAC."})

    processing_time = time.time() - start_time

    return jsonify({'full_slac': slac.full(),
                    'seq_slac': slac.full(encoded_hit=True),
                    'mini_slac': slac.short(),
                    'time': processing_time})


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True)

