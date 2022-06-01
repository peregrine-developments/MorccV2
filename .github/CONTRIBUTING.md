# MorccV2 Contributing Guidelines
Please reference and adhere to the information below when making contributions to MorccV2

## Requirements
- Commands must be written cleanly, clearly, and professionally
- Be sure to proofread your work and wording before marking as ready for review
- Choose user-friendly and memorable names for commands
    - Alias other memorable names for commands if necessary
- Test your contributions locally before marking as ready for review

## Writing Guidelines
- Ensure spelling and grammar are correct in command messages
- Prioritize sending embeds over raw text messages
- Use exclamation points sparingly
- Ensure that command messages are correct and useful, ask the server if you need confirmation on something

## PR Process
1. Fork the repository
2. Clone to your local filesystem using git CLI or your favorite IDE
3. Make a new appropriately named branch (guidelines below) and check it out
4. Add/modify as necessary to make your contributions
5. Test your contributions locally (instructions below)
6. Commit and push your changes
7. Create a PR from your modified branch into `MorccV2/main`

## PR Name Examples
- Adding a new command: `feat-add-[name]-command`
- Fixing a command bug: `fix-[name]-command-bug`
- Changing a command (no bugfix): `refactor-[name]-command`
- Other code changes (chores): `chore-[etc]`
- Documentation changes: `docs-[etc]`

## Testing your build

### node and npm
1. [Install node](https://nodejs.org/en/download/), npm will be bundled
2. Open a terminal in your local repository folder and run `npm install`

### Bot Application
1. Log into Discord in a web browser and navigate to the [applications page](https://discord.com/developers/applications)
2. Create a `New Application`
3. Name your application something easy like `MorccV2Dev` and click `Create`
4. Navigate to the `Bot` options, click `Add Bot`, and confirm the request
5. Click the `Copy` button underneath token (DO NOT share this, and don't lose it!)
6. Create a new file called `.env` inside your local repository folder
7. Inside the newly created `.env` file add the line `DISCORD_TOKEN=[TOKEN]`, replacing `[TOKEN]` with the bot secret you copied
8. Ensure the `.env` file is ignored by your git CLI/IDE integration

### Privileged Gateway Intents
1. Return to the [applications page](https://discord.com/developers/applications) and navigate to the `Bot` settings again
2. Scroll down to Privileged Gateway Intents and enable all intents

### Inviting the Bot
1. Create a server for testing the bot
2. From the [applications page](https://discord.com/developers/applications) select your application and navigate to `OAuth2` settings
3. Under the available scopes, select `bot`
4. Tick the following bot permissions
![image](https://user-images.githubusercontent.com/64386329/171515650-d6910afe-3461-4c9a-acc5-d6712e695ccb.png)
5. Click `Copy` and paste the link into your web browser, then invite to yout test server of choice

### Testing the Bot
1. Open a terminal in your local repository folder
2. Run the bot with `npm run dev` (this will also listen for file changes and restart as required)
3. If all has gone well, you should see a message like `Ready in 1 guild(s)!` and your testing bot should show as online
4. Test your changes and send in a PR!
