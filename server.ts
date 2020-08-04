import createBot from "./src/bot";

main();
async function main() {
  const signingSecret = process.env.SLACK_SIGNING_SECRET;
  if (!signingSecret) {
    console.error("SLACK_SIGNING_SECRET ない");
    process.exit(1);
  }
  const token = process.env.SLACK_BOT_TOKEN;
  if (!token) {
    console.error("SLACK_BOT_TOKEN ない");
    process.exit(1);
  }
  const channel = process.env.SLACK_CHANNEL;
  if (!channel) {
    console.error("SLACK_CHANNEL ない");
    process.exit(1);
  }
  const bot = createBot({ signingSecret, token, channel });
  const port = Number(process.env.PORT || 9999);

  // Start the built-in server
  const server = await bot.start(port);
  console.log(`Listening for events on ${port}`);
}
