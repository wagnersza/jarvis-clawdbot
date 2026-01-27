---
name: whatsapp-autoreply
description: Auto-reply to unanswered WhatsApp messages after a delay, letting people know Wagner may take time to respond.
metadata: {"clawdbot":{"emoji":"⏰"}}
---

# WhatsApp Auto-Reply Skill

This skill monitors WhatsApp for unanswered messages and sends a polite auto-reply after a delay.

## Purpose

Wagner usually takes a long time to respond to messages. This skill:
1. Checks for unanswered WhatsApp messages (ignores groups)
2. If a message has been waiting for more than 5 minutes without a reply, sends an auto-reply
3. Tracks which messages have already received an auto-reply to avoid duplicates

## Auto-Reply Message

```
Oi, aqui é o Jarvis, assistente do Wagner. Ele costuma demorar para responder. Se for urgente, tente ligar, pode ser por WhatsApp mesmo📞
```

## Logic

1. **Fetch recent DM messages** (exclude groups):
   ```bash
   wacli chats list --limit 50 --json
   ```
   Filter for `Kind: "dm"` only.

2. **For each DM chat**, get the last message:
   ```bash
   wacli messages list --chat "<JID>" --limit 1 --json
   ```

3. **Check if auto-reply is needed**:
   - Message is NOT from Wagner (`FromMe: false`)
   - Message is older than 5 minutes
   - No reply from Wagner exists after that message
   - Chat JID is not in the "already replied" tracking file

4. **Send auto-reply**:
   ```bash
   wacli send text --to "<JID>" --message "Oi, aqui é o Jarvis, assistente virtual do Wagner, normalmente ele demora muito para responder, se for urgente, tente ligar para ele que ele logo logo te retorna, pode ser por WhatsApp mesmo 📞"
   ```

5. **Track replied chats** in `/Users/wagnersza/clawd/data/autoreply-sent.json`:
   ```json
   {
     "<JID>": {
       "lastAutoReplyAt": "<timestamp>",
       "messageId": "<msgId>"
     }
   }
   ```
   Clear entries older than 24 hours to allow new auto-replies for new conversations.

## Exclusions

- **Groups** — only DMs
- **Family members** (never auto-reply):
  - Patricia: `351913697683@s.whatsapp.net`
  - Laura Souza: `351963801604@s.whatsapp.net`
  - Kelly: `5524999319114@s.whatsapp.net`
  - Ivonete: `5524999225025@s.whatsapp.net`
  - Walter: `5521987492095@s.whatsapp.net`
  - Leila Almeida: `5521999127654@s.whatsapp.net`
  - Fernanda: (add JID when available)
- **Already replied** — don't spam the same person

## Cron Schedule

Runs every 5 minutes via Clawdbot cron.
