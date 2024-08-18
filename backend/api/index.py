from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://ryanzujic.github.io/slacserver/"])

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
