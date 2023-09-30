from flask import Flask, request, jsonify
import boto3
from flask_cors import CORS
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')
ACCESS_KEY = os.getenv('ACCESS_KEY')
dynamodb = boto3.client('dynamodb', aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY, region_name="us-east-1")
POST_TABLE = 'posts'
CORS(app)  # Allowing Cross-Origin Resource Sharing

def unwrap(response):
    data = response['Items']
    unwrapped_data = []
    post = {}
    for item in data:
        for key in item.keys():
            post[key] = item[key]['S']
        unwrapped_data.append(post)
    return unwrapped_data

def wrap(data):
  """Wraps all the items in data in S.

  Args:
    data: A dict.

  Returns:
    A dict with all the items wrapped in S.
  """

  wrapped_data = {}
  for key, value in data.items():
    if isinstance(value, dict):
      wrapped_data[key] = wrap(value)
    else:
      wrapped_data[key] = {'S': str(value)}
  return wrapped_data


@app.route('/posts', methods=['GET'])
def get_posts():
    response = dynamodb.scan(TableName=POST_TABLE)
    return jsonify(unwrap(response)), 200

@app.route('/posts', methods=['POST'])
def create_post():
    try:
        data = request.json
    except Exception as error:
        print(error)
    post = wrap(data)
    dynamodb.put_item(TableName=POST_TABLE, Item=post)
    return jsonify({'message': 'Post created successfully'})

@app.route('/post/<int:id>', methods=['GET'])
def get_post(id):
    response = dynamodb.query(TableName=POST_TABLE, KeyConditionExpression='id = :val', ExpressionAttributeValues= {
        ':val': {'S': str(id)}
    })
    if len(response['Items']) < 1:
        return jsonify({'message': 'Post not found'}), 404
    return jsonify(unwrap(response)[0]), 200

if __name__ == '__api__':
    app.run(debug=True)
