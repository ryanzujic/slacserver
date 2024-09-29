import unittest
import json
import io
from .index import app

"""
Run tests from parent folder for correct relative imports. Eg:
python -m api.tests
"""

class SlacTestCase(unittest.TestCase):

    def setUp(self):
        # Set up the Flask test client
        self.client = app.test_client()
        self.client.testing = True

    def test_slac_3_input(self):
        # Prepare test data for 3-sequence input
        data = {
            "hitSeq": "ATGGTTAGTAATG",
            "fullRefSeq": "ATGGTA-GTAATG",
            "refContextSeq": "---GTA-GTA---",
            "miniSlacLength": 5
        }

        # Send POST request to the /slac-3-input route
        response = self.client.post('/slac-3-input',
                                    data=json.dumps(data),
                                    content_type='application/json')

        # Check response status code and content
        self.assertEqual(response.status_code, 200)
        result = json.loads(response.data)
        self.assertIn('full_slac', result)
        self.assertIn('seq_slac', result)
        self.assertIn('mini_slac', result)
        self.assertIn('time', result)

    def test_slac_paste_fasta(self):
        # Prepare FASTA text data for test
        fasta_text = """>genomic
ATGGTA-GTAATG
>cds
---GTA-GTA---
>hit
ATGGTTAGTAATG"""

        data = {
            "fastaText": fasta_text,
            "miniSlacLength": 5
        }

        # Send POST request to the /slac-paste-fasta route
        response = self.client.post('/slac-paste-fasta',
                                    data=json.dumps(data),
                                    content_type='application/json')

        # Check response status code and content
        self.assertEqual(response.status_code, 200)
        result = json.loads(response.data)
        self.assertIn('full_slac', result)
        self.assertIn('seq_slac', result)
        self.assertIn('mini_slac', result)
        self.assertIn('time', result)

    def test_slac_upload_fasta(self):
        # Prepare FASTA file data for test
        fasta_content = """>genomic
ATGGTA-GTAATG
>cds
---GTA-GTA---
>hit
ATGGTTAGTAATG"""

        # Simulate file upload using io.BytesIO
        fasta_file = io.BytesIO(fasta_content.encode('utf-8'))

        # Send POST request to the /slac-upload-fasta route with a file
        response = self.client.post('/slac-upload-fasta',
                                    data={'fastaFile': (fasta_file, 'test.fasta'),
                                          "miniSlacLength": 5},
                                    content_type='multipart/form-data')

        # Check response status code and content
        self.assertEqual(response.status_code, 200)
        result = json.loads(response.data)
        self.assertIn('full_slac', result)
        self.assertIn('seq_slac', result)
        self.assertIn('mini_slac', result)
        self.assertIn('time', result)

if __name__ == '__main__':
    unittest.main()
