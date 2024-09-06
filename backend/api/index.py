import logging
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from .slac import SlacView

app = Flask(__name__)
CORS(app, origins=["https://ryanzujic.github.io"])


# TODO - The the sequence mapping is likely wrong, seeing ? where there should be X

# Set up logging
logging.basicConfig(level=logging.INFO)

@app.after_request
def after_request(response):
    # Log all response headers
    logging.info("Response Headers: %s", response.headers)
    return response

@app.route('/generate-slac', methods=['POST'])
def generateSlac():
    start_time = time.time()
    data = request.get_json()
    hit_seq = data.get('hit_seq')
    full_ref_seq = data.get('full_ref_seq')
    ref_context_seq = data.get('ref_context_seq')

    slac = SlacView(genomic=full_ref_seq, cds=ref_context_seq, hit=hit_seq)

    processing_time = time.time() - start_time

    return jsonify({'slac_full': slac.full(),
                    'slac_full_encoded': slac.full(encoded_hit=True),
                    'slac_short': slac.short(),
                    'time': processing_time})

if __name__ == '__main__':
    app.run(debug=True)
