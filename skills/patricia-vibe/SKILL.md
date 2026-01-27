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
- "Patrícia, às vezes na correria do dia a dia eu não digo o suficiente, mas eu admiro demais a mulher incrível que você é. Obrigado por ser minha parceira de vida e por tudo o que construímos juntos. Te amo muito!"

### Affectionate Examples (the kind to use for this skill)
- Express admiration for who she is
- Remind her she's your partner in everything
- Say "te amo" in natural ways
- Reference something you built together (family, life in Portugal, etc.)

### What NOT to do
- ❌ Don't be too flowery or poetic
- ❌ Don't use multiple emojis in one message
- ❌ Don't write long paragraphs
- ❌ Don't sound like a corporate greeting card
- ❌ Don't use "Bom dia, meu Amor!" (too formal)
- ❌ Don't add excessive exclamation marks

### Purpose
The goal of these messages is to give Patricia a "virtual hug" — something warm that makes her feel loved and appreciated. She should read it and feel better, knowing how much Wagner loves her.

### Content Types (focus on warmth and love)
1. **Appreciation** — remind her she's amazing, that you admire her
2. **Thinking of you** — let her know she crossed your mind
3. **Gratitude** — thank her for being who she is, for the partnership
4. **Encouragement** — lift her spirits, remind her she's strong
5. **Love declaration** — simple "te amo" variations, heartfelt but brief

## Output Format

Present 3 numbered options, brief and ready to copy-paste:

```
1. [message]
2. [message]
3. [message]
```

Keep each message under 100 characters when possible. Sound like Wagner, not like an AI.
