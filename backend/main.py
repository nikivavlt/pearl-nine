import neca
from neca.events import *
from neca.generators import generate_data
from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS
import threading

app = Flask(__name__)

# Enable CORS for the entire app
CORS(app)

tweet_c = create_context("tweet_c")

# Store tweets in a list
tweets = []

@event("init")
def init(ctx, data):
    generate_data('sports.txt', time_scale=1, event_name='tweet', limit=10, context=tweet_c)

def get_favorites(tdata):
    if('quoted_status' in tdata):
        return (tdata['quoted_status']['favorite_count'])
    else:
        return(0)

def get_pfp(tdata):
    if('user' in tdata):
        return (tdata['user']['profile_image_url'])
    else:
        return('')
        
@event("tweet")
def tweet(ctx, data):
    tweet_info = {
        'text': data['text'],
        'likes': get_favorites(data),
        'shares': data['retweet_count'],
        'quotes': data['quote_count'],
        'date': data['created_at'],
        'username': data['user']['name'],
        'avatar' : get_pfp(data),
        'hashtags': [
            hashtag['text']
            for hashtag in data.get('entities', {}).get('hashtags', [])
        ]
    }
    tweets.append(tweet_info)
    print(tweet_info)

@app.route('/tweets', methods=['GET'])
def get_tweets():
    return jsonify(tweets)

def start_neca():
    neca.start()

if __name__ == '__main__':
    # Start neca in a separate thread
    neca_thread = threading.Thread(target=start_neca)
    neca_thread.daemon = True
    neca_thread.start()
    # Run the Flask app
    app.run(debug=False)
