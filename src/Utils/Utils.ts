// どうでもいい関数 そのうち消す
export const logMessage = (message: string): void => {
  console.log(message);
};

/**
 * コマンド実行時にGETパラメータに?key=として設定するためのランダム文字列を返す
 * @param wordCount
 * @returns wordCount数のランダム文字列
 */
export const getKey = (wordCount: number): string => Math.random().toString(36).slice(-wordCount);
