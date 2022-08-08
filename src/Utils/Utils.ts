// どうでもいい関数 そのうち消す
export const logMessage = (message: string): void => {
  console.log(message);
};

/**
 * #### コマンド実行時にGETパラメータに?key=として設定するためのランダム文字列を返す
 * @param wordCount
 * @returns wordCount数のランダム文字列
 */
export const getKey = (wordCount: number): string => Math.random().toString(36).slice(-wordCount);

/**
 * #### 第一引数の配列arrayを第二引数n個ごとに分割するした新しい配列を返す、多分
 * //TODOジェネリックな書き方にしたい
 * @param array
 * @param n
 * @returns
 */
export const split = <T>(array: T[], n: number): T[][] =>
  array.reduce((acc: T[][], c, i) => (i % n ? acc : [...acc, array.slice(i, i + n)]), []);
