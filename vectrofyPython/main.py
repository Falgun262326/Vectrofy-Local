from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import cv2
import numpy as np

app = Flask(__name__)
CORS(app)


@app.route('/convert', methods=['POST'])
def convert_image():
    file = request.files['file']
    threshold = int(request.form.get('threshold', 128))

    image = Image.open(file)
    image = image.convert('L')
    image_np = np.array(image)

    _, binary_image = cv2.threshold(image_np, threshold, 255, cv2.THRESH_BINARY)

    contours, _ = cv2.findContours(binary_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    svg_data = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">\n'

    for contour in contours:
        path_data = "M " + " L ".join(f"{pt[0][0]},{pt[0][1]}" for pt in contour)
        svg_data += f'<path d="{path_data} Z" fill="black" stroke="none" />\n'

    svg_data += '</svg>'

    return jsonify({"svg": svg_data})


if __name__ == '__main__':
    app.run(debug=True,port=8080)
