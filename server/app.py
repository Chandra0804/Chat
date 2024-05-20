from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline, Conversation

app = Flask(__name__)
CORS(app)

# Load the pre-trained model
chatbot = pipeline('conversational', model='microsoft/DialoGPT-medium')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    conversation = Conversation(user_input)
    chatbot(conversation)
    response = conversation.generated_responses[-1]
    return jsonify({"reply": response})

if __name__ == '__main__':
    app.run(port=5001)
