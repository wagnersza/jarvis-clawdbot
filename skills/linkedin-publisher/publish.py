import argparse
import requests
import os
import json
import sys

def publish_to_linkedin(text, link=None, image_path=None):
    access_token = os.environ.get("LINKEDIN_ACCESS_TOKEN")
    person_id = os.environ.get("LINKEDIN_PERSON_ID")

    if not access_token or not person_id:
        print("Error: LINKEDIN_ACCESS_TOKEN and LINKEDIN_PERSON_ID environment variables must be set.")
        sys.exit(1)

    url = "https://api.linkedin.com/v2/ugcPosts"
    
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Connection": "Keep-Alive",
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0"
    }

    post_data = {
        "author": person_id,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": text
                },
                "shareMediaCategory": "NONE"
            }
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
    }

    if link:
        post_data["specificContent"]["com.linkedin.ugc.ShareContent"]["shareMediaCategory"] = "ARTICLE"
        post_data["specificContent"]["com.linkedin.ugc.ShareContent"]["media"] = [
            {
                "status": "READY",
                "originalUrl": link
            }
        ]

    # Image upload is more complex (requires 3 steps: register upload, upload binary, check status)
    # For now, we handle text and links.
    if image_path:
        print("Warning: Image upload is not yet fully implemented in this script version.")

    response = requests.post(url, headers=headers, json=post_data)
    
    if response.status_code in [200, 201]:
        print("Successfully published to LinkedIn!")
        print(response.json())
    else:
        print(f"Failed to publish. Status code: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Publish content to LinkedIn")
    parser.add_argument("--text", required=True, help="Text commentary for the post")
    parser.add_argument("--link", help="Optional URL to share")
    parser.add_argument("--image", help="Optional path to image (not yet supported)")
    
    args = parser.parse_args()
    publish_to_linkedin(args.text, args.link, args.image)
