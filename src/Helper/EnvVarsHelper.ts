import 'dotenv/config'

export class EnvVarsHelper {
  public readonly botToken: string;
  public readonly markUserId: string;
  public readonly lizaUserId: string;

  public constructor(env: Record<string, string>) {
    this.botToken = env.BOT_TOKEN;
    this.markUserId = env.MARK_USER_ID;
    this.lizaUserId = env.LIZA_USER_ID;
  }
}
