from flask import Flash, request, jsonify

app = Flask(__name__)

@app.route('/transform', methods=['POST'])
def generateSlacPreview():
    data = request.get_json()
    hit_seq = data.get('hit_seq')
    full_ref_seq = data.get('full_ref_seq')
    ref_context_subseq = data.get('ref_context_subseq')

    result = "Some result"

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
