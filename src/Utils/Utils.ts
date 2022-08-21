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
 * - ジェネリックな書き方にしたつもり
 *
 * @param array
 * @param n
 * @returns
 */
export const split = <T>(array: T[], n: number): T[][] =>
  array.reduce((acc: T[][], c, i) => (i % n ? acc : [...acc, array.slice(i, i + n)]), []);

// /**
//  * 任意の桁で四捨五入する関数
//  * @param  value 四捨五入する数値
//  * @param  base どの桁で四捨五入するか（10→10の位、0.1→小数第１位）
//  * @return  四捨五入した値
//  */
// export const orgRound = (value: number, base: number): number => Math.round(value * base) / base;

/*
 * 丸め処理・小数点以下の桁数指定
 *   P_dblVal   : 対象値
 *   P_intRound : 小数点以下丸め処理(1:切り捨て, 2:四捨五入, 3:切り上げ)
 *   P_intDpUnit: 小数点以下桁数
 *   return     : 丸めた値
 */
export const calcRoundDp = (tgtNum: number, roundKbn: number, keta: number): number => {
  let dblRet;
  const dblPow = 10 ** keta;
  // 丸め処理
  switch (roundKbn) {
    case 1:
      dblRet = Math.floor(tgtNum * dblPow);
      break;
    case 2:
      dblRet = Math.round(tgtNum * dblPow);
      break;
    case 3:
      dblRet = Math.ceil(tgtNum * dblPow);
      break;
    default:
      dblRet = Math.round(tgtNum * dblPow);
      break;
  }

  // 戻り値
  return dblRet / dblPow;
};

// ------------------------------
// ↓↓偏差値計算用
// ------------------------------

// 平均
export const average = (scores: number[]) =>
  calcRoundDp(scores.reduce((acc, current) => acc + current, 0) / scores.length, 2, 2);

// 分散
export const variance = (scores: number[], avg: number) =>
  calcRoundDp(scores.reduce((acc, current) => acc + (current - avg) ** 2, 0) / scores.length, 2, 2);

// 標準偏差
export const stdDev = (scores: number[], avg: number) => calcRoundDp(Math.sqrt(variance(scores, avg)), 2, 2);

// 偏差値
export const standardScore = (score: number, avg: number, sd: number) =>
  calcRoundDp(((score - avg) * 10) / sd + 50, 2, 2);

// ↓使用例
// スコア一覧
// const scores: number[] = [10, 30, 50, 70, 80, 100, 0];

// 偏差値の表示方法
// 数値の配列からaverage(),stdDev(),standardScore()を呼び出すと各々の偏差値を返してくれるもよう

// const avg = average(scores);
// const sd = stdDev(scores, avg);

// scores.forEach((score, i) => console.log(`${i + 1}番目の偏差値: ${standardScore(score, avg, sd)}`));
