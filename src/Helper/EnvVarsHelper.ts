import 'dotenv/config'

export class EnvVarsHelper {
  public readonly botToken: string;
  public readonly port: string;

  public constructor(env: Record<string, string>) {
    this.botToken = env.BOT_TOKEN;
    this.port = env.PORT || '4000';
  }
}
