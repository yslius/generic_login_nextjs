import pino from 'pino'

const logLevel = process.env.NODE_ENV === 'production' ? 'info' : 'trace'
const frontendOrigin = process.env.NEXT_PUBLIC_FRONTEND_ORIGIN
const logUrl = `${frontendOrigin}/api/log`

// サーバーサイドの場合のみファイル出力を設定
const transport = typeof window === 'undefined' ? {
  target: 'pino/file',
  options: {
    destination: './logs/app.log',
    mkdir: true,
    sync: true
  }
} : undefined

export const logger = pino({
  level: logLevel,  // 出力するログレベルを設定。指定したレベル以上のログが出力される
  timestamp: pino.stdTimeFunctions.isoTime,  // タイムスタンプの形式の設定
  transport,
  browser: {
    // see https://github.com/pinojs/pino/issues/1795
    write: () => {},  // ブラウザのコンソールにログを出力しないようにする
    // ブラウザやミドルウェアのログをサーバーに送信するための設定
    transmit: {
      send: (level, logEvent) => {
        // childを使用する場合にはlogEvent.messagesだけでなく、bindingsもサーバーに送信する必要がある
        const messages = logEvent.messages
        // ミドルウェアではnavigator.sendBeaconは使用できないため、keepalive:true の fetch を使用
        // /api/logにリクエスト
        void fetch(logUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ level, messages }),
          keepalive: true,
        })
      },
    },
  },
})
