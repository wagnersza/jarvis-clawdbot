---
name: linkedin-publisher
description: Publish posts to LinkedIn including text, links, and images using the LinkedIn Community Management API.
---

# LinkedIn Publisher Skill

This skill allows the agent to publish posts to LinkedIn including text, links, and images.

## Setup

The skill uses the LinkedIn API. To use it, you need:
1. A LinkedIn App with the `w_member_social` permission.
2. Access Token for the app.
3. Person ID (URN) of the user.

Add these to your environment or `TOOLS.md`:
- `LINKEDIN_ACCESS_TOKEN`
- `LINKEDIN_PERSON_ID` (format: `urn:li:person:ABC123XYZ`)

## Usage

### Post text and link
```bash
python3 /Users/wagnersza/clawd/skills/linkedin-publisher/publish.py --text "Hello from Clawdbot!" --link "https://github.com/wagnersza/clawd"
```

### Post with image (Work in Progress)
```bash
python3 /Users/wagnersza/clawd/skills/linkedin-publisher/publish.py --text "Check this image!" --image "/path/to/image.png"
```

## Implementation Details
The skill uses a custom Python script (`publish.py`) that interacts with the LinkedIn Community Management API.
