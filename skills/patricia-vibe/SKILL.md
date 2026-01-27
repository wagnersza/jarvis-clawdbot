---
name: patricia-vibe
description: Generate message ideas for Patricia based on Wagner's writing style and recent conversation context.
metadata: {"clawdbot":{"emoji":"💖"}}
---

# Patricia Vibe Skill

This skill generates message ideas for Wagner to send to his wife, Patricia, via WhatsApp.

## Before Generating Messages

**ALWAYS** fetch the last 50 messages from the WhatsApp conversation with Patricia to:
1. Understand the current conversation context
2. Avoid repeating recent topics
3. Create relevant and meaningful messages

```bash
wacli messages list --chat "351913697683@s.whatsapp.net" --limit 50 --json
```

## Wagner's Writing Style (from real messages)

### Tone & Voice
- **Very informal and brief** — often just 1-2 sentences
- **Direct** — gets to the point quickly
- **Affectionate but not overly romantic** — natural couple communication
- **Uses humor** — "hahahah", "hehehe", casual jokes about neighbors, weather, etc.

### Common Patterns
- **Greetings:** "Amor", "Oi amor"
- **Endings:** "bjs!", "bjs", sometimes no ending at all
- **Questions:** Short, practical ("é urgente?", "Sim, e vc?", "Te espero para o almoço amor?")
- **Confirmations:** Just "sim", "ok", "blz"
- **Emojis:** Used sparingly — 😻, ❤️, occasionally weather-related ❄️

### Real Message Examples (to emulate)
- "Na volta mete o carro para carregar por favor bjs!"
- "a vizinha não sabe nem o que ela come hahahah"
- "tomara, doido para ver neve hehehe"
- "Te espero para o almoço amor?"
- "Em reunião amor"
- "Será que vai nevar em oliveira?"
- "Que vida hehehe"

### What NOT to do
- ❌ Don't be too flowery or poetic
- ❌ Don't use multiple emojis in one message
- ❌ Don't write long paragraphs
- ❌ Don't sound like a corporate greeting card
- ❌ Don't use "Bom dia, meu Amor!" (too formal)
- ❌ Don't add excessive exclamation marks

### Content Types (pick based on recent context)
1. **Quick check-in** — "Tudo bem por aí amor?"
2. **Casual observation** — something about weather, neighbors, daily life
3. **Planning** — lunch, errands, weekend plans
4. **Light humor** — inside jokes, funny observations
5. **Brief appreciation** — short and sweet, not over the top

## Output Format

Present 3 numbered options, brief and ready to copy-paste:

```
1. [message]
2. [message]
3. [message]
```

Keep each message under 100 characters when possible. Sound like Wagner, not like an AI.
