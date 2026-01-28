# TOOLS.md - Local Notes

---

### bird CLI Skill Configuration

The **bird** CLI is configured to work with the following details:

#### Chrome Profile for Cookies:
Path to Chrome profile for X Authentication:
```
~/Library/Application Support/Google/Chrome/Default/
```

#### Example Commands:
1. **Verify Authentication**:
   ```bash
   bird whoami --chrome-profile-dir "~/Library/Application Support/Google/Chrome/Default/"
   ```

2. **Fetch the Latest Tweet from Followed Accounts**:
   ```bash
   bird home --following -n 1 --chrome-profile-dir "~/Library/Application Support/Google/Chrome/Default/"
   ```

3. **Search Tweets**:
   ```bash
   bird search "your keyword" -n 5 --chrome-profile-dir "~/Library/Application Support/Google/Chrome/Default/"
   ```

4. **Post a Tweet**:
   ```bash
   bird tweet "Your tweet text here!" --chrome-profile-dir "~/Library/Application Support/Google/Chrome/Default/"
   ```

5. **Reply to a Tweet**:
   ```bash
   bird reply <tweet-id> "Your reply text here!" --chrome-profile-dir "~/Library/Application Support/Google/Chrome/Default/"
   ```

#### Notes:
- Ensure you are logged into `x.com` in the specified Chrome profile.
- If you encounter issues with authentication, check the cookie storage or try providing cookies manually using the `--auth-token` and `--ct0` options.