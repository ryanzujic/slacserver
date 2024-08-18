import logging
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://ryanzujic.github.io"])


# Set up logging
logging.basicConfig(level=logging.INFO)

@app.after_request
def after_request(response):
    # Log all response headers
    logging.info("Response Headers: %s", response.headers)
    return response

@app.route('/generate-slac', methods=['POST'])
def generateSlac():
    data = request.get_json()
    hit_seq = data.get('hit_seq')
    full_ref_seq = data.get('full_ref_seq')
    ref_context_seq = data.get('ref_context_seq')

    # TODO - Add logic here to generate SLAC

    result = "Some result"

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
