import { createEventAdapter } from "@slack/events-api";
import { WebClient } from "@slack/web-api";

type Init = {
  token: string;
  signingSecret: string;
  channel: string;
};

type Profile = {
  real_name: string;
  display_name: string;
  image_48: string;
};

export default function initialize({ token, signingSecret, channel }: Init) {
  const web = new WebClient(token);
  const events = createEventAdapter(signingSecret);
  const users = {} as { [id: string]: Profile };

  async function userInfo(id: string): Promise<Profile> {
    if (users[id]) return users[id];
    const result = await web.users.profile.get({ user: id });
    users[id] = result.profile as Profile;
    console.debug("ユーザーーー", result.profile);
    return users[id];
  }

  const done = [] as string[];

  events.on("message", async (event) => {
    // 「チャンネルに参加しました」等とボットのポストは無視
    if (event.subtype || event.bot_profile) return;
    // 転載先へのポスト
    if (event.channel === channel) return;
    // スレッド
    if (event.thread_ts) return;

    // たまに再送されるので2度目以降は無視
    if (done.includes(event.client_msg_id)) return;
    done.unshift(event.client_msg_id);
    done.splice(1024); // 古いのは捨てる

    console.debug(event);
    const user = await userInfo(event.user);
    web.chat.postMessage({
      channel,
      text: `${event.text} <#${event.channel}>`,
      username: `${user.real_name} @${user.display_name}`,
      icon_url: user.image_48,
    });
  });

  events.on("app_mention", (event) => {
    console.debug("mention", event);
    if (/\bbye\b|さようなら/.test(event.text) && event.channel !== channel) {
      web.conversations.leave({ channel: event.channel });
    } else {
      web.chat.postEphemeral({
        channel: event.channel,
        user: event.user,
        text: "*bye* か *さようなら* で出ていきます。",
      });
    }
  });

  return events;
}
